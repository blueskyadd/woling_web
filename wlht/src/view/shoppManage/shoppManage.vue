<template>
  <div class="wl_ShoppMan_list" v-if="isshopEdit">
    <div class="ShoppMan_head_addIcon">
      <span @click="goaddshopDetail">
        <img src="../../assets/img/add.png" alt>添加会员
      </span>
    </div>
    <!--表格部分-->
    <div class="member_table_list">
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="isLoading"
        @cell-mouse-enter="showEdit"
        @cell-mouse-leave="leaveEdit"
      >
        <el-table-column prop="date" type="index" :index="setIndex" label="序号"></el-table-column>
        <el-table-column prop="shoppNmae" label="商品名称"></el-table-column>

        <el-table-column prop="shoppPrice" label="商品单价"></el-table-column>
        <el-table-column prop="shoppLei" label="商品分类"></el-table-column>
        <el-table-column prop="Num" label="数量"></el-table-column>

        <el-table-column
          prop="shoppStatus"
          label="商品状态"
          :filters="[{ text: '上架', value: '上架' }, { text: '已结束', value: '已结束' }]"
          :filter-method="filterOrder"
          :filter-multiple="false"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.shoppStatus === '上架' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.shoppStatus}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-show="scope.row.flag">
              <img src="../../assets/img/bianji.png" alt srcset>
            </el-button>
            <el-button type="text" size="small" v-show="scope.row.flag">
              <img src="../../assets/img/del.png" alt srcset>
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
  <add-shop v-else></add-shop>
</template>

<script>
import addShop from './AddShopp.vue'
export default {
  components:{addShop},
  name: "shoppManage",
  data() {
    return {
      tableData: [
        {
          flag: false,
          shoppNmae: "衣服",
          shoppPrice: "120.00元",
          Num: "2",
          shoppStatus: "已结束",
          shoppLei: "球鞋"
        },
        {
          flag: false,
          shoppNmae: "裤子",
          shoppPrice: "120.00元",
          Num: "30",
          shoppStatus: "上架",
          shoppLei: "球衣"
        },
        {
          flag: false,
          shoppNmae: "帽子",
          shoppPrice: "129.00元",
          Num: "50",
          shoppStatus: "已结束",
          shoppLei: "球鞋"
        },
        {
          flag: false,
          shoppNmae: "手套",
          shoppPrice: "129.00元",
          Num: "40",
          shoppStatus: "上架",
          shoppLei: "球衣"
        }
      ],
      currentPage: 1,
      perPage: 10,
      activelyNumber: 1,
      isLoading: false,
      isshopEdit: true
    };
  },
  methods: {
    //订单状态
    filterOrder(value, row) {
      return row.shoppStatus === value;
    },
    setIndex(index) {
      if (index < 10) {
        return "0" + (index + 1);
      } else {
        return (this.currentPage - 1) * this.perPage + index + 1;
      }
    },

    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    showEdit(row) {
      row.flag = true;
    },
    leaveEdit(row) {
      row.flag = false;
    },
    goaddshopDetail(){
      this.isshopEdit = false
    }
  }
};
</script>


<style lang="scss">
.wl_ShoppMan_list {
  padding: 0.24rem 0.44rem 0 0.33rem;
  height: calc(100% - 1.7rem);
  .ShoppMan_head_addIcon {
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
