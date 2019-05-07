<template>
  <div class="float-actions">
    <div class="btns">
      <a-modal title="Create Note" v-model="showModal">
        <a-row>
          <a-col :span="24">
            <a-input placeholder="Title" v-model="title"/>
          </a-col>
        </a-row>
        <a-row>
          <a-textarea placeholder="write content" v-model="content" :rows="4"/>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-radio-group name="radioGroup" :defaultValue="1" v-model="theme">
              <a-radio value="1">A</a-radio>
              <a-radio value="2">B</a-radio>
              <a-radio value="3">C</a-radio>
              <a-radio value="4">D</a-radio>
            </a-radio-group>
          </a-col>
        </a-row>
        <a-row>
          <a-button type="primary" @click="createNote">Add</a-button>
        </a-row>
      </a-modal>
      <a-button type="primary" shape="circle" icon="plus" @click="showModal=!showModal"></a-button>
    </div>
  </div>
</template>

<script>
import CREATE_MY_NOTE from "../graphql/create-my-note.gql";
import MY_NOTES from "../graphql/my-notes.gql";

export default {
  name: "Actions",
  data() {
    return {
      theme: "",
      title: "",
      content: "",
      showModal: false
    };
  },
  computed: {
    formValid() {
      return !!this.content;
    }
  },
  methods: {
    async createNote() {
      if (!this.formValid) {
        return;
      }
      const res = await this.$apollo.mutate({
        mutation: CREATE_MY_NOTE,
        variables: {
          data: {
            title: this.title,
            theme: this.theme,
            content: this.content
          }
        },
        update: (store, { data: { createNoteAuto } }) => {
          const variables = {
            first: 5,
            skip: 0
          };
          const data = store.readQuery({
            query: MY_NOTES,
            variables
          });
          console.info("this", data, createNoteAuto);
          if (!data || !data.notesConnection) {
            return;
          }
          data.notesConnection.edges.push({
            cursor: createNoteAuto.id,
            node: createNoteAuto,
            __typename: `${createNoteAuto.__typename}Edge`
          });
          data.notesStatistics.aggregate.count += 1;
          store.writeQuery({
            query: MY_NOTES,
            variables,
            data
          });
        }
      });
      console.info("res", res);
      this.content = "";
      this.title = "";
      this.showModal = false;
    },
    noteCreated(resultObj) {
      console.info("resultObj", resultObj, this);
      this.content = "";
      this.title = "";
    },
    handleErr(errObj) {
      this.$message.error(errObj);
    }
  }
};
</script>

<style>
</style>
