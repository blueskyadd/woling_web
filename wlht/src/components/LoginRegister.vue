<template>
    <div class="LoginBox">
        <div class="Login_Init" :class="AA == 0?'':'activea'">
          <p class="Login_Tit">用户登录</p>
          <div class="username_Box">
            <div class="ImageBox">

            </div>
            <el-input v-model="username" placeholder="账号"></el-input>
          </div>
          <div class="username_Box">
            <div class="ImageBox_Pas"></div>
            <el-input v-model="password" placeholder="密码" show-password></el-input>
          </div>
          <div class="jizhu_Pas">
            <span class="jizhu_k active"></span>
            <span class="juzhu_W">记住密码</span>
          </div>
          <div class="Login">登录</div>
          <span class="wangji" @click="changeAA">忘记密码</span>
        </div>
        <div class="Register_Init" :class="AA == 1?'':'activeb'">
          <p class="Login_Tit"><i class="el-icon-arrow-left" @click="changeAAs"></i><span>修改密码</span></p>
          <div class="username_Box">
            <div class="ImageBox">

            </div>
            <el-input v-model="username" placeholder="账号"></el-input>
          </div>
          <div class="username_Box YZM_Box">
            <div class="ImageBox_YZ"></div>
            <el-input v-model="YZM" placeholder="验证码"></el-input>
            <div class="Get_YZM">获取验证码</div>
          </div>
          <div class="username_Box">
            <div class="ImageBox_Pas"></div>
            <el-input v-model="NewPas" placeholder="新密码" show-password></el-input>
          </div>
          <div class="username_Box">
            <div class="ImageBox_Pas"></div>
            <el-input v-model="OKPas" placeholder="确认密码" show-password></el-input>
          </div>

          <div class="Login">登录</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginRegister",
      data() {
        return {
          username: '',
          password:'',
          YZM:'',
          NewPas:'',
          OKPas:'',
          AA:0,
        }
      },
      methods:{
        changeAA(){
          console.log(13)
          this.AA = 1
        },
        changeAAs(){
          this.AA = 0
        }
      }
    }
</script>

<style lang="scss">

  .LoginBox{
    width: 100%;
    height: 100%;
    background: url("../assets/img/bj.png") no-repeat;
    background-size: cover;
    position: relative;
    .activea{
      /*transform: rotateY(90deg) !important;*/
      opacity: 0 !important;
    }
    .activeb{
     /* transform: rotateY(90deg) !important;*/
      opacity: 0 !important;
      z-index: -1;
    }
    .Login_Init,.Register_Init{
      position: absolute;
      left: 60.15%;
      top: 13.85%;
      /*transform: rotateY(0deg);
      transition:transform 1s;*/

      opacity: 1;
      transition:opacity 1s;

        /*      transform: ;*/
      /*width: 5.47rem;*/
      /*height: 5.56rem;*/
      /*background: red;*/
      .Login_Tit{
        font-size:.34rem;
        font-weight:400;
        color:rgba(67,145,0,1);
        overflow: hidden;
        margin-bottom: .78rem;
        i{
          font-weight: 900;
          margin-right: .1rem;
          font-size: .4rem;
          float: left;
          cursor: pointer;
        }
        span{
          float: left;
          margin-top: -0.06rem;
          display: block;
        }
      }
      .username_Box{
        width:5.47rem;
        height:.7rem;
        background:#fff;
        border:1px solid rgba(223, 223, 223, 1);
        display: flex;
        margin-bottom: .49rem;
        align-items: center;
        .ImageBox{
          width: .81rem;
          height: 100%;
          background: url("../assets/img/User.png") no-repeat;
          background-position: center;
          background-size: .31rem .33rem;
        }
        .ImageBox_Pas{
          width: .81rem;
          height: 100%;
          background: url("../assets/img/pass.png") no-repeat;
          background-position: center;
          background-size: .31rem .33rem;
        }
        .ImageBox_YZ{
          width: .81rem;
          height: 100%;
          background: url("../assets/img/YZM.png") no-repeat;
          background-position: center;
          background-size: .31rem .33rem;
        }
        .el-input{
          flex: 1;
        }
        .el-input__inner{
          height: 100%;
          border: 0;
          display: block;
          font-size:.22rem;
          font-weight:400;
          color:rgba(93,93,93,1);
          line-height: .7rem;
        }
      }
      .YZM_Box{
        .el-input{
          flex: none;
          width: 65%;
        }
        .Get_YZM{
          border-left: 1px solid rgba(67,145,0,1);
          height:.56rem;

          font-size:.17rem;
          color:rgba(67,145,0,1);
          line-height:.56rem;
          text-align: center;
          width: 20%;
        }
      }
      .jizhu_Pas{
        overflow: hidden;
        margin-bottom: .42rem;
        span{
          float: left;
        }
        .jizhu_k{
          width:.35rem;
          height:.35rem;
          border:1px solid rgba(67, 145, 1, 1);
          margin-right: .22rem;
          cursor: pointer;
          &.active{
            background: url("../assets/img/gou.png") no-repeat;
            background-position: center;
          }
        }
        .juzhu_W{
          font-size:.22rem;
          color:rgba(136,136,136,1);
          line-height:.35rem;
        }
      }
      .Login{
        width:5.47rem;
        height:.78rem;
        background:RGBA(67, 145, 0, 1);
        font-size:.34rem;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:.75rem;
        text-align: center;
        margin-bottom: .28rem;
        cursor: pointer;
      }
      .wangji{
        font-size:.22rem;
        font-weight:400;
        color:rgba(67,145,0,1);
        float: right;
        cursor: pointer;
      }
    }
    .Register_Init{
      /*transform: rotateY(0deg);*/
      opacity: 1;
    }
  }
</style>
