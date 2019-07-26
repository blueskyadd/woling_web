<template>
  <div class="wl_coach_list" v-if="iscoach == 1">
    <header>
      <span @click="close()">
        <img src="../../../assets/img/goback.png" alt>教练考核评分表
      </span>
    </header>
    <!--表格部分-->
    <div class="member_table_list">
      <el-table
        v-loading='isLoading'
        ref="filterTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column width="100%" prop="date" type='index' :index="setIndex" label="序号"></el-table-column>
        <el-table-column
          prop="assess"
          label="主题">
        </el-table-column>
        <el-table-column
          prop="lead"
          label="评价人">
        </el-table-column>
       <el-table-column
          prop="total"
          label="得分">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size= 'perPage'
      :total="activelyNumber"
      @current-change='changePage'
      prev-text='<<'
      next-text=">>">
    </el-pagination>
  </div>
  
</template>

<script>
    export default {
      name: "coachEvaluate",
      props:{
        AssessDeatilID:{
          type:Number,
        },
        perId:{
          type:Number,
        }
      },
      data() {
        return {
          tableData: [],
          currentPage: 1,
          perPage: 10,
          activelyNumber:1,
          isLoading: true,
          perId: -1,
          iscoach: 1,
        };
      },
      methods: {
        setIndex(index){
          if(index < 9 && this.currentPage == 1){
            return '0'+ (index +1)
          }else{
            return (this.currentPage - 1) * this.perPage + index + 1
          }
        },
        changePage(pageNumber){
          this.currentPage = pageNumber
        },
        openPDetail(data){
          this.iscoach = 2
        },
        close(){
            this.$parent.iscoach = 1;
        },
        getcoachassess(){
          this.$http.get(this.$conf.env.getcoachassess + this.perId + '&assess=' + this.AssessDeatilID).then( res =>{
            this.isLoading = false
            if(!res.data)return
            res.data.forEach( element =>{
              element.flag = false
            })
            this.tableData = res.data

          }).catch(err =>{
            this.isLoading = false
          })
        }
      },
      mounted(){
        this.getcoachassess()
      }
    }
</script>

<style lang="scss">
  .wl_coach_list {
    padding: 0.24rem 0.44rem 0 0.33rem;
    height: calc(100% - 1.7rem);
    header{
        font-size: .2rem;
        color: #7f63f4;
        img{
            margin-right: 0.12rem;
        }
    }
    .member_table_list{
      height: 100%;
      .el-table{
        th{
          background-color: #EEF1F4;
        }
      }
    }
  }
</style>
