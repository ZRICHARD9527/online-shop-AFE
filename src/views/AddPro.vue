<template>
    <div>
        <!--:inline="true" class="demo-form-inline"-->
        <el-form style="width: 40%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">

            <el-form-item label="商品名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="SN码" prop="sn">
                <el-input v-model="ruleForm.sn"></el-input>
            </el-form-item>
            <el-form-item label="商品库存" prop="num">
                <el-input v-model="ruleForm.num"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="desc">
                <el-input type="textarea" autosize v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="类别" prop="c_id">
                <el-select v-model="ruleForm.c_id" placeholder="请选择商品类别">
                    <el-option label="手机" value="1"></el-option>
                    <el-option label="电子配件" value="2"></el-option>
                    <el-option label="书籍" value="3"></el-option>
                    <el-option label="暂不分类" value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">上传</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    sn: '',
                    num: '',
                    price: '',
                    desc: '',
                    c_id: ''
                },
                rules: {
                    p_id: [
                        {required: true, message: '不可修改', trigger: 'focus'},
                    ],
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
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
                    ]//,

                    // img: [
                    //     //{required: true, message: '请选择图片', trigger: 'change'},
                    //     //{type: 'array', required: true, message: '请至少选择一个图片', trigger: 'change'}
                    // ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this

                        axios.post('http://localhost:8183/addPro', this.ruleForm)
                            .then(function (resp) {
                                console.log(resp)
                                if (true == resp.data.success) {
                                    _this.$notify({
                                        title: '添加成功',
                                        message: '',
                                        type: 'success'
                                    });
                                } else {
                                    _this.$notify.error({
                                        title: '添加错误',
                                        message: ''
                                    });
                                }
                            })
                            .catch()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                console.log(this.$route.query.id)
                this.ruleForm.p_id = this.$route.query.id;
            }
        },
        created() {
            const _this = this;
            console.log("1111111111111")

            // axios.post('http://localhost:8183/findPro', {"p_id": parseInt(this.$route.query.id), "content": null})
            //     .then(function (resp) {
            //         // console.log("1111111111111")
            //         // console.log(resp)
            //         // console.log(resp.data.data[0])
            //         _this.ruleForm = resp.data.data[0]
            //     })
        }
    }
</script>