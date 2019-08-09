<template>
  <div class="Order_BOx" v-loading.fullscreen.lock="isLoading">
    <section class="Order">
      <div class="header_Tit">
        <div class="Title" >
          <span @click="goorderManage">
            <img src="../../assets/img/goback.png" alt="">
          </span>
          <span @click="goorderManage">{{headerTitle}}</span>
        </div>
      </div>
      <div class="NewWords">
        <form id="formData">
        <table>
          <tr>
            <td class="One">
              <label for="">电话检索</label>
               <el-autocomplete
                class="inline-input"
                v-model="orderPhone"
                :fetch-suggestions="searchPhone"
                placeholder="请输入电话号码"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>

              <label for="">学生选择</label>
              <el-select v-model="studentNameID" placeholder="请选择" popper-class="shenqi">
                <el-option
                  v-for="item in studentNameData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">{{item.name}}
                </el-option>
              </el-select>
              
            </td>
            <td class="One">
              <label for="">订单类型</label>
              <el-select v-model="orderTypeID" placeholder="请选择" popper-class="shenqi">
                <el-option
                  v-for="item in orderType"
                  :key="item.value"
                  :label="item.value"

                  :value="item.id">{{item.value}}
                </el-option>
              </el-select>
              <label for="">课程选择</label>
              <el-select v-model="orderClassID" placeholder="请选择" popper-class="shenqi">
                <el-option
                  v-for="item in orderClassList"
                  :key="item.name"
                  :label="item.name"

                  :value="item.id">{{item.name}}
                </el-option>
              </el-select>
              <label for="">订单状态</label>
              <el-select v-model="orderStatusID" placeholder="请选择" popper-class="shenqi">
                <el-option
                  v-for="item in orderStatus"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">{{item.name}}
                </el-option>
              </el-select>
            </td>
            <td class="One">
             <label for="">价格&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <el-input type="number" v-model="orderPrice" placeholder="请输入价格"></el-input>
              <label for="">折扣&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <el-input type="number" v-model="orderDiscount" placeholder="请输入折扣"></el-input>
            </td>
            <td class="Four">
              <label for="">订单备注</label>
              <el-input
                type="textarea"
                :autosize="{ minRows: 12,maxRows:17}"
                placeholder="请输入内容"
                v-model="orderRemark">
              </el-input>
            </td>
            <td  class="bcBox">
              <el-button type="primary" class="Pub_But"  @click="submit">保存</el-button>
            </td>
          </tr>
        </table>
        </form>
      </div>
    </section>
  </div>
