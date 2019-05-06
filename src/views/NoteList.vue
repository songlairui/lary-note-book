<template>
  <div class="note-list">
    <ApolloQuery
      :query="require('../graphql/my-notes.gql')"
      :variables="{ first, skip }"
      @result="handleResult"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <a-list :grid="{ gutter: 16, column: 4 }" :dataSource="data.notes">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-card :title="item.title">{{item.content}}</a-card>
            </a-list-item>
          </a-list>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
    <a-pagination v-model="pageNumber"/>
  </div>
</template>

<script>
export default {
  name: "NoteList",
  data() {
    return {
      noteList: [],
      first: 5,
      skip: 0,
      pageTotal: 0
    };
  },
  computed: {
    pageNumber: {
      get() {
        return Math.floor(this.skip / this.first) + 1;
      },
      set(val) {
        this.skip = this.first * (val - 1);
      }
    }
  },
  methods: {
    handleResult(resultObj) {
      const {
        data: {
          notesConnection: {
            aggregate: { count }
          }
        }
      } = resultObj;
      this.pageTotal = count;
    }
  }
};
</script>

<style>
</style>
