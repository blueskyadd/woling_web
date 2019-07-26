<template>
    <div class="wl_ClassMange_list scrollPage" v-if="isClassList" style="overflow:hidden">
    <div class="Class_head_addIcon_classStudent_list">
        <span @click="$parent.isClassList = true"><img src="../../../assets/img/goback.png" alt="" /></span>
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
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="status" label="签到状态"></el-table-column>
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
  <classStudentList v-else/>
</template>
<script>
import classStudentList from './classStudentList'
export default {
props:{
    classStudentId:{
        type: Number,
        required: true
    },
},
components: {classStudentList},
data() {
    return {
      tableData: [],
      currentPage: 1,
      perPage: 10,
      activelyNumber: 1,
      isLoading: true,
      isclassEdit: true,
      classListDetail: [],
      isClassList: true
    };
  },
  methods: {
    showEdit(row) {
        row.flag = true;
    },
    leaveEdit(row) {
      row.flag = false;
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
     setIndex(index) {
      if (index < 9 && this.currentPage == 1) {
        return "0" + (index + 1);
      } else {
        return (this.currentPage - 1) * this.perPage + index + 1;
      }
    },
    changecolor(data) {
      if (data.columnIndex == 4) {
        return "color:#7F63F4";
      }
      if( data.columnIndex == 3 || data.columnIndex == 2 || data.columnIndex == 5 ) {
        return "color:#ABAFB3";
      }
    },
    getCourse_student(){
        this.$http.get(this.$conf.env.getCourse_student + this.classStudentId).then( res =>{
            this.isLoading = false;
            if(res.status == '200'){
                this.tableData = res.data;
            }
        }).catch(err =>{
            this.isLoading = false;
            this.$message.error("网络错误");
        })
    },
  },
  mounted() {
      this.getCourse_student()
  },
}
</script>
<style lang="scss">
.scrollPage{
    .el-table__body-wrapper{
    height: 12rem;
    overflow-y: scroll;
} 
}

</style>
