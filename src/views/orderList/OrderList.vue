<template>
  <div class="wrapper">
    <div class="order">
      <div class="title">我的订单</div>
      <div class="order-list" v-if="totalNumber != 0">
        <div
          class="order-list-item"
          v-for="(item, index) in list"
          :key="index + item.shopName"
        >
          <div class="order-item-title">
            {{ isCanceled ? "当前订单已取消" : "当前订单配送中..." }}
          </div>
          <div class="order-item-message">以下订单还未下单，请尽快下单</div>
          <hr />
          <div class="order-title">
            {{ item.shopName }}
            <span class="order-title-status"> 未下单 </span>
          </div>
          <div class="order-content">
            <template
              v-for="(innerItem, innerIndex) in item.products"
              :key="innerIndex + innerItem.product.name"
            >
              <img
                class="order-content-img"
                :src="innerItem.product.img"
                v-if="innerIndex <= 4"
              />
            </template>
            <div class="order-content-info">
              <div class="order-content-price">
                <!-- &yen;{{ item.totalPrice.toFixed(1) }} -->
                &yen;{{ totalPrice.toFixed(1) }}
              </div>
              <!-- <div class="order-content-count">共{{ item.totalNumber }}件</div> -->
              <div class="order-content-count">共{{ totalNumber }}件</div>
            </div>
          </div>
        </div>
      </div>
      <div class="order-nothing" v-else>
        <div class="order-nothing-icon iconfont">&#xe631;</div>
        <div class="order-nothing-text">您还没有相关订单~</div>
      </div>
    </div>
    <FooterTapBar :currentIndex="2"></FooterTapBar>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { get } from "../../utils/request";
import FooterTapBar from "../../components/FooterTapBar.vue";
import { useStore } from "vuex";
// 对订单页面商品订单的数量和总价进行统计
const useMyOrderListEffect = () => {
  const store = useStore();
  const cartList = store.state.cartList;
  let totalNumber = 0;
  let totalPrice = 0;
  for (let key in cartList) {
    for (let keys in cartList[key].productList) {
      totalNumber = totalNumber + cartList[key].productList[keys].count;
      totalPrice =
        totalPrice +
        cartList[key].productList[keys].count *
          cartList[key].productList[keys].price;
    }
  }
  return { cartList, totalNumber, totalPrice };
};
// 对订单页面
const useOrderListEffect = () => {
  const data = reactive({ list: [] });
  const getNearShopList = async () => {
    const result = await get("/api/order");
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data; //订单列表
      orderList.forEach((order) => {
        const products = order.products || []; //单个订单中的商品
        let totalNumber = 0;
        let totalPrice = 0;
        //遍历计算总价和总数
        products.forEach((productItem) => {
          totalNumber += productItem?.orderSales || 0;
          totalPrice +=
            productItem?.product?.price * productItem?.orderSales || 0;
        });
        order.totalNumber = totalNumber;
        order.totalPrice = totalPrice;
      });
      data.list = result.data;
    }
  };
  getNearShopList();
  const { list } = toRefs(data);
  return { list };
};

export default {
  name: "OrderList",
  components: { FooterTapBar },
  setup() {
    const { cartList, totalNumber, totalPrice } = useMyOrderListEffect();
    const { list } = useOrderListEffect();
    const isCanceled = JSON.parse(localStorage.getItem("isCanceled"));
    return { cartList, totalNumber, totalPrice, list, isCanceled };
    // return { list };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriablles.scss";
.wrapper {
  padding: 0;
  margin: 0;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 49rem;
  right: 0;
  background: $search-bgColor;
}
.order {
  .title {
    text-align: center;
    font-size: 16rem;
    line-height: 22rem;
    padding: 11rem 0;
    border: 1rem solid $search-fontColor;
    color: $content-fontColor;
    background-color: $bgColor;
  }
  &-list {
    position: absolute;
    top: 60rem;
    left: 0;
    right: 0;
    bottom: 49rem;

    &-item {
      box-shadow: 0 1rem 1rem 1rem rgba($color: #000000, $alpha: 0.2);
      margin: 16rem 18rem;
      padding: 16rem;
      border-radius: 16rem;
      background: $bgColor;
    }
    &-title {
      margin: 0 10rem;
      color: $medium-fontColor;
    }
    &-message {
      margin: 0 10rem;
      color: $content-notice-fontColor;
    }
  }
  &-title {
    display: flex;
    justify-content: space-between;
    font-size: 16rem;
    color: $content-fontColor;
    &-status {
      font-size: 14rem;
      color: $light-fontColor;
    }
  }
  &-content {
    position: relative;
    display: flex;
    margin-top: 16rem;
    &-img {
      margin-right: 12rem;
      width: 40rem;
      height: 40rem;
    }
    &-info {
      position: absolute;
      right: 0;
      bottom: 0;
      text-align: right;
    }
    &-price {
      margin-bottom: 4rem;
      font-size: 14rem;
      color: $hightlight-fontColor;
    }
    &-count {
      font-size: 12rem;
      color: $content-fontColor;
    }
  }
  &-nothing {
    &-icon {
      margin-top: 30rem;
      text-align: center;
      font-size: 100rem;
      color: $light-fontColor;
    }
    &-text {
      margin: 50rem 0 0 0;
      text-align: center;
      font-size: 18rem;
      color: $hightlight-fontColor;
    }
  }
}
</style>