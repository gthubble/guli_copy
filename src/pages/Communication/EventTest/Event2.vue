<template>
    <div style="background: #ccc; height: 80px">
        <h2>Event2组件</h2>
        <button @click="$emit('click', $event)">自定义事件</button>
    </div>
</template>
