<template>
    <div>
        <TypeNav></TypeNav>
        <!--list-content-->
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <li class="with-x" v-if="searchParams.categoryName">
                            {{ searchParams.categoryName
                            }}<i @click="removeCateName">×</i>
                        </li>
                        <li class="with-x" v-if="searchParams.keyword">
                            {{ searchParams.keyword
                            }}<i @click="removeKeyword">×</i>
                        </li>
                        <li class="with-x" v-if="searchParams.trademark">
                            {{ searchParams.trademark.split(":")[1]
                            }}<i @click="removeTrademark">×</i>
                        </li>
                        <li
                            class="with-x"
                            v-for="(prop, index) in searchParams.props"
                            :key="prop"
                        >
                            {{ prop.split(":")[1]
                            }}<i @click="removeProps(index)">×</i>
                        </li>
                    </ul>
                </div>
                <SearchSelect
                    @selfDefineTM="searchTrademark"
                    @selfDefineAV="searchAttrValue"
                ></SearchSelect>

                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li
                                    :class="{
                                        active: sortflag === '1',
                                    }"
                                    @click="sortWoods('1')"
                                >
                                    <a href="javascript:;"
                                        >综合
                                        <i
                                            v-if="sortflag === '1'"
                                            class="iconfont"
                                            :class="{
                                                iconup: sortType === 'desc',
                                                icondown: sortType === 'asc',
                                            }"
                                        ></i>
                                    </a>
                                </li>
                                <li
                                    :class="{
                                        active: sortflag === '2',
                                    }"
                                    @click="sortWoods('2')"
                                >
                                    <a href="javascript:;"
                                        >价格
                                        <i
                                            v-if="sortflag === '2'"
                                            class="iconfont"
                                            :class="{
                                                iconup: sortType === 'desc',
                                                icondown: sortType === 'asc',
                                            }"
                                        ></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li
                                class="yui3-u-1-5"
                                v-for="goods in goodsList"
                                :key="goods.id"
                            >
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <router-link
                                            :to="`/detail/` + goods.id"
                                        >
                                            <img v-lazy="goods.defaultImg" />
                                        </router-link>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥ </em>
                                            <i>{{ goods.price }}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <router-link
                                            :to="`/detail/` + goods.id"
                                            >{{ goods.title }}</router-link
                                        >
                                    </div>
                                    <div class="commit">
                                        <i class="command"
                                            >已有<span>2000</span>人评价</i
                                        >
                                    </div>
                                    <div class="operate">
                                        <a
                                            href="success-cart.html"
                                            target="_blank"
                                            class="sui-btn btn-bordered btn-danger"
                                            >加入购物车</a
                                        >
                                        <a
                                            href="javascript:void(0);"
                                            class="sui-btn btn-bordered"
                                            >收藏</a
                                        >
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <Pagination
                        :currentpageNo="searchParams.pageNo"
                        :total="pageinfo.total"
                        :totalPages="pageinfo.totalPages"
                        :continue="5"
                        @changePageNo="changePageNo"
                    ></Pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { delete } from "vue/types/umd";
import { mapGetters } from "vuex";
import SearchSelect from "./SearchSelect";
export default {
    name: "Search",
    data() {
        return {
            searchParams: {
                category1Id: "",
                category2Id: "",
                category3Id: "",
                categoryName: "",
                keyword: "",
                props: [],
                trademark: "",

                order: "1:desc", //排序规则，排序是后台排序的，我们搜索的时候得给后台一个默认的排序规则
                pageNo: 1,
                pageSize: 3,
            },
        };
    },
    components: {
        SearchSelect,
    },
    beforeMount() {
        // 当用户第一次点击三级导航栏进入搜索页时，根据用户点击信息，更改初始searchparams，发送不同请求
        this.reWriteVal();
    },
    mounted() {
        // 拿初始化数据部署页面
        this.dispatch();
    },
    methods: {
        dispatch() {
            this.$store.dispatch("receiveSearch", this.searchParams);
        },
        // 根据用户点击，重新写入发送信息携带的参数
        reWriteVal() {
            let {
                category1Id,
                category2Id,
                category3Id,
                categoryName,
            } = this.$route.query;
            let { keyword } = this.$route.params;
            let searchParams = {
                ...this.searchParams,
                category1Id,
                category2Id,
                category3Id,
                categoryName,
                keyword,
            };
            this.searchParams = searchParams;
            // Object.keys(obj),方法用于将对象的键名拿出来组成一个新的数组，主要用于和foreach配合遍历，提升效率
            // for循环，for...in forEach for..of,都是用于循环遍历
            // 其中效率最高的时forEach，最慢的是for。。。in，因为for in遍历对象时，需要把对象原型的属性也遍历一遍
            // for of 效率第二，不过需要有迭代器
            Object.keys(searchParams).forEach((item) => {
                if (searchParams[item] === "") {
                    delete searchParams[item];
                }
            });
            this.dispatch();
        },
        // 删除搜索标签时，重新发送请求
        removeCateName() {
            this.searchParams.category1Id = undefined;
            this.searchParams.category2Id = undefined;
            this.searchParams.category3Id = undefined;
            this.searchParams.categoryName = undefined;
            this.searchParams.pageNo = 1;
            // let location = {
            //     name: "search",
            // };
            // location.params = { keyword: this.$route.params.keyword };
            // let query = {};

            // location.query = query;
            // this.$router.push(location);
            this.$router.replace({
                name: "search",
                params: this.$route.params,
            });
        },
        removeKeyword() {
            this.searchParams.pageNo = 1;
            this.searchParams.keyword = undefined;
            // let location = {
            //     name: "search",
            // };
            // location.query = this.$route.query;
            // this.$router.push(location);
            this.$router.replace({
                name: "search",
                query: this.$route.query,
            });
            this.$bus.$emit("clearKeyword");
        },
        removeTrademark() {
            this.searchParams.pageNo = 1;
            this.searchParams.trademark = undefined;

            // this.$router.push({
            //     name: "search",
            //     params: this.$route.params,
            //     query: this.$route.query,
            // });
            this.reWriteVal();
        },
        removeProps(index) {
            // 返回一个是数组，其中是删除的元素
            this.searchParams.props.splice(index, 1);
            this.searchParams.pageNo = 1;
            // console.log(this.searchParams.props);
            this.reWriteVal();
        },
        searchTrademark(trademark) {
            this.searchParams.pageNo = 1;
            this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
            this.reWriteVal();
        },
        searchAttrValue(attrValue, attrs) {
            this.searchParams.pageNo = 1;
            let prop = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
            if (this.searchParams.props.some((item) => item === prop)) {
                return;
            }

            this.searchParams.props.push(prop);
            this.reWriteVal();
        },
        sortWoods(sortflag) {
            let sortType = "";
            if (sortflag === this.sortflag) {
                sortType = this.sortType === "asc" ? "desc" : "asc";
            } else {
                sortType = "asc";
            }
            let newOrder = `${sortflag}:${sortType}`;
            this.searchParams.order = newOrder;
            this.reWriteVal();
        },
        changePageNo(page) {
            this.searchParams.pageNo = page;
            this.reWriteVal();
        },
    },
    computed: {
        // 之前使用mapstate时，由于...mapState({key:value})中的value结构复杂，不像key就一个名字，所以必须写成
        // state=>state.home.value的形式，
        // 而这次使用...mapGetters([])之前，就已经在vuex当中简化的数据结构，key：value相同，所以可以简写成数组的形式
        ...mapGetters(["goodsList"]),
        ...mapGetters(["pageinfo"]),
        sortflag() {
            return this.searchParams.order.split(":")[0];
        },
        sortType() {
            return this.searchParams.order.split(":")[1];
        },
    },
    watch: {
        $route: {
            handler() {
                this.reWriteVal();
            },
        },
    },
};
</script>

