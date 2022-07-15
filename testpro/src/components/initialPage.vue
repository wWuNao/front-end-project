<template>
    <div id="app">
        <!-- 第一页 -->
        <div id="page_one" v-if="page_index === 0">
            <h2>欢迎使用 温理练习系统</h2>
            <p>
                我们了解到您是首次启动系统，在开始使用系统之前，请完成系统的初始配置工作。
            </p>
            <p>
                这项工作是必须的，且不会花费您太多时间，不用担心，这些配置同样可以在系统中进行更改。
            </p>
            <p>
                一切准备就绪以后，请点击右下角的按钮开始配置。<br>
                <vtext style="color: red;">注意，在您将所有配置工作完成之前，我们不会保存任何数据到系统中。因此请确保您完整执行下述配置规则。</vtext>
            </p>
            <el-button type="primary" class="start_btn" @click="changePage(1)">让我们开始吧</el-button>
        </div>
        <!-- 第二页 -->
        <div id="page_Two" v-if="page_index === 1">
            <el-steps :active="pagetwo.active" finish-status="success" id="operating_Steps_one">
                <el-step title="步骤 1"></el-step>
                <el-step title="步骤 2"></el-step>
                <el-step title="步骤 3"></el-step>
                <el-step title="步骤 4"></el-step>
            </el-steps>
            <div id="page_Two_main" v-if="pagetwo.active === 0">
                <h2>第一步</h2>
                <p style="margin-top: 60px;">配置超级管理员(SuperAdmin)的用户信息。<br>
                    <el-link type="primary" style=" font-size: 15px; ">什么是超级管理员?</el-link>
                </p>
                <el-form :model="pagetwo.first_Step_Form">
                    <el-form-item label="超级管理员用户名(我们推荐您使用root作为超级管理员的用户名)">
                        <el-input style="border-radius: 20px;" v-model="pagetwo.first_Step_Form.admin_name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input style="border-radius: 20px;" v-model="pagetwo.first_Step_Form.admin_pwd"></el-input>
                    </el-form-item>
                </el-form>
            </div>



            <div id="page_Two_main" v-if="pagetwo.active === 1">
                <h2>第二步</h2>
                <p style="margin-top: 60px;">配置系统角色。<br>
                    <el-link type="primary" style=" font-size: 15px; ">系统角色是干什么的?</el-link>
                </p>

                <div style="display:flex;">
                    <el-link class="link_Config" @click="next_Operating_Steps(2)">
                        <div class="Configuration">
                            <h1 style="margin-left:50px;">推荐配置</h1>
                            <p style="margin-left:50px;">
                                使用系统预分配好访问权限的学生角色，教师角色，管理员角色。
                            </p>
                        </div>
                    </el-link>
                    <el-link @click="next_Operating_Steps(1)" >
                        <div class="Configuration" style="margin-left: 200px;">
                            <h1 style="margin-left:50px;">自定义配置</h1>
                            <p style="margin-left:50px;">
                                您可根据自身需要自行分配角色权限
                            </p>
                        </div>
                    </el-link>
                </div>
            </div>



            <div id="page_Two_main" v-if="pagetwo.active === 2">
                <h2>第三步</h2>
                <p style="margin-top: 60px;">管理系统默认角色的权限</p>
                <!-- 表单 -->
                <div style="width:300px;">
                    <el-form :model="pagetwo.third_step_Form">
                        <el-form-item>
                            <div v-for="(num,index) in pagetwo.COnfig.roles" style="display: flex;align-items: center;width: 800px;margin-top: 0px;">
                                <h4>{{num.role[0]}}</h4>
                                <div  class="COnfigBox" >
                                    <el-checkbox-group v-model="pagetwo.third_step_Form.COnfig[index].COnfig" v-for="index1 in num.Config">
                                        <el-checkbox v-bind:label="index1" name='pagetwo.third_step_Form.stuType' class="config_Cheeck"></el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>



            <div id="page_Two_main" v-if="pagetwo.active === 3">
                <h2>第四步</h2>
                <p style="margin-top: 60px;">您已完成了所有的配置工作，现在，请您校验所有的配置信息。<br>
                    确保配置信息的准确无误后，点击右下角完成按钮，即可开始使用本系统！</p>
                <span style="color:#bee3fc ;">超级管理员用户名:{{ pagetwo.first_Step_Form.admin_name }}密码:{{
                        pagetwo.first_Step_Form.admin_pwd
                }}</span>
                <div style="width:300px;">
                    <el-form :model="pagetwo.third_step_Form">
                        <el-form-item>
                            <div v-for="(num,index) in pagetwo.COnfig.roles" style="display: flex;align-items: center;width: 800px;margin-top: 0px;">
                                <h4>{{num.role[0]}}</h4>
                                <div  class="COnfigBox" >
                                    <el-checkbox-group v-model="pagetwo.third_step_Form.COnfig[index].COnfig" v-for="index1 in num.Config">
                                        <el-checkbox v-bind:label="index1" name='pagetwo.third_step_Form.stuType' class="config_Cheeck" disabled></el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>



            <div id="page_Two_btn">
                <el-button type="primary" v-if="pagetwo.active > 0" @click="next_Operating_Steps(-1)" id="previouStep">
                    上一步
                </el-button>
                <el-button type="primary" v-if="pagetwo.active == 0 || pagetwo.active == 2"
                    @click="next_Operating_Steps(1)" id="nextStep">下一步</el-button>
                <el-button type="primary" v-if="pagetwo.active == 3" id="overStep" @click="gotoHome">完成</el-button>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    data() {
        return {
            page_index: 0,//记录第几页

            // 第二页属性
            pagetwo: {
                active: 0,
                first_Step_Form: {
                    admin_name: "root",
                    admin_pwd: "password",
                },
                COnfig: {
                    roles:[
                        {role:['学生','stuType'],Config: ['考试', '练习', '修改学生信息']},
                        {role:['教师','teaType'],Config: ['发布考试/练习', '创建学生组', '创建教师组','修改信息']},
                        {role:['管理','adminType'],Config: ['删除教师组', '删除学生组', '创建班级','修改信息']}
                    ]
                },
                third_step_Form: {
                    COnfig: [{COnfig:[]},{COnfig:[]},{COnfig:[]}],
                },


            },
            rules: {

            }
        }
    },
    methods: {
        // 改变页面
        changePage(num) {
            this.page_index = this.page_index + num;
        },
        // 上/下一个步骤
        next_Operating_Steps(num) {
            this.pagetwo.active = this.pagetwo.active + num
        },
        gotoHome(){
            // this.$http.post()
            this.$router.push('/home')
        },
    },

}
</script>

