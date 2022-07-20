<template>
  <div id="app" class="teacherGroupBox">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>


    <!--卡片视图-->
    <el-card>
      <!--搜索-->
      <el-row :gutter="20">
        <el-col :span="5" style="margin-top:-20px;margin-left: 0px;width:290px">
          <el-input placeholder="角色名">
          </el-input>
        </el-col>
        <el-col :span="4" style="margin-top:-20px; margin-right: 20px;">
          <el-button type="primary"  @click="lookForUser(roleNumInfo.lookinfo)">搜索</el-button>
        </el-col>

        <el-button size='mini' style='position: absolute;right:50px;top:5px;' @click="removeGroup(scope.row.id)">删除
        </el-button>
        <el-button size='mini' style='position: absolute;right:130px;top:5px;' @click="addRoleFlag = true">+创建</el-button>
      </el-row>

      <!--表格-->
      <el-table :data="AllRoleInfo" border style="width: 100%">
        <el-table-column type="selection" width="55" style="border-right: 0px;">
        </el-table-column>
        <el-table-column prop="id" label="id" style="border-left: 0px;" width="437px">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名" width="280">
        </el-table-column>
        <el-table-column label="操作" width="470">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="updateRoleFlag = true">详情</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="removeGroup(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页区域-->
     <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="userNumInfo.pagenum" :page-sizes="[1, 2, 5, 10]"
                    layout="total, sizes, prev, pager, next, jumper" :total="total" :page-size="userNumInfo.pagesize" >
                </el-pagination>
    </el-card>

      <!-- 添加角色 -->
            <el-dialog title="角色添加" :visible.sync="addRoleFlag">
                <div class="roleFormBox">
                    <el-form :model="addRoleInfoForm" class="AddRoleForm" :rules="addRoleInfoFormRules">
                        <el-form-item label="角色名" prop="rolename" :label-width="formLabelWidth">
                            <el-input autocomplete="off" style="margin-left: 10px;" v-model="addRoleInfoForm.role_name">
                            </el-input>
                        </el-form-item>      
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addRoleFlag = false">取 消</el-button>
                    <el-button type="primary" @click="addRole">确 定</el-button>
                </div>
            </el-dialog>


    <!-- 管理角色 -->
    <el-dialog :visible.sync="updateRoleFlag" width="900px" style="line-height: 30px;" title="角色管理">
      <div>
      <!--权限窗口-->
      <el-form :model="ruleForm" :rules="rules"  label-width="100px" class="AddRoleForm">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="主页" name="type"></el-checkbox>
            <el-checkbox label="个人中心" name="type" checked="true"></el-checkbox>
            <el-checkbox label="我的任务" name="type"></el-checkbox>
            <el-checkbox label="题库管理" name="type"></el-checkbox>
            <el-checkbox label="任务管理" name="type"></el-checkbox>
            <el-checkbox label="学生组管理" name="type"></el-checkbox>
            <el-checkbox label="教师组管理" name="type"></el-checkbox>
            <el-checkbox label="班级管理" name="type"></el-checkbox>
            <el-checkbox label="用户管理" name="type"></el-checkbox>
            <el-checkbox label="角色管理" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateRolesConfig">确定更改</el-button>
          <el-button @click="updateRoleFlag = false">取消</el-button>
        </el-form-item>
      </el-form>
      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
  created() {
    this.getAllRole()
  },
  data() {
    return {
      //存放所有的角色信息
      AllRoleInfo: [],


      //   搜索框和翻页栏数据
      userNumInfo: {
        // 要查询的角色信息
        lookInfo: "",
        //   当前页数
        pagenum: 1,
        //   当前每页几项
        pagesize: 2,
      },
      // 总共有多少条数据
      total: 4,



      // 要添加角色的信息
      addRoleInfoForm: {
        role_name: "",
        menuIds: '',
      },


      // 要添加用户的信息表单规则
      addRoleInfoFormRules: {
        role_name: [],
        menuIds: [],
      },


      // 表单内宽度
      formLabelWidth: "120px",


      // 添加用户页面是否跳出
      addroleflag: false,


      // 要更新角色的信息
      updateUserInfoForm: {
        roleid: "",
        role_name: '',
        menuIds: '',
      },
      addRoleId: [],
      delRoleId: [],
      updateflag: true,
      whoupdateroleid: "",


      // 要更新角色的信息表单规则
      updateUserInfoFormRules: {
        roleid: [],
        role_name: [],
        menuIds: [],
      },


      // 更新用户页面是否跳出
      updateRoleFlag: false,


      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      //添加用户的表单数据
      addForm: {
        testname: ''
      },
      //添加表单的验证规则对象
      addFormrules: {
        testname: [
          { required: true, message: '请输入测试名称', trigger: 'blur' }
        ]
      },
      //

      //假数据以上，此处以下为题库操作的内容
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        delivery1: false,
        delivery2: false,
        type: [],
        resource: '',
        desc: ''
      },
      // 假数据
      // data: this.generateData(),
      // value: [1, 4],
      // tableData: [{
      //   id: '1',
      //   name: 'ddd',
      //   sum: '100',
      //   time: '2022-7-16'
      // }, {
      //   id: '2',
      //   name: 'ddd',
      //   sum: '100',
      //   time: '2022-7-16'
      // }, {
      //   id: '3',
      //   name: 'ddd',
      //   sum: '100',
      //   time: '2022-7-16'
      // }, {
      //   id: '4',
      //   name: 'ddd',
      //   sum: '100',
      //   time: '2022-7-16'
      // }]
    }
  },
  methods: {
    //获取全部角色的信息
    async getAllRole() {
      const res = await this.$http({
        url: '/api/role/get_list',
        method: 'post',
        data: "",
        params: {},
      })
      this.AllRoleInfo = res.data.data;
      this.total = res.data.data.length;
      console.log(this.AllRoleInfo);
    },



    //移除角色
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
      const delres = await this.$http({
        url: '/api/role/del',
        method: 'post',
        data: "",
        params: { roleids: id },
      })
      this.getAllRole()
      // 假操作
      // console.log(id)
      // this.tableData.splice(id, 1)

    },
    //增加角色
    async addRole() {
      // const res=await this.$http.post('/api/user/add',this.value)
      const res = await this.$http({
        url: '/api/role/add',
        method: 'post',
        data: "",
        params: this.addRoleInfoForm,
      })
      console.log(res)
      // console.log(this.addUserInfoForm)
      this.addRoleInfoForm = {}
      this.addRoleFlag = false
    },
    // 更新
    async updateRole() {
      // const res=await this.$http.post('/api/user/mod',this.value)
      this.updateUserInfoForm['roleid'] = this.whoupdateuserid,
        this.updateUserInfoForm['delMenu'] = this.delMenuId,
        this.updateUserInfoForm['addMenu'] = this.addMenuId
      console.log(this.updateroleInfoForm)
      const res = await this.$http({
        url: '/api/role/mod',
        method: 'post',
        data: "",
        params: this.updateroleInfoForm,
      })
      this.updateRoleFlag = false
      this.getAllRole()
    },
    //搜索角色
    async lookForUser(roleid) {
      if (roleid == "") {
        this.getAllRole()
      }
      else {
        const res = await this.$http({
          url: '/api/role/get',
          method: 'post',
          data: "",
          params: { roleid: roleid },
        })
        console.log(res)
        this.AllRoleInfo = [];
        this.AllRoleInfo.push({ id: roleid, realName: res.data.data.realname, roleName: res.data.data.uid });
        this.total = 1
        console.log(this.AllRoleInfo)
      }

    },
    // 查询单个用户
    async lookRole(id) {
      this.whoupdateuserid = id;
      // if(this.addRoleId==""||this.delRoleId==""){
      const res = await this.$http({
        url: '/api/role/get',
        method: 'post',
        data: "",
        params: { userid: id },
      })
      this.updateRoleInfoForm = res.data.data,
        console.log(this.updateRoleInfoForm)
      // }
      this.updateRoleFlag = true
    },
    // 翻页效果
    handleSizeChange(newSize) {
      this.userNumInfo.pagesize = newSize
    },
    // 页码值改变
    handleCurrentChange(newPage) {
      this.userNumInfo.pagenum = newPage
    },
    //测试操作
    generateData() {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    },
    openGroupInfo(id) {
      this.groupinfoName = this.tableData[id].name
    },
    // 获取选择更新后的权限
    updateRolesConfig() {
      console.log(this.form)
      this.createtest = false
    },
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

.el-card .el-row {
  height: 50px;
  display: flex;
  align-items: center;
}

.el-table {
  margin-top: 15px;
  font-size: 12px;
}

.el-dialog__header {
  height: 30px;
  line-height: 30px
}
</style>
<style>
.teacherGroupBox .el-table tr {
  line-height: 40px;
}
</style>