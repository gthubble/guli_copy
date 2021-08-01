<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="$store.state.user.userInfo">
                        <a href="javascript:;">{{
                            $store.state.user.userInfo.nickName
                        }}</a>
                        <a href="javascript:;" class="register" @click="LogOut"
                            >退出登录</a
                        >
                    </p>
                    <p v-else>
                        <span>请</span>
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register">免费注册</router-link>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/order">我的订单</router-link>
                    <router-link to="/cart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" title="尚品汇" to="/home">
                    <img src="./images/logo.png" alt="" />
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input
                        type="text"
                        id="autocomplete"
                        class="input-error input-xxlarge"
                        v-model="keyword"
                    />
                    <button
                        class="sui-btn btn-xlarge btn-danger"
                        type="button"
                        @click="sousuo"
                    >
                        搜索
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            // 双向数据绑定keyword
            keyword: "",
        };
    },
    methods: {
        // 编程式路由传参
        sousuo() {
            let location = {
                name: "search",
                params: {
                    // 判断keyword是否有值，如果没有，就给一个undefined，而不是提交空串
                    keyword: this.keyword || undefined,
                },
            };
            // 合并参数 判断是否在此之前已经传递了query参数
            if (this.$route.query) {
                location.query = this.$route.query;
            }
            // 判断进入search页时，是否处于home页，如果是就有浏览记录，使用push方法
            // 如果不是home页，就不增加浏览记录，使用replace方法
            if (this.$route.path === "/home") {
                this.$router.push(location);
            } else {
                this.$router.replace(location);
            }
        },
        clearKeyword() {
            this.keyword = "";
        },
        async LogOut() {
            try {
                await this.$store.dispatch("getLogOut");
                this.$router.push("/");
            } catch (error) {
                alert("退出登陆失败");
            }
        },
    },
    mounted() {
        this.$bus.$on("clearKeyword", this.clearKeyword);
    },
};
</script>

<style lang="less" scoped>
.header {
    & > .top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    & + a {
                        border-left: 1px solid #b3aeae;
                    }
                }
            }
        }
    }

    & > .bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>