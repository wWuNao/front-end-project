<template>
    <div id="app">
        <el-container>
            <!-- 头部 -->
            <el-header>
                <!-- 系统名称 -->
                <div class="sysNameBox">
                    <span>温理练习系统</span>
                    <span style="font-size: 4px ;margin-left:10px;">教师端</span>
                </div>
                <!-- 用户头像+用户名+退出+有公告提示图标 -->
                <div class="userInfoBox">
                    <img src="" alt="">
                    <img src="" alt="">
                    <el-dropdown :hide-on-click="false">
                        <span class="el-dropdown-link" style="margin-right: 30px;">
                            二哈<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item ><span  @click="loginOut">退出</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    
                </div>
            </el-header>
            <el-container>
                <!-- 侧边栏 -->
                <el-aside width="201px">
                    <el-menu>
                        <el-submenu :index="item.id" v-for="(item) in list.data">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">{{ item.name }}</span>
                            </template>
                            <el-menu-item :index="subItem.children_id" v-for="(subItem) in item.children">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span slot="title">{{ subItem.children_name }}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-container>
                    <!-- 主体区 -->
                    <el-main>Main</el-main>
                    <!-- 页脚区 -->
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>



<script>
export default {
    data() {
        return {
            // 用户头像点击处的选项
            
            // 假数据
            list: {
                data: [{
                    id:'1',
                    name: "主页",
                    children: "",
                },
                {
                    id:"2",
                    name: "题库管理",
                    children: [{ children_id:'2_1',children_name: "题库编辑", children: "" }],
                },
                {
                    id:"3",
                    name: "任务管理",
                    children: [{ children_id:'3_1',children_name: "练习管理", children: "" }, { children_id:'3_2',children_name: "考试管理", children: "" }],
                },
                {
                    id:"4",
                    name: "学生组管理",
                    children: "",
                },
                {
                    id:"5",
                    name: "教师组管理",
                    children: "",
                },
                {
                    id:"6",
                    name: "班级管理",
                    children: "",
                },
                {
                    id:"7",
                    name: "用户管理",
                    children: [{ children_id:'7_1',children_name: "管理员", children: "" }, { children_id:'7_2',children_name: "教师", children: "" }, { children_id:'7_3',children_name: "学生", children: "" }],
                },
                {
                    id:"8",
                    name: "个人中心",
                    children: [{ children_id:'8_1',children_name: "个人信息", children: "" }, { children_id:'8_2',children_name: "修改密码", children: "" },],
                },
                ]
            }
        }
    },
    methods: {
        loginOut() {
            console.log('nihao1')
            window.sessionStorage.clear()
            this.$router.push('/')
        }
    }
}
</script>


<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.el-header .userInfoBox {
    position: absolute;
    right: 20px;
}

.el-header .el-select {
    position: absolute;
    right: 20px;
    width: 100px;
}








.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 40px;
}




.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 745px;
}

.el-aside .el-menu {
    width: 200px;
    min-height: 400px;
}








.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body>.el-container {
    margin-bottom: 40px;
}
</style>