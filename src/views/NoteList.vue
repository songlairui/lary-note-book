<template>
  <div class="page-wrapper">
    <div
      class="note-list"
      v-infinite-scroll="showMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div class="card-blocks">
        <div class="card-wrapper" v-for="(item, idx) in source.edges">
          <a-card :title="item.node.title">
            <a-dropdown slot="extra">
              <a class="ant-dropdown-link" href="#">
                <a-icon type="down"/>
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <span>Edit</span>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm title="删了没了!" @confirm="del(item)">
                    <a href="#">Delete</a>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <div
              ref="cardDiv"
              class="rendered"
              @input="mdCheck(idx,$event)"
              v-html="md.render(item.node.content)"
            ></div>
          </a-card>
        </div>
      </div>
      <div class="actions">
        <div style="line-height: 4em; text-align: center">
          <a-icon v-if="source.hasNextPage" type="loading" @click="showMore"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Dropdown, Menu } from "ant-design-vue";
import infiniteScroll from "vue-infinite-scroll";
import MY_NOTES from "../graphql/my-notes.gql";
import { PAGE_SIZE, initVari } from "../constant";
import MarkdownIt from "../plugins/markdownIt";
import { RSA_PKCS1_PADDING } from "constants";

function calcData(baseMd, content, $wrap, $check) {
  const baseToken = baseMd.parse(content, {});
  const checkContent = $check.nextSibling.data;
  const checkedValue = $check.checked;
  // 不适配 [], [  ] 等空格无效情况, 暂不考虑 在list之外的 [ ]
  const targetTokens = baseToken.filter(token =>
    token.content.endsWith(`]${checkContent}`)
  );
  if (!targetTokens.length) {
    return;
  }
  let targetIdx = 0;
  if (targetTokens.length > 1) {
    // 选项名重复时
    const nodes = [
      ...$wrap.querySelectorAll(".task-list-item-checkbox")
    ].filter(node => node.nextSibling.data === checkContent);
    targetIdx = nodes.findIndex(node => node === $check);
  }
  const targetToken = targetTokens[targetIdx];
  const lines = content.split("\n");
  const targetLine = lines.slice(...targetToken.map)[0];
  const lineReplaced = targetLine.replace(
    /\[[\sx]\]/,
    `[${checkedValue ? "x" : " "}]`
  );
  lines.splice(targetToken.map[0], 1, lineReplaced);
  return lines.join("\n");
}

export default {
  name: "NoteList",
  directives: { infiniteScroll },
  components: {
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item
  },
  data() {
    const md = new MarkdownIt();
    return {
      ...initVari,
      skip: 0,
      loading: false,
      md
    };
  },
  apollo: {
    notesConnection: {
      query: MY_NOTES,
      variables: initVari
    },
    notesStatistics: {
      query: MY_NOTES,
      variables: initVari
    }
  },
  computed: {
    variables() {
      return {
        ...initVari,
        after: this.after
      };
    },
    source() {
      const { notesConnection, notesStatistics } = this;
      if (!notesConnection)
        return {
          total: 0,
          hasNextPage: false,
          edges: [],
          startCursor: null,
          endCursor: null
        };
      const {
        edges,
        pageInfo: { hasNextPage, startCursor, endCursor }
      } = notesConnection;
      return {
        total: notesStatistics.aggregate.count,
        edges,
        hasNextPage,
        startCursor,
        endCursor
      };
    }
  },
  methods: {
    ...mapActions(["deleteNote"]),
    async del(item) {
      await this.deleteNote({ id: item.node.id });
    },
    handleResult({ data, error }) {
      if (error) {
        const { error: msg, statusCode } = error.gqlError.message;
        this.$message.error(msg).then(() => {
          if (statusCode > 400) {
            this.$router.push("/login");
          }
        });
        return;
      }
    },
    showMore() {
      if (this.loading) return;
      if (!this.source.hasNextPage) return;
      this.loading = true;
      this.after = this.source.endCursor;
      this.$nextTick(() => {
        this.$apollo.queries.notesConnection.fetchMore({
          variables: this.variables,
          updateQuery: (prevResult, { fetchMoreResult }) => {
            fetchMoreResult.notesConnection.edges.unshift(
              ...prevResult.notesConnection.edges
            );
            this.loading = false;
            return fetchMoreResult;
          }
        });
      });
    },
    mdCheck(idx, e) {
      const MdWithBase = this.md.base;
      const content = this.source.edges[idx].node.content;
      const $wrap = this.$refs.cardDiv[idx];
      const $check = e.target;
      const newData = calcData(MdWithBase, content, $wrap, $check);
      console.info("newData", newData);
    }
  },
  mounted() {
    console.info("thsi", this);
  }
};
</script>
<style lang="less" scoped>
.page-wrapper {
  overflow: auto;
}
.note-list {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.card-blocks {
  display: flex;
  flex-wrap: wrap;
  .card-wrapper {
    padding: 1em;
    flex: 0 0 23em;
  }
  .actions {
    flex: 1 0 100%;
    height: 3em;
  }
}
@media only screen and (max-width: 420px) {
  .card-blocks {
    .card-wrapper {
      flex: 1 0 100%;
    }
  }
}
</style>
