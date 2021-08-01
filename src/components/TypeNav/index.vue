<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveNav" @mouseenter="isShow = true">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="isShow">
                        <div class="all-sort-list2" @click="toSearch($event)">
                            <!-- 由于页面中sort的高度不够放下17个标签，所以使用slice（startindex，endindex）方法
                                截取需要遍历的数组，控制遍历次数来是页面更合理 -->
                            <div
                                class="item"
                                v-for="(data1, index) in category.slice(0, 15)"
                                :key="data1.categoryId"
                                :class="{ currentItem: currentIndex === index }"
                                @mouseenter="onmouseenter(index)"
                            >
                                <h3>
                                    <!-- <router-link
                                    :to="{
                                        name: 'search',
                                        query: {
                                 s           category1Id: data1.categoryId,
                                            categoryName: data1.categoryName,
                                        },
                                    }"
                                >
                                    {{ data1.categoryName }}</router-link
                                > -->
                                    <!-- <a
                                    href="javascript:;"
                                    @click="
                                        $router.push({
                                            name: 'search',
                                            query: {
                                                category1Id: data1.categoryId,
                                                categoryName:
                                                    data1.categoryName,
                                            },
                                        })
                                    "
                                    >{{ data1.categoryName }}</a
                                > -->
                                    <a
                                        href="javascript:;"
                                        :data-category1Id="data1.categoryId"
                                        :data-categoryName="data1.categoryName"
                                        >{{ data1.categoryName }}</a
                                    >
                                </h3>
                                <div class="item-list clearfix">
                                    <div class="subitem">
                                        <dl
                                            class="fore"
                                            v-for="data2 in data1.categoryChild"
                                            :key="data2.categoryId"
                                        >
                                            <dt>
                                                <!-- ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
                                            当使用声明式导航时，由于router-link组件标签是组件对象（vc），
                                            且这是三层的for循环就会创建大量的组件对象，导致电脑卡顿，所以使用编程式导航，
                                            另外routerview，以及注册组件时的标签，全部都是组件对象，大量创建时，将会卡顿占用内存
                                            ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？ -->
                                                <!-- <router-link
                                                :to="{
                                                    name: 'search',
                                                    query: {
                                                        category2Id:
                                                            data2.categoryId,
                                                        categoryName:
                                                            data2.categoryName,
                                                    },
                                                }"
                                                >{{
                                                    data2.categoryName
                                                }}</router-link
                                            > -->
                                                <!-- ********************************************************* -->
                                                <!-- 虽然编程式导航明显比声明式导航效率高了，但是还是不够，因为在###a标签中### 
                                            还是有很多的函数，因为每一个函数都占用一份内存，所以再次换一种方法：事件委托-->
                                                <!-- @click="$router.push..."，实际上在只写了一行代码所以可以写在标签中 -->
                                                <!-- ********************************************************* -->
                                                <!-- <a
                                                href="javascript:;"
                                                @click="
                                                    $router.push({
                                                        name: 'search',
                                                        query: {
                                                            category2Id:
                                                                data2.categoryId,
                                                            categoryName:
                                                                data2.categoryName,
                                                        },
                                                    })
                                                "
                                                >{{ data2.categoryName }}</a
                                            > -->
                                                <a
                                                    href="javascript:;"
                                                    :data-category2Id="
                                                        data2.categoryId
                                                    "
                                                    :data-categoryName="
                                                        data2.categoryName
                                                    "
                                                    >{{ data2.categoryName }}</a
                                                >
                                            </dt>
                                            <dd>
                                                <em
                                                    v-for="data3 in data2.categoryChild"
                                                    :key="data3.categoryId"
                                                >
                                                    <!-- <router-link
                                                    :to="{
                                                        name: 'search',
                                                        query: {
                                                            category3Id:
                                                                data3.categoryId,
                                                            categoryName:
                                                                data3.categoryName,
                                                        },
                                                    }"
                                                    >{{
                                                        data3.categoryName
                                                    }}</router-link
                                                > -->
                                                    <!-- <a
                                                    href="javascript:;"
                                                    @click="
                                                        $router.push({
                                                            name: 'search',
                                                            query: {
                                                                category3Id:
                                                                    data3.categoryId,
                                                                categoryName:
                                                                    data3.categoryName,
                                                            },
                                                        })
                                                    "
                                                    >{{ data3.categoryName }}</a
                                                > -->
                                                    <a
                                                        href="javascript:;"
                                                        :data-category3Id="
                                                            data3.categoryId
                                                        "
                                                        :data-categoryName="
                                                            data3.categoryName
                                                        "
                                                        >{{
                                                            data3.categoryName
                                                        }}</a
                                                    >
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
export default {
    name: "TypeNav",
    data() {
        return {
            currentIndex: -1,
            isShow: true,
        };
    },
    mounted() {
        // 当进入的不是home组件和主页时，隐藏TypeNav
        if (this.$route.path !== "/home" && this.$route.path !== "/") {
            this.isShow = false;
        }
    },
    computed: {
        // 将category从vuex拿到vue当中
        ...mapState({
            category: (state) => state.home.category,
        }),
    },
    methods: {
        // 由于throttle是一个节流函数，不能onmouseenter写成函数形式
        // 节流：将大量的相同行为，减少次数
        // 防抖：将大量的相同行为，变成一次，且是最后一次
        onmouseenter: _.throttle(
            function (index) {
                this.currentIndex = index;
                // console.log(this.$route);
            },
            30,
            { trailing: false } //只设置trailing为false时，表示在时间间隔结束之前的任意时间执行
            // {trailing:true}:trailing表示是否在间隔时间之后执行，默认为true
            // {leading:false}:leading表示是否在间隔时间之前执行，默认为false
        ),
        // 点击TypeNav导航栏发送带参请求
        // *********************************************************************************
        // event，event是在事件触发时，系统（浏览器内核）都会将触发事件相关的信息封装成一个对象，当需要使用时
        // 把这个对象传递给函数即可，在原生js中，这个事件对象，必须放在第一个参数的位置，通常习惯命名为event
        // 而在vue中，顺序没有要求，但是传递参数时要用$event
        // *********************************************************************************
        toSearch(event) {
            // event.target就是点击的标签
            let nodedata = event.target;
            // console.log(event);
            // 先将location定义成一个有键值对的对象
            let location = { name: "search" };
            // 被设置了data-xxxx的标签将会拥有dataset属性，而dataset属性中存放了定义属性时赋予的值
            const data = nodedata.dataset;
            // 定义时category1id, category2id, category3id,是大写，但是在标签中却是小写，所以解构时也是小写
            let { category1id, category2id, category3id, categoryname } = data;
            // 判断点击的是否是a标签，如果不是将不会有categoryname属性
            if (categoryname) {
                const query = { categoryName: categoryname };
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else {
                    query.category3Id = category3id;
                }
                location.query = query;
                // 合并参数，判断是否在此之前已经传递了params参数
                if (this.$route.params) {
                    location.params = this.$route.params;
                }
                // 判断进入search页时，是否处于home页，如果是就有浏览记录，使用push方法
                // 如果不是home页，就不增加浏览记录，使用replace方法
                if (this.$route.path === "/home") {
                    this.$router.push(location);
                } else {
                    this.$router.replace(location);
                }
            }
        },
        leaveNav() {
            // 离开一级导航栏时
            this.currentIndex = -1;
            // 判断离开时，是否在home页中，如果不是，就隐藏整个Nav
            if (this.$route.path !== "/home" && this.$route.path !== "/") {
                this.isShow = false;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            &.sort-enter {
                height: 0;
                opacity: 0;
            }
            &.sort-enter-to {
                height: 461px;
                opacity: 1;
            }
            &.sort-enter-active {
                transition: all 0.5s;
            }

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                            text-decoration: none;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &.currentItem {
                        background-color: rgb(241, 237, 237);
                        .item-list {
                            display: block;
                        }
                    }
                }
            }
        }
    }
}
</style>