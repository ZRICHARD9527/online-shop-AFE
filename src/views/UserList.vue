<template>
    <div>

        <el-card class="filter-container" shadow="hover">
            <div>
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
                <el-button
                        style="float: right"
                        type="primary"
                        size="small"
                        @click="search">
                    查询结果
                </el-button>
                <el-button
                        style="float: right;margin-right: 15px"
                        size="small"
                        @click="resetForm">
                    重置
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" size="small" label-width="140px">
                    <el-form-item label="用户id：">
                        <el-input style="width: 203px" v-model="u_id" placeholder="用户id"></el-input>
                    </el-form-item>
                    <el-form-item label="用户姓名：">
                        <el-input style="width: 203px" v-model="name" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="用户性别：">
                        <el-select v-model="sex" placeholder="请选择性别">
                            <el-option label="男" :value=1>男</el-option>
                            <el-option label="女" :value=0>女</el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
            </div>
        </el-card>


        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="u_id"
                    label="用户id"
                    width="120"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="用户名"
                    width="120"
                    align="center">
            </el-table-column>

            <el-table-column
                    label="用户头像"
                    width="120"
                    align="center">
                　　
                <template slot-scope="scope">
                    <img v-if="scope.row.picpath!=null" :src="'http://localhost:8183/'+scope.row.picpath"
                         width="65" height="70"
                         class="head_pic"/>
                    <img v-else :src="logoImg" width="80" height="80" class="head_pic"/>
                    　　
                </template>
            </el-table-column>

            <el-table-column
                    prop="sex"
                    label="性别"
                    width="120"
                    align="center"
                    :formatter="sexFormat">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="登录邮箱"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="regTime"
                    label="注册时间"
                    width="120"
                    align="center">
            </el-table-column>

            <el-table-column
                    label="激活"
                    width="120"
                    align="center"
                    readonly>
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.activeFlag"></el-checkbox>
                </template>
            </el-table-column>

            <!--            <el-table-column-->
            <!--                    prop="activeFlag"-->
            <!--                    label="是否激活"-->
            <!--                    type="selection"-->
            <!--                    width="55">-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--                    prop="activeFlag"-->
            <!--                    label="是否激活"-->
            <!--                    width="120"-->
            <!--                    align="center">-->
            <!--            </el-table-column>-->


            <!--fixed="right"-->
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="150"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary" icon="el-icon-view" size="small">
                    </el-button>
                    <el-button @click="deleteUser(scope.row)" type="danger" icon="el-icon-delete" size="small">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页展示-->
        <el-pagination
                align="center"
                background
                layout="prev, pager, next"
                page-size=5
                :total="total"
                @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                u_id: null,
                sex: null,
                name: null,
                total: null,
                tableData: null
            }
        },
        created() {
            const _this = this
            //起始进入时直接获取第一页5个数据
            axios.post('http://localhost:8183/userPage/', {"page": 1, "size": 5})
                .then(function (resp) {
                    console.log(resp)
                    _this.tableData = resp.data.content;
                    _this.total = resp.data.totalElements;
                    _this.reload()
                })
        },
        methods: {
            deleteUser(row) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('http://localhost:8183/delUser', {"u_id": row.u_id})
                        .then(function (resp) {
                            window.location.reload()
                        })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            edit(row) {
                //跳转到编辑页面
                this.$router.push({
                    path: '/userInfo',
                    query: {
                        id: row.u_id,//用户id
                    }
                })
                return null;
            },
            page(currentPage) {
                // alert(currentPage)
                const _this = this
                //传送当前页面
                axios.post('http://localhost:8183/userPage/', {"page": currentPage, "size": 5})
                    .then(function (resp) {
                        _this.tableData = resp.data.content;
                        _this.total = resp.data.totalElements;
                        // console.log(resp)
                    })
            },
            sexFormat(row, colum) {
                if (row.sex == 1) {
                    return '男'
                } else {
                    return '女'
                }
            },
            search() {
                const _this = this
                console.log('搜索标记')
                console.log(_this.u_id + _this.name + _this.sex);
                axios.post('http://localhost:8183/findUser', {
                    "u_id": _this.u_id,
                    "name": _this.name,
                    "sex": _this.sex
                })
                    .then(function (resp) {
                        console.log('搜索标记')
                        _this.tableData = resp.data.data
                        console.log(_this.tableData)
                        //去除数据库中空数据
                        for (let i = 0; i < _this.tableData.length; i++) {
                            if (_this.tableData[i] == null) {
                                delete _this.tableData[i];
                            }
                        }
                        console.log(_this.tableData)
                    })
            },
            resetForm() {
                this.u_id = null;
                this.name = null;
                this.sex = null;
            }
        }

    }
</script>