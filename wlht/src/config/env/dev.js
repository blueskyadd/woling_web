// 开发环境配置
const winchaingroupApi = "http://94.191.15.122/";

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

    //课程
    setClassData: winchaingroupApi + 'good/course/',//课程
    getCoachList: winchaingroupApi +'user/coach/',//教练列表

    //场地
    setPitchData: winchaingroupApi + 'good/pitch/',//场地

    //热点
    setActivelyData: winchaingroupApi + 'good/activity/',//热点
    deleteActivelyImg: winchaingroupApi + 'good/activity_image/',//主推热点详情图删除

}