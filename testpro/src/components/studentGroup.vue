<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>学生组</el-breadcrumb-item>
    </el-breadcrumb>


    <!--卡片视图-->
    <el-card>
      <!--搜索-->
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input placeholder="教师组名称">
            <el-button slot="append" icon="el-icon-search"></el-button>
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
        <el-table-column prop="id" label="id" width="180">
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
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
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
        id: '1',
        name: 'ddd',
        sum: '100',
        time: '2022-7-16'
      }, {
        id: '1',
        name: 'ddd',
        sum: '100',
        time: '2022-7-16'
      }, {
        id: '1',
        name: 'ddd',
        sum: '100',
        time: '2022-7-16'
      }]
    }
  }
}
</script>
 <!--样式-->
<style >
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}

.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}

.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>