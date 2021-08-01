<template>
    <!-- 购物车列表 -->
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul
                    class="cart-list"
                    v-for="(shop, index) in cartInfoList"
                    :key="shop.id"
                >
                    <li class="cart-list-con1">
                        <input
                            type="checkbox"
                            name="chk_list"
                            :checked="shop.isChecked"
                            @click="changeCheck(shop.skuId, shop.isChecked)"
                        />
                    </li>
                    <li class="cart-list-con2">
                        <img :src="shop.imgUrl" />
                        <div class="item-msg">
                            {{ shop.skuName }}
                        </div>
                    </li>
                    <li class="cart-list-con3">
                        <div class="item-txt">语音升级款</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{ shop.skuPrice }}</span>
                    </li>
                    <li class="cart-list-con5">
                        <a
                            href="javascript:void(0)"
                            class="mins"
                            @click="changeCartNum(shop, -1, true)"
                            >-</a
                        >
                        <input
                            autocomplete="off"
                            type="text"
                            :value="shop.skuNum"
                            minnum="1"
                            class="itxt"
                            @change="
                                changeCartNum(
                                    shop,
                                    $event.target.value * 1,
                                    false
                                )
                            "
                        />
                        <a
                            href="javascript:void(0)"
                            class="plus"
                            @click="changeCartNum(shop, 1, true)"
                            >+</a
                        >
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{
                            shop.skuNum * shop.skuPrice
                        }}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a
                            href="javascript:;"
                            class="sindelet"
                            @click="deleteOne(shop.skuId)"
                            >删除</a
                        >
                        <br />
                        <a href="javascript:;">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input
                    class="chooseAll"
                    type="checkbox"
                    v-model="ischeckedAll"
                />
                <span>全选</span>
            </div>
            <div class="option">
                <a href="javascript:;" @click="deleteAll()">删除选中的商品</a>
                <a href="javascript:;">移到我的关注</a>
                <a href="javascript:;">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">
                    已选择 <span>{{ shopnumtotal }}</span
                    >件商品
                </div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{ shoppricetotal }}</i>
                </div>
                <div class="sumbtn">
                    <router-link to="/trade" class="sum-btn">结算</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Cart",
    mounted() {
        this.dispatch();
    },
    computed: {
        ...mapGetters(["cartInfo"]),
        cartInfoList() {
            let cartInfoList = [];
            let shopcartInfoList = [];
            let cartInfo = this.cartInfo || [];
            cartInfo.forEach((item) => {
                cartInfoList.push(item.cartInfoList);
            });
            let InfoList = cartInfoList || [];
            InfoList.forEach((item) => {
                let list = item || [];
                list.forEach((item) => {
                    shopcartInfoList.push(item);
                });
            });
            return shopcartInfoList;
        },
        shopnumtotal() {
            return this.cartInfoList.reduce((prev, item) => {
                if (item.isChecked) {
                    return (prev += item.skuNum);
                } else {
                    return prev;
                }
            }, 0);
        },
        shoppricetotal() {
            return this.cartInfoList.reduce((prev, item) => {
                if (item.isChecked) {
                    return (prev += item.skuNum * item.skuPrice);
                } else {
                    return prev;
                }
            }, 0);
        },
        ischeckedAll: {
            get() {
                return this.cartInfoList.every((item) => item.isChecked);
            },
            set(val) {
                this.$store.dispatch("getAllcheck", {
                    isCheckedAll: val ? 1 : 0,
                    cartInfoList: this.cartInfoList,
                });
                this.dispatch();
            },
        },
    },
    methods: {
        dispatch() {
            this.$store.dispatch("getCartList");
        },
        async deleteAll() {
            try {
                await this.$store.dispatch("deleteAllcheck", this.cartInfoList);
            } catch (error) {
                alert("删除选中商品失败" + error.message);
            }
            this.dispatch();
        },
        async changeCartNum(shop, type, flag) {
            let originNum = shop.skuNum;
            if (flag) {
                if (type + originNum < 1) {
                    type = 1 - originNum;
                }
            } else {
                if (type < 1) {
                    type = 1 - originNum;
                } else {
                    type = type - originNum;
                }
            }
            try {
                await this.$store.dispatch("addshop", {
                    skuId: shop.skuId,
                    skuNum: type,
                });
            } catch (error) {
                alert("修改商品数量失败" + error.message);
            }
            this.dispatch();
        },
        async changeCheck(skuId, isChecked) {
            try {
                await this.$store.dispatch("changeCheck", {
                    skuId: skuId,
                    isChecked: isChecked ? 0 : 1,
                });
            } catch (error) {
                alert("修改购物选中状态失败");
            }
            this.dispatch();
        },
        async deleteOne(skuId) {
            try {
                await this.$store.dispatch("deleteOne", skuId);
            } catch (error) {
                alert(error.message);
            }
            this.dispatch();
        },
    },
};
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;
    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }
    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;
            & > div {
                float: left;
            }
            .cart-th1 {
                width: 25%;
                input {
                    vertical-align: middle;
                }
                span {
                    vertical-align: middle;
                }
            }
            .cart-th2 {
                width: 25%;
            }
            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }
        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;
            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;
                & > li {
                    float: left;
                }
                .cart-list-con1 {
                    width: 15%;
                }
                .cart-list-con2 {
                    width: 35%;
                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }
                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }
                .cart-list-con3 {
                    width: 10%;
                    .item-txt {
                        text-align: center;
                    }
                }
                .cart-list-con4 {
                    width: 17%;
                }
                .cart-list-con5 {
                    width: 10%;
                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }
                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }
                .cart-list-con6 {
                    width: 13%;
                    .sum {
                        font-size: 16px;
                    }
                }
            }
        }
    }
    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;
        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;
            span {
                vertical-align: middle;
            }
            input {
                vertical-align: middle;
            }
        }
        .option {
            padding: 10px;
            overflow: hidden;
            float: left;
            a {
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }
        .money-box {
            float: right;
            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }
            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;
                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }
            .sumbtn {
                float: right;
                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>