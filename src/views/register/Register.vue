<template>
  <div class="wraper">
    <div class="register">
      <img
        class="register-icon"
        src="http://www.dell-lee.com/imgs/vue3/超市.png"
      />
      <input type="tel" v-model="admin.number" placeholder="请输入手机号" />
      <input
        type="password"
        v-model="admin.password"
        placeholder="请输入密码"
      />
      <input
        type="password"
        v-model="admin.rePassword"
        placeholder="请确认密码"
      />
      <div class="register-btn" @click="handleRegister(admin)">注册</div>
      <div class="register-link" @click="handleLoginClick">已有账号去登陆</div>
    </div>
    <Toast v-if="isShowToast" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import Toast, { useToastEffect } from "../../components/Toast.vue";

const useRegisterEffec = (showToast) => {
  const router = useRouter();
  let admin = reactive({
    number: "",
    password: "",
    rePassword: "",
  });
  const handleRegister = (admin) => {
    if (!/^\d+$/.test(admin.number)) {
      showToast("账号格式不正确，请输入正确的账号格式！");
    } else if (admin.number.length < 6) {
      showToast("账号长度过短，请输入正确的账号格式！");
    } else if (admin.password.length < 6) {
      showToast("密码长度过短，不安全，请输入正确的密码格式！");
    } else if (admin.password !== admin.rePassword) {
      showToast("两次密码不一致，请重新输入！");
    } else {
      const adminString = JSON.stringify(admin);
      localStorage.setItem("admin", adminString);
      router.push({ name: "Login" });
    }
  };
  const handleLoginClick = () => {
    router.push({ name: "Login" });
  };
  return { admin, handleRegister, handleLoginClick };
};
export default {
  name: "Register",
  components: {
    Toast,
  },
  setup() {
    const { isShowToast, toastMessage, showToast } = useToastEffect();
    const { admin, handleRegister, handleLoginClick } =
      useRegisterEffec(showToast);

    return {
      isShowToast,
      toastMessage,
      showToast,
      admin,
      handleRegister,
      handleLoginClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriablles.scss";
.register {
  position: absolute;
  width: 100vw;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &-icon {
    display: block;
    width: 66rem;
    height: 66rem;
    margin: 0 auto 24rem auto;
  }
  &-link {
    font-size: 14rem;
    width: 98rem;
    padding-right: 12rem;
    margin: 0 auto;
    color: rgba($color: #000000, $alpha: 0.5);
  }
  input {
    display: block;
    width: 279rem;
    margin: 16rem auto;
    padding-left: 16rem;
    font-size: 16rem;
    line-height: 48rem;
    color: rgba($color: #000000, $alpha: 0.5);
    background-color: #f9f9f9;
    border-radius: 6rem;
    border: 1rem solid rgba($color: #000000, $alpha: 0.1);
    outline-color: $btn-bgColor;
  }
  &-btn {
    display: block;
    width: 295rem;
    margin: 32rem auto 16rem auto;
    font-size: 16rem;
    line-height: 48rem;
    text-align: center;
    color: $bgColor;
    background: $btn-bgColor;
    box-shadow: 0 4rem 8rem 0 rgba(0, 145, 255, 0.32);
    border: none;
    border-radius: 4rem;
    border-radius: 4rem;
    outline-color: $btn-bgColor;
  }
}
</style>