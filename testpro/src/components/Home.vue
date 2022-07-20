<template>
    <div id="app">
        <el-container>
            <!-- 头部 -->
            <el-header>
                <!-- 系统名称 -->
                <div class="sysNameBox">
                    <span>温理练习系统</span>
                    <span style="font-size: 4px ;margin-left:10px;">{{ systemEnd[loginuserInfo.end] }}</span>
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
                            <el-dropdown-item><span @click="loginOut">退出</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                </div>
            </el-header>
            <el-container>
                <!-- 侧边栏 -->
                <el-aside width="201px">
                    <el-menu :router="true" :default-active="chooseTabObj">
                        <el-menu-item :index="subItem.linkUrl" v-for="(subItem) in list" @click="changechooseTabObj(subItem.linkUrl)">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">{{ subItem.menuName }}</span>
                            </template>
                        </el-menu-item>
                    </el-menu>
                    <!-- <el-button type="info" @click="playinfo">mihao</el-button> -->
                </el-aside>
                <el-container>
                    <!-- 主体区 -->
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <!-- 页脚区 -->
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>



<script>
import store from '@/store'

export default {
    data() {
        return {
            // 存放当前那个菜单项被选中
            chooseTabObj:'/home',
            // 存放是什么端（学生/后台）
            systemEnd: {
                'A': "学生端",
                'B': '教师端'
            },
            // 登录者信息
            loginuserInfo:store.getters.getMenuBarContents.info,
            // 侧边栏内容列表
            TabList:store.getters.getMenuBarContents.route,
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------
            // 请将真数据放在此线之上，不然最后被删除请不要怪在下，同时请在测试结束后将使用该方法的对象元素删除或者注释，或者让对方不能调用此方法
            // 假数据
            list: store.getters.getMenuBarContents.route
        }
    },
    methods: {
        loginOut() {
            console.log('nihao1')
            window.sessionStorage.clear()
            this.$router.push('/')
        },
        changechooseTabObj(link){
            this.chooseTabObj=link;
        },




// ----------------------------------------------------------------------------------------------------------------------------------------------------------------
            // 请将实际有用的方法放在此线之上，不然最后被删除请不要怪在下
            // 测试方法
        playinfo() {
            console.log(this.list)
        }
    }
}
</script>


<style scoped>
/* 头部区域 */
.el-header {
    background-color: #41769B;
    color: #fff;
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







/* 脚部区域 */
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 40px;
}



/* 侧边栏区域 */
.el-aside {
    background-color: #263238;
    /* color: #333; */
    text-align: center;
    line-height: 200px;
    height: 745px;
}

.el-aside .el-menu {
    background-color: #263238;
    width: 200px;
    min-height: 400px;
}
.el-aside .el-menu span {
    color: #fff;
    
}
.el-aside .el-menu .el-menu-item{
    display: flex;
}
.el-aside .el-menu .el-menu-item i{
    display: flex;
    align-items:center;
}
.el-aside .el-menu .el-menu-item:hover{
    background-color: #44b4ec;
}
.el-menu:hover {
    background-color: #263238;
}
.el-dropdown-link {
    color: #fff;
}
.el-aside.is-active {
    background-color: #E6F7FF;
}





/* 主题区域 */
.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}




/* 除头部区域的所有区域 */
body>.el-container {
    margin-bottom: 40px;
}
</style>