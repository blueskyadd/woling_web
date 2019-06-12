<template>
  <div class="wl_PerDetail" v-loading.fullscreen.lock="isLoading">
    <header>
      <span @click="close()">
        <img src="../../assets/img/goback.png" alt>{{perId == -1 ? '添加员工' : '编辑员工'}}
      </span>
    </header>
    <div class="per_main">
      <form action method="post" id="formData">
        <label>
          <span>员工姓名</span>
          <input placeholder="请填写员工姓名" type="text">
        </label>
        <label>
          <span>工号</span>
          <input placeholder="请填写工号" type="text">
        </label>
        <label class="sex_list">
          <span>性别</span>
          <el-select popper-class="per_selete_list" v-model="classSex" placeholder="请选择性别">
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
          <el-select popper-class="per_selete_list" v-model="PithId" placeholder="请选择门店">
            <el-option v-for="item in PithList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </label>
        <label>
          <span>职位</span>
          <el-select popper-class="per_selete_list" v-model="PositionId" placeholder="请选择职位">
            <el-option
              v-for="item in classPosition"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >{{item.label}}</el-option>
          </el-select>
        </label>
        <label>
          <span>联系电话</span>
          <input placeholder="请填写联系电话" type="tel">
        </label>
        <label class="email_list">
          <span>电子邮箱</span>
          <input placeholder="请填写邮箱" type="email">
        </label>
        <label>
          <span>微信账号</span>
          <input placeholder="请填写微信账号" type="text">
        </label>
        <label class="perStatus">
          <span>员工状态</span>
          <el-select popper-class="per_selete_list" v-model="perStatusData" placeholder="请选择状态">
            <el-option
              v-for="item in perStatusList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </label>
        <label>
          <span>转正日期</span>
          <el-date-picker
            popper-class="per_selete_list_time"
            v-model="BecomeTime"
            type="date"
            placeholder="选择转正日期"
          ></el-date-picker>
        </label>
        <label>
          <span>入职时间</span>
          <el-date-picker
            popper-class="per_selete_list_time"
            v-model="EntryTime"
            type="date"
            placeholder="选择入职时间"
          ></el-date-picker>
        </label>
        <label>
          <span>离职时间</span>
          <el-date-picker
            popper-class="per_selete_list_time"
            v-model="QuitTime"
            type="date"
            placeholder="选择离职时间"
          ></el-date-picker>
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
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </label>
        <label class="class_introduction">
          <span>课程介绍</span>
          <textarea placeholder="填写课程介绍" v-model="classIntroduction"></textarea>
        </label>
      </form>
      <button class="tijiao" @click="submitProject">确定</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "PerDetail",
  inject: ["reload"],
  props: {
    perId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      PithList: [], //场地列表
      PithId: "", //场地ID
      per_birthday: "", //出生日期
      options: [
        {
          value: 0,
          label: "男"
        },
        {
          value: 1,
          label: "女"
        }
      ],
      classPosition: [
        {
          label: "教练员",
          value: 1
        },
        {
          label: "总教练",
          value: 2
        },
        {
          label: "教务老师",
          value: 3
        },
        {
          label: "文员",
          value: 4
        },
        {
          label: "新媒体运营",
          value: 5
        },
        {
          label: "总经理",
          value: 6
        },
        {
          label: "课程顾问",
          value: 7
        }
      ], //职位列表
      PositionId: "", //职位ID
      value: "",
      classImg: "",
      classImgFile: "",
      classMedalImg: "", //勋章图片路径
      dialogVisible: false,
      dialogImageUrl: "", //预览图片
      classListDetail: [],
      perStatusList: [
        {
          label: "在职",
          value: 1
        },
        {
          label: "兼职",
          value: 2
        },
        {
          label: "离职",
          value: 0
        }
      ],
      perStatusData: "",
      QuitTime: "",
      EntryTime: "",
      BecomeTime: "",
      classIntroduction: "", //课程介绍
      classSex: "", //性别
      isLoading: false
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
        this.classImg = obj.url;
      };
    },
    /**@name图片删除 */
    handleRemovelist(file, fileList) {
      this.classListDetail = fileList;
    },
    /**@文件超出个数限制 */
    onExceed() {
      this.$message.error("最多添加三张图片");
    },
    /**@图片格式判断 */
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPng = file.type === "image/png";
      if (!isJPG && !isPng) {
        this.$message.error("上传头像图片只能是 JPG或PNG格式!");
      }
      return isJPG || isPng;
    },
    getPitchList() {
      this.$http
        .get(this.$conf.env.setPitchData)
        .then(res => {
          this.PithList = res.data;
        })
        .catch(err => {
          this.isLoading = false;
          this.message.error("网络错误");
        });
    },
    //表单提交
    submitProject() {
      if (!this.VerificationData()) return;
      console.log(this.getElements("formData"));
      var params = new FormData();
      params.append("name", this.getElements("formData")[0]); //姓名
      params.append("mobile", this.getElements("formData")[1]); //工号
      params.append("sex", this.classSex); //性别
      params.append("shop", this.PithId); //所属门店 接口20
      params.append("username", this.getElements("formData")[5]); //手机号
      params.append("groups", this.PositionId); //职位
      params.append("email", this.getElements("formData")[6]); //	邮箱
      params.append("positive_dates", this.getElements("formData")[9]); //转正日期
      params.append("picture", this.classImgFile ? this.classImgFile : ""); //头像
      params.append("entry_date", this.getElements("formData")[10]); //入职日期
      params.append("term_date", this.getElements("formData")[11]); //离职日期
      params.append("comment", this.classIntroduction); //简介
      params.append("state_employee", this.perStatusData); //状态(1, ‘在职’),(2,”兼职”),(0, ‘离职’)
      this.isLoading = true;
      this.perId == -1 ? this.addPer(params) : this.updataPer(params);
    },
    //新增员工
    addPer(params) {
      this.$http
        .post(this.$conf.env.userList, params, true)
        .then(res => {
          this.isLoading = false;
          if (res.status == "201") {
            this.$message({ message: "添加成功", type: "success" });
            this.reload();
          } else {
            this.$message({ message: "添加失败", type: "warning" });
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },
    //修改员工
    updataPer(params) {
      this.$http
        .put(this.$conf.env.userList + this.perId + "/", params, true)
        .then(res => {
          this.isLoading = false;
          if (res.status == "200") {
            this.$message({ message: "修改成功", type: "success" });
            this.reload();
          } else {
            this.$message({ message: "修改失败", type: "warning" });
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },
    //数据校验
    VerificationData() {
      for (let i = 0; i < 6; i++) {
        if (
          !this.getElements("formData")[i] ||
          !this.getElements("formData")[7] ||
          !this.getElements("formData")[8] ||
          !this.getElements("formData")[9]
        ) {
          this.$message({ message: "请完善您的信息", type: "warning" });
          return false;
        }
        var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
        var reg = new RegExp(
          "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
        );
        if (!myreg.test(this.getElements("formData")[5])) {
          this.$message({ message: "请填写正确的手机号", type: "warning" });
          return false;
        } else if (
          this.getElements("formData")[6] &&
          !reg.test(this.getElements("formData")[6])
        ) {
          this.$message("请填写正确的邮箱地址");
          return;
        } else {
          return true;
        }
      }
    },
    getElements(formId) {
      var form = document.getElementById(formId);
      var elements = new Array();
      var tagElements = form.getElementsByTagName("input");
      for (var j = 0; j < tagElements.length; j++) {
        elements.push(tagElements[j].value);
      }
      return elements;
    },
    setElements(data, index){
      var form = document.getElementById('formData');   
      var tagElements = form.getElementsByTagName('input');
      tagElements[index].value = data
    },
    close() {
      this.$parent.isperManage = true;
    },
    getPerDetail() {
      this.$http.get(this.$conf.env.userList + this.perId +'/').then( res =>{
        this.isLoading = false
        this.setElements(res.data.name?res.data.name:'', 0); //姓名
        this.setElements(res.data.mobile?res.data.mobile:'', 1); //工号
        this.classSex = res.data.sex ? res.data.sex : 0; //性别
        this.PithId = res.data.shop?res.data.shop:''; //所属门店 接口20
        this.setElements(res.data.username?res.data.username:'', 5); //手机号
        this.PositionId = res.data.groups?res.data.groups[0].id:''; //职位
        this.setElements(res.data.email?res.data.email:'', 6); //	邮箱
        this.setElements(res.data.positive_dates?res.data.positive_dates:'', 9); //转正日期
        this.classImg = res.data.picture?res.data.picture:'' ; //头像
        this.setElements(res.data.entry_date?res.data.entry_date:'', 10); //入职日期
        this.setElements(res.data.term_date?res.data.term_date:'', 11); //离职日期
        this.classIntroduction = res.data.comment?res.data.comment:''; //简介
        this.perStatusData = res.data.state_employee ? res.data.state_employee : 0;//员工状态
      }).catch(err =>{
        this.isLoading=false
        this.message.error('网络错误');
      })
    }
  },
  mounted() {
    this.getPitchList();
    if (this.perId != -1) {
      this.isLoading = true;
      this.getPerDetail();
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
        font-weight: 700;
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
        .el-date-editor.el-input {
          width: 100%;
          position: static;
          display: block;
        }
        .el-icon-date {
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
      .email_list {
        width: 34%;
        input {
          width: 60%;
        }
      }
      .email_list > span {
        width: 18%;
      }
      .perStatus {
        width: 70%;
        .el-select {
          width: 21.4%;
        }
      }
      .perStatus > span {
        width: 8.3%;
      }
      .sex_list {
        .el-select {
          width: 40%;
        }
      }
      .el-upload {
        width: 20%;
        .el-upload-dragger {
          width: 100%;
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
.per_selete_list_time {
  margin: 0.56rem 0px 0px 0.85rem !important;
}
</style>
