<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"
                 class="demo-ruleForm" :inline="true">

            <el-form-item label="商品Id:">
                <el-input v-model="ruleForm.p_id" readonly=""></el-input>
            </el-form-item>

            <el-form-item label="上架时间:">
                <template>
                    <div class="block">
                        <el-date-picker
                                v-model="ruleForm.time"
                                type="date"
                                placeholder="选择日期"
                                readonly>
                        </el-date-picker>
                    </div>
                </template>
            </el-form-item>

            <el-form-item label="商品销量:">
                <el-input v-model="ruleForm.sales" readonly=""></el-input>
            </el-form-item>

            <el-form-item label="商品名称:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="SN码:" prop="sn">
                <el-input v-model="ruleForm.sn"></el-input>
            </el-form-item>
            <el-form-item label="商品库存:" prop="num">
                <el-input v-model="ruleForm.num"></el-input>
            </el-form-item>
            <el-form-item label="商品价格:" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="类别:" prop="c_id">
                <el-select v-model="ruleForm.c_id" placeholder="请选择商品类别" :formatter="cateFormat">
                    <el-option label="手机" value="1"></el-option>
                    <el-option label="电子配件" value="2"></el-option>
                    <el-option label="书籍" value="3"></el-option>
                    <el-option label="暂不分类" value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="商品描述:" prop="desc">
                <el-input type="textarea" autosize v-model="ruleForm.desc"></el-input>
            </el-form-item>


        </el-form>

        <!--图片展示-->
        <div class="demo-image" style="text-align: center">
            <div>商品相册</div>
            <div v-for="pic in ruleForm.picpath" :key="pic" STYLE="display: inline">
                <el-image
                        style="width: 100px;height: 110px"
                        :src="'http://localhost:8183/'+pic"
                        fit="fill"
                        @click="delPro(pic)"></el-image>
            </div>
        </div>

        <!--图片上传-->
        <el-upload
                class="upload-demo"
                action="http://localhost:8183/addPic/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="picpath"
                list-type="picture"
                :data="{p_id:ruleForm.p_id}"
                name="img">
            <el-button size="small" type="primary">选择图片</el-button>
        </el-upload>

        <el-form style="text-align: center">
            <el-button type="primary" @click="submitForm('ruleForm')">上传</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form>

    </div>

</template>
<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                ruleForm: {
                    p_id: 0,
                    name: '',
                    sn: '',
                    num: 0,
                    price: 0,
                    sales: 0,
                    desc: '',
                    time: '',
                    c_id: 0,
                    picpath: []
                },
                rules: {
                    p_id: [
                        {required: true, message: '不可修改', trigger: 'focus'},
                    ],
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                    ],
                    sn: [
                        {required: true, message: '请输入商品SN码', trigger: 'blur'},
                    ],
                    num: [
                        {required: true, message: '请输入商品库存', trigger: 'blur'},
                    ],
                    price: [
                        {required: true, message: '请输入商品价格', trigger: 'blur'},
                    ],
                    desc: [
                        {required: true, message: '请填写商品简介', trigger: 'blur'},
                        {min: 3, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur'}
                    ],
                    c_id: [
                        {required: true, message: '请填写商品类别', trigger: 'blur'}
                    ]

                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        axios.post('http://localhost:8183/updatePro', this.ruleForm)
                            .then(function (resp) {
                                console.log(resp)
                                if (true == resp.data.success) {
                                    _this.$notify({
                                        title: '修改成功',
                                        message: '',
                                        type: 'success'
                                    });
                                    window.location.reload();
                                } else {
                                    _this.$notify.error({
                                        title: '修改错误',
                                        message: ''
                                    });
                                }
                                window.location.reload()
                            })
                            .catch()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                const sales = this.ruleForm.sales
                this.$refs[formName].resetFields();
                console.log(this.$route.query.id);
                this.ruleForm.p_id = this.$route.query.id;
                this.ruleForm.sales = sales;
            },
            cateFormat(row) {
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
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            delPro(pic) {
                console.log(pic)
                this.$confirm('删除图片, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('http://localhost:8183/delPic', {"p_id": this.ruleForm.p_id, "path": pic})
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
            }
        },
        created() {
            const _this = this;
            console.log("数据传递标记")
            // this.ruleForm = this.$route.query;
            // console.log(this.ruleForm)
            axios.post('http://localhost:8183/findPro', {"p_id": this.$route.query.p_id})
                .then(function (resp) {
                    console.log(resp)
                    _this.ruleForm = resp.data.data[0]
                })
        }
    }
</script>