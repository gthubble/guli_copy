<template>
    <div>
        <!-- 买卖 -->
        <h3 class="title">填写并核对订单信息</h3>
        <div class="content">
            <h5 class="receive">收件人信息</h5>
            <div
                class="address clearFix"
                v-for="(address, index) in useradd"
                :key="address.id"
                @click="changeisDefault(address, useradd)"
            >
                <span
                    class="username"
                    :class="{ selected: address.isDefault === '1' }"
                    >{{ address.consignee }}</span
                >
                <p>
                    <span class="s1">{{ address.fullAddress }}</span>
                    <span class="s2">{{ address.phoneNum }}</span>
                    <span class="s3" v-if="address.isDefault === '1'"
                        >默认地址</span
                    >
                </p>
            </div>
            <div class="line"></div>
            <h5 class="pay">支付方式</h5>
            <div class="address clearFix">
                <span class="username selected">在线支付</span>
                <span class="username" style="margin-left: 5px">货到付款</span>
            </div>
            <div class="line"></div>
            <h5 class="pay">送货清单</h5>
            <div class="way">
                <h5>配送方式</h5>
                <div class="info clearFix">
                    <span class="s1">天天快递</span>
                    <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
                </div>
            </div>
            <div class="detail">
                <h5>商品清单</h5>
                <ul
                    class="list clearFix"
                    v-for="orderinfo in detailArrayList"
                    :key="orderinfo.skuId"
                >
                    <li>
                        <img :src="orderinfo.imgUrl" alt="" />
                    </li>
                    <li>
                        <p>
                            {{ orderinfo.skuName }}
                        </p>
                        <h4>7天无理由退货</h4>
                    </li>
                    <li>
                        <h3>￥{{ orderinfo.orderPrice }}</h3>
                    </li>
                    <li>X{{ orderinfo.skuNum }}</li>
                    <li>有货</li>
                </ul>
            </div>
            <div class="bbs">
                <h5>买家留言：</h5>
                <textarea
                    placeholder="建议留言前先与商家沟通确认"
                    class="remarks-cont"
                    v-model="message"
                ></textarea>
            </div>
            <div class="line"></div>
            <div class="bill">
                <h5>发票信息：</h5>
                <div>普通发票（电子） 个人 明细</div>
                <h5>使用优惠/抵用</h5>
            </div>
        </div>
        <div class="money clearFix">
            <ul>
                <li>
                    <b
                        ><i>{{ detailArray.totalNum }}</i
                        >件商品，总商品金额</b
                    >
                    <span>¥{{ detailArray.totalAmount }}</span>
                </li>
                <li>
                    <b>返现：</b>
                    <span>0.00</span>
                </li>
                <li>
                    <b>运费：</b>
                    <span>0.00</span>
                </li>
            </ul>
        </div>
        <div class="trade">
            <div class="price">
                应付金额:<span>¥{{ detailArray.totalAmount }}</span>
            </div>
            <div class="receiveInfo">
                寄送至:
                <span>{{ defaultAdd.fullAddress }}</span>
                收货人：<span>{{ defaultAdd.consignee }}</span>
                <span>{{ defaultAdd.phoneNum }}</span>
            </div>
        </div>
        <div class="sub clearFix">
            <!-- <router-link to="/pay" class="subBtn">提交订单</router-link> -->
            <a href="javascript:;" class="subBtn" @click="submit(defaultAdd)"
                >提交订单</a
            >
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
    name: "Trade",
    data() {
        return {
            message: "",
        };
    },
    mounted() {
        this.$store.dispatch("getUserAdd");
        this.$store.dispatch("getOrderInfo");
    },
    computed: {
        ...mapState({
            useradd: (state) => {
                return state.user.useradd;
            },
            detailArray: (state) => {
                return state.trade.detailArray;
            },
        }),
        ...mapGetters(["detailArrayList"]),
        defaultAdd() {
            // 假报错，//this.useradd.find is not a function"//
            let usera = this.useradd || [];
            return usera.find((item) => item.isDefault === "1") || {};
        },
    },
    methods: {
        changeisDefault(address, useradd) {
            useradd.forEach((item) => {
                item.isDefault = "0";
            });
            address.isDefault = "1";
        },
        // 原生js调用接口请求函数，拿数据
        async submit(defaultAdd) {
            let tradeNo = this.detailArray.tradeNo;
            let tradeInfo = {
                consignee: defaultAdd.consignee,
                consigneeTel: defaultAdd.phoneNum,
                deliveryAddress: defaultAdd.fullAddress,
                paymentWay: "ONLINE",
                orderComment: this.message,
                orderDetailList: [
                    {
                        sourceId: 11,
                        hasStock: null,
                        orderId: null,
                        splitCouponAmount: null,
                        refundStatusString: "",
                        splitTotalAmount: null,
                        refundStatus: "",
                        skuName:
                            "Apple iPhone 12 (A2404) 64GB 白色 支持移动联通电信5G 双卡双待手机",
                        imgUrl:
                            "http://47.93.148.192:8080/group1/M00/00/02/rBHu8l-rgfWASR1YAADsOUYB-2g312.jpg",
                        splitActivityAmount: null,
                        createTime: null,
                        sourceType: "QUERY",
                        couponInfoList: null,
                        orderPrice: 8197,
                        id: null,
                        skuId: 11,
                        skuNum: 2,
                        activityRule: null,
                    },
                ],
            };
            const result = await this.$API.reqTradeInfo(tradeNo, tradeInfo);
            if (result.code === 200) {
                alert("交易订单生成中，准备跳转支付页面");
                this.$router.push("/pay?orderNum=" + result.data);
            } else {
                alert("订单生成失败");
            }
        },
    },
};
</script>

