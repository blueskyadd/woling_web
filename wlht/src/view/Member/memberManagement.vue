<template>
  <div class="wl_memberManagement_list" v-if="isMemberEdit">
    <div class="member_head_addIcon">
      <span @click="goMemberDetail()">
        <img src="../../assets/img/add.png" alt>添加
      </span>
    </div>
    <!--表格部分-->
    <div class="member_table_list">
      <el-table :data="tableData"  :cell-style="changecolor" style="width: 100%" v-loading="isLoading" @cell-mouse-enter="showEdit" @cell-mouse-leave="leaveEdit">
        <el-table-column prop="date" type='index' :index="setIndex" label="序号" width='100%'></el-table-column>
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="age" label="年龄" ></el-table-column>
        <el-table-column prop="mobile" label="联系方式" ></el-table-column>
        <el-table-column prop="date_joined" label="申请时间" ></el-table-column>
        <el-table-column
        prop="operation"
        label="操作">
        <template slot-scope="scope"> 
            <el-button  type="text" size="small"   @click="handleClick(scope.row)" v-show="scope.row.flag"><img src="../../assets/img/bianji.png" alt="" srcset=""></el-button>
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
  <memberDetail v-else :VipId='vipId'/>
</template>
<script>
import memberDetail from './memberDetail.vue'
export default {
  components:{memberDetail},
  name: "memberManagement",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      perPage: 10,  
      activelyNumber:1,
      isLoading: true,
      isMemberEdit: true,
      vipId: -1
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
        this.setPageViplist()
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
        this.vipId = -1
        this.isMemberEdit = false

      },
      handleClick(row){
        this.vipId = row.id
        this.isMemberEdit = false
      },
      getVipList(){
        this.isLoading = false
        this.$http.get(this.$conf.env.setVipData).then( res =>{
          this.isLoading = false
           if (res.data && res.data.length > 0) {
              res.data.forEach(element => {
                element.flag = false;
              });
              
              this.tableData = res.data.slice(0, 10);
            }else{
              this.tableData = []
            }
        }).catch(err =>{
          this.isLoading = false;
          this.$message.error("网络错误");
        })
      },
      setPageViplist(){
        console.log( Math.ceil(res.data.length/10));
      }
  },
  mounted(){
    this.getVipList()
  }
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
