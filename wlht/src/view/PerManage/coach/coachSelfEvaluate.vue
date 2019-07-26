<template>
  <div class="wl_coachSelf" v-loading.fullscreen.lock="isLoading">
    <header>
      <span @click="close()">
        <img src="../../../assets/img/goback.png" alt>自评表
      </span>
    </header>
    <div class="coach_sele_main">
        <div>
            <div><span>训练主题：</span><span>{{assessDetail.name}}</span></div>
            <div><span>训练天气：</span><span>{{assessDetail.weather}}</span></div>
            <div><span>训练时长：</span><span>{{assessDetail.practice_time}}</span></div>
            <div><span>队员年龄：</span><span>{{assessDetail.student_age}}</span></div>
            <div><span>参与人数：</span><span>{{assessDetail.num}}</span></div>
        </div>
        <div>
            <div class="realize">
              <span>训练目标是否实现</span>
              <div>
                <span>{{assessDetail.realize1}}</span>
                <span>{{assessDetail.realize2}}</span>
                <span>{{assessDetail.realize3}}</span>
              </div>
            </div>
            <div><span>实践感受：</span><span>{{assessDetail.feel}}</span></div>
            <div><span>改进点：</span><span>{{assessDetail.modified}}</span></div>
        </div>
        <div>
            <div><span>组织能力：</span><span>{{assessDetail.organization}}</span></div>
            <div><span>沟通能力：</span><span>{{assessDetail.communication}}</span></div>
            <div><span>激励能力：</span><span>{{assessDetail.stimulate}}</span></div>
            <div><span>时间管理：</span><span>{{assessDetail.time_management}}</span></div>
            <div><span>观察能力：</span><span>{{assessDetail.observational}}</span></div>
            <div><span>提问引导：</span><span>{{assessDetail.probe}}</span></div>
            <div><span>应变能力：</span><span>{{assessDetail.strain_capacity}}</span></div>
            <div><span>幽默感：</span><span>{{assessDetail.humor}}</span></div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PerDetail",
  inject: ["reload"],
  props:{
    AssessDeatilID:{
      type:Number,
    }
  },
  data() {
    return {
      assessDetail:{},
      isLoading: true
    };
  },
  methods: {
  
    close() {
      this.$parent.iscoach = 1;
    },
    AssessDetail(){
      this.$http.get(this.$conf.env.upAssess + this.AssessDeatilID + '/').then( res =>{
        console.log(res)
        this.isLoading = false;
        this.assessDetail = res.data
      }).catch(err =>{
        this.isLoading = false;
        if(err.request.status == '404'){
            this.$message.error("找不到");
        }else{
          this.$message.error("网络错误");
        } 
      })
    }
  },
  mounted() {
    this.AssessDetail()
  }
};
</script>
<style lang="scss" >
.wl_coachSelf {
  margin: 0.13rem 0.18rem 0.13rem 0.13rem;
  padding: 0.3rem 0.45rem 0.33rem 0.3rem;
  background: #fff;
  height: calc(100% - 1.3rem);
  header {
    span {
      font-size: 0.2rem;
      color: #464a53;
      img {
        margin-right: 0.12rem;
      }
    }
  }
  .coach_sele_main{
    width: 80%;
    padding: .75rem 0 0;
    font-size: .16rem;
    color: #1a1a1a;
  }
  .coach_sele_main>div{
    display: flex;
    flex-wrap: wrap;
    div{
        span:last-child{
            color: #7f63f4;
        }
    }
    }
    .realize{
          display: flex;

    }
    .realize>span{
      width: 1.8rem;
      margin-right: .42rem;
    }
    .realize>div{
      display: flex;
      flex-direction: column;
      span{
        margin-bottom: .24rem;
        color: #7f63f4;
      }
    }
    .coach_sele_main>div:first-child{
        div{
            width:30%;
            height: .6rem;
        }
    }
    .coach_sele_main>div:nth-child(2){
        div{
            width:100%;
            min-height: 1rem;
        }
    }
    .coach_sele_main>div:last-child{
        div{
            width:25%;
            height: .6rem;
        }
    }
}
</style>
