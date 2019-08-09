<template>
  <div class="ReDian_BOx" v-loading.fullscreen.lock="isLoading">
    <section class="ChangeChang">
      <div class="header_Tit">
        <div class="Title" @click="goPullManage">
          <span>
            <img src="../../assets/img/goback.png" alt="">
          </span>
          <span>{{activelyId == -1 ?'添加': '编辑'}}主推热点</span>
        </div>
      </div>
      <div class="NewWords">
        <form id="formData">
        <table>
          <tr>
            <td class="One">
              <label for="">主推热点</label>
              <el-input v-model="ReName" placeholder="请输入热点名称"></el-input>
              <label for="">热点状态</label>
              <el-select v-model="activelyStatus" placeholder="请选择" popper-class="shenqi">
                <el-option
                  v-for="item in changStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td class="Two">
              <label for="">活动时间</label>
              <el-date-picker
                v-model="pullBeginsTime"
                type="daterange"
                range-separator="至"
                :start-placeholder="pullNewTime"
                :end-placeholder="pullOldTime"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </td>
            <td class="Three">
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
                <div class="el-upload__tip" style="margin:0" slot="tip">请上传454 X 124的图片，且不超过500kb</div>
              </el-upload>
            </td>
            <td class="Four">
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
                <div class="el-upload__tip" style="margin:0" slot="tip">请上传宽度为1298的图片，且不超过500kb</div>
              </el-upload>

              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt>
              </el-dialog>
            </td>
            <td style="height: .4rem;position: relative" class="bcBox">
              <el-button type="primary" class="Pub_But" @click="submit">保存</el-button>
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
      name: "AddPullRe",
      inject:['reload'],
      props:{
        activelyId:{
          type:Number,
          required: true
        }
      },
      data(){
        return{
          ReName:'',    //场地名称
          activelyStatus: '',
          changStatus: [{
              value:  true,
              label: '上架'
            }, {
              value: false,
              label: '下架'
            }],
          value: '',
          pullBeginsTime: [],
          classImgFile:"",
          classImg:"",
          classListDetail:[],
          dialogImageUrl: "",//预览图片
          dialogVisible: false,
          isLoading: false,
          pullNewTime: '开始时间',//开始时间
          pullOldTime:'结束时间',//结束时间
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
          let reader = new FileReader();
          let imgFile;
          reader.readAsDataURL(params.file);
          reader.onload = e => {
            imgFile = e.target.result;
            let arr = imgFile.split(",");
            let obj = {};
            obj.url = "data:image/jpeg;base64," + arr[1];
            obj.raw = params.file;
          this.classListDetail.push(obj)
          }
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
          console.log('fileList',fileList);
          if(file.id){
            this.isLoading = true;
            this.deleteActivelyImg(file.id)
          }
        },
        deleteActivelyImg(ID){
          this.$http.delete(this.$conf.env.deleteActivelyImg + ID + '/').then( res =>{
            this.isLoading = false;
            if (res.status == "204") {
              this.$message({ message: "删除成功", type: "success" });
            }else{
              this.$message({ message: '删除失败', type: 'warning'});
            }
          }).catch(err =>{
           this.isLoading = false;
           this.message.error('网络错误');
          })
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
        goPullManage(){
          this.$parent.isPullEdit = true
        },
        submit(){
          if(!this.VerificationData()) return
          console.log(this.getElements('formData'))
          var params = new FormData()
          params.append('name', this.getElements('formData')[0])//课程名称
          params.append('start_time',this.getElements('formData')[2])//开始日期
          params.append('end_time',this.getElements('formData')[3])//结束日期
          params.append('status', this.activelyStatus)//状态 True False
          params.append('image', this.classImgFile ? this.classImgFile : '')//封面图
          this.classListDetail.forEach( elements =>{
            if(!elements.id){
              params.append('activity_image', elements.raw)//详情图列表[image,image]
            }
          })
          this.isLoading = true
        this.activelyId == -1 ? this.addPull(params) : this.updataPull(params)

        },
        addPull(params){
          this.$http.post(this.$conf.env.setActivelyData, params, true).then( res =>{
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
        updataPull(params){
          this.$http.put(this.$conf.env.setActivelyData + this.activelyId + '/', params, true).then( res =>{
            this.isLoading = false
            if(res.status == '200'){
                this.$message({ message: '修改成功', type: 'success'});
                this.reload()
            }else{
                this.$message({ message: '修改失败', type: 'warning'});              
            }
          }).catch(err =>{
            console.log(err)
            this.isLoading = false;
            this.$message.error("网络错误");
          })
        },
        //数据校验
        VerificationData(){
          for(let i = 0 ; i < this.getElements('formData').length; i++){  
            if(!this.getElements('formData')[i] || this.pullBeginsTime.length==0){
              this.$message({ message: '请完善您的信息', type: 'warning'});
              return false
            }else{
              return true
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
        setElements(data, index){
          var form = document.getElementById('formData');   
          var tagElements = form.getElementsByTagName('input');
          tagElements[index].value = data
        },
        getActivelyDeail(){
          console.log(this.activelyId)
          this.$http.get(this.$conf.env.setActivelyData + this.activelyId + '/').then( res =>{
            if(!res.data)return 
            this.isLoading = false
            this.setElements(res.data.name?res.data.name : '', 0 )//课程名称
            this.pullNewTime = res.data.start_time?res.data.start_time.split('-')[2]+'-'+res.data.start_time.split('-')[1]+'-'+res.data.start_time.split('-')[0] : ''//开始日期
            this.pullOldTime = res.data.end_time ? res.data.end_time.split('-')[2]+'-'+res.data.end_time.split('-')[1]+'-'+ res.data.end_time.split('-')[0]: ''//结束日期
            this.pullBeginsTime = [this.pullNewTime, this.pullOldTime]
            this.activelyStatus = res.data.status?res.data.status : ''//状态 True False
            this.classImg = res.data.image?res.data.image : ''//封面图
            res.data.images.forEach( elements =>{
              elements.url = elements.image
            })
            this.classListDetail =  res.data.images ? res.data.images : []//详情图列表[image,image]
          }).catch(err =>{
            console.log(err)
            this.isLoading = false
            this.message.error('网络错误');
          })
        }
      },
      mounted() {
        if(this.activelyId != -1){
          this.isLoading = true
          this.getActivelyDeail()
        }
      },
      watch:{
        pullBeginsTime(newData, oldData){
          this.pullNewTime = newData[0]
          this.pullOldTime =  newData[1]
        }
      }
    }
</script>

<style lang="scss">
  .shenqi{
    min-width: 2.76rem !important;
  }
  .ReDian_BOx{
    width: 100%;
    height: 90%;
    padding:.1rem .18rem .14rem .12rem;
    box-sizing: border-box;
    background:#F2F5F8;
    .ChangeChang{
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
      .el-upload-list__item-status-label{
        margin: 0!important;;
        line-height: initial;
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
              .el-upload-list{
                display: none;
              }
            }
            .One{
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
