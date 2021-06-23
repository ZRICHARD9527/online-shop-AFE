<template>
    <div id="app">
        <!-- 任意元素中加 v-wechat-title 指令 建议将标题放在 route 对应meta对象的定义中 -->
        <div v-wechat-title="$route.meta.title"></div>
        <!--或者-->
        <router-view v-wechat-title="$route.meta.title"></router-view>
    </div>
</template>

<script>
    // export default {
    //     name: 'app',
    //     provide() {
    //         return {
    //             reload: this.reload
    //         }
    //     }, data() {
    //         return {
    //             isRouterAlive: true
    //         }
    //     }, methods: {
    //         reload() {
    //             this.isRouterAlive = false
    //             this.$nextTick(function () {
    //                 this.isRouterAlive = true;
    //             })
    //         }
    //     }
    //
    // }
</script>

<style>

</style>
