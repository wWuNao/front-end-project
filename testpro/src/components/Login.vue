<template>
    <div class="login-Contrainer">
        <div class="img-box">
            <img src="../assets/logo.png" alt="你好,图片被偷走了">
        </div>

        <div class="login-box">
            <!-- 选择登陆方式 -->
            <div class="choose-Tab" v-if="tabNum === 1">

                <div id="index1" @click="changeChooseTab(1)" tabindex="1">手机登录</div>
                <div id="index2" @click="changeChooseTab(2)" tabindex="2">微信扫码</div>

            </div>
            <!-- 登录表单区域 -->
            <el-form class="login-form" v-if="chooseNum === 1 && tabNum === 1" :rules="loginFormRules"
                :model="login_Form" ref="loginFormRef">
                <!-- 手机号 -->
                <el-form-item prop="loginPhone">
                    <el-input placeholder="请输入用户名" class="user_input" v-model="login_Form.loginPhone"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="loginPwd">
                    <el-input placeholder="请输入密码,初始密码:123456" class="user_input" v-model="login_Form.loginPwd">
                    </el-input>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item>
                    <div id="verification-Code">
                        <el-input placeholder="请输入验证码" class="user_input verification_Code"
                            v-model="login_Form.users_verificationCode"></el-input>
                        <img :src="login_Form.verificationCodeImgSrc" alt="获取失败" @click="change_Verification_Code">
                    </div>
                </el-form-item>
                <!-- 按钮区 -->
                <el-form-item class="login-item-btn">
                    <!-- 忘记密码 -->
                    <span @click="changeTabNum(2)">忘记密码</span>
                    <!-- 按钮提交表单 -->
                    <el-button type="primary" id="login-btn" @click="JudgmentVerificationCode">登录</el-button>
                </el-form-item>
            </el-form>
            <!-- 微信扫码登录界面 -->
            <div v-if="chooseNum === 2" class="wechatBox">
                <img :src="login_Form.QrcodeImgsrc" alt="" @click="change_Qr_Code">
            </div>
            <!-- 忘记密码区域 -->
            <div class="pwdBox" v-if="tabNum === 2" style="display: flex;flex-direction: column;align-items: center;">
                <!-- 标题 -->
                <h1>修改密码</h1>
                <el-form class="pwd-form" :rules="rules" ref="pwdForm">

                    <!-- 账号 -->
                    <el-form-item>
                        <el-input placeholder="请输入手机号" class="user_input" v-model="pwdForm.userNum"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item id="getPwd" prop="firstpwd">
                        <el-input placeholder="请输入密码" class="user_input" v-model="pwdForm.firstpwd"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item id="getPwd" prop="seconderpwd">
                        <el-input placeholder="请再次输入密码" class="user_input" v-model="pwdForm.seconderpwd"></el-input>
                    </el-form-item>
                    <!-- 验证码 -->
                    <el-form-item>
                        <div id="verification-Code">
                            <el-input placeholder="请输入验证码" class="user_input verification_Code"
                                v-model="pwdForm.users_pwdVerificationCode"></el-input>
                            <el-button type="primary" style="margin-left: 20px;">获取</el-button>
                        </div>
                    </el-form-item>
                    <!-- 按钮区 -->
                    <el-form-item class="pwd_Btn">
                        <!-- 按钮提交表单 -->
                        <el-button type="primary" id="pwd_btn" @click="JudgmentPwdVerificationCode">确定</el-button>
                        <el-button type="info" @click="changeTabNum(1)">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>
    </div>
</template>



