<template>
  <div class="wl_coach_list" v-if="iscoach == 1">
    <header>
      <span @click="close()">
      <img src="../../assets/img/goback.png" alt>教练考核评分表</span><span @click="close()">
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
          prop="address"
          label="场地名称">
        </el-table-column>
        <el-table-column
          prop="num"
          label="人数">
        </el-table-column>
        <el-table-column
          prop="data"
          label="预约日期">
        </el-table-column>
        <el-table-column
          prop="timer"
          label="预约时间">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格 ">
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
    name: "Bookingdetails",
    data() {
      return {
        tableData: [
          {
            address:'黄埔球场',
            num:'3',
            data:'2019.03.26',
            timer:'18:00-20:00',
            price:'280.00',
          },{
            address:'黄埔球场',
            num:'3',
            data:'2019.03.26',
            timer:'18:00-20:00',
            price:'280.00',
          },{
            address:'黄埔球场',
            num:'3',
            data:'2019.03.26',
            timer:'18:00-20:00',
            price:'280.00',
          },{
            address:'黄埔球场',
            num:'3',
            data:'2019.03.26',
            timer:'18:00-20:00',
            price:'280.00',
          },{
            address:'黄埔球场',
            num:'3',
            data:'2019.03.26',
            timer:'18:00-20:00',
            price:'280.00',
          },{
            address:'黄埔球场',
            num:'3',
            data:'2019.03.26',
            timer:'18:00-20:00',
            price:'280.00',
          },{
            address:'黄埔球场',
            num:'3',
            data:'2019.03.26',
            timer:'18:00-20:00',
            price:'280.00',
          },{
            address:'黄埔球场',
            num:'3',
            data:'2019.03.26',
            timer:'18:00-20:00',
            price:'280.00',
          },
        ],
        currentPage: 1,
        perPage: 10,
        activelyNumber:1,
        isLoading: false,
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
        this.$parent.iscoach = 1;
      },
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
      margin-bottom:.35rem;
      font-weight: 900;
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
