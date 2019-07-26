<template>
  <div class="wl_NoMeber_list">
   <!-- <div class="NoMember_head_addIcon">-->
<!--      <span>-->
<!--        <img src="../../assets/img/add.png" alt>添加-->
<!--      </span>-->
<!--    </div> -->
    <!--表格部分-->
    <div class="member_table_list">
      <el-table :data="tableData" :cell-style="changecolor" style="width: 100%" v-loading="isLoading" >
        <el-table-column prop="date" type='index' width="100%" :index="setIndex"  label="序号"></el-table-column>
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="mobile" label="联系方式" ></el-table-column>
        <el-table-column prop="create_time" label="申请时间"></el-table-column>

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
        name: "NoMember",
      data() {
        return {
          tableData: [],
          currentPage: 1,
          perPage: 10,
          activelyNumber:1,
          isLoading: true
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
          this.getCommonList(pageNumber)
        },
         changecolor(data){
          if (data.columnIndex == 3) {
            return "color:#7F63F4";
          }
          if(data.columnIndex == 4 || data.columnIndex == 2){
            return "color:#ABAFB3";
          }
        },
        getCommonList(number){
          var url = this.$conf.env.getCommonList + '?p=' + number +'&page_size='+this.perPage
          this.$http.get(number ? url :this.$conf.env.getCommonList +'?page_size='+this.perPage).then( res =>{
            this.isLoading = false
            this.activelyNumber = res.data.count
            this.tableData = res.data.results
          }).catch(err =>{
            this.isLoading = false
          })
        }
      },
      mounted() {
        this.getCommonList()
      },
    }
</script>

<style lang="scss">
.wl_NoMeber_list {
  padding: 0.24rem 0.44rem 0 0.33rem;
  height: calc(100% - 1.7rem);
.NoMember_head_addIcon {
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
