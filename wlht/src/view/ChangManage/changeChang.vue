<template>
    <div class="ChangeChang_BOx">
      <section class="ChangeChang">
        <div class="header_Tit">
          <div class="Title">
            <router-link to="/">
              <img src="../../assets/img/goback.png" alt="">
            </router-link>
            <span>添加场地</span>
          </div>
        </div>
        <div class="NewWords">
          <table>
            <tr>
              <td class="One">
                <label for="">场地名称</label>
                <el-input v-model="ChangName" placeholder="请输入场地名称"></el-input>
                <label for="">场地状态</label>
                <el-select v-model="value" placeholder="请选择" popper-class="shenqi">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"

                    :value="item.value">
                  </el-option>
                </el-select>
              </td>

              <td class="Two">
                <label for="">场地租金</label>
                <el-input v-model="ChangName" placeholder="请填写场地租金"></el-input>
                元/小时
                <label for="" class="LeftM">包场租金</label>
                <el-input v-model="ChangName" placeholder="请填写场地租金"></el-input>
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
                <el-input v-model="ChangName" placeholder="请填写详细地址"></el-input>
              </td>
              <td>
                <label for="">场地介绍</label>

                <el-input
                  type="textarea"
                  autosize
                  :autosize="{ minRows: 12}"
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
            </tr>
          </table>

        </div>
      </section>
    </div>
</template>

<script>
  import  options from '../../../static/city'
    export default {
        name: "changeChang",
      data(){
          return{
            ChangName:'',    //场地名称
            options: [{
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
            changJan:'',   //场地介绍

            classImgFile:'',
            classImg:'',

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
                .el-upload-list{
                  display: none;
                }
              }
              textarea{
                width: 50%;
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
          }
        }
      }
    }
  }
</style>
