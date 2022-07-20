<template>
    <div id="app">
        <div class="words">主页 Version 1.0</div>


        <!--面包屑-->
        <el-breadcrumb class="bread" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">当前位置为：主页 </el-breadcrumb-item>
        </el-breadcrumb>



        <!--卡片区域-->

        <el-card class="card">
            <div class="word">任务信息</div>
        </el-card>

        <el-card class="cardt">
            <div class="word">最新公告信息</div>
        </el-card>
        <el-card class="cards">
            <div class="wordt">学习趋势图</div>
        </el-card>
        
    </div>
</template>



<script>
// import request from '../assets/js/api'

// export default{
//     data() {
//         return {
            
//         }
//     },
//     methods: {
//         resTest(){
//             request({
//                 method:'post',
//                 url:'/role/get_list',
//                 params:{},
//             })
//         }
//     },
// }
</script>



<style scoped>
.word {
    margin-top: -70px;
    margin-right: 410px;
}

.wordt {
    margin-top: -70px;
    margin-right: 980px;
}

.words {
    width: 200px;
    height: 80px;
    margin-top: -70px;
    margin-left: -30px;
}

.bread {
    margin-left: 1100px;
}

.card {
    width: 550px;
    height: 200px;
    margin-top: 10px;
    margin-left: 50px;
}

.cardt {
    width: 550px;
    height: 200px;
    margin-top: -202px;
    margin-left: 650px;
}

.cards {
    width: 1150px;
    height: 400px;
    margin-top: 20px;
    margin-left: 50px;
}
.sysNameBox{
    background-color: #306182;
    width: 201px;
    margin-left: -20px;
    margin-top: 2px;
}
</style>