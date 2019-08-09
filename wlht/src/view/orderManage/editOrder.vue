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
              <label for="">订单号</label>
              <el-input v-model="orderDetail.order_sn" placeholder="请输入场地名称"></el-input>
              <label for="">订单状态</label>
              <el-select v-model="orderDetail.pay_status.pay_status" placeholder="请选择" popper-class="shenqi">
                <el-option
                  v-for="item in orderStatus"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">
                  {{item.name}}
                </el-option>
              </el-select>
              <label for="">订单类型</label>
              <el-select v-model="classDetailID" placeholder="请选择" popper-class="shenqi">
                <el-option
                  v-for="item in orderType"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                  {{item.value}}
                </el-option>
              </el-select>
            </td>
            <td class="One">
              <label for="">价格</label>
              <el-input v-model="orderDetail.goods_money" placeholder="请输入价格"></el-input>
              <label for="">折扣</label>
              <el-input v-model="orderDetail.money" placeholder="请输入折扣"></el-input>

            </td>
            <td class="Four">
              <label for="">订单备注</label>
              <el-input
                type="textarea"
                :autosize="{ minRows: 12,maxRows:17}"
                placeholder="请输入内容"
                v-model="orderDetail.info">
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
          classDetailID:{
            type: String,
            request: true
          },
        },
      data(){
        return{
          orderDetail: {},
          orderType:[{ id: 2, value: '课程手工订单' }],
          orderStatus: [{name: '已取消', id:  1},{name: '已支付', id:  2},{name: '已完成', id:  3}],
          headerTitle: this.orderID  == -1 ? '添加订单' : '编辑订单',
          restaurants: [],
          isLoading: true
        }
      },
      methods: {
        goorderManage(){
          this.$parent.isorderEdit = true
        },
        submit(){
          if(!this.VerificationData()) return
         
          this.isLoading = true
          console.log(this.getElements('formData'))
          let params ={
            'pay_status': this.orderDetail.pay_status.pay_status,
            'info': this.orderDetail.info
          }
          this.$http.put(this.$conf.env.setOrderClass + this.orderID +'/', params).then( res =>{
            if(res.status == '200'){
              this.$message({  message: '修改成功', type: 'success'});
              this.reload()
            }else{
                this.$message({ message: '修改失败', type: 'warning'});
            } 
          }).catch(err =>{
            this.isLoading = false
            if(err.request.status == '400'){
              this.$message.error("此订单已不可修改");
            }else{
               this.$message.error("服务器错误");
            }
          })
        },
        //数据校验
        VerificationData(){
            if(!this.orderDetail.pay_status.pay_status || !this.orderDetail.info){
              this.$message({ message: '请完善您的信息', type: 'warning'});
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
          this.$http.get(this.$conf.env.setOrderClass + this.orderID).then( res =>{
            this.isLoading = false
            this.orderDetail = res.data
          }).catch(err =>{
            this.isLoading = false
            this.$message.error("服务器错误");
          })
        }
      },
      mounted(){
        this.getOrderDetail()
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
              margin-bottom:.18rem;
              display: flex;
              align-items: center;
              padding-left: .3rem;
              label{
                margin-right: .18rem;
                white-space: nowrap;
                width: .76rem;
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
