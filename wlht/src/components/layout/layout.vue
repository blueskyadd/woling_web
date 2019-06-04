<template>
  <el-container>
    <el-aside></el-aside>
    <el-container>

      <el-header></el-header>
      <router-view></router-view>
    </el-container>
  </el-container>

</template>

<script>
    export default {
        name: "layout"
    }
</script>

<style scoped lang="scss">
.el-container{
  width: 100% !important;
  height: 100% !important;
}
.el-aside{
  width: 3.2rem !important;
  background: red;

}
.el-header{
  height: 1rem!important;
  background: black;
}

</style>
