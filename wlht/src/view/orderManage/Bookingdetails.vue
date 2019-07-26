<template>
  <div class="wl_coach_list" v-if="iscoach == 1">
    <header>
      <span @click="$parent.isorderEdit = true">
      <img src="../../assets/img/goback.png" alt>{{headerTitle}}预约详情</span><span @click="$parent.isorderEdit = true">
      </span>
    </header>
    <!--表格部分-->
    <SiteList :tableData='tableData' v-if="headerTitle == '场地'"/>
    <ProjectList :tableData='tableData' v-if="headerTitle == '商品'"/>
    <classList :tableData='tableData' v-if="headerTitle == '课程'"/>
    <AuditionList :tableData='tableData' v-if="headerTitle == '试听'"/>
  </div>
</template>

<script>
import SiteList from './orderList/site';//场地
import ProjectList from './orderList/project';//商品
import classList from  './orderList/class';//商品
import AuditionList from './orderList/audition';//试听
  export default {
    name: "Bookingdetails",
    components:{SiteList, ProjectList, classList, AuditionList},
    props:{
      orderUrl:{
        type: String,
        request: true
      },
      headerTitle:{
        type: String,
        request: true
      }
    },
    data() {
      return {
        tableData: [],
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
      openPDetail(data){
        this.iscoach = 2
      },
      close(){
        this.$parent.iscoach = 1;
      },
      getOrderlistDetail(){
        this.$http.get(this.$conf.env.getOrderDetail + this.orderUrl).then( res =>{
          console.log(res)
          this.tableData = []
          switch(this.headerTitle){
            case '课程':
              this.tableData.push(res.data);
              break;
            case '场地':
              this.tableData = res.data.order_details
              break;
            case '试听':
              this.tableData.push(res.data);
              break;
            case '商品':
              res.data.order_details.forEach(value =>{
                value.address = res.data.address
              })
              this.tableData = res.data.order_details
              break;
          }
        }).catch(err =>{
          this.$message.error("服务器错误");
        })
      }
    },
    mounted(){
      this.getOrderlistDetail()
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
        height: calc(100% - .42rem);
      .el-table{
        th{
          background-color: #EEF1F4;
          
        }
      }
    }
  }
</style>