</template>
<script>
    export default {
        name: "AddOrder",
        inject:['reload'],
        props:{
          orderID:{
            type: Number,
            request: true
          },
          orderUrl:{
            type: String,
            request: true
          }
        },
      data(){
        return{
          phoneList:[],//手机号检索
          restaurants: [],
          studentNameData: [],
          orderType:[{ id: 2, value: '课程手工订单' }],
          orderStatus: [{name: '已取消', id:  1},{name: '已支付', id:  2},{name: '已完成', id:  3}],
          orderClassList: [],
          orderPhone: '',
          studentNameID: '',
          orderTypeID: '',
          orderClassID: '',
          orderStatusID: '',
          orderPrice:'',
          orderDiscount: '',
          orderRemark: '',
          headerTitle: this.orderID  == -1 ? '添加订单' : '编辑订单',
          isLoading: false
        }
      },
      methods: {
        goorderManage(){
          this.$parent.isorderEdit = true
        },
        submit(){
          if(!this.VerificationData())return
          this.isLoading = true
          var params = {
            'user': this.studentNameID,
            'goods': this.orderClassID,
            'money': (this.orderPrice * this.orderDiscount).toFixed(2),
            'info': this.orderRemark,
          }
          this.$http.post(this.$conf.env.setOrderClass, params).then( res =>{
             this.isLoading = false
          if(res.status == '201'){
              this.$message({  message: '添加成功', type: 'success'});
              this.reload()
            }else{
                this.$message({ message: '添加失败', type: 'warning'});
            } 
          }).catch(err =>{
             this.isLoading = false
             if(err.request.status == '400'){
               console.log(err.request.responseText)
                this.$message.error(err.request.responseText);
             }else{
                this.$message.error("服务器错误");
             }
           
          })
        },
        //数据校验
        VerificationData(){
          for(let i = 0 ; i < this.getElements('formData').length-1; i++){
            if(!this.getElements('formData')[i] || !this.orderRemark){
               console.log(this.getElements('formData')[i])
              this.$message({ message: '请完善您的信息', type: 'warning'});
              return false
            }
          }
           var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
            if (!myreg.test(this.orderPhone.replace(/(^\s*)|(\s*$)/g, ""))) {
              this.$message({ message: '请填写正确的手机号', type: 'warning'});
              return false
            }else{
              return true
            }
        },
        getElements(formId) {    
            var form = document.getElementById(formId);    
            var elements = new Array();    
            var tagElements = form.getElementsByTagName('input');    
            for (var j = 0; j < tagElements.length; j++){ 
                elements.push(tagElements[j].value);
            }  
            return elements;    
        },
        getOrderDetail(){

          this.$http.get(this.$conf.env.getOrderDetail + this.orderUrl).then( res =>{
          console.log(res)
          }).catch(err =>{
            this.$message.error("服务器错误");
          })
        },
       
        //电话选择
        handleSelect(item) {
          this.studentNameData = [];
          this.studentNameData.push(item);
          this.studentNameID = item.id;

        },
        //电话检索
        searchPhone(queryString, cb) {
          var restaurants = this.restaurants;
          var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
          this.$http.get(this.$conf.env.searchPhone + queryString).then( res =>{
            res.data.forEach( value =>{
              value.value = value.mobile
            })
            cb(res.data)
            this.studentNameData = res.data
            }).catch(err =>{
            this.$message.error("服务器错误");
          })
        },
        createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          };
        },
        orderClassData(){
          this.$http.get(this.$conf.env.orderClassData).then( res =>{
          console.log(res)
          this.orderClassList = res.data
          }).catch(err =>{
            this.$message.error("服务器错误");
          })
        }
      },
      mounted(){
        this.orderClassData()
        // this.orderID == -1 ?  this.searchPhone: this.getOrderDetail()
      }
    }
</script>


<style lang="scss">
  .shenqi{
    min-width: 2.76rem !important;
  }
  .Order_BOx{
    width: 100%;
    height: 90%;
    padding:.1rem .18rem .14rem .12rem;
    box-sizing: border-box;
    background:#F2F5F8;
    .Order{
      width: 100%;
      height: 100%;
      background: #fff;
      .header_Tit{
        .Title{
          display: flex;
          padding:.31rem 0 .68rem .3rem;
          align-items: center;
          a{
            width: .22rem;
            height: .22rem;
            margin-right: .22rem;
            img{
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          span{
            color: rgba(127, 99, 244, 1);
            font-size: .2rem;
            margin-right: .2rem;
          }
        }
      }
      .NewWords{
        width: 100%;
        height: 87%;
        #formData{
          height: calc(100% - 1rem);
        }
        table{
          width: 100%;
          height:100%;
          tr{
            td{
              margin-bottom:.4rem;
              display: flex;
              align-items: center;
              padding-left: .3rem;
              label{
                margin-right: .18rem;
                white-space: nowrap;
                    font-size: .18rem;
              }
              .photo{
                img{
                  width:100%;
                  height:100%;

                }

              }
              textarea{
                width: 50%;
              }
            }
            .Three{
              .Left{
                width: 40%;
                display: flex;
              }
              .Right{
                width: 60%;
                display: flex;

              }

            }
            .One{
              .el-input{
                width: 2.76rem;
                margin-right: 1.18rem;
              }
            }
            .Four{
              align-items: flex-start;
            }
          }
          .bcBox{
            position: absolute;
            top: 80%;
            height: .4rem;
            left: 50%;
            .Pub_But{
              position: absolute;
              left: 40%;
              top: 150%;
            }
          }
        }
      }
    }
  }
</style>
