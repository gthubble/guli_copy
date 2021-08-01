<template>
    <ul>
        <!-- 第二步、遍历数据，并将遍历的数据回传给父组件 -->
        <li v-for="(todo, index) in todos" :key="index">
            <!-- 作用域插槽特有传递数据方式，实现子传父，不是props通信 -->
            <slot :todo="todo"></slot>
        </li>
    </ul>
</template>

<script>
export default {
    name: "List",
    props: {
        todos: Array,
    },
};
</script>