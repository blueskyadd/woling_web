<template>
    <div class="wl_memberDetail" v-loading.fullscreen.lock="isLoading">
        <header @click="gomemberManage">
            <span><img src="../../assets/img/goback.png" alt="">{{VipId == -1 ?'添加会员':'编辑会员'}}</span>
        </header>
        <div class="member_main">
            <form action="" method="post" id="formData">
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
                      <el-input v-model="height" placeholder="请填写身高"></el-input>
                      <label class="LR">体重</label>
                      <el-input v-model="width" placeholder="请填写体重"></el-input>
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
                      <el-select v-model="isSister" placeholder="请选择">
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
                      <el-select v-model="teacher"   @change='changeIphone' placeholder="请选择顾问老师">
                        <el-option
                          v-for="item in teacherArr"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                      <label for="" class="LR">电话</label>
                      <el-input  v-model="teacherPhone " class="dandu"></el-input>
                    </td>
                    <td>
                      <label for="">学校</label>
                      <el-input v-model="scholl" placeholder="请输入学校"></el-input>
                    </td>
                    <td>
                      <label for="">家庭住址</label>
                      <el-input v-model="city" placeholder="请输入家庭住址"></el-input>
                    </td>
                    <td>
                      <label>监护人二</label>
                      <el-input v-model="phoneName" placeholder="请填写姓名"></el-input>
                      <label  class="LR">手机号</label>
                      <el-input v-model="phoneName_ipone" placeholder="请填写手机号"></el-input>
                    </td>

                    <td>
                      <label>既往病史</label>
                      <el-input v-model="guomin" placeholder="请填写既往病史"></el-input>
                      <label  class="LR">过敏原</label>
                      <el-input v-model="bingshi" placeholder="请填写过敏原"></el-input>
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
              <div class="OKSend" @click="submit">
                <span>确定</span>
              </div>
            </form>
          <div class="updataPho">
            <el-upload
              class="upload-demo"
              drag
              :http-request="addAttachment"
              :before-upload="beforeAvatarUpload"
              action="string"
              multiple>
              <img :src="userImg" alt="">
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
    inject:['reload'],
    name: 'memberDetail',
    props:{
      VipId:{
        type: Number,
        required: true
      },
    },
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
          guomin: '',
          scholl: '',
          city: '',
          phoneName: '',
          phoneName_ipone: '',
          bingshi: '',
          userImg: '',
          userImgFile: '',
          sister: [{
            value: false,
            label: '无'
          }, {
            value: true,
            label: '有'
          },],
          isSister: '',    //有无兄弟姐妹


          xian: [{
            baoxian: false,
            label: '无'
          }, {
            baoxian: true,
            label: '有'
          },],
          baoxian: '',    //有无保险


          seat: [{
            value: 0,
            label: '男'
          }, {
            value: 1,
            label: '女'
          },],
          seatVal: '',    //性别
          birthday:'',    //出生年月
          nation:'',      //民族
          identityCard:"",  //身份证号


          teacherArr:[],
          teacher:"",

          teacherPhone:"",   //选择老师后的电话
          textarea: '',
          isLoading: false,//加载

        }
    },
    methods: {
       addAttachment(params){
          this.userImgFile = params.file
          this.baseImg(params.file,)
        },

        baseImg(files, flag) {
          let reader = new FileReader();
          let imgFile;
          reader.readAsDataURL(files);
          reader.onload = e => {
            imgFile = e.target.result;
            let arr = imgFile.split(",");
            let obj = {};
            obj.url = "data:image/jpeg;base64," + arr[1];
            this.userImg = obj.url
          };
        },
        /**@图片格式判断 */
        beforeAvatarUpload(file){
          const isJPG = file.type === "image/jpeg"
          const isPng = file.type === "image/png"
          if (!isJPG && !isPng) {
            this.$message.error("上传头像图片只能是 JPG或PNG格式!");
          }
          return isJPG  || isPng ;
        },
        gomemberManage(){
            this.$parent.isMemberEdit = true
        },
        submit(){
          console.log(this.isSister)
          if(!this.VerificationData()) return
          console.log(this.getElements('formData'))
          var params = new FormData()
          params.append('name', this.getElements('formData')[0])//姓名
          params.append('mobile', this.getElements('formData')[1])//手机号
          params.append('sex' , this.seatVal)//性别
          params.append('birth' , this.getElements('formData')[12])//生日
          params.append('height' , this.getElements('formData')[2])//身高cm
          params.append('weight' , this.getElements('formData')[3])//体重
          params.append('nation' , this.getElements('formData')[13])//民族
          params.append('id_card' , this.getElements('formData')[14])//身份证号
          params.append('picture' , this.userImgFile ? this.userImgFile : '')//头像
          params.append('census_register' , this.getElements('formData')[4])//户籍
          params.append('counselor' , this.teacher)//课程顾问 外键
          params.append('passport_number' , this.getElements('formData')[5])//	护照号码
          params.append('school' , this.getElements('formData')[17])//学校
          params.append('school_cart' , this.getElements('formData')[6])//学籍卡号
          params.append('address' , this.getElements('formData')[18])//家庭地址
          params.append('guardian_one' , this.getElements('formData')[7])//监护人1姓名
          params.append('guardian_one_phone' , this.getElements('formData')[8])//监护人1手机号
          params.append('guardian_two' , this.getElements('formData')[19])//监护人2姓名
          params.append('guardian_two_phone' , this.getElements('formData')[20])//监护人2手机号
          params.append('hasbrother' , this.isSister)//兄妹情况 0.1
          params.append('insurance' , this.baoxian)//保险情况 0 1
          params.append('medical_history' , this.getElements('formData')[21])//既往病史
          params.append('allergen' , this.getElements('formData')[22])//过敏源
          params.append('comment' , this.textarea)//备注
          this.isLoading = true;
          this.VipId != -1 ? this.updataMember(params): this.addMember(params)
        },
        addMember(params){
          this.$http.post(this.$conf.env.setVipData, params, true).then( res =>{
            this.isLoading = false
            if(res.status == '201'){
              this.$message({  message: '添加成功', type: 'success'});
              this.reload()
            }else{
               this.$message({ message: '添加失败', type: 'warning'});
            }
          }).catch(err =>{
            this.isLoading = false;
            this.$message.error("网络错误");
          })
        },
        updataMember(params){
          this.$http.put(this.$conf.env.setVipData + this.VipId +'/', params, true).then( res =>{
            this.isLoading = false
            if(res.status == '200'){
                this.$message({ message: '修改成功', type: 'success'});
                this.reload()
            }else{
                this.$message({ message: '修改失败', type: 'warning'});              
            }
          }).catch(err =>{
            this.isLoading = false;
            this.$message.error("网络错误");
          })
        },
        //数据校验
        VerificationData(){
              if(!this.getElements('formData')[0] || !this.getElements('formData')[1] || !this.getElements('formData')[11] || !this.getElements('formData')[12] ){
                this.$message({ message: '姓名、手机号、性别、生日为必填项', type: 'warning'});
                return false
              }
              var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
              var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
              var PassportNumberReg = /^1[45][0-9]{7}$|(^[P|p|S|s]\d{7}$)|(^[S|s|G|g|E|e]\d{8}$)|(^[Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8}$)|(^[H|h|M|m]\d{8,10}$)/;
                if (this.getElements('formData')[1] && !myreg.test(this.getElements('formData')[1])  || this.getElements('formData')[8] &&  !myreg.test(this.getElements('formData')[8]) || this.getElements('formData')[20] && !myreg.test(this.getElements('formData')[20]) || this.getElements('formData')[16] && !myreg.test(this.getElements('formData')[16])){
                    this.$message({ message: '请填写正确的手机号', type: 'warning'});
                    return false
                }else if(this.getElements('formData')[14] && !reg.test(this.getElements('formData')[14])){
                    this.$message({ message: "请填写正确的身份证号码", type: 'warning'})
                    return false
                }else if(this.getElements('formData')[5] && !PassportNumberReg.test(this.getElements('formData')[5])){
                    this.$message({ message: "请填写正确的护照号码", type: 'warning'})
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
      setElements(data, index){
        var form = document.getElementById('formData');   
        var tagElements = form.getElementsByTagName('input');
        tagElements[index].value = data
      },
      
      changeIphone(data){
        if(!data) return
        this.teacherArr.forEach( elements =>{
          if(data == elements.id){
            this.teacherPhone = elements.username
          }
        })
      },
      getVipDetail(){
        this.$http.get(this.$conf.env.setVipData+this.VipId+'/').then( res =>{
          this.isLoading = false;
          this.setElements(res.data.name?res.data.name:'', 0)
          this.setElements(res.data.mobile?res.data.mobile:'', 1)
          // this.setElements(res.data.sex?res.data.sex:'', 11)//性别
          this.seatVal = res.data.sex ? res.data.sex: 0
          this.setElements(res.data.birth?res.data.birth:'', 12)//生日
          this.setElements(res.data.height?res.data.height:'', 2)//身高cm
          this.setElements(res.data.weight?res.data.weight:'', 3)//体重
          this.setElements(res.data.nation?res.data.nation:'', 13)//民族
          this.setElements(res.data.id_card?res.data.id_card:'', 14)//身份证号
          this.userImg = res.data.picture?res.data.picture:''//头像
          this.setElements(res.data.census_register?res.data.census_register:'', 4)//户籍
           this.teacher = res.data.counselor ? res.data.counselor : ''//课程顾问 外键
           this.changeIphone(res.data.counselor)
          this.setElements(res.data.passport_number?res.data.passport_number:'', 5)//	护照号码
          this.setElements(res.data.school?res.data.school:'', 17)//学校
          this.setElements(res.data.school_cart?res.data.school_cart:'', 6)//学籍卡号
          this.setElements(res.data.address?res.data.address:'', 18)//家庭地址
          this.setElements(res.data.guardian_one?res.data.guardian_one:'', 7)//监护人1姓名
          this.setElements(res.data.guardian_one_phone?res.data.guardian_one_phone:'', 8)//监护人1手机号
          this.setElements(res.data.guardian_two?res.data.guardian_two:'', 19)//监护人2姓名
          this.setElements(res.data.guardian_two_phone?res.data.guardian_two_phone:'', 20)//监护人2手机号
          this.isSister = res.data.hasbrother ? res.data.hasbrother: false//兄妹情况 0.1
          this.baoxian = res.data.insurance ? res.data.insurance: false//保险情况 0 1
          this.setElements(res.data.medical_history?res.data.medical_history:'', 21)//既往病史
          this.setElements(res.data.allergen?res.data.allergen:'', 22)//过敏源
          this.textarea = res.data.comment?res.data.comment:''//备注
          
        }).catch( err =>{
          this.isLoading = false;
          this.$message.error("网络错误");
        })
      },
      getTeacherList(){
        this.$http.get(this.$conf.env.getTeacherList).then( res =>{
        
          this.teacherArr = res.data
          
        }).catch( err =>{
          this.isLoading = false;
          this.$message.error("网络错误");
        })
      }
    },
    mounted() {
      if(this.VipId != -1){
        this.isLoading = true
        this.getVipDetail()
      }
      this.getTeacherList()
    },
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
                          font-size: .18rem;
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
                        font-size: .18rem;
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
                 font-size: .18rem;
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
            img{
              width: 100%;  
                  height: 100%;
            }
          }
          .el-upload-list{
            display: none;
          }
        }
      }
    }

}
.member_selete_list{
    margin-top: .56rem !important;
}
</style>
