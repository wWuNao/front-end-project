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
                <el-form :model="initObj">
                    <el-form-item label="超级管理员用户名(我们推荐您使用root作为超级管理员的用户名)">
                        <el-input style="border-radius: 20px;" v-model="initObj.uid"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input style="border-radius: 20px;" v-model="initObj.pwd"></el-input>
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
                        <div class="Configuration" @click="initCOnfig">
                            <h1 style="margin-left:50px;">推荐配置</h1>
                            <p style="margin-left:50px;">
                                使用系统预分配好访问权限的学生角色，教师角色，管理员角色。
                            </p>
                        </div>
                    </el-link>
                    <el-link @click="next_Operating_Steps(1)">
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
                <!-- 权限选择表格 -->
                <div style="width:1000px;display: flex;">
                    <Table style="margin-top: 40px;text-align: center;" cellspacing="20">
                        <thead>
                            <!-- 权限 -->
                            <tr>
                                <th v-for="itemConfig in pagetwo.step_third_table.ConfigTab">{{ itemConfig }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in 3">
                                <!-- 角色 -->
                                <td style="font-size: 10px;">{{pagetwo.step_third_table.roles[i-1]}}</td>
                                <!-- 角色选择权限 -->
                                <!-- name:学生 value:学生_主页-->
                                <td v-for="j in pagetwo.step_third_table.ConfigTab.length - 1"><input :name="pagetwo.step_third_table.roles[i-1]"
                                        type="checkbox" :value="pagetwo.step_third_table.roles[i-1] + '_' + pagetwo.step_third_table.ConfigTab[j]"
                                         :checked="initObj.roleConfigs[i-1].roleMenuRels[j-1]"/></td>
                            </tr>

                        </tbody>
                    </Table>
                </div>
            </div>



            <div id="page_Two_main" v-if="pagetwo.active === 3">
                <h2>第四步</h2>
                <p style="margin-top: 60px;">您已完成了所有的配置工作，现在，请您校验所有的配置信息。<br>
                    确保配置信息的准确无误后，点击右下角完成按钮，即可开始使用本系统！</p>
                <span style="color:#2ca9fc ;">超级管理员用户名:{{ initObj.uid }}&nbsp&nbsp&nbsp&nbsp密码:{{initObj.pwd}}</span>
                 <div style="width:1000px;display: flex;">
                    <Table style="margin-top: 40px;text-align: center;" cellspacing="20">
                        <thead>
                            <!-- 权限 -->
                            <tr>
                                <th v-for="itemConfig in pagetwo.step_third_table.ConfigTab">{{ itemConfig }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in 3">
                                <!-- 角色 -->
                                <td style="font-size: 10px;">{{pagetwo.step_third_table.roles[i-1]}}</td>
                                <!-- 角色选择权限 -->
                                <!-- name:学生 value:学生_主页-->
                                <td v-for="j in pagetwo.step_third_table.ConfigTab.length - 1"><input :name="pagetwo.step_third_table.roles[i-1]"
                                        type="checkbox" :value="pagetwo.step_third_table.roles[i-1] + '_' + pagetwo.step_third_table.ConfigTab[j]"
                                         :checked="initObj.roleConfigs[i-1].roleMenuRels[j-1]" disabled="disabled"/></td>
                            </tr>

                        </tbody>
                    </Table>
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
            page_index: 1,//记录第几页

            // 第二页属性
            pagetwo: {
                // 记录第几步骤   由零开始
                active: 0,
                step_third_table: {
                    roles: ['学生', '教师', '管理员'],
                    ConfigTab: ["", '主页', '个人中心', '我的任务', '题库管理', '任务管理', '学生组管理', '教师组管理', '班级管理', '用户管理', '角色管理',],
                },


            },
            initObj: {
                "uid": "root",
                "pwd": "123456",
                // "roleConfigs": [{ "roleName": "学生", "roleMenuRels": [true, true, true, false, false, false, false, false, false, false] }, { "roleName": "教师", "roleMenuRels": [true, true, false, true, true, true, true, false, false, false] }, { "roleName": "管理员", "roleMenuRels": [true, true, false, true, true, true, true, true, true, true] }
                // ]
                "roleConfigs": [{ "roleName": "学生", "roleMenuRels": [] }, { "roleName": "教师", "roleMenuRels": [] }, { "roleName": "管理员", "roleMenuRels": [] }]
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
            if(this.pagetwo.active!=2){
                this.pagetwo.active = this.pagetwo.active + num
            }
            else if(this.pagetwo.active==2){
                this.pagetwo.active = this.pagetwo.active + num
                this.getCheckBox()
            }
            
        },
        // 初始化内容提交后端
        async gotoHome() {
            const res = await this.$http.post('/api/init/submit', { uid: this.initObj.uid, pwd: this.initObj.pwd, roleConfigs: this.initObj.roleConfigs })
            // todo:通过返回数据设置弹框是否登录成功，和是否跳转页面
            this.$router.push('/home')
        },
        // 获取用户权限选择情况
        getCheckBox() {
            var COnfig = {}
            // 获取所有复选框元素
            for (var i = 0; i < this.pagetwo.step_third_table.roles.length; i++) {
                // COnfig元素：学生Config
                COnfig[this.pagetwo.step_third_table.roles[i] + 'Config'] = document.getElementsByName(this.pagetwo.step_third_table.roles[i])
            }
            // 获取不同角色的权限选择情况
            for (var i = 0; i < this.pagetwo.step_third_table.roles.length; i++) {
                this.initObj.roleConfigs[i]['roleMenuRels']=[];
                for (var j = 0; j < 10; j++) {
                    this.initObj.roleConfigs[i]['roleMenuRels'].push(COnfig[this.pagetwo.step_third_table.roles[i] + 'Config'][j].checked)
                }
            }
            // console.log(COnfig)
            // console.log(this.initObj)
        },
        // 初始化配置
        initCOnfig(){
            this.initObj.roleConfigs=[{ "roleName": "学生", "roleMenuRels": [true, true, true, false, false, false, false, false, false, false] }, { "roleName": "教师", "roleMenuRels": [true, true, false, true, true, true, true, false, false, false] }, { "roleName": "管理员", "roleMenuRels": [true, true, false, true, true, true, true, true, true, true] }]
        }
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

#page_Two .COnfigBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100px;
    width: 200px;
    margin-left: 500px;
}

#page_Two .COnfigBox .config_Cheeck {
    margin-left: 10px;

}
</style>

<style>
#page_Two .el-input__inner {
    border-radius: 10px;
}
</style>