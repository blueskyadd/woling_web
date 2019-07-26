<template>

  <div class="up_Assess" v-loading.fullscreen.lock="isLoading">
    <div class="box" @click="setParentData()"></div>
    <div class="model">
      <div class="header">
        <!-- <span></span> -->
        <p>预约查看</p>
        <span @click="setParentData()">
          <img src="../../assets/img/close.png" style="cursor: pointer;" alt srcset>
        </span>
      </div>
      <el-main>
          <label>
            <span>主题</span>
            <input placeholder="请填写主题" type="text" v-model="classtheme">
          </label>
          <label class="classTime">
            <span>选择考核日期</span>
              <el-date-picker
                value-format="yyyy-MM-dd"
                 :picker-options="expireTimeOption"
                class="birtody"
                v-model="statusTime"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
          </label>
          <label>
          <span>考核门店</span>
          <el-select popper-class="per_selete_list" v-model="PithId" placeholder="请选择门店">
            <el-option v-for="item in PithList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </label>
        <div>
            <el-button @click="uploadupAssess()">确定</el-button>
            <el-button @click="setParentData()">取消</el-button>
        </div>
        
    </el-main>
    </div>
  </div>
</template>
<script>
export default {
  name: "upAssess",
  data() {
    return {
      isLoading: false,
      PithList: [], //场地列表
      classtheme: '',
      PithId: '',
      statusTime: '',
    };
  },
  computed: {
    sumNumber() {
      var num = 0;
      this.totaldata.forEach(element => {
        num += element.num__sum;
      });
      return num;
    },
    
  },
  methods: {
    setParentData(){
      this.$parent.isupAssess = false
    },
    getPitchList() {
      this.$http
        .get(this.$conf.env.setPitchData)
        .then(res => {
          this.PithList = res.data;
        })
        .catch(err => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },
    uploadupAssess(){
        if(!this.VerificationData()) return;
        var params = {
            'name':this.classtheme,
            'date':this.statusTime,
            'store':this.PithId,
        }
        this.isLoading  = true;
        this.$http.post(this.$conf.env.upAssess, params).then( res =>{
            this.isLoading = false;
            this.$message({ message: '发起成功', type: 'success'});
            this.setParentData()
        }).catch(err =>{
            this.isLoading = false;
            if(err.request.status == '400'){
                this.$message.error("该日期已不可创建哦");
            }else{
                this.$message.error("网络错误");
            }
        })
    },
    VerificationData(){
        if(!this.classtheme || !this.PithId|| !this.statusTime){
            this.$message({ message: '请完善您的信息', type: 'warning'});
            return false;
        }else{
            return true;
        }
    },
    
  },
  mounted() {
      this.getPitchList()
  },
};
</script>
<style lang="scss"  >
.up_Assess {
  position: fixed;
  width: 200%;
  height: 100%;
  left: -10rem;
  z-index: 2;
  .box {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
  }
  .model {
    width: 8.47rem;
    height: 5.39rem;
    border-radius: 0.05rem;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    margin: auto;

    .header {
      height: 0.5rem;
      background: rgba(159, 136, 255, 1);
      display: flex;
      justify-content: space-between;
      p {
        font-size: 0.16rem;
        color: rgba(255, 254, 254, 1);
        margin-top: 0.18rem;
        margin-left: 0.33rem;
        text-align: left;
      }
      span {
        margin-top: 0.21rem;
        margin-right: 0.3rem;
        img {
          display: block;
          width: 0.17rem;
          height: 0.17rem;
        }
      }
    }
    /*主体*/
    .el-main {
    padding: 0 .31rem;
    display: flex;
    flex-direction: column;
    // align-items: center;
    padding-left: .95rem;
    padding-top: .75rem;
        label{
            display: flex;
            align-items: center;
            margin-bottom: .32rem;
            
        }
        label>span{
            display: block;
            font-size: .16rem;
            width: 1.36rem;
            color: #333;
            font-weight: 400;
        }
        label>input{
            font-size: .18rem;
            border: 1px solid #C0C4CC;
            width: 3.77rem;
            padding-left: .21rem;
            height: .49rem;
        }
        
    }
    .el-main>div{
        .el-button{
            width: 1.57rem;
            height: .42rem;
            margin-right: .95rem;
            background: #7f63f4;
            color: #fff;
            font-size: .16rem;
            margin-top: .4rem;
        }
        .el-button:first-child{
            margin-left: .83rem;
        }
        .el-button:last-child{
            background: #fff;
            color: #7f63f4
        }
    }
  }
}
</style>
