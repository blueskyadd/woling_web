<template>
  <div class="wl_PerManage_list" v-if="isperManage == 1">
    <div class="Per_head_addIcon">
      <span @click="goPerDetail">
        <img src="../../assets/img/add.png" alt>添加会员
      </span>
    </div>
    <!--表格部分-->
    <div class="member_table_list">
      <el-table
      @cell-mouse-enter="showEdit"
        v-loading='isLoading'
       @cell-mouse-leave="leaveEdit"
        ref="filterTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column width="100%" prop="date" type='index' :index="setIndex" label="序号"></el-table-column>
        <el-table-column
          prop="name"
          label="员工姓名"
          column-key="date"

        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="联系方式">
        </el-table-column>
        <el-table-column
          prop="groups[0].name"
          label="职位1">
        </el-table-column>
        <el-table-column
          prop="groups[1].name"
          label="职位2">
        </el-table-column>
        <el-table-column
          prop="state_employee"
          label="员工状态"
          :filters="[{ text: '在职', value: 1 },{ text: '兼职', value: 2 }, { text: '离职', value: 0 }]"
          :filter-method="filterTag"
          :filter-multiple=false
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state_employee == 0 ? 'primary' : scope.row.state_employee == 1 ?  'success' : 'info'"
              disable-transitions>{{setScope(scope.row.state_employee)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="ping"
          label="评价">
          <template slot-scope="scope">
              <el-button type="text"  @click="openPDetail(scope.row)">
                <img src="../../assets/img/ck.png" alt srcset>
              </el-button>
            </template>
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-button  type="text" size="small" v-show="scope.row.flag" @click="handleClick(scope.row)"><img src="../../assets/img/bianji.png" alt="" srcset=""></el-button>
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
  <coach v-else-if="isperManage == 2"/>
  <PerDetail v-else :perId='perId'/>
</template>

<script>
import PerDetail from "./PerDetail"
import Coach from './coach/coach.vue'
    export default {
      components:{PerDetail, Coach},
        name: "PerManage",
      data() {
        return {
          tableData: [],
          currentPage: 1,
          perPage: 10,
          activelyNumber:1,
          isLoading: true,
          perId: -1,
          isperManage: 1,
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
        resetDateFilter() {
          this.$refs.filterTable.clearFilter('date');
        },
        clearFilter() {
          this.$refs.filterTable.clearFilter();
        },
        // formatter(row, column) {
        //   return row.address;
        // },
        filterTag(value, row) {
          return row.state_employee === value;
        },
        changePage(pageNumber){
          this.currentPage = pageNumber
        },
        goPerDetail(){
          this.perId = -1
          this.isperManage=false
        },
        showEdit(row) {
        row.flag = true;
        },
        leaveEdit(row) {
          row.flag = false;
        },
        handleClick(row){
          this.perId = row.id
          this.isperManage = false
        },
        setScope(data){
          switch(data){
            case 1:
            return '在职';
            case 2:
            return '兼职';
            case 0:
            return '离职';
            break;
          }
        },
        openPDetail(data){
          this.isperManage = 2
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
  .wl_PerManage_list {
    padding: 0.24rem 0.44rem 0 0.33rem;
    height: calc(100% - 1.7rem);
    .Per_head_addIcon {
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
