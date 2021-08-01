<template>
    <div>
        <h2>深入v-model</h2>
        <input type="text" v-model="msg" />
        <span>这是{{ msg }}</span>
        <br />
        <!-- v-model的本质：v-bind 和input事件结合就是v-model，input事件：当输入框内的内容改变时调用 -->
        <input type="text" :value="msg" @input="msg = $event.target.value" />

        <!-- 第一步: :value="msg" 实现组件间通信，传递给子组件value属性-->
        <!-- 第四步： @input="msg = $event"给子组件绑定自定义事件 并通过子组件传递的值改变msg-->
        <CustomInput :value="msg" @input="msg = $event"></CustomInput>
        <!-- ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
            组件标签使用v-model时相当于上一行代码的简写，v-model会自动传递给子组件一个value属性，和自定义事件@input="msg = $event"
        注意：上面的value和input在v-model中是写死的，想要实现和上面一样的功能，必须在子组件中使用props接收value属性，并且使用$emit
        触发绑定的input自定义事件
        ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？ -->
        <CustomInput v-model="msg"></CustomInput>
        <!-- 插件标签也是组件标签 -->
        <el-input v-model="msg"></el-input>

        <!-- 总结：v-model的本质 就是v-bind 和input事件结合-->
        <!-- v-model不仅可以实现单个组件内数据的双向绑定，而且可以实现父子之间的数据同步 -->
    </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from "./CustomInput.vue";
export default {
    name: "ModelTest",
    components: {
        CustomInput,
    },
    data() {
        return {
            msg: "test",
        };
    },
};
</script>
