<template>
  <div class="Shopp_BOx">
    <section class="Shopping">
      <div class="header_Tit">
        <div class="Title">
          <router-link to="/">
            <img src="../../assets/img/goback.png" alt="">
          </router-link>
          <span>添加主推热点</span>
        </div>
      </div>
      <div class="NewWords">
        <table>
          <tr>
            <td class="One">
              <label for="">商品名称</label>
              <el-input v-model="ReName" placeholder="请输入场地名称"></el-input>
              <label for="">商品状态</label>
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
              <label for="">商品单价</label>
              <el-input v-model="ReName" placeholder="请输入场地名称"></el-input>
              <label for="">商品分类</label>
              <el-select v-model="value" placeholder="请选择" popper-class="shenqi">
                <el-option
                  v-for="item in changStatus"
                  :key="item.value"
                  :label="item.label"

                  :value="item.value">
                </el-option>
              </el-select>
              <label for="">商品数量</label>
              <el-input v-model="ReName" placeholder="请输入场地名称"></el-input>

            </td>
            <td class="Three">

              <div class="Left">
                <label for="">热点图片</label>
                <el-upload
                  class="photo"
                  action="string"
                  ref="upload"
                  :http-request="addAttachment"
                  drag
                >
                  <img :src="classImg" alt="">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击上传</em>
                  </div>
                </el-upload>
              </div>
              <div class="Right">
                <label for="">热点详情</label>
                <el-upload
                  action="string"
                  ref="upload"
                  list-type="picture-card"
                  :http-request="addAttachmentList"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemovelist"
                  :file-list="classListDetail"
                  :multiple="true"
                  :limit="3"
                  :on-exceed="onExceed"
                  :before-upload="beforeAvatarUpload"
                  accept="image/png, image/jpeg"
                  class="photo"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>

                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
              </div>




            </td>
            <td class="Four">
              <label for="">商品介绍</label>
              <el-input
                type="textarea"
                autosize
                :autosize="{ minRows: 12,maxRows:17}"
                placeholder="请输入内容"
                v-model="changJan">
              </el-input>
            </td>
            <td style="height: .4rem;position: relative" class="bcBox">
              <el-button type="primary" class="Pub_But">主要按钮</el-button>
            </td>
          </tr>
        </table>

      </div>
    </section>
  </div>
</template>


<script>
    export default {
        name: "AddShopp",
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
      }
    }
</script>

<style lang="scss">
  .shenqi{
    min-width: 2.76rem !important;
  }
  .Shopp_BOx{
    width: 100%;
    height: 90%;
    padding:.1rem .18rem .14rem .12rem;
    box-sizing: border-box;
    background:#F2F5F8;
    .Shopping{
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
                .el-upload-list{
                  display: none;
                }
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
