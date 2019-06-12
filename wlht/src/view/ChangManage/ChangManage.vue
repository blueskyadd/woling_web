<template>
  <div class="wl_ChangManage_list" v-if="isChangEdit">
    <div class="ChangeManage_head_addIcon">
      <span @click="gochangeDetail">
        <img src="../../assets/img/add.png" alt>添加
      </span>
    </div>
    <!--表格部分-->
    <div class="member_table_list">
      <el-table :data="tableData" style="width: 100%" v-loading="isLoading"  @cell-mouse-enter="showEdit" @cell-mouse-leave="leaveEdit">
        <el-table-column prop="date" type='index' width="100%" :index="setIndex" label="序号"></el-table-column>
         <el-table-column prop="name" label="场地名称" ></el-table-column>
        <el-table-column prop="price" label="场地租金"></el-table-column>
        <el-table-column prop="all_price" label="包场租金" ></el-table-column>
        <el-table-column prop="proNum" label="预约人数"></el-table-column>
        <el-table-column prop="Yxiang" label="预定详情"></el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-button  type="text" size="small" v-show="scope.row.flag"  @click="handleClick(scope.row)"><img src="../../assets/img/bianji.png" alt="" srcset=""></el-button>
            <el-button type="text" size="small" v-show="scope.row.flag"><img src="../../assets/img/del.png" alt="" srcset=""></el-button>
          </template>
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
<change-chang v-else :changId='changId'></change-chang>
</template>
<script>
import changeChang from './changeChang.vue'
    export default {
      components:{changeChang},
        name: "ChangManage",
      data() {
        return {
          tableData: [],
          currentPage: 1,
          perPage: 10,
          activelyNumber:1,
          isLoading: true,
          changId: -1,
          isChangEdit: true
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
        handleClick(row){
          this.changId = row.id
          this.isChangEdit = false
        },
        showEdit(row) {
          row.flag = true;
        },
        leaveEdit(row) {
          row.flag = false;
        }, 
        gochangeDetail(){
          this.changId = -1
          this.isChangEdit = false
        },
        getPitchList(){
          this.$http.get(this.$conf.env.setPitchData).then( res =>{
            this.isLoading = false
            if(res.status == '200'){
              res.data.forEach(element => {
                element.flag = false; 
              });
              this.tableData = res.data
            }
          }).catch(err =>{
            this.isLoading = false
            this.message.error('网络错误');
          })
        }
      },
      mounted(){
        this.getPitchList()
      }
    }
</script>

<style lang="scss">
  .wl_ChangManage_list {
    padding: 0.24rem 0.44rem 0 0.33rem;
    height: calc(100% - 1.7rem);
    .ChangeManage_head_addIcon {
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
