<template>
  <div class="wl_ShoppMan_list" v-if="isshopEdit">
    <div class="ShoppMan_head_addIcon">
      <span @click="goaddshopDetail">
        <img src="../../assets/img/add.png" alt>添加
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
        <el-table-column prop="date" width="100%" type="index" :index="setIndex" label="序号"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>

        <el-table-column prop="price" label="商品单价"></el-table-column>
        <el-table-column prop="goods_type" label="商品分类"></el-table-column>
        <el-table-column prop="inventory" label="数量"></el-table-column>

        <el-table-column
          prop="status"
          label="商品状态"
          :filters="[{ text: '上架', value: '上架' }, { text: '下架', value: '下架' }]"
          :filter-method="filterOrder"
          :filter-multiple="false"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '上架' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="goaddshopDetail(scope.row)" v-show="scope.row.flag">
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
  <add-shop v-else :ProjectId='ProjectId'></add-shop>
</template>

<script>
import addShop from './AddShopp.vue'
export default {
  components:{addShop},
  name: "shoppManage",
  data() {
    return {
      tableData: [],
      ProjectId: -1,
      currentPage: 1,
      perPage: 6,
      activelyNumber: 1,
      isLoading: true,
      isshopEdit: true
    };
  },
  methods: {
    //订单状态
    filterOrder(value, row) {
      return row.status === value;
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
      this.isLoading = true
      this.getProjectDara(pageNumber)
    },
    showEdit(row) {
      row.flag = true;
    },
    leaveEdit(row) {
      row.flag = false;
    },
    goaddshopDetail(row){
      this.ProjectId = row.id ? row.id : -1
      this.isshopEdit = false
    },
    /**@获取商品列表 */
    getProjectDara(number){
      var url = this.$conf.env.getProjectDara + "?p=" + number;
      this.$http.get(number ? url : this.$conf.env.getProjectDara ).then( res =>{
        console.log(res)
        this.isLoading = false;
        if(!res.data) return
        this.activelyNumber = res.data.count
        res.data.results.forEach( element =>{
          element.flag = false
        })
        this.tableData = res.data.results
      }).catch(err =>{
        this.isLoading = false;
        this.message.error('网络错误');
      })
    }
  },
  mounted() {
    this.getProjectDara()
  },
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
