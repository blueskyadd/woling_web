<template>
  <div class="wl_ChangManage_list" v-if="isChangEdit == 1">
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
        <!-- <el-table-column prop="proNum" label="预约人数"></el-table-column> -->
        <el-table-column prop="status" label="预定详情">
            <template slot-scope="scope">
              <el-button type="text" @click="openYxDetail(scope.row)">
                <img src="../../assets/img/ck.png" alt srcset>
              </el-button>
            </template>
        </el-table-column>
         <el-table-column prop="status" label="时间修改">
            <template slot-scope="scope">
              <el-button type="text"  @click="openTimeDetail(scope.row)">
                <img src="../../assets/img/ck.png" alt srcset>
              </el-button>
            </template>
        </el-table-column>
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
    <transition name="el-fade-in-linear">
        <el-dialog  class="transition-box" v-if="showTime" :visible.sync="showTime" center  v-loading.fullscreen.lock="isLoadingTable" :before-close="handleClose" > 
            <div class="Box_right">
              <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="showTime = false"><i class="el-dialog__close el-icon el-icon-close"></i></button>
              <header>时间段</header>
              <div class="main">
                <el-time-picker v-model="value2" value-format='HH:mm' :clearable='false' format='HH:mm' ></el-time-picker><span> <i>——</i>{{setTimeOut(value2)}}</span>
                <el-time-picker v-model="value3" value-format='HH:mm' :clearable='false' format='HH:mm' ></el-time-picker><span> <i>——</i>{{setTimeOut(value3)}}</span>
                <el-time-picker v-model="value4" value-format='HH:mm' :clearable='false' format='HH:mm' ></el-time-picker><span> <i>——</i>{{setTimeOut(value4)}}</span>
                <el-time-picker v-model="value5" value-format='HH:mm' :clearable='false' format='HH:mm' ></el-time-picker><span> <i>——</i>{{setTimeOut(value5)}}</span>
                <el-time-picker v-model="value6" value-format='HH:mm' :clearable='false' format='HH:mm' ></el-time-picker><span> <i>——</i>{{setTimeOut(value6)}}</span>
                <el-time-picker v-model="value7" value-format='HH:mm' :clearable='false' format='HH:mm' ></el-time-picker><span> <i>——</i>{{setTimeOut(value7)}}</span>
                <el-time-picker v-model="value8" value-format='HH:mm' :clearable='false' format='HH:mm' ></el-time-picker><span> <i>——</i>{{setTimeOut(value8)}}</span>
                <el-time-picker v-model="value9" value-format='HH:mm' :clearable='false' format='HH:mm' ></el-time-picker><span> <i>——</i>{{setTimeOut(value9)}}</span>
              </div>
              <el-button type="primary" class="Pub_But" @click="SubmitTime()">确定</el-button>
            </div>
             <div class="Box_left">
              <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
              <Calendar
                v-on:choseDay="clickDay"
                v-on:changeMonth="changeDate"
                v-on:isToday="clickToday"
                :sundayStart="true"
              ></Calendar>
            </div>
        </el-dialog>
        
      </transition>
  </div>
<site-manage  v-else-if="isChangEdit == 2" :siteTime='siteTime'></site-manage>

