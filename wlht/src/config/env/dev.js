// 开发环境配置
const winchaingroupApi = "https://www.bmeauto.cn/";

module.exports = {
//API
    //登录
    loginWeb: winchaingroupApi + 'user/login/',//登录
    getCode: winchaingroupApi + 'user/sms_code/',//发送短信验证
    setPassWord: winchaingroupApi + 'user/change_pwd/',//修改密码

    //会员
    setVipData: winchaingroupApi +'user/vip/',//会员
    getTeacherList: winchaingroupApi + 'user/counselor/',// 顾问列表 

    //非会员
    userList: winchaingroupApi + 'user/staff/',//非会员

}