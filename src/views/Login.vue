<template>
    <div class="login-container">
        <el-form :model="ruleForm" :rules="rules"
                 status-icon
                 ref="ruleForm"
                 label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page">

            <h3 class="title" style="align-content: center">网络商城管理系统登录</h3>
            <el-form-item prop="email">
                <el-input type="text"
                          v-model="ruleForm.email"
                          auto-complete="off"
                          placeholder="账号">
                    <el-button slot="prepend" icon="el-icon-user"></el-button>
                </el-input>

            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"
                          v-model="ruleForm.password"
                          auto-complete="off"
                          placeholder="密码">
                    <el-button slot="prepend" icon="el-icon-key"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit('ruleForm')">登录</el-button>
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
                    email: '',
                    password: '',
                },
                rules: {
                    email: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }
        },
        methods: {
            handleSubmit(event) {
                this.$refs[event].validate((valid) => {
                    if (valid) {
                        const _this = this;
                        axios.post('http://localhost:8183/admin', this.ruleForm)
                            .then(function (resp) {
                                //console.log(resp)
                                if (resp.data.success == true) {
                                    sessionStorage.setItem('email', _this.ruleForm.email);//将值传入浏览器
                                    console.log(sessionStorage.getItem('email'))
                                    _this.$notify({
                                        title: '登录成功',
                                        message: resp.data.data.name + '，欢迎使用',
                                        type: 'success'
                                    });
                                    _this.$router.push('/manage');//跳转
                                } else {
                                    _this.$alert('账号或密码错误,请重新登录', '登录失败', {
                                        confirmButtonText: 'ok'
                                    })
                                }
                            })


                    } else {
                        console.log('error submit!');
                        return false;
                    }
                })
            }
        },
        created() {
            /**
             * 进入页面时清除缓存，使用户无法返回继续操作
             */
            sessionStorage.clear()
        }
    };
</script>

<style scoped>
    .login-container {
        width: 100%;
        height: 100%;
    }

    .login-page {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    label.el-checkbox.rememberme {
        margin: 0px 0px 15px;
        text-align: left;
    }
</style>