<template>
    <div class="wl_memberDetail">
        <header>
            <span><img src="../../assets/img/goback.png" alt="">添加会员</span>
        </header>
        <div class="member_main">
            <form action="" method="post">
              <div class="Form_Left">
                <table>
                  <tr>
                    <td>
                      <label>姓名</label>
                      <el-input v-model="name" placeholder="请填写姓名"></el-input>
                      <label  class="LR">手机号</label>
                      <el-input v-model="phone" placeholder="请填写手机号"></el-input>
                    </td>
                    <td>
                      <label>身高</label>
                      <el-input v-model="height" placeholder="请填写姓名"></el-input>
                      <label class="LR">体重</label>
                      <el-input v-model="width" placeholder="请填写手机号"></el-input>
                    </td>
                    <td>
                      <label for="">户籍</label>
                      <el-input v-model="address" placeholder="请输入户籍所在地"></el-input>
                    </td>
                    <td>
                      <label for="">护照号码</label>
                      <el-input v-model="huzpho" placeholder="请输入护照号码"></el-input>
                    </td>
                    <td>
                      <label for="">学籍卡号</label>
                      <el-input v-model="kapho" placeholder="请输入学籍卡号"></el-input>
                    </td>
                    <td>
                      <label>监护人一</label>
                      <el-input v-model="JHRName" placeholder="请填写姓名"></el-input>
                      <label  class="LR">手机号</label>
                      <el-input v-model="JHRphone" placeholder="请填写手机号"></el-input>
                    </td>
                    <td>
                      <label for="">兄妹情况</label>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in sister"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>


                      <label  class="LR">保险情况</label>
                      <el-select v-model="baoxian" placeholder="请选择">
                        <el-option
                          v-for="item in xian"
                          :key="item.baoxian"
                          :label="item.label"
                          :value="item.baoxian">
                        </el-option>
                      </el-select>
                    </td>
                  </tr>
                </table>

              </div>
              <div class="Form_RIght">
                <table>
                  <tr>
                    <td>
                      <label>性别</label>
                      <el-select v-model="seatVal" placeholder="请选择">
                        <el-option
                          v-for="item in seat"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <label  class="LR">出生日期</label>
                      <el-date-picker
                        class="birtody"
                        v-model="birthday"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </td>
                    <td>
                      <label>民族</label>
                      <el-input v-model="nation" placeholder="请输入民族"></el-input>
                      <label class="LR">身份证号</label>
                      <el-input type="number" v-model="identityCard " placeholder="请输入身份证号"></el-input>
                    </td>
                    <td>
                      <label for="">课程顾问</label>
                      <el-select v-model="teacher" placeholder="请选择顾问老师">
                        <el-option
                          v-for="item in teacherArr"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <label for="" class="LR">电话</label>
                      <el-input  v-model="teacherPhone " class="dandu"></el-input>
                    </td>
                    <td>
                      <label for="">学校</label>
                      <el-input v-model="school" placeholder="请输入学校"></el-input>
                    </td>
                    <td>
                      <label for="">家庭住址</label>
                      <el-input v-model="homeSeat" placeholder="请输入家庭住址"></el-input>
                    </td>
                    <td>
                      <label>监护人二</label>
                      <el-input v-model="JHRNameTwo" placeholder="请填写姓名"></el-input>
                      <label  class="LR">手机号</label>
                      <el-input v-model="JHRphoneTwo" placeholder="请填写手机号"></el-input>
                    </td>

                    <td>
                      <label>既往病史</label>
                      <el-input v-model="bingSHI" ></el-input>
                      <label  class="LR">过敏原</label>
                      <el-input v-model="guomin" placeholder="请填写过敏原"></el-input>
                    </td>
                  </tr>
                </table>

              </div>
              <div class="Form_Bottom">
                <label for="">个人备注</label>
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
              </div>
              <div class="OKSend">
                <span>确定</span>
              </div>
            </form>
          <div class="updataPho">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'memberDetail',
    data(){
        return{
          name:"",     //姓名
          phone:"",     //手机号
          height:"",     //身高
          width:"",      //体重
          address:"",      //户籍所在地
          huzpho:"",       //护照号码
          kapho:"",      //学籍卡号
          JHRName:"",     //监护人一
          JHRphone:"",    //监护人手机号

          sister: [{
            value: '无',
            label: '无'
          }, {
            value: '有',
            label: '有'
          },],
          value: '',    //有无兄弟姐妹


          xian: [{
            baoxian: '无',
            label: '无'
          }, {
            baoxian: '有',
            label: '有'
          },],
          baoxian: '',    //有无保险


          seat: [{
            value: '男',
            label: '男'
          }, {
            value: '女',
            label: '女'
          },],
          seatVal: '',    //性别
          birthday:'',    //出生年月
          nation:'',      //民族
          identityCard:"",  //身份证号


          teacherArr:[
            {
              value: '岳云鹏',
              label: '岳云鹏'
            }, {
              value: '彭于晏',
              label: '彭于晏'
            },
          ],
          teacher:"",

          teacherPhone:"13521202102",   //选择老师后的电话
          school:"",     //学校
          homeSeat:"",      //家庭地址
          JHRNameTwo:"",     //监护人二姓名
          JHRphoneTwo:"",     //监护人二电话
          bingSHI:"",     // 病史
          guomin:"",      //过敏原
          textarea: ''

        }
    }
}
</script>
<style lang="scss" >
.wl_memberDetail{
    margin: 0.13rem 0.18rem 0.13rem 0.13rem;
    padding: .3rem .45rem .33rem .3rem;
    background: #fff;
    height: calc(100% - 1.3rem);
    header{
        span{
            font-size: .2rem;
            color: #464A53;
            img{
                margin-right: .12rem;

            }
        }
    }
    .member_main{
        padding: .39rem 0 0;
        height: calc(100% - 3.2%);
      display: flex;
      form{
           overflow: hidden;
           width: calc(100% - 20%);
           height: 100%;
            display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
           .Form_Left{
             width:49%;
             height: 70%;
             /*background: red;*/
             table{
               width: 100%;
               height: 100%;
                tr{
                  td{
                    display: flex;
                    align-items: center;
                    margin-bottom: .3rem;
                    .LR{
                      padding-left: .3rem;
                      display: block;
                      width: 2rem;
                    }
                    label{
                      white-space: nowrap;
                      margin-right: .23rem;
                    }
                  }
                }
             }
           }
          .Form_RIght{
            width: 49%;
            height: 70%;
            /*background: blue;*/
            table{
              width: 100%;
              height: 100%;
              tr{
                td{
                  display: flex;
                  align-items: center;
                  margin-bottom: .3rem;
                  .LR{
                    padding-left: .3rem;
                    display: block;
                    width: 2rem;
                  }
                  .dandu{
                    width: 50%;
                  }
                  label{
                    white-space: nowrap;
                    margin-right: .23rem;
                  }
                  .el-date-editor.el-input, .el-date-editor.el-input__inner{
                    width: auto;
                  }
                }
              }
            }
          }
          .Form_Bottom{
            width: 100%;
            height: 15%;
            /*background: yellow;*/
            margin-top:2%;
            margin-bottom: 2%;
            display: flex;
            flex-wrap: nowrap;
           label{
             white-space: nowrap;
             margin-right: .2rem;
           }
          }
          .OKSend{
            width: 100%;
            height: 10%;
            span{
              display: block;
              margin:0 auto;
              width: 1.5rem;
              height: .4rem;
              border-radius: 4px;
              background-color: rgba(127, 99, 244, 1);
              color: rgba(255, 255, 255, 1);
              font-size: .18rem;
              text-align: center;
              margin-top:5px;
              line-height: .4rem;
              cursor: pointer;
            }
          }
        }
      .updataPho{
        width: 20%;
        .upload-demo{
          width: 80%;
          margin:0 auto;
          .el-upload{
            width: 100%;
            .el-upload-dragger{
              width:100%;
            }
          }
        }
      }
    }

}
.member_selete_list{
    margin-top: .56rem !important;
}
</style>
