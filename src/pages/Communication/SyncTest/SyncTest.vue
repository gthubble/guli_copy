<template>
    <div>
        小明的爸爸现在有{{ D }}元

        <h2>不使用sync修改符</h2>
        <!-- 父子间组件通信 -->
        <!-- 传给子组件属性D，以及自定义事件update:D，必须写成$event -->
        <Child :D="D" @update:D="D = $event"></Child>

        <h2>使用sync修改符</h2>
        <!-- 简写方式 -->
        <!-- 简写时，将自动的给子组件绑定update：D事件，update必须一样，D可以随便写，但是子组件中触发
        update事件时，必须写成update:D, -->
        <Child :D.sync="D"></Child>

        <h2>使用v-model修改符</h2>
        <Child2 :value="D" @input="D = $event"></Child2>

        <!-- 总结：两者作用相同，用法类似，可以没有限制随便使用，但，sync修改符，一般用于非表单元素，
        v-model一般用于表单元素 -->

        <hr />
    </div>
</template>

<script type="text/ecmascript-6">
import Child from "./Child.vue";
import Child2 from "./Child2.vue";
export default {
    name: "SyncTest",
    data() {
        return {
            D: 1000,
        };
    },
    components: {
        Child,
        Child2,
    },
};
</script>
