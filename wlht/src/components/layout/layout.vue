<template>
  <el-container>
    <el-aside>
      <div class="layout_header_logo">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="layout_nav_box">
        <nav>
          <ul>
              <router-link to="memberManagement" tag="li" activeactive-class="active">
                <span>
                  <img src="../../assets/img/1.png" alt="">
                </span>
                <p>商品管理</p>
              </router-link>
          </ul>
        </nav>
      </div>
    </el-aside>
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
  background: #fff;
  .layout_header_logo{
    img{
      width: 100%;
      display: block;
    }
  }
  .layout_nav_box{
    padding: .81rem 0 0 0;
    font-size: .2rem;
    .router-link-exact-active{
      background: #f2effe;
      border-left: 0.05rem solid #7F63F4;
      color: #7F63F4;
    }
    li{
      line-height: .56rem;
      height: .56rem;
      padding-left: .44rem;
      span{
        float: left;
        margin-right: .15rem;
      }
      
    }
  }
}
.el-header{
  height: .98rem!important;
  background: #fff;
}

</style>
