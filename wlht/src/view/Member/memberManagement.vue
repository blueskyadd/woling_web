<template>
  <div class="wl_memberManagement_list">
    <div class="member_head_addIcon">
      <span>
        <img src="../../assets/img/add.png" alt>添加会员
      </span>
    </div>
    <!--表格部分-->
    <div class="member_table_list">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading">
        <el-table-column prop="date" type='index' :index="setIndex" label="序号"></el-table-column>
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="address" label="性别"></el-table-column>
        <el-table-column prop="date" label="添加时间" ></el-table-column>
        <el-table-column prop="name" label="照片"></el-table-column>
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
  name: "memberManagement",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          flag: false,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          flag: false,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          flag: false,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          flag: false,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      currentPage: 1,
      perPage: 10,  
      activelyNumber:1,
      isLoading: false
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
       changePage(pageNumber){
        this.currentPage = pageNumber
      },
  },
};
</script>
<style lang="scss">
.wl_memberManagement_list {
  padding: 0.24rem 0.44rem 0 0.33rem;
  height: calc(100% - 1.7rem);
  .member_head_addIcon {
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
