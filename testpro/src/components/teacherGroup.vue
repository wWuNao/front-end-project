<template>
  <div id="app" class="teacherGroupBox">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
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
        <el-button size='mini' style='position: absolute;right:170px;top:5px;'>创建</el-button>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      this.tableData.splice(id,1)

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
</style>
<style>
.teacherGroupBox .el-table tr {
  line-height: 40px;
}
</style>