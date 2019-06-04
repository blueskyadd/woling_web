<template>
  <el-container>
    <el-aside>
      <div class="layout_header_logo">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="layout_nav_box">
        <nav>
          <ul>
              <router-link :to="item.link" tag="li" activeactive-class="active" v-for="(item, index) in tabList" :key="index">
                <span>
                  <img :src="item.image_normal" alt="" :class="{'active': item.link == $route.path}">
                  <img :src="item.image_actively" alt="" :class="{'active': item.link != $route.path}">
                </span>
                <p>{{item.name}}</p>
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
        name: "layout",
        data(){
          return{
            tabList:[
              {
                name: '商品管理',
                image_normal:require('../../assets/img/member_normal.png'),
                image_actively: require('../../assets/img/member_actively.png'),
                link: '/memberManagement'
              },
              {
                name: '非会员管理',
                image_normal:require('../../assets/img/nomember_normal.png'),
                image_actively: require('../../assets/img/nomember_actively.png'),
                link: '/index'
              },
              {
                name: '课程管理',
                image_normal:require('../../assets/img/yx_normal.png'),
                image_actively: require('../../assets/img/yx_actively.png'),
                link: '/index'
              },
              {
                name: '课表管理',
                image_normal:require('../../assets/img/shop_normal.png'),
                image_actively: require('../../assets/img/shop_actively.png'),
                link: '/index'
              },
              {
                name: '比赛管理',
                image_normal:require('../../assets/img/bs_normal.png'),
                image_actively: require('../../assets/img/bs_actively.png'),
                link: '/index'
              },
              {
                name: '主推热点',
                image_normal:require('../../assets/img/rd_normal.png'),
                image_actively: require('../../assets/img/rd_actively.png'),
                link: '/index'
              },
              {
                name: '场地管理',
                image_normal:require('../../assets/img/cd_normal.png'),
                image_actively: require('../../assets/img/cd_actively.png'),
                link: '/index'
              },
              {
                name: '任职人员管理',
                image_normal:require('../../assets/img/user_normal.png'),
                image_actively: require('../../assets/img/user_actively.png'),
                link: '/index'
              }
            ]
          }
        },
        mounted() {
          console.log(this.$route.path)
        },
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
    .active{
        display: none;
      }
    li{
      border-left: 0.05rem solid #fff;

    }
    .router-link-exact-active{
      background: #f2effe;
      border-left: 0.05rem solid #7F63F4;
      color: #7F63F4;
      
      .no_active{
        // display: 
      }
    }
    li{
      line-height: .56rem;
      font-size: .16rem;
      height: .56rem;
      color: #888d98;
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
