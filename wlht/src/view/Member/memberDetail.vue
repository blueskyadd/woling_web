<template>
    <div class="wl_memberDetail">
        <header>
            <span><img src="../../assets/img/goback.png" alt="">添加会员</span>
        </header>
        <div class="member_main">
            <form action="" method="post">
                <label ><span>姓名</span><input placeholder="请填写姓名"  type="text" id="name"></label>
                <label ><span>手机号</span><input placeholder="请填写手机号" type="text" id="name"></label>
                <label >
                    <span>性别</span>
                    <el-select popper-class='member_selete_list'  v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </label>
                <label >
                    <span>出生日期</span>
                    <el-date-picker
                    v-model="member_birthday"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </label>
                <label ><span>身高</span><input placeholder="请填写身高" type="text" id="name"></label>
                <label ><span>体重</span><input placeholder="请填写体重" type="text" id="name"></label>
                <label ><span>民族</span><input placeholder="请输入民族" type="text" id="name"></label>
                <label ><span>身份证号</span><input placeholder="请输入身份证号" type="text" id="name"></label>
                <label ><span>户籍</span><input placeholder="请输入户籍所在地" type="text" id="name"></label>
                <label ><span>课程顾问</span><input placeholder="" type="text" id="name"></label>
                <label ><span>护照号码</span><input placeholder="请输入护照号码" type="text" id="name"></label>
                <label ><span>学校</span><input placeholder="请输入学校" type="text" id="name"></label>
                <label ><span>学籍卡号</span><input placeholder="请输入学籍卡号" type="text" id="name"></label>
                <label ><span>家庭住址</span><input placeholder="请输入家庭住址" type="text" id="name"></label>
                <label ><span>监护人一</span><input placeholder="请填写姓名" type="text" id="name"></label>                
                <label ><span>手机号</span><input placeholder="请填写手机号" type="text" id="name"></label>
                <label ><span>监护人二</span><input placeholder="请填写姓名" type="text" id="name"></label>
                <label ><span>手机号</span><input placeholder="请填写手机号" type="text" id="name"></label>
                <label ><span>兄妹情况</span><input placeholder="兄妹情况" type="text" id="name"></label>
                <label ><span>保险情况</span><input placeholder="保险情况" type="text" id="name"></label>
                <label ><span>既往病史</span><input placeholder="请填写既往病史" type="text" id="name"></label>
                <label ><span>过敏源</span><input placeholder="请填写过敏源" type="text" id="name"></label>
                <label ><span>个人备注</span><input placeholder="个人备注" type="text" id="name"></label>

            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'memberDetail',
    data(){
        return{
            member_birthday: '',//出生日期
             options: [{
                value: '1',
                label: '女'
                }, {
                value: '2',
                label: '男'
                }],
                value: ''
        }
    }
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
        form{
            overflow: hidden;
             width: calc(100% - 20%);
            input{
                border: 1px solid  #DDDFE1;
                height: .49rem;
                float: left;
                font-size: .16rem;
                padding: 0 .19rem;
                
            }
            label{
                margin-bottom: .24rem;
                display: block;
                float: left;
                margin-right: .44rem;
                .el-date-editor.el-input{
                    width: 2.03rem;
                }
               .el-input__icon{
                    line-height: .49rem !important;
                }
                /*下拉框*/
                .el-input__inner{
                    padding: 0 .45rem;
                }
                .el-select>.el-input{
                    width: 1.46rem;
                }
                .el-select .el-input.is-focus .el-input__inner,.el-select .el-input__inner:focus{
                    border-color:#DDDFE1;
                }
            }
            label>span{
                width: .8rem;
                height: .49rem;
                line-height: .49rem; 
                display: block;
                float: left; 
                font-size: .18rem;
                color: #464A53;
            }
        }
    }
    
}
.member_selete_list{
    margin-top: .56rem !important;
}
</style>
