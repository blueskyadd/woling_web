<template>
  <div class="wl_ClassMange_list" v-if="isclassEdit">
    <div class="Class_head_addIcon">
      <span @click="goMemberDetail()">
        <img src="../../assets/img/add.png" alt>添加课程
      </span>
    </div>
    <!--表格部分-->
    <div class="member_table_list">
      <el-table
        :data="tableData"
        :cell-style="changecolor"
        style="width: 100%"
        v-loading="isLoading"
        @cell-mouse-enter="showEdit"
        @cell-mouse-leave="leaveEdit"
      >
        <el-table-column prop="date" type="index" width="100%" :index="setIndex" label="序号"></el-table-column>
        <el-table-column prop="name" label="课程名称"></el-table-column>
        <el-table-column prop="address" label="时间段"></el-table-column>
        <el-table-column prop="course_num" label="课时"></el-table-column>
        <el-table-column prop="sold_num" label="报名人数"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="ClassTab" label="课表详情"></el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="handleClick(scope.row)" v-show="scope.row.flag">
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
  <classDetail v-else  :classId='classId' />
</template>
<script>
import classDetail from './classDetail.vue'
export default {
  components:{classDetail},
  name: "classManage",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      perPage: 10,
      activelyNumber: 1,
      isLoading: true,
      classId: -1,
      isclassEdit: true
    };
  },
  methods: {
    setIndex(index) {
      if (index < 9 && this.currentPage == 1) {
        return "0" + (index + 1);
      } else {
        return (this.currentPage - 1) * this.perPage + index + 1;
      }
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.getClassList(pageNumber)
    },
    handleClick(row){
      console.log('row',row);
      
      this.classId = row.id
      this.isclassEdit = false
    },
    changecolor(data) {
      if (data.columnIndex == 4) {
        return "color:#7F63F4";
      }
      if( data.columnIndex == 3 || data.columnIndex == 2 || data.columnIndex == 5 ) {
        return "color:#ABAFB3";
      }
    },
    showEdit(row) {
      row.flag = true;
    },
    leaveEdit(row) {
      row.flag = false;
    },
    goMemberDetail(){
      this.classId = -1
      this.isclassEdit = false
    },
    /**@name获取课程列表 */
    getClassList(number){
      var url = this.$conf.env.setClassData + '?p=' +number
      this.$http.get(number != 1 ? url :this.$conf.env.setClassData + '?page_size=' + this.perPage).then( res =>{
        this.isLoading = false;
        if(res.status == '200'){
          this.activelyNumber = res.data.count
          if (res.data.results && res.data.results.length > 0) {
              res.data.results.forEach(element => {
                element.flag = false;
              });
              this.tableData = res.data.results;
            }
        }
      }).catch(err =>{
        this.isLoading = false;
        this.$message.error("网络错误");
      })
    }
  },
  mounted(){
    this.getClassList(1)
  }
};
</script>

<style lang="scss">
.wl_ClassMange_list {
  padding: 0.24rem 0.44rem 0 0.33rem;
  height: calc(100% - 1.7rem);
  .Class_head_addIcon {
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
