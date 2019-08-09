<template>
    <div class="LoginBox">
        <div class="Login_Init" :class="AA ?'':'activea'">
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
            <span @click="rememberPassword = !rememberPassword" :class="rememberPassword ? 'active jizhu_k' : 'jizhu_k'"></span>
            <span class="juzhu_W">记住密码</span>
          </div>
          <div class="Login"  @click="LoginDown()">登录</div>
          <span class="wangji" @click="changeAA">忘记密码</span>
        </div>
        <div class="Register_Init" :class="!AA?'':'activeb'">
          <p class="Login_Tit"><i class="el-icon-arrow-left" @click="changeAAs"></i><span>修改密码</span></p>
          <div class="username_Box">
            <div class="ImageBox">

            </div>
            <el-input v-model="username" placeholder="账号"></el-input>
          </div>
          <div class="username_Box YZM_Box">
            <div class="ImageBox_YZ"></div>
            <el-input v-model="YZM" placeholder="验证码"></el-input>
            <div class="Get_YZM" @click="isTimeDown && setTime()">{{isTimeDown ? '获取验证码': timeDown}}</div>
          </div>
          <div class="username_Box">
            <div class="ImageBox_Pas"></div>
            <el-input v-model="NewPas" placeholder="新密码" show-password></el-input>
          </div>
          <div class="username_Box">
            <div class="ImageBox_Pas"></div>
            <el-input v-model="OKPas" placeholder="确认密码" show-password></el-input>
          </div>
          <div  @click="LoginSubmit"  :class="!AA?'Login':'activeb Login'">确定</div>

        </div>
    </div>
</template>

<script>
import store from "../store/index.js"
    export default {
        name: "LoginRegister",
      data() {
        return {
          username: this.$store.state.userName ? this.$store.state.userName : '',
          password: this.$store.state.Password ? this.$store.state.Password : '',
          YZM:'',
          NewPas:'',
          OKPas:'',
          timeDown: 60,
          isTimeDown: true,
          rememberPassword: this.$store.state.Password ? true : false,
          AA: this.$store.state.isEditOut ,
        }
      },
      computed: {
            //获取企业资质的宽度
          getAA() {
            return this.$store.state.isEditOut;
          }
      },
      mounted(){
        console.log(this.AA)
      },
      methods:{
        changeAA(){
          console.log(13)
          this.AA =  false
        },
        changeAAs(){
          this.AA = true
        },
        isLoading(){
            
        },
        setTime(){
          this.getCode()
        },
        Countdown(){
          var that = this
          if(this.timeDown == 50){
            window.clearTimeout()
            this.isTimeDown = true
            return false
          }
          setTimeout(()=>{
            that.timeDown -=1
            that.Countdown()
          },1000)
        },
        LoginDown(){
          if(!this.VerificationData(1)) return
          const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
          console.log(this.username, this.password)
          var params={
            'username': this.username.replace(/(^\s*)|(\s*$)/g, ""),
            'password': this.password,
            'remember': this.rememberPassword
          }
          console.log(params)

          this.$http.post(this.$conf.env.loginWeb , params).then( res =>{
            if(res.status == '201'){
                 loading.close()
              if(res.data.token){
                sessionStorage.setItem('jp_token', res.data.token)
                this.$router.replace({name:"memberManagement"})
              }
            }else{
                loading.close()
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                });
              }
          }).catch(err =>{
            loading.close()
            if(err.response.status== ' 401'){
              this.$message({
                message: err.response.data.message,
                duration:1000,
                type: 'warning'
              });
            }else{
              this.$message.error("网络错误");
            }
          })
        },
        /**@name 获取短信验证码 */
        getCode(){
          if(!this.VerificationData(3)) return
          var params={
            'username': this.username.replace(/(^\s*)|(\s*$)/g, "")
          }
          this.$http.post(this.$conf.env.getCode, params).then(res =>{
            if(res.status == '200'){
                this.isTimeDown = false
                this.Countdown()
            }
          }).catch(err =>{
            if(err.response.state == '500'){
              this.$message.error("服务器错误");
            }else  if(err.response.status== ' 400'){
              this.$message({
                message: '用户不存在',
                duration:1000,
                type: 'warning'
              });
            }
          })
        },

        /**@name手机号验证 */
        VerificationData(flag){
           var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
           if(flag == 1){
             if(!this.username || !this.password){
                  this.$message({ message: '请完善您的信息', type: 'warning'});
                  return false
              }
           }else if(flag == 2){
             if(!this.username || !this.NewPas || !this.OKPas || !this.YZM){
                  this.$message({ message: '请完善您的信息', type: 'warning'});
                  return false
              }else{
                if(this.NewPas != this.OKPas){
                  this.$message({
                    message: "两次密码输入不一致",
                    type: "warning"
                  });
                  return false
                }
              }
           }
            if (!myreg.test(this.username.replace(/(^\s*)|(\s*$)/g, ""))) {
              this.$message({ message: '请填写正确的手机号', type: 'warning'});
              return false
            }else{
              return true
            }
           
            
        },
        LoginSubmit(){
          if(!this.VerificationData(2)) return
          
          const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
          
          console.log(this.username, this.password)
          var params={
            'username': this.username.replace(/(^\s*)|(\s*$)/g, ""),
            'code': this.YZM.replace(/(^\s*)|(\s*$)/g, ""),
            'password': this.NewPas,
            'password1': this.OKPas
          }
          console.log(params)
          this.$http.post(this.$conf.env.setPassWord , params).then( res =>{
            if(res.status == '201'){
                loading.close()
              if(res.data.token){
                sessionStorage.setItem('jp_token', res.data.token)
                this.$router.push({name:"memberManagement"})
              }
            }else{
                loading.close()
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                });
              }
          }).catch(err =>{
             loading.close()
            if(err.response.status== ' 401'){
              this.$message({
                message: err.response.data.message,
                duration:1000,
                type: 'warning'
              });
            }else{
              this.$message.error("网络错误");
            }
          })
        }
      },
      watch:{
        rememberPassword(newData, oldData){
          if(newData == true){
            this.$store.commit('rememberPassword',{'userName': this.username, 'Password': this.password})
          }else{
            this.$store.commit('rememberPassword',{'userName': this.username, 'Password': ''})

          }
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
    .el-input__suffix{
      right: .1rem;
    }
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
