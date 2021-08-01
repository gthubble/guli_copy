<template>
    <div>
        <h1>EventTest组件</h1>
        <!-- html标签身上添加原生dom事件 -->
        <!-- 原生dom事件默认传递$event，即便在调用时没传$event对象,由于这是vue组件，所以event对象不能像js中一样，必须要写$
        但是如果不写$event，同时也不能写括号，写了括号就表示没有参数 -->
        <button @click="test($event)">html标签身上添加原生dom事件</button>
        <!-- 在组件身上添加dom事件 -->
        <!-- 如果非要在组件身上添加原生dom事件，那么必须加上.native，否则就是自定义事件。 -->
        <!-- ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
        另一点，当时用这种方法的时候，原生dom事件实际上添加到了组件内部的根元素身上，而由于默认传递的event对象，
        当使用event时，就变成了事件委派 ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？-->
        <Event1 @click.native="test1"></Event1>
        <!-- 在组件身上添加自定义事件 -->
        <!-- 不传参数时，就是undefined，传递时，传的是什么就是什么，不存在默认传递$event，但是浏览器还是会在事件触发时
        打包好$event -->
        <Event2 @click="test2"></Event2>

        <!-- 总结：
                html标签只能添加原生dom事件，不存在添加自定义事件
                组件标签即可以添加原生dom事件也可以添加自定义事件，添加原生dom事件必须加.native，否则就是自定义事件 -->
    </div>
</template>

<script type="text/ecmascript-6">
import Event1 from "./Event1.vue";
import Event2 from "./Event2.vue";

export default {
    name: "EventTest",

    components: {
        Event1,
        Event2,
    },

    methods: {
        test(event) {
            console.log(event.target.innerHTML);
        },
        test1(event) {
            console.log(event.target.innerHTML);
        },
        test2(event) {
            console.log(event);
        },
    },
};
</script>
