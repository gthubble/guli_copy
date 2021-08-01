<template>
    <!--列表-->
    <div class="list-container">
        <div class="sortList clearfix">
            <div class="center">
                <!--banner轮播-->
                <!-- 由于这个页面的轮播图和floor页面的轮播图使用相同的类名，且这是一个单页面（所有的组件最终都会汇聚到一起）
                所以实例swiper对象时会导致其他轮播图也会生效，因此需要使用ref属性获得当前轮播图的dom节点 -->
                <!-- <div class="swiper-container" ref="mycontainer">
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            v-for="banner in bannerdata"
                            :key="banner.id"
                        >
                            // imgurl地址是绝对路径，图片已经放在了public里面了 
                            <img :src="banner.imgUrl" />
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>

                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div> -->
                <loopSlide :floor="bannerdata"></loopSlide>
            </div>
            <div class="right">
                <div class="news">
                    <h4>
                        <em class="fl">尚品汇快报</em>
                        <span class="fr tip">更多 ></span>
                    </h4>
                    <div class="clearix"></div>
                    <ul class="news-list unstyled">
                        <li>
                            <span class="bold">[特惠]</span>备战开学季
                            全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季
                            全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季
                            全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季
                            全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季
                            全民半价购数码
                        </li>
                    </ul>
                </div>
                <ul class="lifeservices">
                    <li class="life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">话费</span>
                    </li>
                    <li class="life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">机票</span>
                    </li>
                    <li class="life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">电影票</span>
                    </li>
                    <li class="life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">游戏</span>
                    </li>
                    <li class="life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">彩票</span>
                    </li>
                    <li class="life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">加油站</span>
                    </li>
                    <li class="life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">酒店</span>
                    </li>
                    <li class="life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">火车票</span>
                    </li>
                    <li class="life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">众筹</span>
                    </li>
                    <li class="life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">理财</span>
                    </li>
                    <li class="life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">礼品卡</span>
                    </li>
                    <li class="life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">白条</span>
                    </li>
                </ul>
                <div class="ads">
                    <img src="./images/ad1.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
// 引入swiper插件，轮播图
// import Swiper from "swiper";
export default {
    name: "ListContainer",
    // 发送mock请求
    mounted() {
        this.$store.dispatch("getbanner");
        // ************************************************************************
        // 由于是wiper实例必须放在所需页面（轮播图部分）加载完毕（严格要求结构形成之后）之后才能实例，所以这里轮播图没生效
        // 而轮播图之所以在挂载完毕之后还没生效是因为，轮播图数据需要根据响应回来的请求来动态生成轮播图
        // 而发送请求拿数据的this.$store.dispatch("getbanner");是一个异步代码，实例对象却是一个
        // 同步代码，所以会先执行同步代码实例对象那一部分代码，然后异步代码才会执行
        // ************************************************************************
        // new Swiper(".swiper-container", {
        //     // direction: 'vertical', // 垂直切换选项
        //     loop: true, // 循环模式选项

        //     // 如果需要分页器
        //     pagination: {
        //         el: ".swiper-pagination",
        //     },

        //     // 如果需要前进后退按钮
        //     navigation: {
        //         nextEl: ".swiper-button-next",
        //         prevEl: ".swiper-button-prev",
        //     },
        // });
        // ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
        // 解决方法一：把实例部分也变成异步代码
        // 但是这个方法还是不完美，因为这样一来轮播图，虽然出来了，但是轮播的效果以及分页器等都会延后，这受到网络和电脑影响太大
        // setTimeout(() => {
        //     new Swiper(this.$refs.mycontainer, {
        //         // direction: 'vertical', // 垂直切换选项
        //         loop: true, // 循环模式选项

        //         // 如果需要分页器
        //         pagination: {
        //             el: ".swiper-pagination",
        //         },

        //         // 如果需要前进后退按钮
        //         navigation: {
        //             nextEl: ".swiper-button-next",
        //             prevEl: ".swiper-button-prev",
        //         },
        //     });
        // }, 1);
    },
    // 方法三：使用监视和$nextTick
    // watch执行在vm创建时，此时还没有挂载，生命周期只进行到了created钩子，
    // watch: {
    //     bannerdata: {
    //         immediate: true,
    //         handler() {
    //             // ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
    //             // $nextTick(()=>{}),当最近的一次页面更新完成时，立即执行回调
    //             // 在这里之所以把nexTick(()=>{})放在监视里面，是因为当bannerdata数据发生变化时，说明轮播图即将发生变化，，而我的目的就是希望
    //             // 只监视轮播图，当轮播图结构形成时，调用nextTick，不管其他的结构怎么变化，都不会调用
    //             // 所以在这里调用nextTick()，这个时候nextTick才会开始一遍一遍的监视也页面的变化，当最近的一次页面发生变化时，调用回调函数
    //             // ？？？注意？？？，即便bannerdata发生了变化，也并不是说页面已经发生了变化，而是请求回来了，拿到了数据，
    //             // 还没有开始更新页面，所以这里使用nextTick（），
    //             // ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
    //             this.$nextTick(() => {
    //                 new Swiper(this.$refs.mycontainer, {
    //                     // direction: 'vertical', // 垂直切换选项
    //                     loop: true, // 循环模式选项

    //                     // 如果需要分页器
    //                     pagination: {
    //                         el: ".swiper-pagination",
    //                     },

    //                     // 如果需要前进后退按钮
    //                     navigation: {
    //                         nextEl: ".swiper-button-next",
    //                         prevEl: ".swiper-button-prev",
    //                     },
    //                 });
    //             });
    //         },
    //     },
    // },
    // 把数据从vuex拿到vue中
    computed: {
        ...mapState({
            // state是vuex里面的，由于模块也被分成了两个小模块，且数据被放在了小模块中，
            // 另外数据在state中的格式是state{hemo：{bannerlist，floorlist}，search：{}}，
            // 所以读取时出现以下代码
            bannerdata: (state) => state.home.bannerlist,
        }),
    },
};
</script>

