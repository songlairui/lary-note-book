<template>
  <div class="login">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item :validate-status="emailError() ? 'error' : ''" :help="emailError() || ''">
        <a-input
          v-decorator="[
          'email',
          {rules: [{ required: true, message: 'Please input your email!' }]}
        ]"
          placeholder="Email"
        >
          <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.3)"/>
        </a-input>
      </a-form-item>
      <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
        <a-input
          v-decorator="[
          'pwd',
          {rules: [{ required: true, message: 'Please input your Password!' }]}
        ]"
          type="pwd"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.3)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="hasErrors(form.getFieldsError())"
        >Log in</a-button>
      </a-form-item>
    </a-form>
    <div class="flex">
      <div class="a">0</div>
      <div class="b">{{ progress }} %</div>
      <div class="c" @click="checkExpired">{{ identity.expiresIn }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Form, Input } from "ant-design-vue";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this),
      email: "",
      pwd: ""
    };
  },
  components: {
    AForm: Form,
    AInput: Input,
    AFormItem: Form.Item
  },
  computed: {
    ...mapState(["identity"]),
    formValid() {
      return this.email && this.pwd;
    },
    progress() {
      const { expiresIn, stamp } = this.identity;
      const snapStamp = +new Date();
      if (!expiresIn) return "-";
      return (
        Math.round(Math.min(snapStamp - stamp, expiresIn * 1000) / expiresIn) /
        10
      );
    }
  },
  methods: {
    ...mapActions(["signIn", "clearSign"]),
    async mutate(payload) {
      try {
        const data = await this.signIn(payload);
      } catch (error) {
        this.handleLoginFail(error);
      }
    },
    handleLoginFail(errObj) {
      if (!errObj.graphQLErrors) {
        this.$message.error(`${errObj}`);
        return;
      }
      const statusCode = errObj.graphQLErrors[0].message.statusCode;
      if (statusCode === 403) {
        this.clearSign();
      }
      this.$message.error(
        errObj.graphQLErrors.map(err => err.message.error).join()
      );
    }, // Only show error after a field is touched.
    emailError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("email") && getFieldError("email");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("pwd") && getFieldError("pwd");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.mutate(values);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 2em;
  .flex {
    width: 320px;
    > div {
      flex: 1;
    }
  }
}
</style>

