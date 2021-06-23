<template>
    <div class="block">
        <el-timeline v-model="orderInfo" v-for="order in orderInfo" :key="order">
            <el-timeline-item :timestamp="order.time" placement="top">
                <el-card>
                    <h4>用户id：{{order.u_id}}</h4>
                    <p>商品名:【{{order.pro.name}}】 购买数量: 【{{order.num}}】</p>
                    <p>地址:{{order.address}} </p>
                </el-card>
            </el-timeline-item>

        </el-timeline>
    </div>

</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                orderInfo: null
            }
        },
        created() {
            const _this = this
            axios.get('http://localhost:8183/allOrder')
                .then(function (resp) {

                    _this.orderInfo = resp.data.data
                    console.log(_this.orderInfo)
                })
        },
        methods: {}

    }
</script>

<style scoped>

</style>