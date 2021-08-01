<template>
    <div class="pagination">
        <button
            :disabled="currentpageNo === 1"
            @click="$emit('changePageNo', currentpageNo - 1)"
        >
            上一页
        </button>
        <button
            v-if="startEnd.start !== 1 && startEnd.end !== 1"
            @click="$emit('changePageNo', 1)"
        >
            1
        </button>
        <button v-if="startEnd.start > 2">...</button>
        <button
            v-for="(page, index) in showPage"
            :key="index"
            :class="{ active: page === currentpageNo }"
            @click="$emit('changePageNo', page)"
        >
            {{ page }}
        </button>
        <button v-if="startEnd.end < totalPages - 1">...</button>
        <button
            v-if="startEnd.end !== totalPages"
            @click="$emit('changePageNo', totalPages)"
        >
            {{ totalPages }}
        </button>
        <button
            :disabled="currentpageNo === startEnd.end"
            @click="$emit('changePageNo', currentpageNo + 1)"
        >
            下一页
        </button>
        <button style="margin-left: 30px">共{{ total }}条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    data() {
        return {
            arr: [1, 2, 3, 4, 5],
        };
    },
    props: {
        // 当前页
        currentpageNo: Number,
        // 总数据条数
        total: {
            type: Number,
            default: 0,
        },
        // 总页数
        totalPages: {
            type: Number,
            default: 1,
        },
        // 连续数
        continue: Number,
    },
    computed: {
        startEnd() {
            // 正常情况下的start，end
            let start = this.currentpageNo - Math.floor(this.continue / 2);
            let end = this.currentpageNo + Math.floor(this.continue / 2);

            // 非正常情况下的start，end
            if (start < 1) {
                start = 1;
                end = this.continue;
            }
            if (end > this.totalPages) {
                start = this.totalPages - this.continue + 1;
                end = this.totalPages;
            }
            return { start, end };
        },
        showPage() {
            let arr = [];
            for (let i = 1; i <= this.startEnd.end; i++) {
                if (i >= this.startEnd.start) {
                    arr.push(i);
                }
            }
            return arr;
        },
    },
};
</script>

<style lang="less" scoped>
.pagination {
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
