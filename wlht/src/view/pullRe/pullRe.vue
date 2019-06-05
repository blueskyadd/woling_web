<template>
  <div class="wl_PullRe_list">
    <div class="PullRe_head_addIcon">
      <router-link to="/AddPullRe" tag="span">
        <img src="../../assets/img/add.png" alt>添加会员
      </router-link>
    </div>
    <!--表格部分-->
    <div class="member_table_list">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading">
        <el-table-column prop="date" type='index' :index="setIndex" label="序号"></el-table-column>
        <el-table-column prop="address" label="主推地点" ></el-table-column>
        <el-table-column prop="ReTimer" label="热点时间"></el-table-column>
        <el-table-column
          prop="tag"
          label="热点状态"
          :filters="[{ text: '上架', value: '上架' }, { text: '下架', value: '下架' }]"
          :filter-method="filterTag"
          :filter-multiple=false
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '上架' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
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
</template>

<script>
    export default {
        name: "pullRe",
      data() {
        return {
          tableData: [
            {
              date: "2016-05-02",
              flag: false,
              name: "王小虎",
              address: "上海市普陀区金沙江路 1518 弄",
              ReTimer:"2019.07.05-2019.07.16",
              tag:"下架",
            },
            {
              flag: false,
              date: "2016-05-04",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1517 弄",
              ReTimer:"2019.07.05-2019.07.16",
              tag:"上架",
            },
            {
              flag: false,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              ReTimer:"2019.07.05-2019.07.16",
              tag:"下架",
            },
            {
              flag: false,
              date: "2016-05-03",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1516 弄",
              ReTimer:"2019.07.05-2019.07.16",
              tag:"上架",
            }
          ],
          currentPage: 1,
          perPage: 10,
          activelyNumber:1,
          isLoading: false
        };
      },
      methods: {


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