<style lang="less" scoped>
.title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
}
.content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;
    .receive,
    .pay {
        line-height: 36px;
        margin: 18px 0;
    }
    .address {
        padding-left: 20px;
        margin-bottom: 15px;
        .username {
            float: left;
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border: 1px solid #ddd;
            position: relative;
        }
        .username::after {
            content: "";
            display: none;
            width: 13px;
            height: 13px;
            position: absolute;
            right: 0;
            bottom: 0;
            background: url(./images/choosed.png) no-repeat;
        }
        .username.selected {
            border-color: #e1251b;
        }
        .username.selected::after {
            display: block;
        }
        p {
            width: 610px;
            float: left;
            line-height: 30px;
            margin-left: 10px;
            padding-left: 5px;
            cursor: pointer;
            .s1 {
                float: left;
            }
            .s2 {
                float: left;
                margin: 0 5px;
            }
            .s3 {
                float: left;
                width: 56px;
                height: 24px;
                line-height: 24px;
                margin-left: 10px;
                background-color: #878787;
                color: #fff;
                margin-top: 3px;
                text-align: center;
            }
        }
        p:hover {
            background-color: #ddd;
        }
    }
    .line {
        height: 1px;
        background-color: #ddd;
    }
    .way {
        width: 1080px;
        height: 110px;
        background: #f4f4f4;
        padding: 15px;
        margin: 0 auto;
        h5 {
            line-height: 50px;
        }
        .info {
            margin-top: 20px;
            .s1 {
                float: left;
                border: 1px solid #ddd;
                width: 120px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                margin-right: 10px;
            }
            p {
                line-height: 30px;
            }
        }
    }
    .detail {
        width: 1080px;

        background: #feedef;
        padding: 15px;
        margin: 2px auto 0;
        h5 {
            line-height: 50px;
        }
        .list {
            display: flex;
            justify-content: space-between;
            li {
                line-height: 30px;
                p {
                    margin-bottom: 20px;
                }
                h4 {
                    color: #c81623;
                    font-weight: 400;
                }
                h3 {
                    color: #e12228;
                }
                img {
                    width: 10%;
                }
            }
        }
    }
    .bbs {
        margin-bottom: 15px;
        h5 {
            line-height: 50px;
        }
        textarea {
            width: 100%;
            border-color: #e4e2e2;
            line-height: 1.8;
            outline: none;
            resize: none;
        }
    }
    .bill {
        h5 {
            line-height: 50px;
        }
        div {
            padding-left: 15px;
        }
    }
}
.money {
    width: 1200px;
    margin: 20px auto;
    ul {
        width: 220px;
        float: right;
        li {
            line-height: 30px;
            display: flex;
            justify-content: space-between;
            i {
                color: red;
            }
        }
    }
}
.trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    div {
        line-height: 30px;
    }
    .price span {
        color: #e12228;
        font-weight: 700;
        font-size: 14px;
    }
    .receiveInfo {
        color: #999;
    }
}
.sub {
    width: 1200px;
    margin: 0 auto 10px;
    .subBtn {
        float: right;
        width: 164px;
        height: 56px;
        font: 700 18px "微软雅黑";
        line-height: 56px;
        text-align: center;
        color: #fff;
        background-color: #e1251b;
    }
}
</style>