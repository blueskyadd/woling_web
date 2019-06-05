<template>
  <div class="wl_PerDetail">
    <header>
      <span @click="close()">
        <img src="../../assets/img/goback.png" alt>添加员工
      </span>
    </header>
    <div class="per_main">
      <form action method="post">
        <label>
          <span>员工姓名</span>
          <input placeholder="请填写员工姓名" type="text" id="name">
        </label>
        <label>
          <span>工号</span>
          <input placeholder="请填写工号" type="text" id="name">
        </label>
        <label class="sex_list">
          <span>性别</span>
          <el-select popper-class="per_selete_list" v-model="value" placeholder="请选择性别">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </label>
        <label>
          <span>所属门店</span>
          <el-select popper-class="per_selete_list" v-model="value" placeholder="请选择门店">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </label>
        <label>
          <span>职位</span>
          <el-select popper-class="per_selete_list" v-model="value" placeholder="请选择职位">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </label>
        <label>
          <span>联系电话</span>
          <input placeholder="请填写联系电话" type="number" id="name">
        </label>
        <label class="email_list">
          <span>电子邮箱</span>
          <input placeholder="请填写邮箱" type="number" id="name">
        </label>
        <label>
          <span>微信账号</span>
          <input placeholder="请填写微信账号" type="number" id="name">
        </label>
        <label class="perStatus">
          <span>员工状态</span>
          <el-select popper-class="per_selete_list" v-model="perStatusData" placeholder="请选择状态">
            <el-option
              v-for="item in perStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </label>
        <label>
          <span>转正日期</span>
          <el-date-picker
            popper-class='per_selete_list_time'
            v-model="BecomeTime"
            type="date"
            placeholder="选择上课时间">
            </el-date-picker>
        </label>
        <label>
          <span>入职时间</span>
          <el-date-picker
            popper-class='per_selete_list_time'
            v-model="EntryTime"
            type="date"
            placeholder="选择上课时间">
            </el-date-picker>
        </label>
        <label>
          <span>离职时间</span>
          <el-date-picker
            popper-class='per_selete_list_time'
            v-model="QuitTime"
            type="date"
            placeholder="选择上课时间">
            </el-date-picker>
        </label>
        
        <label class="pone_one" for>
          <span>照片</span>
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
        <label class="class_introduction">
          <span>课程介绍</span>
          <textarea placeholder="填写课程介绍"></textarea>
        </label>
      </form>
      <button class="tijiao" @click="submitProject">确定</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "PerDetail",
  data() {
    return {
      per_birthday: "", //出生日期
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
      perStatusList:[
          {
              label:'在职',
              value:'1'
          },
          {
              label:'兼职',
              value:'2'
          },
          {
              label:'离职',
              value:'3'
          }
      ],
      perStatusData: '',
      QuitTime:'0',
      EntryTime:'',
      BecomeTime: ''


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

    close(){
        this.$parent.isperManage = true
    }

  }
};
</script>
<style lang="scss" >
.wl_PerDetail {
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
  .per_main {
    padding: 0.39rem 0 0;
    height: calc(100% - 3.2%);
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
        margin-bottom: 0.24rem;
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
      .pone_one {
        width: 100%;
        .el-upload-list {
          display: none !important;
        }
        .el-upload-dragger {
          img {
            width: 100%;
          }
        }
      }
      .pone_one > span {
        width: 6.4%;
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
      .email_list{
          width: 34%;
          input{
              width: 60%;
          }
      }
      .email_list>span{
        width: 18%;
      }
      .perStatus{
          width: 70%;
          .el-select{
             width: 21.4%;
          }
      }
      .perStatus>span{
          width: 8.3%;
      }
      .sex_list{
          .el-select{
             width: 40%; 
          }
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
        position: absolute;
        bottom: 10%;
        left: 50%;
    }
    .activelyOne-right {
      position: absolute;
      top: 0.52rem;
      right: 0.45rem;
      .app-show {
        width: 5.25rem;
        height: 8.5rem;
        padding: 0.53rem 0.315rem 0.21rem 0.315rem;
        box-sizing: border-box;
        background: #d3d3d3;
        .app-box {
          width: 100%;
          height: 100%;
          background: #fff;
          overflow: hidden;
          overflow-y: scroll;
          .app-tit {
            width: 100%;
            height: 20px;
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
      }
    }
  }
}
.per_selete_list {
    margin-top: 0.56rem !important;
}
.per_selete_list_time{
    margin: 0.56rem 0px 0px 0.85rem!important;
}
</style>
