<template>
  <div class="wl_classDetail">
    <header>
      <span @click="goclassManage">
        <img src="../../assets/img/goback.png" alt>添加课程
      </span>
    </header>
    <div class="class_main">
      <div class="ScrollY">
        <form action method="post">
          <label>
            <span>课程名称</span>
            <input placeholder="请填写课程名称" type="text" id="name">
          </label>
          <label>
            <span>年龄段</span>
            <el-select popper-class="class_selete_list" v-model="ageData" placeholder="请选择年龄段">
              <el-option
                v-for="item in ageList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </label>
          <label>
            <span>课程类别</span>
            <el-select popper-class="class_selete_list" v-model="curriculumData" placeholder="请选择课程类别">
              <el-option
                v-for="item in curriculumList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </label>
          <label>
            <span>上课人数</span>
            <input placeholder="请填写上课人数" type="number" id="name">
          </label>
          <label>
            <span>课程价格</span>
            <input placeholder="请填写课程价格" type="number" id="name">
          </label>
          <label>
            <span>课时</span>
            <input placeholder="请填写课时" type="number" id="name">
          </label>
          <label>
            <span>教练</span>
            <el-select popper-class="class_selete_list" v-model="value" placeholder="请选择年龄段">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </label>
          <label>
            <span>副教练</span>
            <el-select popper-class="class_selete_list" v-model="value" placeholder="请选择年龄段">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </label>
          <label>
            <span>上课时间</span>
              <el-date-picker
              popper-class='class_selete_list_time'
              v-model="classBeginsTime"
              type="date"
              placeholder="选择上课时间">
              </el-date-picker>
          </label>
          <label>
            <span>课程状态</span>
            <el-select popper-class="class_selete_list" v-model="curriculumStatusData" placeholder="请选择课程类别">
              <el-option
                v-for="item in curriculumStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </label>
          <label class="class_city" for>
            <span>详细地址</span>
            <el-cascader
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
              :separator="' '"
              >
              </el-cascader>
          </label>
          <label class="class_introduction">
            <span>课程介绍</span>
            <textarea placeholder="填写课程介绍"></textarea>
          </label>
          <label class="pone_one" for>
            <span>课程图片</span>
            <el-upload
              class="upload-demo"
              action="string"
              ref="upload"
              :http-request="addAttachment"
              drag
              multiple
            >
              <img :src="classImg" alt>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
          </label>
          <label class="pone_one" for>
            <span>课程勋章</span>
            <el-upload
              class="upload-demo"
              ref="upload"
              action="string"
              :http-request="addAttachmentMedal"
              drag
              multiple
            >
              <img :src="classMedalImg" alt>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
          </label>
          <label for class="class_list">
            <span>课程介绍</span>
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
          </label>
        </form>
        <button class="tijiao" @click="submitProject">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import  options from '../../../static/city'