<change-chang v-else :changId='changId'></change-chang>
</template>
<script>
import Calendar from 'vue-calendar-component';
import changeChang from './changeChang.vue'
import SiteManage from '../SiteManagement/appointment.vue'
    export default {
      components:{changeChang, SiteManage, Calendar},
        name: "ChangManage",
        inject:['reload'],
      data() {
        return {
          tableData: [],
          isLoadingTable: false,
          currentPage: 1,
          perPage: 10,
          activelyNumber:1,
          
          isLoading: true,
          changId: -1,
          isChangEdit: 1,
          value2: '',
          value3: '',
          value4: '',
          value5: '',
          value6: '',
          value7: '',
          value8: '',
          value9: '',
          showTime: false,//时间修改框
          newData: '',
          isNewTime: false,
          pitch_time: [],
          siteTime: ''
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
        openYxDetail(data){
          this.isChangEdit = 2
        },
        openTimeDetail(data){
          this.changId = data.id
          this.showTime = true
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
            this.$message.error('网络错误');
          })
        },
        clickDay(data) {
          if(new Date(data+' '+ '00:00:00').getTime()<new Date().getTime()){
            this.$message.error('请选择今天以后的时间');
          }
          this.isNewTime = true
          this.newData = data.split('/').join('-')
        },
        changeDate(data) {
          // console.log(data); //左右点击切换月份
        },
        clickToday(data) {
          // console.log(data); //跳到了本月
        },
        setTimeOut(data){
          if(!this.newData){
            var d = new Date()
            this.newData = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); 
          }
          var timestamp = new Date(this.newData+' '+data + ':00')
          var timestamp2 = timestamp.getTime();
          var seconds = 2000*3600;
          return this.format(timestamp2+seconds).split(' ')[1]
        },
       addTime(m){return m<10?'0'+m:m },
       
       format(shijianchuo){
          if(!shijianchuo)  return ''
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y+'-'+this.addTime(m)+'-'+this.addTime(d)+' '+this.addTime(h)+':'+this.addTime(mm);
        },
        VerificationData(){
          var arr  = [this.value2,this.value3,this.value4,this.value5,this.value6,this.value7,this.value8,this.value9]
          arr.forEach(element =>{
            if(element){
              var timestamp = new Date(this.newData+' '+element + ':00')
              var timestamp2 = timestamp.getTime();
              var seconds = 2000*3600;
              var objTime={
                'start_time':this.newData+' '+ element,
                'end_time':this.newData +' ' +this.format(timestamp2 + seconds).split(' ')[1] ,
              }
              this.pitch_time.push(objTime)
            }
          })
        },
        deleteData(){
          var arr  = [this.value2,this.value3,this.value4,this.value5,this.value6,this.value7,this.value8,this.value9]
          arr.forEach(element =>{
              element =''
          })
          this.pitch_time = []
        },
        SubmitTime(){
          console.log('this.isNewTime',this.isNewTime);
          
          if(!this.isNewTime){
            this.$message.error('请选择具体日期');
            return false
          }
          if(new Date(this.newData+' '+ '00:00:00').getTime()<new Date().getTime()){
            this.$message.error('请选择今天以后的时间');
            return false
          }
          
          this.VerificationData()
          var params ={
            'day': this.newData,//日期
            'store': this.changId,// 球场id
            'pitch_time': this.pitch_time

          }
          this.isLoadingTable = true
           this.deleteData()
          this.$http.post(this.$conf.env.createdPitchTime, params).then( res =>{
          console.log(res)
          this.isLoadingTable = false
              if(res.status == '201'){
                this.$message({  message: '添加成功', type: 'success'});
                this.reload()
              }else{
                this.$message({ message: '添加失败', type: 'warning'});
              }
          }).catch(err =>{
            this.deleteData()
            this.isLoadingTable = false
            if(err.response.status== ' 400'){
              this.$message.error(err.response.data[0]);
              
            }else{
              this.$message.error('网络错误');
            }
          })
        },
        handleClose(done){
          this.deleteData()
          console.log('aaaaaaaaaaa')
          this.showTime = false
          done()
        }
      },
      mounted(){
        this.getPitchList()
      },
      
    }
</script>

<style lang="scss">
  .wl_ChangManage_list {
    padding: 0.24rem 0.44rem 0 0.33rem;
    height: calc(100% - 1.7rem);
    .el-dialog{
          width: 10.51rem !important;
          height: 5.84rem;
          background: none !important;
          .el-dialog__header{
            display: none;
          }
          .el-dialog__body{
            width: 100%;
            height: 100%;
            padding: 0;
          }
          .Box_left{
            width: 50%;
            height: 100%;
            background: #fff;
            float: right;
            border-radius: .12rem;
            overflow: hidden;
            margin-right: -.01rem;
            box-shadow: 0 0 0.02rem 0.03rem rgba(146, 139, 177, 1);
            padding-top: .4rem;
            .wh_content_item{
              color: #343434;
            }
            .wh_content_all{
              background: #fff;
              color: #363636;
            }
            .wh_isToday{
              // background: #7f63f4 !important;
              // color: #fff;
              background: none !important;
            }
            .wh_chose_day{
              background: #7f63f4 !important;
              color: #fff;
            }
            .wh_top_changge{
              li{
                color: #363636;
                font-size: .14rem;
                font-weight: 600;
                div{
                  border-color: #7f63f4;
                  
                }
              }
              li:first-child,li:last-child{
                flex: 1.5;
              }
              li:nth-child(2){
                flex: 0.9;
              }
              
            }
            .wh_item_date[data-v-2ebcbc83]:hover{
              background: #7f63f4 !important;
              color: #fff;
              border-radius: 50%;
            }
            .wh_content_item{
              height: .6rem;
            }
            .wh_container{
              min-width: 5.5rem;
            }
          }
          .Box_right{
            width: 50%;
            height: 100%;
            background: #fff;
            float: right;
            border-radius: .12rem;
            overflow: hidden;
            padding: .7rem  .29rem 0 ;
            header{
              font-size: .14rem;
              color: #7f63f4;
              font-weight: 600;

            }
            .el-date-editor.el-input{
              width: .73rem;
              float: left;
              display: block;
              height: .5rem;
              line-height: .5rem;
              input{
                height: 100%;
                padding: 0 .1rem;
              }
            }
          }
          
          .Box_right>.main{
            padding-top: .3rem;
            overflow: hidden;
            height: 4.3rem;
            
            .el-input__prefix{
              display: none;
            }
          }
          .Pub_But{
              float: right;
            }
          .Box_right>.main>span{
            display: block;
            width: 1.4rem;
            height: .5rem;
            padding: .02rem;
            line-height: .5rem;
            float: left;
            margin-bottom: .25rem;
            i{
               color: #dddfe2;

            }
          }
    }
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