<script>
export default {
    // 生命周期函数
    created() {
        this.change_Verification_Code();
        this.change_Qr_Code();

    },
    data() {

        return {
            tabNum: 1,//展示页面 1.登录，2.忘记密码
            chooseNum: 1,//选择登录方式 1.手机,2.微信

            login_Form: {
                users_verificationCode: "",
                verificationCode: "",//验证码
                verificationCodeImgSrc: "",//验证码图片地址
                QrcodeImgsrc: "",//二维码图片地址
                loginPhone: "",
                loginPwd: "",
            },
            loginFormRules: {
                loginPhone: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { max: 11, message: '用户名长度不大于11位', trigger: 'blur' }
                ],
                loginPwd: [{ required: true, message: '请输入密码', trigger: 'blur' },]
            },


            pwdForm: {
                userNum: "",//用户账号
                firstpwd: "",//第一此输入密码
                seconderpwd: "",//第二次输入密码
                users_pwdVerificationCode: ''//用户输入忘记密码验证码
            },


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------
            // 请将真数据放在此线之上，不然最后被删除请不要怪在下
            // 假数据
            loginInFo: {
                "code": "10000",
                "msg": "success",
                "data": {
                    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbmQiOiJCIiwiZXhwIjoxNjU4NTYzNzk1LCJ1c2VyaWQiOiIzNDYzNzU1OTYwMDkzMjQ1NDQifQ.PGMokzUpXfTchUL6DQ1QMYXy7HyK9rYE18te1wTMAT0",
                    "info": {
                        "realName": "SuperAdmin",
                        "roles": [
                            {
                                "id": "346375595392761856",
                                "roleName": "超级管理员"
                            },
                            {
                                "id": "346375595392761856",
                                "roleName": "超级管理员"
                            },
                            {
                                "id": "346375595392761856",
                                "roleName": "超级管理员"
                            }
                        ],
                        "end": "B",
                        "userName": "root"
                    },
                    "route": [
                        {
                            "id": "1",
                            "menuName": "主页",
                            "iconUrl": "home",
                            "parentMenuId": "0",
                            "linkUrl": "/home",
                         
                        },
                        {
                            "id": "2",
                            "menuName": "个人中心",
                            "iconUrl": "my",
                            "parentMenuId": "0",
                            "linkUrl": "/my",
                        
                        },
                        {
                            "id": "4",
                            "menuName": "题库管理",
                            "iconUrl": "lib_manage",
                            "parentMenuId": "0",
                            "linkUrl": "/lib_manage",
                            
                        },
                        {
                            "id": "5",
                            "menuName": "任务管理",
                            "iconUrl": "mission_manage",
                            "parentMenuId": "0",
                            "linkUrl": "/mission_manage",
                          
                        },

                        {
                            "id": "6",
                            "menuName": "学生组管理",
                            "iconUrl": "stu_grp_manage",
                            "parentMenuId": "0",
                            "linkUrl": "/stu_grp_manage",
                          
                        },

                        {
                            "id": "7",
                            "menuName": "教师组管理",
                            "iconUrl": "tch_grp_manage",
                            "parentMenuId": "0",
                            "linkUrl": "/tch_grp_manage",
                          
                        },

                        {
                            "id": "8",
                            "menuName": "班级管理",
                            "iconUrl": "class_manage",
                            "parentMenuId": "0",
                            "linkUrl": "/class_manage",
                      
                        },

                        {
                            "id": "9",
                            "menuName": "用户管理",
                            "iconUrl": "user_manage",
                            "parentMenuId": "0",
                            "linkUrl": "/user_manage",
                 
                        },

                        {
                            "id": "10",
                            "menuName": "角色管理",
                            "iconUrl": "role_manage",
                            "parentMenuId": "0",
                            "linkUrl": "/role_manage"
                        }

                    ]

                }

            }

        }

    },
    methods: {
        // 切换忘记密码和登录界面
        changeTabNum(num) {
            this.tabNum = num;
        },
        // 切换登录方式
        changeChooseTab(num) {
            this.chooseNum = num;
        },
        // 获取验证码
        change_Verification_Code() {
            this.$http.post("https://www.mxnzp.com/api/verifycode/code?len=5&type=0&app_id=unelukhohlqjrrip&app_secret=WmdRVmtJVDRXZ1EweFJ3bENOS1Qrdz09").then(res => {
                this.login_Form.verificationCodeImgSrc = res.data.data.verifyCodeImgUrl;
                this.login_Form.verificationCode = res.data.data.verifyCode
                // console.log(res)
            });
        },
        // 获取二维码
        change_Qr_Code() {
            this.$http.get("https://www.mxnzp.com/api/qrcode/create/single?content=你好&size=500&type=0&app_id=unelukhohlqjrrip&app_secret=WmdRVmtJVDRXZ1EweFJ3bENOS1Qrdz09").then(res => {
                this.login_Form.QrcodeImgsrc = res.data.data.qrCodeUrl;
            });
        },
        // 判断登录验证码和登录请求发起
        async JudgmentVerificationCode() {
            if (this.login_Form.users_verificationCode.toUpperCase == this.login_Form.verificationCode.toUpperCase) {
                const res=await this.$http.post('/api/login',{uid:this.login_Form.loginPhone,pwd:this.login_Form.loginPwd})
                console.log(res)
                if(res.status==200){
                    // window.sessionStorage.setItem('token',res.statusText)
                    window.sessionStorage.setItem('token',this.loginInFo.data.token)
                    this.$store.dispatch('asyncupdateLoginInfo',this.loginInFo)
                    this.$router.push("/home")
                    this.$message.success('登录成功');
                }
            }
            else {
                this.change_Verification_Code();
                return this.$message.error('验证码不正确');
            }

            // window.sessionStorage.setItem('token', this.login_Form.loginPhone)
            // 将获取到的请求放在共公区域
            // this.$store.dispatch('asyncupdateLoginInfo',this.loginInFo)
            // this.$router.push("/home");
            // this.$message.success('登录成功');
        },
        //判断忘记密码验证码
        JudgmentPwdVerificationCode() {
            if (this.pwdForm.users_pwdVerificationCode == '1111') {
                if (this.pwdForm.firstpwd == this.pwdForm.seconderpwd) {
                    // const res=this.$http.post("地址接口",{username:this.userNum ,pwd:this.firstpwd});
                    if (200 === 200) {
                        this.changeTabNum(1)
                        this.$router.push('/')
                        return this.$message.success('重置成功');
                    }
                }
            }
            else
                return this.$message.error('重置失败');
        },
    },

}
</script>


