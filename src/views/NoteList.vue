<template>
  <div class="note-list">
    <div class="card-blocks">
      <div class="card-wrapper" v-for="item in source.edges">
        <a-card :title="item.node.title">{{item.node.content}}</a-card>
      </div>
    </div>
    <div class="actions">
      <button v-if="source.hasNextPage" @click="showMore">Show more</button>
    </div>
  </div>
</template>

<script>
import MY_NOTES from "../graphql/my-notes.gql";

const initVari = {
  first: 5,
  skip: 0
};

export default {
  name: "NoteList",
  data() {
    return {
      first: 5,
      skip: 0
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
        first: this.first,
        skip: this.skip
      };
    },
    source() {
      const { notesConnection, notesStatistics } = this;
      if (!notesConnection)
        return {
          total: 0,
          hasNextPage: false,
          edges: []
        };
      return {
        total: notesStatistics.aggregate.count,
        hasNextPage: notesConnection.pageInfo.hasNextPage,
        edges: notesConnection.edges
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
    async loadData() {
      const { data } = await this.$apollo.query({
        query: MY_NOTES,
        variables: this.variables
      });
      if (!data || !data.notesConnection) {
        this.$message.error("No Data!");
        return;
      }
      const {
        notesConnection: { aggregate, edges, pageInfo }
      } = data;
      this.noteList.push(...edges);
      this.showMoreEnabled = pageInfo.hasNextPage;
    },
    showMore() {
      this.skip += this.first;
      this.$apollo.queries.notesConnection.fetchMore({
        variables: this.variables,
        updateQuery: (prevResult, { fetchMoreResult }) => {
          fetchMoreResult.notesConnection.edges.unshift(
            ...prevResult.notesConnection.edges
          );
          return fetchMoreResult;
        }
      });
    }
  },
  mounted() {
    // this.loadData();
  }
};
</script>
<style lang="less" scoped>
.card-blocks {
  display: flex;
  flex-wrap: wrap;
  .card-wrapper {
    padding: 1em;
    flex: 0 0 23em;
  }
}
</style>
