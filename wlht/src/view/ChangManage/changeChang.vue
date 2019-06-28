<template>
    <div class="ChangeChang_BOx" v-loading.fullscreen.lock="isLoading">
      <section class="ChangeChang">
        <div class="header_Tit">
          <div class="Title" @click="gochangeManage">
            <span >
              <img src="../../assets/img/goback.png" alt="">
            </span>
            <span>{{changId== -1 ?'添加场地' : '编辑场地'}}</span>
          </div>
        </div>
        <div class="NewWords">
          <div class="WordsScroll">
            <form id="formData">
            <table>
              <tr>
                <td class="One">
                  <label for="">场地名称</label>
                  <el-input v-model="name"  placeholder="请输入场地名称"></el-input>
                  <label for="">场地状态</label>
                  <el-select v-model="changStatusData" placeholder="请选择" popper-class="shenqi">
                    <el-option
                      v-for="item in changStatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </td>

                <td class="Two">
                  <label for="">场地租金</label>
                  <el-input v-model="price"  placeholder="请填写场地租金"></el-input>
                  元/小时
                  <label for="" class="LeftM">包场租金</label>
                  <el-input v-model="all_price"  placeholder="请填写场地租金"></el-input>
                  元/小时
                </td>

                <td class="Three">
                  <label for="">详细地址</label>
                  <el-cascader
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleChange"
                    :separator="' '"
                  >
                  </el-cascader>
                  <el-input placeholder="请填写详细地址" v-model="all_city" class="xiangxiAddress"></el-input>
                </td>
                <td>
                  <label for="">场地介绍</label>

                  <el-input
                    type="textarea"
                    autosize
                    :autosize="{ minRows: 12,maxRows:17}"
                    placeholder="请输入内容"
                    v-model="changJan">
                  </el-input>
                </td>
                <td>
                  <label for="">场地图片</label>
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
                </td>
                <td style="height: .4rem;position: relative" class="bcBox">
                  <el-button type="primary" class="Pub_But" @click="submit">保存</el-button>
                </td>
              </tr>
            </table>
            </form>
          </div>

        </div>
      </section>
    </div>
</template>

