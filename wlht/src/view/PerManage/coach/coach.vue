<template>
  <div class="wl_coach_list" v-if="iscoach == 1">
    <header>
      <span @click="close()">
        <img src="../../../assets/img/back.png" alt>教练评价管理
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
          prop="name"
          label="评价类型"
          column-key="date"

        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="groups[0].name"
          label="主题">
        </el-table-column>
        <el-table-column
          prop="ping"
          label="评价详情">
          <template slot-scope="scope">
              <el-button type="text"  @click="openPDetail(scope.row)">
                <img src="../../../assets/img/ck.png" alt srcset>
              </el-button>
            </template>
        </el-table-column>
       <el-table-column
          prop="groups[0].name"
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

  <coach-self  v-else-if="iscoach == 2"></coach-self>
  <coach-evaluate v-else></coach-evaluate>

</template>

<script>
import coachEvaluate from './coachEvaluate.vue'
import coachSelf  from "./coachSelfEvaluate.vue";
    export default {
      components:{coachEvaluate, coachSelf},
        name: "coach",
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
            this.$parent.isperManage = 1;
        },
        getUserList(){
          this.$http.get(this.$conf.env.userList).then( res =>{
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
        this.getUserList()
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
