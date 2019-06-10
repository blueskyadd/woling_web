<template>
  <div class="Order_BOx">
    <section class="Order">
      <div class="header_Tit">
        <div class="Title" @click="goorderManage">
          <span>
            <img src="../../assets/img/goback.png" alt="">
          </span>
          <span>添加订单</span>
        </div>
      </div>
      <div class="NewWords">
        <form id="formData">
        <table>
          <tr>
            <td class="One">
              <label for="">电话检索</label>
              <el-input v-model="ReName" placeholder="请输入场地名称"></el-input>
              <label for="">学生选择</label>
              <el-select v-model="value" placeholder="请选择" popper-class="shenqi">
                <el-option
                  v-for="item in changStatus"
                  :key="item.value"
                  :label="item.label"

                  :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td class="Two">
              <label for="">订单类型</label>
              <el-input v-model="ReName" placeholder="请输入场地名称"></el-input>
              <label for="">课程选择</label>
              <el-select v-model="value" placeholder="请选择" popper-class="shenqi">
                <el-option
                  v-for="item in changStatus"
                  :key="item.value"
                  :label="item.label"

                  :value="item.value">
                </el-option>
              </el-select>
              <label for="">订单状态</label>
              <el-input v-model="ReName" placeholder="请输入场地名称"></el-input>

            </td>
            <td class="One">
              <label for="">价格&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <el-input v-model="ReName" placeholder="请输入场地名称"></el-input>
              <label for="">折扣&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <el-input v-model="ReName" placeholder="请输入场地名称"></el-input>

            </td>
            <td class="Four">
              <label for="">订单备注</label>
              <el-input
                type="textarea"
                autosize
                :autosize="{ minRows: 12,maxRows:17}"
                placeholder="请输入内容"
                v-model="changJan">
              </el-input>
            </td>
            <td style="height: .4rem;position: relative" class="bcBox">
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
      data(){
        return{
          ReName:'',    //场地名称
          changStatus: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: '',
          value6:"",

          classImgFile:"",
          classImg:"",


          classListDetail:[],
          dialogImageUrl: "",//预览图片
          dialogVisible: false,
          changJan:""
        }
      },
      methods: {
        addAttachment(params){
          this.classImgFile = params.file
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
            this.classImg = obj.url
          };
        },


        //课程介绍图片上传
        addAttachmentList(params) {
          console.log(params);
        },

        /**@name图片预览 */
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          console.info(this.dialogImageUrl)
          this.dialogVisible = true;
        },

        /**@name图片删除 */
        handleRemovelist(file, fileList){
          this.classListDetail = fileList
        },


        /**@文件超出个数限制 */
        onExceed() {
          this.$message.error("最多添加三张图片");
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
        goorderManage(){
          this.$parent.isorderEdit = true
        },
        submit(){
          this.VerificationData()
          console.log(this.getElements('formData'))
        },
        //数据校验
        VerificationData(){
          for(let i = 0 ; i < this.getElements('formData').length-1; i++){  
            if(!this.getElements('formData')[i]){
              this.$message({ message: '请完善您的信息', type: 'warning'});
              return false
            }
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
          }
        }
      }
      .NewWords{
        width: 100%;
        height: 87%;
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
            .Two{
              .el-input{
                width: 2.76rem;
                margin-right: 1.18rem;
              }
            }
          }
          .bcBox{
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
