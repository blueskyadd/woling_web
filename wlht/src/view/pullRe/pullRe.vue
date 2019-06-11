<template>
  <div class="wl_PullRe_list" v-if="isPullEdit">
    <div class="PullRe_head_addIcon">
      <span @click="gopullDetail">
        <img src="../../assets/img/add.png" alt>添加
      </span>
    </div>
    <!--表格部分-->
    <div class="member_table_list">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading"  @cell-mouse-enter="showEdit" @cell-mouse-leave="leaveEdit">
        <el-table-column prop="date" type='index' width="100%" :index="setIndex" label="序号"></el-table-column>
        <el-table-column prop="name" label="主推地点" ></el-table-column>
        <el-table-column prop="start_time" label="热点时间"></el-table-column>
        <el-table-column
          prop="status"
          label="热点状态"
          :filters="[{ text: '上架', value: '上架' }, { text: '下架', value: '下架' }]"
          :filter-method="filterTag"
          :filter-multiple=false
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '上架' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-button  type="text" size="small"  @click="handleClick(scope.row)"  v-show="scope.row.flag"><img src="../../assets/img/bianji.png" alt="" srcset=""></el-button>
            <el-button type="text" size="small" v-show="scope.row.flag"><img src="../../assets/img/del.png" alt="" srcset=""></el-button>
          </template>
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
  <add-pull-re v-else :activelyId='activelyId'></add-pull-re>
</template>

<script>
import AddPullRe from './AddPullRe.vue'
    export default {
      components:{AddPullRe},
        name: "pullRe",
      data() {
        return {
          tableData: [],
          currentPage: 1,
          perPage: 10,
          activelyNumber:1,
          isPullEdit: true,
          isLoading: false,
          activelyId: -1,
        };
      },
      methods: {
        resetDateFilter() {
          this.$refs.filterTable.clearFilter('date');
        },
        clearFilter() {
          this.$refs.filterTable.clearFilter();
        },
        filterTag(value, row) {
          this.activelyId = -1
          return row.status === value;
        },
        changePage(pageNumber){
          this.currentPage = pageNumber
        },
        handleClick(row){
          this.activelyId = row.id
          this.isPullEdit = false
        },
        setIndex(index){
          if(index < 10 ){
            return '0'+ (index +1)
          }else{
            return (this.currentPage - 1) * this.perPage + index + 1
          }
        },
        changePage(pageNumber){
          this.currentPage = pageNumber
        },
        showEdit(row) {
          row.flag = true;
        },
        leaveEdit(row) {
          row.flag = false;
        },
        gopullDetail(){
          this.isPullEdit = false
        },
        getActivelyList(){
          this.$http.get(this.$conf.env.setActivelyData).then( res =>{
            console.log(res)
            if(res.status == '200'){
               if (res.data.results && res.data.results.length > 0) {
                res.data.results.forEach(element => {
                  element.flag = false;
                });
                this.tableData = res.data.results;
              }else{
                this.tableData = []
              }
            }else{
              this.tableData = []
            }
          }).catch(err =>{
            this.message.error('网络错误');
          })
        }
      },
      mounted() {
        this.getActivelyList()
      },
    }
</script>

<style lang="scss">
  .wl_PullRe_list {
    padding: 0.24rem 0.44rem 0 0.33rem;
    height: calc(100% - 1.7rem);
    .PullRe_head_addIcon {
      float: right;
      margin-bottom: .07rem;
      span {
        box-shadow:0 .03rem .07rem 0 rgba(6,33,88,0.3);
        line-height: 0.33rem;
        height: 0.33rem;
        background: #fff;
        display: block;
        border-radius: 0.165rem;
        font-size: 0.16rem;
        overflow: hidden;
        padding: 0 0.14rem;
        cursor: pointer;
        img {
          height: 0.26rem;
          margin-right: 0.09rem;
        }
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
