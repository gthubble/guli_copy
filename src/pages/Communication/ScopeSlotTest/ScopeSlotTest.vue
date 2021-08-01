<template>
    <div>
        <!-- <Child> -->
        <!-- 在组件标签内部写上template标签，就是插槽，而在组件内部需要写slot标签来接收这个template-->
        <!-- 不写名字的是默认插槽，写名字的是具名插槽 -->
        <!-- 如果组件内部写了槽，父组件却没有传递template，那么将会显示槽里面写的默认的结构 -->
        <!-- <template>
                <div>热巴依然爱我</div>
            </template>
            <template slot="star">
                <div>热巴现在爱我</div>
            </template>
        </Child>
        <Child>
            <template>
                <div>娜扎也很爱我</div>
            </template>
        </Child> -->

        <!-- ??????????????????????????作用域插槽，，，重要?????????????????????????????????????? -->
        <!-- 1、数据在父组件中
             2、插槽的结构在父组件中搭建
             3、传给子组件的数据需要遍历并回传给父组件 -->

        <!-- 第一步、先将数据传递给子组件 -->
        <List :todos="todos">
            <!-- 第三步、使用slot-scope="obj"接收子组件回传的数据，这个数据是一个对象 -->
            <template slot-scope="obj">
                <!-- 第四步、使用接收的数据写结构 -->
                <h2 :style="{ color: obj.todo.isComplete ? 'green' : 'red' }">
                    {{ obj.todo.text }}
                </h2>
            </template>
        </List>
    </div>
</template>

<script type="text/ecmascript-6">
import List from "./List";
import Child from "@/pages/Communication/ScopeSlotTest/Child";
export default {
    name: "ScopeSlotTest",
    data() {
        return {
            todos: [
                { id: 1, text: "AAA", isComplete: false },
                { id: 2, text: "BBB", isComplete: true },
                { id: 3, text: "CCC", isComplete: false },
                { id: 4, text: "DDD", isComplete: false },
            ],
        };
    },

    components: {
        List,
        Child,
    },
};
</script>
