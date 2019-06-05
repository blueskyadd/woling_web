<template>
  <div class="wl_NoMeber_list">
<!--    <div class="NoMember_head_addIcon">-->
<!--      <span>-->
<!--        <img src="../../assets/img/add.png" alt>添加-->
<!--      </span>-->
<!--    </div>-->
    <!--表格部分-->
    <div class="member_table_list">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading">
        <el-table-column prop="date" type='index' :index="setIndex" label="序号"></el-table-column>
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="address" label="年龄"></el-table-column>
        <el-table-column prop="date" label="联系方式" ></el-table-column>
        <el-table-column prop="name" label="申请时间"></el-table-column>
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
          tableData: [
            {
              date: "1100",
              flag: false,
              name: "02/06/2018",
              address: "13"
            },
            {
              flag: false,
              date: "120",
              name: "02/06/2019",
              address: "13"
            },
            {
              flag: false,
              date: "119",
              name: "02/06/2020",
              address: "12"
            },
            {
              flag: false,
              date: "911",
              name: "02/06/2021",
              address: "11"
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