<script>
  import  options from '../../../static/city'
    export default {
        name: "changeChang",
        inject:['reload'],
        props:{
          changId:{
            type: Number,
            required: true
          }
        },
      data(){
          return{
            name:'',//场地名称
            price: '',//租金
            all_price: '',//包场租金 
            all_city: '',//详细地址
            ChangName:'',    //场地名称
            changStatus: [{
                value: 0,
                label: '维护'
              }, {
                value: 1,
                label: '上架'
              }, {
                value: 2,
                label: '下架'
              }],
            changStatusData: '',//续航地状态ID
            changJan:'',   //场地介绍
            classImgFile:'',//场地图片文件
            classImg:'',//场地图片路径
            isLoading: false,//加载
            selectedOptions: [],//存放默认值
            options:options   //存放城市数据
          }
      },
      methods: {
        handleChange(value) {
          console.log(value);
        },
        addAttachment(params){
          this.classImgFile = params.file
          this.baseImg(params.file)
        },

        baseImg(files) {
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
        gochangeManage(){
          console.log('aaaa')
          this.$parent.isChangEdit = 1
        },
        submit(){
          if(!this.VerificationData()) return
          var params = new FormData()
          params.append('name', this.getElements('formData')[0])//课程名称
          params.append('price', this.getElements('formData')[2])//价格
          params.append('all_price', this.getElements('formData')[3])//包场价格
          params.append('status', this.changStatusData)//状态 (0,”维护”),(1,”上架”),(2,”下架”)
          params.append('province', this.getElements('formData')[4].split(' ')[0])//省
          params.append('city', this.getElements('formData')[4].split(' ')[1])//市
          params.append('area', this.getElements('formData')[4].split(' ')[2])//区县
          params.append('address', this.getElements('formData')[5])//位置详情
          params.append('desc', this.changJan)//介绍
          params.append('front_image', this.classImgFile ? this.classImgFile : '')//封面图
          this.isLoading = true
          this.changId == -1 ? this.addChang(params) : this.updataChang(params)
        },
        addChang(params){
          this.$http.post(this.$conf.env.setPitchData, params, true).then( res =>{
            this.isLoading = false
            if(res.status == '201'){
              this.$message({  message: '添加成功', type: 'success'});
              this.reload()
            }else{
               this.$message({ message: '添加失败', type: 'warning'});
            }
          }).catch(err =>{
            this.isLoading = false
            this.message.error('网络错误');
          })
        },
        updataChang(params){
          this.$http.put(this.$conf.env.setPitchData + this.changId + '/', params, true).then( res =>{
            this.isLoading = false
            if(res.status == '200'){
                this.$message({ message: '修改成功', type: 'success'});
                this.reload()
            }else{
                this.$message({ message: '修改失败', type: 'warning'});              
            }
          }).catch(err =>{
            this.isLoading = false
            this.message.error('网络错误');
          })
        },
        //数据校验
        VerificationData(){
          for(let i = 0 ; i < this.getElements('formData').length-1; i++){  
            if(!this.getElements('formData')[i] || !this.changJan){
              this.$message({ message: '请完善您的信息', type: 'warning'});
              return false
            }
          }
          console.log(this.getElements('formData')[3]);
          
          if(this.getElements('formData')[2] <0.01 || this.getElements('formData')[2] == 0.01 || this.getElements('formData')[3] <0.01 || this.getElements('formData')[3] == 0.01){
            this.$message({
                message: "价格不得低于0.02",
                type: "warning"
              });
              return false
            }else if(this.getElements('formData')[2].toString().split(".")[1] && this.getElements('formData')[2].toString().split(".")[1].length>2 || this.getElements('formData')[3].toString().split(".")[1] && this.getElements('formData')[3].toString().split(".")[1].length>2){
              this.$message({
                message: "请确保价格不超过 2 个小数位",
                type: "warning"
              });
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
        getpitchDetail(){
          this.$http.get(this.$conf.env.setPitchData + this.changId + '/').then( res =>{
            this.setElements(res.data.name ? res.data.name : '', 0)//课程名称
            this.setElements(res.data.price ? res.data.price : '', 2)//价格
            this.setElements(res.data.all_price ? res.data.all_price : '', 3)//包场价格
            this.changStatusData = res.data.status ? res.data.status : ''//状态 (0,”维护”),(1,”上架”),(2,”下架”)
            this.setElements(res.data.province +' ' + res.data.city + ' ' + res.data.area , 4)
            this.setElements(res.data.address ? res.data.address : '', 5)//位置详情
            this.changJan = res.data.desc ? res.data.desc : ''//介绍
            this.classImg = res.data.front_image ? res.data.front_image : ''//封面图
            this.isLoading = false;
          }).catch(err =>{
            this.isLoading = false;
            this.message.error('网络错误');
          })
        }
      },
      mounted(){
        if(this.changId != -1){
          this.isLoading = true
          this.getpitchDetail()
        }
      }
    }
</script>

<style lang="scss">
  .shenqi{
    min-width: 2.76rem !important;
  }
  .ChangeChang_BOx{
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
      .NewWords{
        width: 100%;
        height: 87%;
        overflow: hidden;
        .WordsScroll{
          width: 100%;
          height: 100%;
          overflow-x: hidden;
          overflow-y: scroll;
          table{
            width: 100%;
            height:100%;
            tr{
              td{
                margin-bottom:.18rem;
                display: flex;
                align-items: center;
                padding-left: .3rem;
                font-size: .18rem;
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
                  .el-upload-list{
                    display: none;
                  }
                }
                textarea{
                  width: 50%;
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
              .One{
                .el-input{
                  width: 2.76rem;
                  margin-right: 1.18rem;
                }
              }
              .Two{
                .el-input{
                  width: 2.34rem;
                  margin-right: .13rem;
                }
                .LeftM{
                  margin-left:1rem;
                }
              }
              .Three{
                .xiangxiAddress{
                  width: 4.8rem;
                  margin-left:.2rem;
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
  }
</style>
