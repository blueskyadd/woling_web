<template>
  <div class="wl_PerManage_list" v-if="isperManage">
    <div class="Per_head_addIcon">
      <span @click="goPerDetail">
        <img src="../../assets/img/add.png" alt>添加会员
      </span>
    </div>
    <!--表格部分-->
    <div class="member_table_list">
      <el-table
      @cell-mouse-enter="showEdit"
       @cell-mouse-leave="leaveEdit"
        ref="filterTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column prop="date" type='index' :index="setIndex" label="序号"></el-table-column>
        <el-table-column
          prop="Yname"
          label="员工姓名"
          column-key="date"

        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式">
        </el-table-column>
        <el-table-column
          prop="WeiOne"
          label="职位1">
        </el-table-column>
        <el-table-column
          prop="WeiTwo"
          label="职位2">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="员工状态"
          :filters="[{ text: '在职', value: '在职' }, { text: '离职', value: '离职' }]"
          :filter-method="filterTag"
          :filter-multiple=false
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '在职' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="ping"
          label="评价">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-button  type="text" size="small" v-show="scope.row.flag"><img src="../../assets/img/bianji.png" alt="" srcset=""></el-button>
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
  <PerDetail v-else/>
</template>

<script>
import PerDetail from "./PerDetail"
    export default {
      components:{PerDetail},
        name: "PerManage",
      data() {
        return {
          tableData: [{
              Yname: '瑞文',
              phone: '110',
              WeiOne: '教练',
              WeiTwo:'顾问',
              tag: '在职',
              ping:'图',
              flag:false,
            }, {
              Yname: '亚索',
              phone: '111',
              WeiOne: '酱油',
              WeiTwo:'买菜',
              tag: '离职',
              ping:'图',
              flag:false,
            }, {
              Yname: '劫',
              phone: '112',
              WeiOne: '刺客',
              WeiTwo:'做饭吗',
              tag: '离职',
              flag:false,
              ping:'图',
            }, {
              Yname: '瞎瞎',
              phone: '113',
              WeiOne: '吴志伟',
              WeiTwo:'吃',
              tag: '在职',
              ping:'图',
              flag:false,
          }],
          currentPage: 1,
          perPage: 10,
          activelyNumber:1,
          isLoading: false,
          isperManage: true,
        };
      },
      methods: {
        setIndex(index){
          if(index < 10 ){
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
          return row.tag === value;
        },
        changePage(pageNumber){
          this.currentPage = pageNumber
        },
        goPerDetail(){
          this.isperManage=false
        },
        showEdit(row) {
        row.flag = true;
      },
      leaveEdit(row) {
        row.flag = false;
      },
      },
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