<style lang="less" scoped>
.list-container {
    width: 1200px;
    margin: 0 auto;

    .sortList {
        height: 464px;
        padding-left: 210px;

        .center {
            box-sizing: border-box;
            width: 740px;
            height: 100%;
            padding: 5px;
            float: left;
        }

        .right {
            float: left;
            width: 250px;

            .news {
                border: 1px solid #e4e4e4;
                margin-top: 5px;

                h4 {
                    border-bottom: 1px solid #e4e4e4;
                    padding: 5px 10px;
                    margin: 5px 5px 0;
                    line-height: 22px;
                    overflow: hidden;
                    font-size: 14px;

                    .fl {
                        float: left;
                    }

                    .fr {
                        float: right;
                        font-size: 12px;
                        font-weight: 400;
                    }
                }

                .news-list {
                    padding: 5px 15px;
                    line-height: 26px;

                    .bold {
                        font-weight: 700;
                    }
                }
            }

            .lifeservices {
                border-right: 1px solid #e4e4e4;
                overflow: hidden;
                display: flex;
                flex-wrap: wrap;

                .life-item {
                    border-left: 1px solid #e4e4e4;
                    border-bottom: 1px solid #e4e4e4;
                    margin-right: -1px;
                    height: 64px;
                    text-align: center;
                    position: relative;
                    cursor: pointer;
                    width: 25%;

                    .list-item {
                        background-image: url(~@/assets/images/icons.png);
                        width: 61px;
                        height: 40px;
                        display: block;
                    }

                    .service-intro {
                        line-height: 22px;
                        width: 60px;
                        display: block;
                    }

                    &:nth-child(1) {
                        .list-item {
                            background-position: 0px -5px;
                        }
                    }

                    &:nth-child(2) {
                        .list-item {
                            background-position: -62px -5px;
                        }
                    }

                    &:nth-child(3) {
                        .list-item {
                            background-position: -126px -5px;
                        }
                    }

                    &:nth-child(4) {
                        .list-item {
                            background-position: -190px -5px;
                        }
                    }

                    &:nth-child(5) {
                        .list-item {
                            background-position: 0px -76px;
                        }
                    }

                    &:nth-child(6) {
                        .list-item {
                            background-position: -62px -76px;
                        }
                    }

                    &:nth-child(7) {
                        .list-item {
                            background-position: -126px -76px;
                        }
                    }

                    &:nth-child(8) {
                        .list-item {
                            background-position: -190px -76px;
                        }
                    }

                    &:nth-child(9) {
                        .list-item {
                            background-position: 0px -146px;
                        }
                    }

                    &:nth-child(10) {
                        .list-item {
                            background-position: -62px -146px;
                        }
                    }

                    &:nth-child(11) {
                        .list-item {
                            background-position: -126px -146px;
                        }
                    }

                    &:nth-child(12) {
                        .list-item {
                            background-position: -190px -146px;
                        }
                    }
                }
            }

            .ads {
                margin-top: 5px;

                img {
                    opacity: 0.8;
                    transition: all 400ms;

                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>