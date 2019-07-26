<template>
  <div class="Shopp_BOx" v-loading.fullscreen.lock="isLoading">
    <section class="Shopping">
      <div class="header_Tit">
        <div class="Title" @click="goshopManage">
          <span>
            <img src="../../assets/img/goback.png" alt="">
          </span>
          <span>{{ProjectId == -1 ? '添加': '编辑'}}商品</span>
        </div>
      </div>
      <div class="NewWords">
        <form action="" id="formData">
        <table>
          <tr>
            <td class="One">
              <label for="">商品名称</label>
              <el-input v-model="ReName" :maxlength='100'  placeholder="请输入商品名称"></el-input>
              <label for="">商品状态</label>
              <el-select v-model="projectStatus" placeholder="请选择" popper-class="shenqi">
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
              <el-input v-model="projectPrice"  type="number" placeholder="请输入商品单价"></el-input>
              <label for="">商品分类</label>
              <el-select v-model="projectTypeId" placeholder="请选择" popper-class="shenqi">
                <el-option
                  v-for="item in projectType"
                  :key="item.id"
                  :label="item.name"

                  :value="item.id">
                </el-option>
              </el-select>
              <label for="">商品数量</label>
              <el-input v-model="projectNumber" type="number" placeholder="请输入商品数量"></el-input>

            </td>
            <td class="Three">

              <div class="Left">
                <label for="">商品封面</label>
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
                <label for="">商品图片</label>
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
      name: "AddShopp",
      inject:['reload'],
      props:{
          ProjectId:{
            type:Number,
            required: true
          }
      },
      data(){
        return{ 
          ReName:'',    //场地名称
          changStatus: [{
              value: 1,
              label: '上架'
            }, {
              value: 2,
              label: '下架'
            }],
          projectType:[
            {
              id: 1,
              name: '餐饮'
            },
            {
              id: 2,
              name: '大牌球鞋'
            },
            {
              id: 3,
              name: '豪门球衣'
            },
            {
              id: 4,
              name: '足球'
            },
            {
              id: 5,
              name: '配件'
            },
            {
              id: 6,
              name: '门票'
            },
          ],
          projectTypeId:'',//商品类别ID
          projectStatus: '',//商品状态ID
          projectPrice: '',//商品单价
          projectNumber: '',//商品数量
          classImgFile:"",
          classImg:"",
          classListDetail:[],
          dialogImageUrl: "",//预览图片
          dialogVisible: false,
          changJan:"",
          isLoading: false,
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
          };
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
          if(file.id){
            this.isLoading=true
            this.deleteProjectDetailImg(file.id)
          }
        },
        deleteProjectDetailImg(ID){
          this.$http.delete(this.$conf.env.deleteProjectDetailImg + ID +'/').then( res =>{
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
        goshopManage(){
          this.$parent.isshopEdit = true
        },
         submit(){
          console.log(this.getElements('formData'))
          if(!this.VerificationData()) return
          var params = new FormData()
          params.append('name', this.getElements('formData')[0])//课程名称 是
          params.append('goods_type', this.projectTypeId)//商品类型 1: “餐饮”, 2: “大牌球鞋”, 3: “豪门球衣”,4: “足球”, 5: “配件”, 6: “门票” 
          params.append('price', this.getElements('formData')[2])//价格
          params.append('status', this.projectStatus)//状态 1:”上架”,2:”下架”
          params.append('inventory', this.getElements('formData')[4])//库存
          params.append('front_image', this.classImgFile ? this.classImgFile : '')//封面图
          params.append('desc', this.changJan)//简介
          if(this.classListDetail.length > 0){
            this.classListDetail.forEach( elements =>{
              if(!elements.id){
                params.append('good_detail' , elements.raw)//详情图列表[image,image]
              }
            })
          }
          console.log('aaa')
          this.isLoading = true
          this.ProjectId == -1 ? this.addProject(params):this.updataProject(params)

        },
        addProject(params){
          this.$http.post(this.$conf.env.getProjectDara, params, true).then( res =>{
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
        updataProject(params){
          this.$http.put(this.$conf.env.getProjectDara + this.ProjectId + '/', params, true).then( res =>{
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
          for(let i = 0 ; i < this.getElements('formData').length-2; i++){  
            if(!this.getElements('formData')[i] || !this.changJan){
              this.$message({ message: '请完善您的信息', type: 'warning'});
              return false
            }else{
              if(this.getElements('formData')[2] <0.01 || this.getElements('formData')[2] == 0.01){
                this.$message({
                    message: "价格不得低于0.02",
                    type: "warning"
                  });
                  return false
                }else if(this.getElements('formData')[2].toString().split(".")[1] && this.getElements('formData')[2].toString().split(".")[1].length>2){
                  this.$message({
                    message: "请确保价格不超过 2 个小数位",
                    type: "warning"
                  });
                  return false
                }else{
                  return true
                }
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
        getProjectDetai(){
          this.$http.get(this.$conf.env.getProjectDara + this.ProjectId + '/').then( res =>{
            console.log(res)
            this.isLoading = false
            this.setElements(res.data.name ? res.data.name : '', 0);//课程名称 是
            this.projectTypeId = res.data.goods_type ? res.data.goods_type : '' ;//商品类型 1: “餐饮”, 2: “大牌球鞋”, 3: “豪门球衣”,4: “足球”, 5: “配件”, 6: “门票” 
            this.setElements(res.data.price ? res.data.price : '', 2);//价格
            this.projectStatus = res.data.status ? res.data.status : '' ;//状态 1:”上架”,2:”下架”
            this.setElements(res.data.inventory ? res.data.inventory : '', 4);//库存
            this.classImg = res.data.front_image ? res.data.front_image : '';//封面图
            this.changJan = res.data.desc ? res.data.desc : '';//简介
            if(res.data.good_details.length > 0){
              res.data.good_details.forEach( elements =>{
                  elements.url = elements.image//详情图列表[image,image]
              })
            }
            this.classListDetail = res.data.good_details ? res.data.good_details : []
          }).catch(err =>{
            this.isLoading = false
            this.message.error('网络错误');
          })
        }
      },
      mounted() {
        console.log('ProjectId',this.ProjectId);
        if(this.ProjectId != -1){
          this.isLoading = true
          this.getProjectDetai()
        }
        
      },
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
        .el-upload-list__item-status-label{
            margin: 0;
            line-height: initial;
        }
      }
    }
  }
</style>
