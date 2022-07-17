<template>
  <div id="app" class="teacherGroupBox">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item>教师组</el-breadcrumb-item>
    </el-breadcrumb>


    <!--卡片视图-->
    <el-card>
      <!--搜索-->
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input placeholder="教师组名称">
            <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">搜索</el-button>
        </el-col>
        <el-button size='mini' style='position: absolute;right:20px;top:5px;'>删除</el-button>
        <el-button size='mini' style='position: absolute;right:90px;top:5px;'>+加入</el-button>
        <el-button size='mini' style='position: absolute;right:170px;top:5px;' @click="addGroupPanelFlag = true">创建
        </el-button>
      </el-row>

      <!--表格-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55" style="border-right: 0px;">
        </el-table-column>
        <el-table-column prop="id" style="border-left: 0px;" width="30px">
        </el-table-column>
        <el-table-column prop="name" label="教师组名" width="180">
        </el-table-column>
        <el-table-column prop="sum" label="人数">
        </el-table-column>
        <el-table-column prop="time" label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit">详情</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="removeGroup(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页区域-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[1, 2, 5, 10]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="4">
      </el-pagination>
    </el-card>
    <!-- 添加组 -->
    <el-dialog title="教师组创建" :visible.sync="addGroupPanelFlag" style="line-height: 30px;" width="50%">
      <el-form :model="addGroupInfoForm" class="teacherForm" style="margin-top: 30px;" :rules="addGroupInfoFormRules">
        <el-form-item label="教师组名" style="display: flex;margin-left: 50px;" prop="GroupName">
          <el-input autocomplete="off" style="margin-left: 10px;" v-model="addGroupInfoForm.GroupName"></el-input>
        </el-form-item>
        <el-form-item label="教师列表" style="display: flex;margin-left: 50px;">
          <div id="teacherList" style="margin-left: 15px;margin-top: 10px;width: 500px;height: 300px;">
            <el-transfer v-model="value" :data="data" style="width: 500px; display: flex;"></el-transfer>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGroupPanelFlag = false">取 消</el-button>
        <el-button type="primary" @click="setValue">确 定</el-button>
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
</template>
<script>
export default {
  data() {
    return {
      addGroupPanelFlag: false,
      addGroupInfoForm: {
        GroupName: "",
      },
      addGroupInfoFormRules: {
        GroupName: [{ required: true, message: '请输入教师组名称', trigger: 'blur' },]
      },


      // 组详情
      groupinfoName:"",



      // 假数据
      data: this.generateData(),
      value: [1, 4],




      tableData: [{
        id: '1',
        name: 'ddd',
        sum: '100',
        time: '2022-7-16'
      }, {
        id: '2',
        name: 'ddd',
        sum: '100',
        time: '2022-7-16'
      }, {
        id: '3',
        name: 'ddd',
        sum: '100',
        time: '2022-7-16'
      }, {
        id: '4',
        name: 'ddd',
        sum: '100',
        time: '2022-7-16'
      }]
    }
  },
  methods: {
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
      // 假操作
      console.log(id)
      this.tableData.splice(id, 1)

    },
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
    async setValue() {
      // const res=await this.$http.post('ip地址',this.value)
      this.addGroupPanelFlag = false
    },
    openGroupInfo(id){
      this.groupinfoName= this.tableData[id].name
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
<style scoped>
.teacherGroupBox .el-table tr {
  line-height: 40px;
}

.el-dialog__header .el-dialog__title {
  position: absolute;
  left: 30px;
}

.el-form-item .el-input .el-input__inner {
  width: 500px;
}

.el-checkbox .el-transfer-panel__item {
  position: absolute;
  display: flex;
  align-items: center;
}

.el-transfer-panel__item.el-checkbox__input {
  position: absolute;
  top: 8px;
  left: 0px;
}

.el-transfer-panel__item.el-checkbox__label {
  position: absolute;
  top: 8px;
}

.el-transfer__buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>