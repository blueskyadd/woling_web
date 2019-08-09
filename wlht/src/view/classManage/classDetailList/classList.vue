<template>
    <div class="wl_ClassMange_list" v-if="isClassList">
         <img @click="$parent.isclassEdit = 1" src="../../../assets/img/goback.png" alt="" />
         <span @click="$parent.isclassEdit = 1" style="font-size: .2rem;color: #464A53;">返回</span>
    <div class="Class_head_addIcon_class_list">
        
      <span >
        <el-upload
              action="string"
              ref="upload"
              list-type="picture-card"
              :http-request="setUpdataFile"
              :file-list="classListDetail"
              :multiple="true"
              accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
              class="photo"
            >
              <img src="../../../assets/img/add.png" alt><i>导入课表</i> 
        </el-upload>
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
        <el-table-column prop="course" label="课程名称"></el-table-column>
        <el-table-column prop="start_time" label="上课日期">
          <template slot-scope="scope">
            {{scope.row.start_time.split(' ')[0]}}
           </template>
        </el-table-column>
        <el-table-column prop="end_time" label="上课时间">
          <template slot-scope="scope">
            {{scope.row.start_time.split(' ')[1]}}&nbsp;-&nbsp;{{scope.row.end_time.split(' ')[1]}}
          </template>
        </el-table-column>
        <el-table-column prop="ClassTab" label="学员管理">
          <template slot-scope="scope">
            <el-button type="text"  size="small"  @click="goClassDetail(scope.row)">
              <img src="../../../assets/img/user_actively.png" alt srcset>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="changeStatus(scope.row)" v-if=" scope.row.status == 1">
              正常
            </el-button>
            <el-button type="text" size="small"  @click="changeStatus(scope.row)"  v-if="scope.row.status == 0">
              取消
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
  <classStudentList :classStudentId='classStudentId' v-else/>
</template>
<script>
import classStudentList from './classStudentList'
export default {
props:{
    classId:{
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
      isClassList: true,
      classStudentId: -1
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
      this.getCourse_time(pageNumber)
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
    getCourse_time(number){
        this.$http.get(this.$conf.env.getCourse_time + this.classId + '&p=' + number + '&page_size=' + this.perPage).then( res =>{
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
    },
    setUpdataFile(data){
        var params = new FormData()
        params.append('course', this.classId)
        params.append('file', data.file)
         this.isLoading = true
        this.$http.post(this.$conf.env.setUpdataFile, params, true).then( res =>{
            this.$message({  message: '导入成功', type: 'success'});
            this.getCourse_time(1)
        }).catch(err =>{
             this.isLoading = false;
             if(err.request.status == '400'){
                 this.$message.error(err.request.responseText.split("'")[1]);
             }else{
                 this.$message.error('网络错误');
             }
        })
    },
    goClassDetail(data){
        console.log(data)
        this.classStudentId = data.id
        this.isClassList = false
    },
    changeStatus(data){
      this.$http.put(this.$conf.env.changeStatus + data.id + '/', {'status': data.status == 0 ? 1 : 0 }).then( res =>{
        this.$message({  message: '修改成功', type: 'success'});
            this.getCourse_time(1)
      }).catch(err =>{
        if(err.request.status == '400'){
          this.$message.error('该课程已不可修改');
        }else{
          this.$message.error('网络错误');
        }
      })
    }
  },
  mounted() {
      this.getCourse_time(1)
  },
}
</script>
<style lang="scss">
.Class_head_addIcon_class_list{
    float: right;
    margin-bottom: 0.07rem;
    span{
        display: block;
        margin: 0;
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
        .photo{
            width: 100%;
            height: 100%;
            .el-upload--picture-card{
                 width: 100%!important;
                height: 100%!important;
                background: #fff;
                border: 0;
                position: relative;
                img{
                    position: absolute;
                    top: .08rem;
                    left: 0;
                }
                i{
                    width: .8rem;
                    display: block;
                    height: 100%;
                    line-height: .33rem;
                    font-size: .15rem;
                    padding-left: .18rem;
                    color: #333;
                }
            }
            .el-upload-list{
                display: none;
            }
        }
    }
}
</style>
