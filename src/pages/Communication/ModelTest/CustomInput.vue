<template>
    <div style="background: #ccc; height: 50px">
        <h2>input包装组件</h2>
        <input
            type="text"
            :value="value"
            @input="$emit('input', $event.target.value)"
        />
        <!-- 第二步：把父组件传递过来的value属性，绑定给input标签的value -->
        <!-- 第三步：给input添加dom事件input，当输入框内容发生改变时，触发第四步，并给第四步传递输入框里面的值 -->
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: "CustomInput",
    props: ["value"],
};
</script>
