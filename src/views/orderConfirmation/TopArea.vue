<template>
  <div class="bg">
    <div class="top">
      <div class="top-head">
        <span class="top-head-back iconfont" @click="$router.back(-1)"
          >&#xe601;</span
        >
        结算订单
      </div>
      <div class="top-receive">
        <h3 class="top-receive-title">收获地址</h3>
        <div class="top-receive-address">福州理工学院A10#212</div>
        <div class="top-receive-contact">
          <span>苏格拉底（先生） </span>
          <span>17850393511</span>
        </div>
        <router-link :to="{ path: '/MyAddressList' }">
          <span class="top-receive-icon iconfont">&#xe646;</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "topArea",
  setup() {
    const store = useStore();
    const addressList = store.state.addressList;
    const defaultAddressInfo = addressList.find(
      (item) => item.defaultAddress == "true"
    );
    return { addressList, defaultAddressInfo };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriablles.scss";
.bg {
  margin-bottom: 53rem;
  height: 156.5rem;
  background-image: linear-gradient(
    0deg,
    rgba(0, 145, 255, 0) 4%,
    $btn-bgColor 50%
  );
}
.top {
  position: relative;
  &-head {
    text-align: center;
    line-height: 68.5rem;
    color: $bgColor;
    &-back {
      position: absolute;
      left: 18rem;
      font-size: 22rem;
    }
  }
  &-receive {
    position: absolute;
    left: 18rem;
    right: 18rem;
    background: $bgColor;
    border-radius: 4rem;
    padding: 16rem;
    color: $content-fontColor;
    box-shadow: 0 2rem 4rem rgba($color: #000000, $alpha: 0.1);
    &-title {
      font-size: 16rem;
      margin-bottom: 14rem;
    }
    &-address {
      font-size: 14rem;
      margin-bottom: 6rem;
    }
    &-contact {
      font-size: 12rem;
      color: $medium-fontColor;
    }
    &-icon {
      position: absolute;
      top: 50%;
      right: 18rem;
      transform: translateY(-50%);
      font-size: 18rem;
    }
  }
}
</style>