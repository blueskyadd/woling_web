<template>
  <div class="wl_memberManagement_list" v-if="isMemberEdit">
    <div class="member_head_addIcon">
      <span @click="goMemberDetail()">
        <img src="../../assets/img/add.png" alt>添加
      </span>
    </div>
    <!--表格部分-->
    <div class="member_table_list">
      <el-table :data="tableData" :cell-style="changecolor" style="width: 100%" v-loading="isLoading" @cell-mouse-enter="showEdit" @cell-mouse-leave="leaveEdit">
        <el-table-column prop="date" type='index' :index="setIndex" label="序号" width='100%'></el-table-column>
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="address" label="年龄" ></el-table-column>
        <el-table-column prop="date" label="联系方式" ></el-table-column>
        <el-table-column prop="name" label="申请时间" ></el-table-column>
        <el-table-column
        prop="operation"
        label="操作">
        <template slot-scope="scope">
            <el-button  type="text" size="small" v-show="scope.row.flag"><img src="../../assets/img/bianji.png" alt="" srcset=""></el-button>
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
  <memberDetail v-else/>
</template>
<script>
import memberDetail from './memberDetail.vue'
export default {
  components:{memberDetail},
  name: "memberManagement",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          flag: false,
          name: "王小虎",
          address: "上"
        },
        {
          flag: false,
          date: "2016-05-04",
          name: "王小虎",
          address: "上"
        },
        {
          flag: false,
          date: "2016-05-01",
          name: "王小虎",
          address: "上"
        },
        {
          flag: false,
          date: "2016-05-03",
          name: "王小虎",
          address: "上"
        }
      ],
      currentPage: 1,
      perPage: 10,  
      activelyNumber:1,
      isLoading: false,
      isMemberEdit: true
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
      showEdit(row) {
        row.flag = true;
      },
      leaveEdit(row) {
        row.flag = false;
      },
      changecolor(data){
        if (data.columnIndex == 3) {
          return "color:#7F63F4";
        }
        if(data.columnIndex == 4){
          return "color:#ABAFB3";
        }
      },
      goMemberDetail(){
        this.isMemberEdit = false
      }
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
