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
                    <el-form-item label="商品编号：">
                        <el-input style="width: 203px" v-model="p_id" placeholder="商品编号"></el-input>
                    </el-form-item>
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="name" placeholder="商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="商品类别：">
                        <el-select v-model="cate" placeholder="请选择商品类别">
                            <el-option v-for="(item,index) in cates" :label="item" :value="item"></el-option>
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
                    prop="p_id"
                    label="商品id"
                    width="120"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="商品名"
                    width="120"
                    align="center">
            </el-table-column>

            <el-table-column
                    label="商品图片"
                    width="120"
                    align="center">
                　　
                <template slot-scope="scope">
                    <img v-if="scope.row.picpath[0]!=null" :src="'http://localhost:8183/'+scope.row.picpath[0]"
                         width="65" height="70"
                         class="head_pic"/>
                    <img v-else :src="logoImg" width="80" height="80" class="head_pic"/>
                    　　
                </template>
            </el-table-column>

            <el-table-column
                    prop="sn"
                    label="SN码"
                    width="120"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="c_id"
                    label="品类"
                    width="120"
                    align="center"
                    :formatter="cateFormat">
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="上架时间"
                    width="110"
                    align="center"
                    :formatter="dateFormat">
            </el-table-column>
            <el-table-column
                    prop="num"
                    label="库存"
                    width="120"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="sales"
                    label="销量"
                    width="120"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="售价"
                    width="120"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="desc"
                    label="商品描述"
                    width="150"
                    align="center"
                    :formatter="descFormat">
            </el-table-column>

            <!--fixed="right"-->
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="150"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" size="small">
                    </el-button>
                    <el-button @click="deletePro(scope.row)" type="danger" icon="el-icon-delete" size="small">
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
                content: null,
                logoImg: 'http://localhost:8183/img/logo.jpg',
                total: null,//商品总数
                cates: [],//商品种类
                p_id: null,
                name: null,
                cate: null,
                tableData: null
            }
        },
        created() {
            const _this = this
            //起始进入时直接获取第一页5个数据
            axios.post('http://localhost:8183/getProPage/', {"page": 1, "size": 5})
                .then(function (resp) {
                    console.log("商品分页请求标记");
                    console.log(resp)
                    _this.tableData = resp.data.data.pros;
                    _this.total = resp.data.data.totalElements;
                    _this.cates = resp.data.data.cates;

                    // //对图片url进行拼接 服务器地址+存储地址
                    //改为直接显示的时候拼接
                    // for (var i = 0; i < _this.tableData.length; i++) {
                    //     for (var j = 0; j < _this.tableData[i].picpath.length; j++) {
                    //         _this.tableData[i].picpath[j] = "http://localhost:8183/" + _this.tableData[i].picpath[j];
                    //     }
                    // }
                    console.log("商品数据标记")
                    console.log(_this.tableData)
                })
        },
        methods: {
            deletePro(row) {
                this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('http://localhost:8183/delPro', {"p_id": row.p_id})
                        .then(function (resp) {
                        })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    window.location.reload()
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
                    path: '/proInfo',
                    query: {
                        p_id: row.p_id,//商品id
                        // name: row.name,
                        // sn: row.sn,
                        // num: row.num,
                        // price: row.price,
                        // sales: row.sales,
                        // desc: row.desc,
                        // time: row.time,
                        // c_id: row.c_id,
                        // picpath: row.picpath
                    }
                })
                return null;
            },
            page(currentPage) {
                // alert(currentPage)
                const _this = this
                console.log("页面标记" + currentPage)
                //传送当前页面
                axios.post('http://localhost:8183/getProPage/', {"page": currentPage, "size": 5})
                    .then(function (resp) {
                        _this.tableData = resp.data.data.pros;
                        _this.total = resp.data.data.totalElements;
                    })
            },
            cateFormat(row, colum) {
                if (row.c_id == 1) {
                    return '手机'
                } else if (row.c_id == 2) {
                    return '电子配件'
                } else if (row.c_id == 3) {
                    return '书籍'
                } else {
                    return '未分类'
                }
            },
            dateFormat(row, colum) {
                let dateee = new Date(row.time).toJSON();
                return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            },
            descFormat(row, colum) {
                if (row.desc.length > 18) {
                    return row.desc.substr(0, 18) + "..."
                } else {
                    return row.desc
                }
            },
            search() {
                const _this = this
                console.log('搜索标记')
                console.log(_this.p_id + _this.name + _this.cate);
                axios.post('http://localhost:8183/findPro', {
                    "p_id": _this.p_id,
                    "name": _this.name,
                    "cate": _this.cate
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
                this.p_id = null;
                this.name = null;
                this.cate = null;
            }
        }

    }
</script>