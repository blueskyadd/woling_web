<template>
  <div class="appoIntemnt_Box"  v-loading.fullscreen.lock="isLoading">
    <div class="AppoInontemt">
      <div class="Back" @click="goBack()"><img src="../../assets/img/goback_img.png" alt>返回</div>
      <div class="Tab_Box" >
        <div class="Tab_Scroll" >
          <div class="Today_Box" v-for="item in listTimeData" :key="item.id">
            <div class="Tab_Tit">{{item.day}}</div>
            <div class="ProWarp_Box">
              <div class="ProPeo_Box" v-for="value in item.pitch_time" :key="value.id">
                <div class="Pro_Num">{{value.start_time}}-{{value.end_time}}</div>
                <div class="Pro_Num">{{value.num}}人</div>
                <div class="chaKan" @click="setPitchTime(item.id)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <look-pitch v-if="PitchTime" :activelyId='activelyId'></look-pitch>
    </transition>
  </div>
</template>

<script>
import lookPitch from "./lookPitchTime.vue";
export default {
  name: "appointment",
  components: { lookPitch },
  props: {
    changId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      PitchTime: false,
      listTimeData: [],
      isLoading:true,
      activelyId: -1
    };
  },
  methods: {
    goBack() {
      this.$parent.isChangEdit = 1;
    },
    getPitchList() {
      this.$http.get(this.$conf.env.getPitchList + "").then(res => {
          console.log(res);
        })
        .catch(err => {
          this.$message.error("网络错误");
        });
    },
    setPitchTime(ID) {
      this.activelyId = ID
      this.PitchTime = true;

    },
    /**@name获取球场时间列表 */
    getptimeList() {
      this.$http
        .get(this.$conf.env.getptimeList + this.changId)
        .then(res => {
          console.log(res);
           this.isLoading = false
          if(!res.data || res.data.length == 0){
             this.$message({ message: '暂无数据', type: 'warning'});
          }else{
            this.listTimeData = res.data;
          }
        })
        .catch(err => {this.$message.error("网络错误");});
    }
  },
  mounted() {
    this.getptimeList();
    // this.getPitchList()
  }
};
</script>

<style scoped lang="scss">
.appoIntemnt_Box {
  padding: 0.24rem 0.32rem 0.47rem 0.32rem;
  background: RGBA(242, 245, 248, 1);
  width: 100%;
  height: calc(100% - 1.71rem);
  flex: 1;
  box-sizing: border-box;
  .AppoInontemt {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .Back {
      float: right;
      width:.94rem;
      height:.33rem;
      background:rgba(253,253,253,1);
      box-shadow:0px 3px 7px 0px rgba(6,33,88,0.3);
      border-radius:17px;
      font-size:.16rem;
      color:rgba(70,74,83,1);
      line-height:.33rem;
    }
    .Back img{
      margin: -.03rem .12rem 0;
    }
    .Tab_Box {
      width: 100%;
      height: 8.54rem;
      margin-top: 0.5rem;
      // position: absolute;
      // bottom: 0;
      // left: 0;
      overflow: hidden;
      .Tab_Scroll {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        // overflow-y: scroll;
        .Today_Box {
          .Tab_Tit {
            width: 100%;
            height: 0.36rem;
            font-size: 0.16rem;
            color: rgba(127, 99, 244, 1);
            line-height: 0.36rem;
            text-indent: 0.22rem;
            background: #fff;
          }
          .ProWarp_Box {
            display: flex;
            flex-wrap: wrap;
            .ProPeo_Box {
              width: 12.5%;
              height: 1.28rem;
              box-sizing: border-box;
              padding: 0.06rem 0;
              .Pro_Num {
                width: 0.94rem;
                height: 0.33rem;
                background: rgba(253, 253, 253, 1);
                box-shadow: 0px 3px 7px 0px rgba(6, 33, 88, 0.3);
                border-radius: 17px;
                text-align: center;
                margin: 0 auto;
                font-size: 0.16rem;
                color: rgba(127, 99, 244, 1);
                line-height: 0.33rem;
                margin-bottom: 0.08rem;
              }
              .chaKan {
                width: 0.33rem;
                height: 0.33rem;
                background: rgba(255, 255, 255, 1);
                border-radius: 50%;
                margin: 0 auto;
                background: url("../../assets/img/ck.png") no-repeat;
                background-size: 100%;
                cursor: pointer;
              }
            }
            :nth-child(2n-1) {
              background: rgba(205, 193, 255, 1);
            }
            :nth-child(2n) {
              background: rgba(242, 239, 254, 1);
            }
          }
        }
      }
    }
  }
}
</style>
