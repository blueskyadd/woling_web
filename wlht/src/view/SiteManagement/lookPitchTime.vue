<template>

  <div class="wl_lookPitch" v-show="flag">
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
            <el-table
                v-loading="isLoading"
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="name"
                label="姓名">
                </el-table-column>
                <el-table-column
                style="text-align:left"
                prop="mobile"
                label="联系方式"
                >
                </el-table-column>
                <el-table-column
                prop="num"
                label="人数">
                </el-table-column>
                <el-table-column
                style=""
                prop="info"
                label="用途">
                </el-table-column>
            </el-table>
        </el-main>
    </div>
  </div>
</template>
<script>
export default {
  name: "lookPitch",
  props: {
    activelyId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      flag: true,
      oneName: '',
      twoName: '',
      threeName: '',
      title: [{ name: "" }, { name: "" }, { name: "" }],
      tableData: [],
      totaldata: [],
      isLoading: false
    };
  },
  computed: {
    sumNumber() {
      var num = 0;
      this.totaldata.forEach(element => {
        num += element.num__sum;
      });
      return num;
    }
  },
  methods: {
    getAcitvelyThreeLifeList() {
      this.$http
        .get(this.$conf.env.getAcitvelyThreeLifeList + this.activelyId)
        .then(res => {
          this.isLoading = false;
          this.tableData = res.data
        })
        .catch(err => {
          this.isLoading = false;
        });
    },
    setParentData(){
    //   this.$parent.activelyId = -1
      this.$parent.PitchTime = false
    },
  },
  mounted() {
    this.getAcitvelyThreeLifeList();
  }
};
</script>
<style lang="scss"  >
.wl_lookPitch {
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
    width: 12.2rem;
    height: 8.11rem;
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
    .el-table .cell{
      overflow: hidden;
      -webkit-box-orient: vertical;
      padding: 0!important;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      word-wrap: break-word;
    }
      .view-box {
        width: 100%;
        height: 100%;
        padding: 0.24rem 0 0.53rem;
        box-sizing: border-box;
        .table-box {
          width: 100%;
          height: 100%;
          .manage-tit {
            width: 100%;
            overflow: hidden;
            
            img {
              display: block;
              float: right;
              // margin-bottom: .4rem;
              width: 0.94rem;
              height: 0.33rem;
              cursor: pointer;
            }
          }
          /*表格部分*/
          .manage-table {
            width: 100%;
            height: 8.1rem;
            tr.el-table__row--striped td {
              border: none;
              background: rgba(244, 241, 255, 1);
            }
            th{
                background: #7F63F4 !important;
                color: #fff;
            }
            img {
              width: 0.5rem;
              height: 0.5rem;
              display: block;
              border-radius: 50%;
              margin-left: 0.45rem;
              float: left;
            }
            span {
              float: left;
              margin-top: 0.14rem;
              margin-left: 0.17rem;
            }
          }
        }
        .total {
          box-sizing: border-box;
          width: 100%;
          height: 0.76rem;
          background: rgba(213, 203, 255, 1);
          position: absolute;
          left: 0;
          bottom: 0.72rem;
          padding-left: 1rem;
          span {
            display: block;
            float: left;
            font-size: 0.18rem;
            color: rgba(51, 51, 51, 1);
            line-height: 0.76rem;
            margin-right: 0.76rem;
          }
        }
        .total-foot {
          width: 100%;
          height: 0.76rem;
          background: rgba(173, 154, 255, 1);
          position: absolute;
          left: 0;
          bottom: 0;
          p {
            float: right;
            font-size: 0.18rem;
            line-height: 0.76rem;
            margin-right: 0.46rem;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