export default {
  name: "classDetail",
  data() {
    return {
      class_birthday: "", //出生日期
      options: [
        {
          value: "1",
          label: "a"
        },
        {
          value: "2",
          label: "b"
        }
      ],
      value: "",
      classImg: "",
      classImgFile: "",
      classMedalImg: "", //勋章图片路径
      classMedalImgFile: "", //
      dialogVisible: false,
      dialogImageUrl: "",//预览图片
      classListDetail: [],
      selectedOptions: [],//存放默认值
      options:options,   //存放城市数据
      ageList:[
          {
            value: "1",
            label: "5-6"
          },
          {
            value: "2",
            label: "9-10"
          },
          {
            value: "3",
            label: "10-12"
          },
          {
            value: "4",
            label: "0-100(成人足球)"
          }
      ],
      ageData: '',//年龄段
      curriculumList:[
          {
            value: "1",
            label: "基础足球课"
          },
          {
            value: "2",
            label: "进阶足球课"
          },
          {
            value: "3",
            label: "成人足球课"
          },
          {
            value: "4",
            label: "守门员课"
          }
      ],
      curriculumData: '',
      curriculumStatusList:[
         {
            value: "1",
            label: "未开课(试听、课程)"
          },
          {
            value: "2",
            label: "已开课(试听)"
          },
          {
            value: "3",
            label: "已结束"
          }
      ],
      curriculumStatusData: '',
      classBeginsTime: '',//上课时间

    };
  },
  methods: {
    /**@name图片预览 */
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /**@name图片上传 */

    //课程图片上传
    addAttachment(params) {
      this.classImgFile = params.file;
      this.baseImg(params.file, true);
    },

    //课程勋章上传
    addAttachmentMedal(params) {
      this.classMedalImgFile = params.file;
      this.baseImg(params.file, false);
    },
    //课程介绍图片上传
    addAttachmentList(params) {
      console.log(params);
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
        obj.image = files;
        flag ? (this.classImg = obj.url) : (this.classMedalImg = obj.url);
      };
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
    //表单提交
    submitProject() {
      console.log(document.getElementsByTagName("input")[2].value);
      this.VerificationData()
    },
    //数据校验
    VerificationData(){
        document.getElementsByTagName("input").each(element => {
            console.log(element)

        });
    },
    handleChange(value) {
    console.log(value);
    },
    goclassManage(){
      this.$parent.isclassEdit = true
    }
  }
};
</script>
<style lang="scss" >
.wl_classDetail {
  margin: 0.13rem 0.18rem 0.13rem 0.13rem;
  padding: 0.3rem 0.45rem 0.33rem 0.3rem;
  background: #fff;
  height: calc(100% - 1.3rem);
  header {
    span {
      font-size: 0.2rem;
      color: #464a53;
      img {
        margin-right: 0.12rem;
      }
    }
  }
  .class_main {
    padding: 0.39rem 0 0;
    height: calc(100% - 3.2%);
    overflow: hidden;
    .ScrollY{
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      form {
        overflow: hidden;
        width: calc(100% - 2.32rem);
        display: flex;
        flex-wrap: wrap;
        input {
          border: 1px solid #dddfe1;
          height: 0.49rem;
          float: left;
          font-size: 18%;
          padding: 0 0.19rem;
          width: 70%;
          margin-left: 0.05rem;
        }
        label {
          margin-bottom: 0.2rem;
          display: block;
          float: left;
          margin-right: 0.44rem;
          width: 21%;
          font-size: 70%;
          color: #464a53;
          .el-select {
            width: 70%;
            .el-input.is-focus .el-input__inner,
            .el-input__inner:focus {
              border-color: #dddfe1;
            }
            .el-input__icon {
              line-height: 0 !important;
            }
            /*下拉框*/
            .el-input__inner {
              padding: 0 0.45rem;
              width: 100%;
              padding-left: 10%;
            }
          }
          .el-input__suffix-inner {
            line-height: 0.49rem;
          }
          .el-date-editor.el-input{
            width: 100%;
            position: static;
            display: block;
          }
          .el-icon-date{
            display: none;
          }
        }
        label > span {
          width: 28%;
          height: 0.49rem;
          line-height: 0.49rem;
          display: block;
          float: left;
          color: #464a53;
          font-size: 70%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .class_introduction {
          width: 91.3%;
          display: flex;
          span {
            width: 6.7%;
          }
          textarea {
            width: 80%;
            height: 1.04rem;
            border: 1px solid #dddfe1;
            font-size: 0.14rem;
            padding: 0.1rem;
          }
        }
        .class_city {
          width: 91.3%;
          display: flex;
          .el-cascader{
            width: 25%;
          }
          .el-select {
            width: 10%;
            margin-right: 1%;
          }
          input {
            width: 100%;
          }
        }
        .class_city > span {
          width: 6.4%;
        }
        .pone_one {
          width: 40%;
          .el-upload-list {
            display: none !important;
          }
          .el-upload{
            width: 50%;
             .el-upload-dragger {
                width: 100%;
                img {
                  width: 100%;
                }
              }
              .el-upload__text{
                font-size: 10%;
              }
          }
         
        }
        .pone_one > span {
          width: 15%;
        }
        .class_list {
          width: 100%;
          .el-upload-list--picture-card,
          .el-upload-list__item-status-label {
            top: -0.02rem;
            right: -0.6rem;
            width: 40%;
            height: 20%;
          }
        }
        .class_list > span {
          width: 6.2%;
        }
      }
      .tijiao {
        display: block;
        width: 1.71rem;
        height: 0.39rem;
        line-height: 0.39rem;
        background: rgba(127, 99, 244, 1);
        border-radius: 3px;
        left: 4.86rem;
        color: #fff;
        font-size: 0.18rem;
        margin: 0 auto;
        cursor: pointer;
      }
      &::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: RGBA(243, 243, 243, 1);
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 8px;
        background: rgba(0,0,0,0.1);
        display: none;
      }
    }
  }
}
.class_selete_list {
  margin-top: 0.56rem !important;
}
.class_selete_list_time{
    margin: .56rem 0 0 .85rem!important;
}
</style>
