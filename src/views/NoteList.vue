<template>
  <div class="page-wrapper">
    <div
      class="note-list"
      v-infinite-scroll="showMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div class="card-blocks">
        <div class="card-wrapper" v-for="item in source.edges">
          <a-card :title="item.node.title">
            <div class="rendered" v-html="md.render(item.node.content)"></div>
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
import MarkdownIt from "markdown-it";
import infiniteScroll from "vue-infinite-scroll";
import MY_NOTES from "../graphql/my-notes.gql";
import { PAGE_SIZE, initVari } from "../constant";

export default {
  name: "NoteList",
  directives: { infiniteScroll },
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
    }
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