<style lang="less" scoped>
.main {
    margin: 10px 0;
    .py-container {
        width: 1200px;
        margin: 0 auto;
        .bread {
            margin-bottom: 5px;
            overflow: hidden;
            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;
                li {
                    display: inline-block;
                    line-height: 18px;
                    a {
                        color: #666;
                        text-decoration: none;
                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }
            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;
                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;
                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }
                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }
        .details {
            margin-bottom: 5px;
            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;
                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;
                        li {
                            float: left;
                            line-height: 18px;
                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }
                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }
            .goods-list {
                margin: 20px 0;
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;
                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;
                                a {
                                    color: #666;
                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }
                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;
                                strong {
                                    font-weight: 700;
                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }
                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }
                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;
                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }
                            .operate {
                                padding: 12px 15px;
                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }
                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;
                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }
                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;
                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .page {
                width: 733px;
                height: 66px;
                overflow: hidden;
                float: right;
                .sui-pagination {
                    margin: 18px 0;
                    ul {
                        margin-left: 0;
                        margin-bottom: 0;
                        vertical-align: middle;
                        width: 490px;
                        float: left;
                        li {
                            line-height: 18px;
                            display: inline-block;
                            a {
                                position: relative;
                                float: left;
                                line-height: 18px;
                                text-decoration: none;
                                background-color: #fff;
                                border: 1px solid #e0e9ee;
                                margin-left: -1px;
                                font-size: 14px;
                                padding: 9px 18px;
                                color: #333;
                            }
                            &.active {
                                a {
                                    background-color: #fff;
                                    color: #e1251b;
                                    border-color: #fff;
                                    cursor: default;
                                }
                            }
                            &.prev {
                                a {
                                    background-color: #fafafa;
                                }
                            }
                            &.disabled {
                                a {
                                    color: #999;
                                    cursor: default;
                                }
                            }
                            &.dotted {
                                span {
                                    margin-left: -1px;
                                    position: relative;
                                    float: left;
                                    line-height: 18px;
                                    text-decoration: none;
                                    background-color: #fff;
                                    font-size: 14px;
                                    border: 0;
                                    padding: 9px 18px;
                                    color: #333;
                                }
                            }
                            &.next {
                                a {
                                    background-color: #fafafa;
                                }
                            }
                        }
                    }
                    div {
                        color: #333;
                        font-size: 14px;
                        float: right;
                        width: 241px;
                    }
                }
            }
        }
        .hot-sale {
            margin-bottom: 5px;
            border: 1px solid #ddd;
            .title {
                font-weight: 700;
                font-size: 14px;
                line-height: 21px;
                border-bottom: 1px solid #ddd;
                background: #f1f1f1;
                color: #333;
                margin: 0;
                padding: 5px 0 5px 15px;
            }
            .hot-list {
                padding: 15px;
                ul {
                    display: flex;
                    li {
                        width: 25%;
                        height: 100%;
                        .list-wrap {
                            .p-img,
                            .price,
                            .attr,
                            .commit {
                                padding-left: 15px;
                            }
                            .p-img {
                                img {
                                    max-width: 100%;
                                    vertical-align: middle;
                                    border: 0;
                                }
                            }
                            .attr {
                                width: 85%;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                            }
                            .price {
                                font-size: 18px;
                                color: #c81623;
                                strong {
                                    font-weight: 700;
                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }
                            .commit {
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>