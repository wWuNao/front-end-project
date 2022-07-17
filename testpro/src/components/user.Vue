<template>
    <div id="app">
        <div class="words">个人信息 Version 1.0</div>
        <!--面包屑-->
        <el-breadcrumb class="bread" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">当前位置为：个人信息 </el-breadcrumb-item>
        </el-breadcrumb>


        <!--卡片区域-->
        <el-card class="cardf">
            <div class="page">图片位置</div>
            <div class="na">姓名和性别</div>
            <div class="xx" style="margin-top:-50px">所属学院：</div>
            <div class="xx">所属班级：</div>
            <div class="xx">手机号：</div>
            <div class="xx">微信号：</div>
        </el-card>
    </div>
</template>



<script>

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

.sysNameBox {
    background-color: #306182;
    width: 201px;
    margin-left: -20px;
    margin-top: 2px;
}


.cardf {
    margin-top: 40px;
    margin-left: 200px;
    width: 850px;
    height: 550px;
}

.page {
    margin-right: 550px;
    margin-top: -20px;
}

.na {
    margin-top: -150px;
    margin-right: 300px;
}
.xx{
    width: 90px;
    height:90px;
    margin-left: 190px;
    font-size: 15px;
}

</style>