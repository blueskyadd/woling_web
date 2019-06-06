<template>
  <el-container>
    <el-aside>
      <div class="layout_header_logo">
        <img src="../../assets/img/logo.png" alt>
      </div>
      <div class="layout_nav_box">
        <nav>
          <ul>
            <router-link
              :to="item.link"
              tag="li"
              activeactive-class="active"
              v-for="(item, index) in tabList"
              :key="index"
            >
              <span>
                <img :src="item.image_normal" alt :class="{'active': item.link == $route.path}">
                <img :src="item.image_actively" alt :class="{'active': item.link != $route.path}">
              </span>
              <p>{{item.name}}</p>
            </router-link>
          </ul>
        </nav>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header">
          <div class="search-box">
            <div class="img-box">
              <img src="../../assets/img/Icon.png" alt>
            </div>
            <input type="text" class="search-ipt" placeholder="搜索...">
          </div>
          <div class="header-back" @click="showOut = !showOut">
            <div class="image-box">
              <img src="../../assets/img/header_img.jpg" alt>
            </div>
            <span>名字</span>
          </div>
          <transition name="el-zoom-in-top">
            <div  v-show="showOut" class="header_out transition-box">
              <span @click="goeditLogin(false)">更改密码</span><span @click="goeditLogin(true)">注销</span>
            </div>
          </transition>

        </div>
      </el-header>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      showOut: false,
      tabList: [
        {
          name: "会员管理",
          image_normal: require("../../assets/img/member_normal.png"),
          image_actively: require("../../assets/img/member_actively.png"),
          link: "/memberManagement"
        },
        {
          name: "非会员管理",
          image_normal: require("../../assets/img/nomember_normal.png"),
          image_actively: require("../../assets/img/nomember_actively.png"),
          link: "/NoMember"
        },
        {
          name: "课程管理",
          image_normal: require("../../assets/img/yx_normal.png"),
          image_actively: require("../../assets/img/yx_actively.png"),
          link: "/classManage"
        },
        {
          name: "比赛管理",
          image_normal: require("../../assets/img/bs_normal.png"),
          image_actively: require("../../assets/img/bs_actively.png"),
          link: "/GameManage"
        },
        {
          name: "场地管理",
          image_normal: require("../../assets/img/cd_normal.png"),
          image_actively: require("../../assets/img/cd_actively.png"),
          link: "/ChangManage"
        },
        {
          name: "员工管理",
          image_normal: require("../../assets/img/user_normal.png"),
          image_actively: require("../../assets/img/user_actively.png"),
          link: "/PerManage"
        },
        {
          name: "主推热点",
          image_normal: require("../../assets/img/rd_normal.png"),
          image_actively: require("../../assets/img/rd_actively.png"),
          link: "/pullRe"
        },
        {
          name: "订单管理",
          image_normal: require("../../assets/img/cd_normal.png"),
          image_actively: require("../../assets/img/cd_actively.png"),
          link: "/orderManage"
        },
        {
          name: "商城商品管理",
          image_normal: require("../../assets/img/cd_normal.png"),
          image_actively: require("../../assets/img/cd_actively.png"),
          link: "/shoppManage"
        }
      ]
    };
  },
  methods: {
    goeditLogin(flag){
      this.$store.commit("changeisEditOut", flag);
      this.$router.push({name:'LoginRegister'})
    }
  },
};
</script>

<style scoped lang="scss">
.el-container {
  width: 100% !important;
  height: 100% !important;
}
.el-aside {
  width: 3.2rem !important;
  background: #fff;

  .layout_header_logo {
    img {
      width: 100%;
      display: block;
    }
  }
  .layout_nav_box {
    padding: 0.81rem 0 0 0;
    font-size: 0.2rem;
    .active {
      display: none;
    }
    li {
      border-left: 0.05rem solid #fff;
    }
    .router-link-exact-active {
      background: #f2effe;
      border-left: 0.05rem solid #7f63f4;
      color: #7f63f4;

      .no_active {
        // display:
      }
    }
    li {
      line-height: 0.56rem;
      font-size: 0.16rem;
      height: 0.56rem;
      color: #888d98;
      padding-left: 0.44rem;
      span {
        float: left;
        margin-right: 0.15rem;
      }
    }
  }
}
.el-header {
  height: 0.98rem !important;
  background: #fff;
  padding: 0.24rem 0.66rem 0 .32rem;
  .header {
    width: 100%;
    height: 100%;
    // overflow: hidden;
    position: relative;
    .search-box {
      position: relative;
      overflow: hidden;
      float: left;
      font-size: .16rem;
      .search-ipt {
        width: 3.51rem;
        height: 0.5rem;
        background: #f3f3f3;
        border-radius: 3px;
        float: left;
      }
      .img-box {
        width: 0.55rem;
        height: 0.5rem;
        background: #f3f3f3;
        float: left;
        img {
          width: 0.13rem;
          height: 0.13rem;
          display: block;
          margin: 0 auto;
          margin-top: 0.18rem;
        }
      }
    }
    .header-back {
      float: right;
      overflow: hidden;
      cursor: pointer;
      margin-top: 0.1rem;
      margin-right: 4.4%;
      .image-box {
        float: left;
        img {
            width: 0.47rem;
            height: 0.47rem;
            display: block;
            border-radius: 50%;
            border: .02rem solid #d9d9d9;
        }
      }
      span {
        float: left;
        font-size: 0.19rem;
        color: #6a707e;
        margin-left: 0.15rem;
        line-height: .47rem;
      }
    }
    .header_out{
      width: 2rem;
      height: 1rem;
      background: #fff;
      position: absolute;
      right: 1.4%;
      bottom: -120%;
      z-index: 1;
      span{
        cursor: pointer;
        display: block;
        text-align: center;
        font-size: .16rem;
        line-height: .5rem;
       
      }
    }
  }
  
}
</style>
