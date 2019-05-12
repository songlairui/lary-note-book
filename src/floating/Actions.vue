<template>
  <div class="float-actions">
    <div class="btns">
      <a-modal title="Create Note" v-model="visiable.modal">
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
      <a-icon type="dash" :spin="listening.note"/>
      <a-divider type="vertical"/>
      <a-button v-if="isLogin" type="primary" shape="circle" icon="plus" @click="showModal(true)"></a-button>
      <a-button
        v-else-if="$route.name !== 'login'"
        type="primary"
        shape="circle"
        icon="login"
        @click="$router.push({name:'login'})"
      ></a-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CREATE_MY_NOTE from "../graphql/create-my-note.gql";
import MY_NOTES from "../graphql/my-notes.gql";
import { PAGE_SIZE, initVari } from "../constant";

export default {
  name: "Actions",
  data() {
    return {
      theme: "",
      title: "",
      content: "",
      visiable: {
        modal: false
      }
    };
  },
  computed: {
    ...mapState(["listening"]),
    formValid() {
      return !!this.content;
    }
  },
  methods: {
    async createNote() {
      if (!this.formValid) {
        this.$message.error("form not Valid!");
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
          // update via subscribe
        }
      });
      this.content = "";
      this.title = "";
      this.showModal(false);
    },
    showModal(bool) {
      if (bool && !this.checkLogin()) {
        this.$message.warning("登陆过期");
        return;
      }
      this.visiable.modal = bool;
    }
  }
};
</script>

<style>
</style>
