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
                        <el-input placeholder="人员名称">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-dropdown size="mini" split-button type="primary" @click="getAllUser">
                            全部角色
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click="getTeaInfo">教师</el-dropdown-item>
                                <el-dropdown-item @click="getStuInfo">学生</el-dropdown-item>
                                <el-dropdown-item @click="getAdminInfo">管理员</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <el-button size='mini' style='position: absolute;right:20px;top:5px;'>删除</el-button>
                    <el-button size='mini' style='position: absolute;right:90px;top:5px;'
                        @click="addUserFlag = true">+添加</el-button>
                </el-row>

                <!--表格-->
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column type="selection" width="55" style="border-right: 0px;">
                    </el-table-column>
                    <el-table-column prop="id" style="border-left: 0px;" width="30px">
                    </el-table-column>
                    <el-table-column prop="name" label="人员名称" width="180">
                    </el-table-column>
                    <el-table-column prop="sum" label="角色">
                    </el-table-column>
                    <el-table-column prop="time" label="加入时间">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" @click="updateUserFlag=true">修改</el-button>
                            <el-button type="danger" icon="el-icon-delete" @click="removeGroup(scope.row.id)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--分页区域-->
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage4" :page-sizes="[1, 2, 5, 10]" :page-size="5"
                    layout="total, sizes, prev, pager, next, jumper" :total="4">
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
                        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
                            <el-radio-group v-model="addUserInfoForm.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="用户id" prop="uid" :label-width="formLabelWidth">
                            <el-input v-model="addUserInfoForm.uid"></el-input>
                        </el-form-item>
                        <el-form-item label="用户密码" prop="pwd" :label-width="formLabelWidth">
                            <el-input v-model="addUserInfoForm.pwd"></el-input>
                        </el-form-item>
                        <el-form-item label="code" prop="code" :label-width="formLabelWidth">
                            <el-input v-model="addUserInfoForm.code"></el-input>
                        </el-form-item>
                        <el-form-item label="phone" prop="phone" :label-width="formLabelWidth">
                            <el-input v-model="addUserInfoForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="college_id" prop="college_id" :label-width="formLabelWidth">
                            <el-input v-model="addUserInfoForm.college_id"></el-input>
                        </el-form-item>
                        <el-form-item label="roleIds" prop="roleIds" :label-width="formLabelWidth">
                            <el-input v-model="addUserInfoForm.roleIds"></el-input>
                        </el-form-item>
                        <el-form-item label="openid" prop="openid" :label-width="formLabelWidth">
                            <el-input v-model="addUserInfoForm.openid"></el-input>
                        </el-form-item>
                        <el-form-item label="class_id" prop="class_id" :label-width="formLabelWidth">
                            <el-input v-model="addUserInfoForm.class_id"></el-input>
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
                            <el-input autocomplete="off" style="margin-left: 10px;" v-model="updateUserInfoForm.realname">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
                            <el-radio-group v-model="updateUserInfoForm.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="用户id" prop="uid" :label-width="formLabelWidth">
                            <el-input v-model="updateUserInfoForm.uid"></el-input>
                        </el-form-item>
                        <el-form-item label="用户密码" prop="pwd" :label-width="formLabelWidth">
                            <el-input v-model="updateUserInfoForm.pwd"></el-input>
                        </el-form-item>
                        <el-form-item label="code" prop="code" :label-width="formLabelWidth">
                            <el-input v-model="updateUserInfoForm.code"></el-input>
                        </el-form-item>
                        <el-form-item label="phone" prop="phone" :label-width="formLabelWidth">
                            <el-input v-model="updateUserInfoForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="college_id" prop="college_id" :label-width="formLabelWidth">
                            <el-input v-model="updateUserInfoForm.college_id"></el-input>
                        </el-form-item>
                        <el-form-item label="roleIds" prop="roleIds" :label-width="formLabelWidth">
                            <el-input v-model="updateUserInfoForm.roleIds"></el-input>
                        </el-form-item>
                        <el-form-item label="openid" prop="openid" :label-width="formLabelWidth">
                            <el-input v-model="updateUserInfoForm.openid"></el-input>
                        </el-form-item>
                        <el-form-item label="class_id" prop="class_id" :label-width="formLabelWidth">
                            <el-input v-model="updateUserInfoForm.class_id"></el-input>
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
            AllUserInfo: {},
            teaUserInfo: {},
            stuUserInfo: {},
            adminUserInfo: {},
           
            addGroupInfoForm: {
                GroupName: "",
            },
            addGroupInfoFormRules: {
                GroupName: [{ required: true, message: '请输入教师组名称', trigger: 'blur' },]
            },



            // 要添加用户的信息
            addUserInfoForm: {
                end: "",
                uid: "",
                pwd: "",
                realname: "",
                code: "",
                sex: "",
                phone: "",
                college_id: "",
                rolelds:[],
                openid: "",
                class_id: '',
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
                rolelds: [],
                openid: [],
                class_id: [],
            },
            // 表单内宽度
            formLabelWidth: "120px",
            // 添加用户页面是否跳出
            addUserFlag: false,



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
                rolelds: ["12345678900"],
                openid: "0",
                class_id: '0',
            },
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
            updateUserFlag:false,


            // 假数据
            data: this.generateData(),
            value: [1, 4],




            tableData: [{
                id: '1',
                name: 'stu1',
                sum: '学生',
                time: '2022-7-16'
            }, {
                id: '2',
                name: 'stu2',
                sum: '学生',
                time: '2022-7-16'
            }, {
                id: '3',
                name: 'tea1',
                sum: '教师',
                time: '2022-7-16'
            }, {
                id: '4',
                name: 'admin1',
                sum: '管理员',
                time: '2022-7-16'
            }]
        }
    },
    methods: {
        // 获取全部用户数据
        async getAllUser() {
            const res = await this.$http.post('api/user/get_list')
            // this.AllUserInfo=res;
        },
        // 获取全部老师数据
        async getTeaInfo() {
            const res = await this.$http.post('api/user/get_list')
            // this.teaUserInfo=res
        },
        // 获取全部学生数据
        async getStuInfo() {
            const res = await this.$http.post('api/user/get_list')
            // this.stuUserInfo.res
        },
        // 获取全部管理员数据
        async getAdminInfo() {
            const res = await this.$http.post('api/user/get_list')
            // this,adminUserInfo=res
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
            // this.getAllUser()
            // 假操作
            console.log(id)
            this.tableData.splice(id, 1)

        },
        // 增加用户
        async addUser() {
            // const res=await this.$http.post('/api/user/add',this.value)
            this.addUserFlag = false
            console.log(this.addUserInfoForm)
        },
        async updateUser(){
            // const res=await this.$http.post('/api/user/mod',this.value)
            this.updateUserFlag = false
            console.log(this.updateUserInfoForm)
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