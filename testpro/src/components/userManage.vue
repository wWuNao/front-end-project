<template>
    <div id="app" class="teacherGroupBox">
        <!--面包屑-->
        <el-breadcrumb separator="/" style="hight: 30px;">
            <el-breadcrumb-item :to="{ path: '/home' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        </el-breadcrumb>


        <!--卡片视图-->
        <div class="userManageBox">
            <el-card>
                <!--搜索-->
                <el-row :gutter="0">
                    <el-col :span="5">
                        <el-input placeholder="人员id" v-model="userNumInfo.lookInfo">
                            <el-button slot="append" icon="el-icon-search" @click="lookForUser(userNumInfo.lookInfo)">
                            </el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-dropdown @command="changeRoleList">
                            <span class="el-dropdown-link">
                                选择角色<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="all">全部</el-dropdown-item>
                                <el-dropdown-item command="tea">教师</el-dropdown-item>
                                <el-dropdown-item command="stu">学生</el-dropdown-item>
                                <el-dropdown-item command="admin">管理员</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                    </el-col>
                    <el-button size='mini' style='position: absolute;right:20px;top:5px;'>删除</el-button>
                    <el-button size='mini' style='position: absolute;right:90px;top:5px;' @click="getClass_CollegeInfo">
                        +添加</el-button>
                </el-row>

                <!--表格-->
                <el-table :data="AllUserInfo" border style="width: 100%">
                    <el-table-column type="selection" width="55" style="border-right: 0px;">
                    </el-table-column>
                    <el-table-column prop="id" style="border-left: 0px;" label="用户id">
                    </el-table-column>
                    <el-table-column prop="realName" label="真实姓名">
                    </el-table-column>
                    <el-table-column prop="userName" label="用户名称">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" @click="lookUser(scope.row.id)">修改</el-button>
                            <el-button type="danger" icon="el-icon-delete" @click="removeGroup(scope.row.id)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--分页区域-->
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="userNumInfo.pagenum" :page-sizes="[1, 2, 5, 10]"
                    layout="total, sizes, prev, pager, next, jumper" :total="total" :page-size="userNumInfo.pagesize">
                </el-pagination>
            </el-card>
            <!-- 添加人员 -->
            <el-dialog title="人员添加" :visible.sync="addUserFlag">
                <div class="userFormBox">
                    <el-form :model="addUserInfoForm" class="AddUserForm" :rules="addUserInfoFormRules">
                        <el-form-item label="真实姓名" prop="realname" :label-width="formLabelWidth">
                            <el-input autocomplete="off" style="margin-left: 10px;" v-model="addUserInfoForm.realname">
                            </el-input>
                        </el-form-item>
                        <!-- <el-form-item label="角色" prop="end" :label-width="formLabelWidth">
                            <el-radio-group v-model="addUserInfoForm.end">
                                <el-radio label="A"></el-radio>
                                <el-radio label="B"></el-radio>
                            </el-radio-group>
                        </el-form-item> -->
                        <el-form-item label="用户id" prop="uid" :label-width="formLabelWidth">
                            <el-input v-model="addUserInfoForm.uid"></el-input>
                        </el-form-item>
                        <el-form-item label="用户密码" prop="pwd" :label-width="formLabelWidth">
                            <el-input v-model="addUserInfoForm.pwd"></el-input>
                        </el-form-item>
                        <el-form-item label="工号" prop="code" :label-width="formLabelWidth">
                            <el-input v-model="addUserInfoForm.code"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
                            <el-input v-model="addUserInfoForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="角色" prop="roleIds" :label-width="formLabelWidth">
                            <!-- <el-input v-model="RoleIds_str" placeholder="请在多个roleid这间用‘,’隔开"></el-input> -->
                            <el-checkbox-group v-model="addUserInfoForm.roleIds">
                                <el-checkbox v-for="roleitem in roles_arr" :label="roleitem.id">{{ roleitem.roleName }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="学院" prop="college_id" :label-width="formLabelWidth">
                            <el-radio-group v-model="addUserInfoForm.college_id">
                                <el-radio v-for="colitem in college_arr" :label="colitem"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="班级" prop="class_id" :label-width="formLabelWidth">
                            <!-- <el-input v-model="addUserInfoForm.class_id"></el-input> -->
                            <el-radio-group v-model="addUserInfoForm.class_id">
                                <el-radio v-for="calssitem in college_arr" :label="calssitem"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addUserFlag = false">取 消</el-button>
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </div>
            </el-dialog>


            <!-- 打开详情+修改信息 -->
            <el-dialog title="人员添加" :visible.sync="updateUserFlag">
                <div class="userFormBox">
                    <el-form :model="updateUserInfoForm" class="AddUserForm" :rules="updateUserInfoFormRules">
                        <el-form-item label="真实姓名" prop="realname" :label-width="formLabelWidth">
                            <el-input autocomplete="off" style="margin-left: 10px;"
                                v-model="updateUserInfoForm.realname">
                            </el-input>
                        </el-form-item>
                        <!-- <el-form-item label="角色" prop="end" :label-width="formLabelWidth">
                            <el-radio-group v-model="updateUserInfoForm.end">
                                <el-radio label="A"></el-radio>
                                <el-radio label="B"></el-radio>
                            </el-radio-group>
                        </el-form-item> -->
                        <el-form-item label="用户id" prop="uid" :label-width="formLabelWidth">
                            <el-input v-model="updateUserInfoForm.uid"></el-input>
                        </el-form-item>
                        <el-form-item label="用户密码" prop="pwd" :label-width="formLabelWidth">
                            <el-input v-model="updateUserInfoForm.pwd"></el-input>
                        </el-form-item>
                        <el-form-item label="工号" prop="code" :label-width="formLabelWidth">
                            <el-input v-model="updateUserInfoForm.code"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
                            <el-input v-model="updateUserInfoForm.phone"></el-input>
                        </el-form-item>

                        <el-form-item label="角色" prop="roleIds" :label-width="formLabelWidth">
                            <el-checkbox-group v-model="updateUserInfoForm.roleIds">
                                <el-checkbox v-for="roleitem in roles_arr" :label="roleitem.id" disabled>{{
                                        roleitem.roleName
                                }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="学院" prop="college_id" :label-width="formLabelWidth">
                            <!-- <el-input v-model="updateUserInfoForm.college_id"></el-input> -->
                            <el-radio-group v-model="updateUserInfoForm.college_id">
                                <el-radio v-for="colitem in college_arr" :label="colitem"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <!-- <el-form-item label="openid" prop="openid" :label-width="formLabelWidth">
                            <el-input v-model="updateUserInfoForm.openid"></el-input>
                        </el-form-item> -->
                        <el-form-item label="班级" prop="class_id" :label-width="formLabelWidth">
                            <!-- <el-input v-model="updateUserInfoForm.class_id"></el-input> -->
                            <el-radio-group v-model="updateUserInfoForm.class_id">
                                <el-radio v-for="colitem in college_arr" :label="colitem"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="添加角色" :label-width="formLabelWidth">
                            <el-checkbox-group v-model="addRoleIds">
                                <el-checkbox v-for="roleitem in roles_arr" :label="roleitem.id">{{ roleitem.roleName }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="删除角色" :label-width="formLabelWidth">
                            <!-- <el-input v-model="delRoleId_str" placeholder="请在多个roleid这间用‘,’隔开或者在上方roleIds选择要删除的id">
                            </el-input> -->
                            <el-checkbox-group v-model="delRoleId">
                                <el-checkbox v-for="roleitem in roles_arr" :label="roleitem.id">{{ roleitem.roleName }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="updateUserFlag = false">取 消</el-button>
                    <el-button type="primary" @click="updateUser">确 定</el-button>
                </div>
            </el-dialog>

            <!-- 组详情 -->
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    created() {
        this.getAllUser()
    },
    data() {
        return {
            // 存放所有用户信息
            AllUserInfo: [],
            AllUserInfo_false: [],
            teaUserInfo: [],
            stuUserInfo: [],
            adminUserInfo: [],




            //   搜索框和翻页栏数据
            userNumInfo: {
                // 要查询的用户信息
                lookInfo: "",
                //   当前页数
                pagenum: 1,
                //   当前每页几项
                pagesize: 1,
            },
            // 总共有多少条数据
            total: 4,




            // 要添加用户的信息
            addUserInfoForm: {
                end: "B",
                uid: "",
                pwd: "",
                realname: "",
                code: "",
                sex: "",
                phone: "",
                college_id: "0",
                roleIds: [],
                openid: "0",
                class_id: '0',
            },
            // 要添加用户的信息表单规则
            addUserInfoFormRules: {
                end: [],
                uid: [],
                pwd: [],
                realname: [],
                code: [],
                sex: [],
                phone: [],
                college_id: [],
                roleIds: [],
                openid: [],
                class_id: [],
            },
            // 表单内宽度
            formLabelWidth: "120px",
            // 添加用户页面是否跳出
            addUserFlag: false,
            // 存放班级列表
            class_arr: [],
            // 存放学院列表
            college_arr: [],
            // 角色列表
            roles_arr: [],
            // 用来存放完整的角色列表
            choose_Roles_Arr:[],


            // 要更新用户的信息
            updateUserInfoForm: {
                end: "B",
                uid: "40419111337",
                pwd: "123456",
                realname: "叶庭辉",
                code: "40419111337",
                sex: "男",
                phone: "12345678900",
                college_id: "1",
                roleIds: ["12345678900", '1371827389213719', '5131283617283712', '73891273012312', '1231230921803812'],
                openid: "0",
                class_id: '0',
            },
            addRoleIds: [],
            delRoleId: [],
            updateUserFlag: true,
            whoupdateuserid: "",
            // 要更新用户的信息表单规则
            updateUserInfoFormRules: {
                end: [],
                uid: [],
                pwd: [],
                realname: [],
                code: [],
                sex: [],
                phone: [],
                college_id: [],
                rolelds: [],
                openid: [],
                class_id: [],
            },
            // 更新用户页面是否跳出
            updateUserFlag: false,



        }
    },
    methods: {
        // 切换列表显示角色
        changeRoleList(command) {
            if (command == 'all') {
                this.getAllUser()
            }
            else if (command == 'stu') {
                this.getStuInfo()
            }
            else if (command == 'tea') {
                this.getTeaInfo()
            }
            else if(command=='admin'){
                this.getAdminInfo()
            }
        },
        // 获取全部用户数据和角色列表
        async getAllUser() {
            const res = await this.$http({
                url: '/api/user/get_list',
                method: 'post',
                data: "",
                params: {},
            })
            this.AllUserInfo = res.data.data;
            this.total = this.AllUserInfo.length;
            this.AllUserInfo_false = this.AllUserInfo;
            // console.log(this.AllUserInfo);
            const res_role = await this.$http({
                url: '/api/role/get_list',
                method: 'post',
                data: "",
                params: {},
            })
            // 列子id: "346900200679276544"
            //     roleName: "学生"
            this.choose_Roles_Arr=res_role.data.data;
            this.roles_arr=res_role.data.data.slice(1,3);
            // console.log(res_role.data.data);
            // console.log(this.roles_arr);
        },
        // 获取全部老师数据
        async getTeaInfo() {
            this.AllUserInfo = [];
            // console.log(this.AllUserInfo)
            for (var i = 0; i < this.AllUserInfo_false.length; i++) {
                if (this.choose_Roles_Arr[1].id == this.AllUserInfo_false[i].roles[0].id) {
                    this.AllUserInfo.push(this.AllUserInfo_false[i])
                }
                // console.log(this.AllUserInfo_false[i])
                // console.log(this.AllUserInfo)
            }

        },
        // 获取全部学生数据
        async getStuInfo() {
            this.AllUserInfo = [];
            // console.log(this.AllUserInfo)
            for (var i = 0; i < this.AllUserInfo_false.length; i++) {
                if (this.choose_Roles_Arr[0].id == this.AllUserInfo_false[i].roles[0].id) {
                    this.AllUserInfo.push(this.AllUserInfo_false[i])
                }
                // console.log(this.AllUserInfo_false[i])
                console.log(this.AllUserInfo)
            }
            this.total = this.AllUserInfo.length;
        },
        // 获取全部管理员数据
        async getAdminInfo() {
            this.AllUserInfo = [];
            // console.log(this.AllUserInfo)
            for (var i = 0; i < this.AllUserInfo_false.length; i++) {
                if (this.choose_Roles_Arr[2].id == this.AllUserInfo_false[i].roles[0].id) {
                    this.AllUserInfo.push(this.AllUserInfo_false[i])
                }
                // console.log(this.AllUserInfo_false[i])
                // console.log(this.AllUserInfo)
            }
            this.total = this.AllUserInfo.length;
        },
        // 移除一个用户
        async removeGroup(id) {
            const res = await this.$confirm('此操作将永久删除该组, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => {
                return err;
            })
            if (res !== 'confirm') {
                return this.$message.info("已取消删除")
            }
            // todo 发送删除请求
            // const deleteres=await this.$http.post('/api/user/del',{userid:""})
            const delres = await this.$http({
                url: '/api/user/del',
                method: 'post',
                data: "",
                params: { userids: id },
            })
            this.getAllUser()

        },
        // 获取班级学院列表
        async getClass_CollegeInfo() {
            // 获取班级
            // const res=await this.$http({
            //     url: '/api/user/add',
            //     method: 'post',
            //     data: "",
            //     params: this.addUserInfoForm,
            // })
            // this.class_arr=res.
            // 获取学院
            // const res=await this.$http({
            //     url: '/api/user/add',
            //     method: 'post',
            //     data: "",
            //     params: this.addUserInfoForm,
            // })
            // this.college_arr=res.

            this.addUserFlag = true
        },

        // 增加用户
        async addUser() {
            // const res=await this.$http.post('/api/user/add',this.value)
            console.log(this.addUserInfoForm)
            const res = await this.$http({
                url: '/api/user/add',
                method: 'post',
                data: "",
                params: this.addUserInfoForm,
            })
            //     console.log(res)


            this.addUserInfoForm = {}
            console.log(this.addUserInfoForm)
            this.RoleIds_str = ""
            this.addUserFlag = false
            this.getAllUser()
        },
        // 更新
        async updateUser() {
            // const res=await this.$http.post('/api/user/mod',this.value)
            this.updateUserInfoForm.userid = this.whoupdateuserid,
                this.updateUserInfoForm.delRole = this.delRoleId,
                this.updateUserInfoForm.addRole = this.addRoleIds
            console.log(this.updateUserInfoForm)
            const res = await this.$http({
                url: '/api/user/mod',
                method: 'post',
                data: "",
                params: this.updateUserInfoForm,
            })
            console.log(res)
            this.updateUserFlag = false;
            this.addRoleId_str = "";
            this.addRoleIds = [];
            this.delRoleId = [];
            this.getAllUser()
        },
        //搜索用户
        async lookForUser(usersid) {
            if (usersid == "") {
                this.getAllUser()
            }
            else {
                const res = await this.$http({
                    url: '/api/user/get',
                    method: 'post',
                    data: "",
                    params: { userid: usersid },
                })
                console.log(res)
                this.AllUserInfo = [];
                this.AllUserInfo.push({ id: usersid, realName: res.data.data.realname, userName: res.data.data.uid });
                this.total = 1
                console.log(this.AllUserInfo)
                this.userNumInfo.lookInfo="";
            }

        },
        // 查询单个用户
        async lookUser(id) {
            this.whoupdateuserid = id;
            // if(this.addRoleId==""||this.delRoleId==""){
            const res = await this.$http({
                url: '/api/user/get',
                method: 'post',
                data: "",
                params: { userid: id },
            })
            this.updateUserInfoForm = res.data.data,
                console.log(res)
            // console.log(this.updateUserInfoForm)
            // }
            this.updateUserFlag = true
        },
        // 翻页效果
        handleSizeChange(newSize) {
            this.userNumInfo.pagesize = newSize
            console.log(newSize)
        },
        // 页码值改变
        handleCurrentChange(newPage) {
            this.userNumInfo.pagenum = newPage
        },
        // 测试操作
        generateData() {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${i}`,
                });
            }
            return data;
        },
        openGroupInfo(id) {
            this.groupinfoName = this.tableData[id].name
        }
    }
}
</script >
 <!--样式-->
<style scoped>
.el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
}

.el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}

.el-input {
    height: 5px !important;
}

.el-transfer-panel {
    width: 250px !important;
}

.el-card .el-row {
    height: 50px;
    display: flex;
    align-items: center;
}

.el-table {
    margin-top: 15px;
    font-size: 12px;
}
/* 复选框禁用时选中样式 */
.el-checkbox-button.is-disabled.is-checked .is-checked {
    color: #FFFFFF;
    background-color: #1890ff;
    border-color: #1890ff;
    -webkit-box-shadow: -1px 0 0 0 #74bcff;
    box-shadow: -1px 0 0 0 #74bcff;
}
</style>
<style >
.userManageBox .el-table tr {
    line-height: 20px;
}

.userManageBox .el-dialog__header .el-dialog__title {
    position: absolute;
    left: 30px;
}
</style>