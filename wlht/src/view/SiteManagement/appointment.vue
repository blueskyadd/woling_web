<template>
    <div class="appoIntemnt_Box">
      <div class="AppoInontemt">
          <div class="Back" @click="goBack()">返回</div>
          <div class="Tab_Box">
            <div class="Tab_Scroll">
              <div class="Today_Box">
                <div class="Tab_Tit">2019.03.18</div>
                <div class="ProWarp_Box">
                  <div class="ProPeo_Box">
                  <div class="Pro_Num">0~2</div>
                  <div class="Pro_Num">3人</div>
                  <div class="chaKan"></div>
                </div>
                  <div class="ProPeo_Box">
                    <div class="Pro_Num">0~2</div>
                    <div class="Pro_Num">3人</div>
                    <div class="chaKan"></div>
                  </div>
                  <div class="ProPeo_Box">
                    <div class="Pro_Num">0~2</div>
                    <div class="Pro_Num">3人</div>
                    <div class="chaKan"></div>
                  </div>
                  <div class="ProPeo_Box">
                    <div class="Pro_Num">0~2</div>
                    <div class="Pro_Num">3人</div>
                    <div class="chaKan"></div>
                  </div>
                  <div class="ProPeo_Box">
                    <div class="Pro_Num">0~2</div>
                    <div class="Pro_Num">3人</div>
                    <div class="chaKan"></div>
                  </div>
                  <div class="ProPeo_Box">
                    <div class="Pro_Num">0~2</div>
                    <div class="Pro_Num">3人</div>
                    <div class="chaKan"></div>
                  </div>
                  <div class="ProPeo_Box">
                    <div class="Pro_Num">0~2</div>
                    <div class="Pro_Num">3人</div>
                    <div class="chaKan"></div>
                  </div>
                  <div class="ProPeo_Box">
                    <div class="Pro_Num">0~2</div>
                    <div class="Pro_Num">3人</div>
                    <div class="chaKan" @click="setPitchTime"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    <transition name="el-fade-in-linear">
      <look-pitch v-if="PitchTime"></look-pitch>
    </transition>
    </div>
</template>

<script>
import lookPitch from "./lookPitchTime.vue";
    export default {
        name: "appointment",
        components:{lookPitch},
        data(){
          return{
            PitchTime:true
          }
        },
        methods:{
          goBack(){
            this.$parent.isChangEdit = 1
          },
          getPitchList(){
            this.$http.get(this.$conf.env.getPitchList + '').then( res =>{
            console.log(res)
            }).catch(err =>{
            this.$message.error('网络错误');
            })
          },
          setPitchTime(){
            this.PitchTime = true
          }
        },
        mounted(){
          // this.getPitchList()
        }
    }
</script>

<style scoped lang="scss">

  .appoIntemnt_Box{
    padding:.24rem .32rem .47rem .32rem;
    background: RGBA(242, 245, 248, 1);
    width: 100%;
    height: calc(100% - 1.71rem);
    flex: 1;
    box-sizing: border-box;
    .AppoInontemt{
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
        .Back{
          // float: right;
          // width:.94rem;
          // height:.33rem;
          // background:rgba(253,253,253,1);
          // box-shadow:0px 3px 7px 0px rgba(6,33,88,0.3);
          // border-radius:17px;
          // font-size:.16rem;
          // color:rgba(70,74,83,1);
          // line-height:.33rem;
        }
        .Tab_Box{
          width: 100%;
          height: 8.54rem;
          margin-top: .24rem;
          // position: absolute;
          // bottom: 0;
          // left: 0;
          overflow: hidden;
          .Tab_Scroll{
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            // overflow-y: scroll;
            .Today_Box{
              .Tab_Tit{
                width: 100%;
                height: .36rem;
                font-size:.16rem;
                color:rgba(127,99,244,1);
                line-height:.36rem;
                text-indent: .22rem;
                background: #fff;
              }
              .ProWarp_Box{
                display: flex;
                flex-wrap: wrap;
                .ProPeo_Box{
                  width:12.5%;
                  height:1.28rem;
                  box-sizing: border-box;
                  padding:.06rem 0;
                  .Pro_Num{
                    width:.94rem;
                    height:.33rem;
                    background:rgba(253,253,253,1);
                    box-shadow:0px 3px 7px 0px rgba(6,33,88,0.3);
                    border-radius:17px;
                    text-align: center;
                    margin: 0 auto;
                    font-size: .16rem;
                    color:rgba(127,99,244,1);
                    line-height:.33rem;
                    margin-bottom: .08rem;
                  }
                  .chaKan{
                    width:.33rem;
                    height:.33rem;
                    background:rgba(255,255,255,1);
                    border-radius:50%;
                    margin: 0 auto;
                    background: url("../../assets/img/ck.png") no-repeat;
                    background-size: 100%;
                    cursor: pointer;
                  }
                }
                :nth-child(2n-1){

                  background:rgba(205,193,255,1);
                }
                :nth-child(2n){

                  background:rgba(242, 239, 254, 1);
                }
              }
            }
          }
        }
    }
  }
</style>
