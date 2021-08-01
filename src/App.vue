<template>
    <div>
        <!-- <el-button type="primary"></el-button> -->
        <Header></Header>
        <router-view></router-view>
        <Footer v-show="!$route.meta.isHidden"></Footer>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
    name: "App",
    components: {
        Header,
        Footer,
    },
    // 将初始化页面所需的数据的请求放在App中发，而不写在其他组件，优化进入其他组件时多次请求数据
    mounted() {
        this.$store.dispatch("getcategorylist");
        window.addEventListener("beforeunload", (e) =>
            this.beforeunloadHandler(e)
        );
    },
    methods: {
        beforeunloadHandler(e) {
            // e = e || window.event;
            // if (e) {
            // 使用下面这行代码，谷歌浏览器将会有提示信息
            //     e.returnValue = "false";
            // }
            sessionStorage.setItem("REFRESH_VALUE", 1);
            // 没有返回值就不会提在刷新时提示弹框
            // return false;
        },
    },
    destroyed() {
        window.removeEventListener("beforeunload", (e) =>
            this.beforeunloadHandler(e)
        );
    },
};
</script>

<style>
</style>