<style scoped>
/* 最外边框体 */
.login-Contrainer {

    /* 设置最外边框体的位置 */
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

/* 图片框体 */
.img-box {
    width: 400px;
    height: 400px;
    /* background-color: #ff0000; */
    border: 2px solid black;
    border-radius: 20px;


    /* 设置其内部图片位置 */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 主轴方向位置 */
    justify-content: center;
}

/* 图片区图片样式 */
.img-box img {
    width: 400px;
    height: 400px;
    border-radius: 20px;
}


/* 登录表单框体 */
.login-box {
    width: 400px;
    height: 400px;
    /* background-color: #00ff26; */
    border: 2px solid black;
    border-radius: 20px;



    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.choose-Tab {
    display: flex;
    border-top: 2px solid black;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: fixed;
    top: 0px;

}

/* 选择登录区样式 */
.choose-Tab div {
    font-size: large;
    width: 200px;
    height: 100%;
    float: left;
    text-align: center;
    line-height: 50px;

}

.choose-Tab div:focus {
    background-color: rgb(181, 181, 224);
}

.choose-Tab #index1 {
    border-top-left-radius: 20px;

}

.choose-Tab #index2 {
    border-top-right-radius: 20px;
}


.login-form {
    margin-top: 50px;
}

.user_input {
    border-radius: 8px;
}


/* 验证码 */
#verification-Code {
    display: flex;
}

/* 验证码输入框 */
.verification_Code {
    width: 120px;
}

/* 图片 */
#verification-Code img {
    margin-left: 10px;
    width: 90px;
    height: 40px;
}



.login-item-btn {
    display: flex;
    justify-content: center;
}

.login-item-btn span {
    display: block;
    margin-left: 240px;
}

#login-btn {
    width: 300px;
}


.wechatBox img {
    height: 200px;
    width: 200px;
}



/* 忘记密码 */
.pwd_Btn {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>


<style>
</style>