<style scoped>
#page_one h2 {
    margin-top: 50px;
    margin-left: 50px;
}

#page_one p {
    margin-top: 60px;
    margin-left: 50px;
}

#page_one .start_btn {
    position: absolute;
    bottom: 120px;
    right: 110px;
}



#page_Two #operating_Steps_one {
    width: 700px;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
}

#page_Two #page_Two_main {
    width: 1000px;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translate(-50%, 0);
}

#page_Two #page_Two_btn {
    position: absolute;
    bottom: 100px;
    left: 200px;
    width: 1000px;
}

#page_Two #page_Two_btn #previouStep {
    position: absolute;
    left: 0px;
}

#page_Two #page_Two_btn #nextStep {
    position: absolute;
    right: 0px;
}

#page_Two #page_Two_btn #overStep {
    position: absolute;
    right: 0px;
}

#page_Two .Configuration {
    width: 350px;
    height: 200px;
    border: 1px solid #bee3fc;
    border-radius: 20px;
    margin-top: 80px;
}
#page_Two .COnfigBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100px;
    width: 200px;
    margin-left: 500px;
}
#page_Two .COnfigBox .config_Cheeck{
    margin-left: 10px;
}
</style>

<style>
#page_Two .el-input__inner {
    border-radius: 10px;
}
</style>