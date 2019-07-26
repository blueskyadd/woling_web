<template>
  <div class="wl_Order_list" v-if="isorderEdit == 1">
    <div class="Order_head_addIcon">
      <span @click="goorderDetail">
        <img src="../../assets/img/add.png" alt>添加
      </span>
    </div>
    <!--表格部分-->
    <div class="member_table_list">
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="isLoading"
        :cell-style="changecolor"
        @cell-mouse-enter="showEdit"
        @cell-mouse-leave="leaveEdit"
      >
        <el-table-column prop="date" type="index" :index="setIndex" label="序号"></el-table-column>
        <el-table-column prop="order_sn" label="订单号"></el-table-column>

        <el-table-column
          prop="classify"
          label="订单类型"
          :filters="[{ text: '课程订单', value: '课程订单' }, { text: '课程手工订单', value: '课程手工订单' },{ text: '试听订单', value: '试听订单' },{ text: '球场预定', value: '球场预定' },{ text: '球场包场', value: '球场包场' },{ text: '商品订单', value: '商品订单' }]"
          :filter-method="filterTag"
          :filter-multiple="false"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            {{scope.row.classify}}
          </template>
        </el-table-column>

        <el-table-column prop="name" label="会员账号"></el-table-column>
        <el-table-column prop="orderXIang" label="订单详情">
          <template slot-scope="scope">
           <p  @click="getOrderDetailList(scope.row)">查看</p> 
          </template>
        </el-table-column>

        <el-table-column
          prop="pay_status"
          label="订单状态"
          :filters="[{ text: '已完成', value: '已完成' }, { text: '已取消', value: '已取消' }, { text: '已支付', value: '已支付' }]"
          :filter-method="filterOrder"
          :filter-multiple="false"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.pay_status === '已完成' ? 'primary' : scope.row.pay_status == '已取消' ? 'danger' :  'success'" disable-transitions>{{scope.row.pay_status}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-show="scope.row.flag && scope.row.status"  @click="handleClick(scope.row)">
              <img src="../../assets/img/bianji.png" alt srcset>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="perPage"
      :total="activelyNumber"
      @current-change="changePage"
      prev-text="<<"
      next-text=">>"
    ></el-pagination>
  </div>
  <order-detail v-else-if="isorderEdit == 2" :orderID='orderID' ></order-detail>
  <order-edit v-else-if="isorderEdit == 3" :orderID='orderID' :classDetailID="classDetailID"></order-edit>
  <Bookingdetails v-else :headerTitle='headerTitle'  :orderUrl='orderUrl'/>
</template>

<script>
import orderDetail from "./AddOrder.vue";
import orderEdit from "./editOrder.vue"
import Bookingdetails from "./Bookingdetails"
export default {
  components:{orderDetail, Bookingdetails, orderEdit},
  name: "orderManage",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      perPage: 10,
      activelyNumber: 1,
      isLoading: true,
      isorderEdit: 1,
      orderID: -1,
      orderUrl:'',
      headerTitle: '',
      classDetailID: -1
    };
  },
  methods: {
    filterTag(value, row) {
      return row.classify === value;
    },

    //订单状态
    filterOrder(value, row) {
      return row.pay_status === value;
    },
    setIndex(index) {
      if (index < 9 && this.currentPage == 1) {
        return "0" + (index + 1);
      } else {
        return (this.currentPage - 1) * this.perPage + index + 1;
      }
    },

    changePage(pageNumber) {
      this.currentPage = pageNumber;
       this.isLoading = true
      this.getOrderList(pageNumber)
    },
    showEdit(row) {
      row.flag = true;
    },
    leaveEdit(row) {
      row.flag = false;
    },
    changecolor(data){
      if (data.columnIndex == 2) {
          return "color:#7F63F4";
        }
      if(data.columnIndex == 4){
          return "color:#ABAFB3";
        }
    },
    goorderDetail(){
      this.orderID = -1;
      this.isorderEdit = 2;
    },
    /**@name编辑订单 */
    handleClick(data){
      this.orderID = data.id;
      this.classDetailID = data.classify
      this.isorderEdit = 3;
    },
    /**@name 获取订单列表 */
    getOrderList(number){
      var url = this.$conf.env.getOrderList + '' + "&p=" + number +'&page_size='+this.perPage;
      this.$http.get(number ? url : this.$conf.env.getOrderList +'&page_size='+this.perPage).then( res =>{
      console.log(res)
      if(!res.data) return
      this.isLoading = false;
      this.activelyNumber = res.data.count
       res.data.results.forEach( value =>{
         value.flag = false
       })
      this.tableData = res.data.results
      }).catch(err =>{
        console.log(err)
        this.isLoading = false;
        this.$message.error("网络错误");
      })
    },
    /**@name获取订单详情列表 */
    getOrderDetailList(data){
       this.orderID = data.id;
      switch(data.url.split('/')[2]){
        case 'pitch_order':
          this.headerTitle = '场地';
          break;
        case 'course_order':
          this.headerTitle = '课程';
          break;
        case 'appoint_order':
          this.headerTitle = '试听';
          break;
        case 'goods_order':
          this.headerTitle = '商品';
          break;
      }
      this.orderUrl = data.url.split('/')[2]+'/'+data.url.split('/')[3] + '/';
      this.isorderEdit = 4;
    }
  },
  mounted(){
    this.getOrderList()
  }
};
</script>

<style lang="scss">
.wl_Order_list {
  padding: 0.24rem 0.44rem 0 0.33rem;
  height: calc(100% - 1.7rem);
  .Order_head_addIcon {
    float: right;
    margin-bottom: 0.07rem;
    span {
      box-shadow: 0 0.03rem 0.07rem 0 rgba(6, 33, 88, 0.3);
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
  .member_table_list {
    height: 100%;
    .el-table {
      th {
        background-color: #eef1f4;
      }
    }
  }
}
</style>
