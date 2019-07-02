// 开发环境配置
const winchaingroupApi = "http://10.102.100.23:8080/";

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
    getCommonList: winchaingroupApi + 'user/common/',//非会员列表
    //课程
    setClassData: winchaingroupApi + 'good/course/',//课程
    getCoachList: winchaingroupApi +'user/coach/',//教练列表

    //场地
    setPitchData: winchaingroupApi + 'good/pitch/',//场地
    createdPitchTime: winchaingroupApi + 'good/pitchtime/',//球场时间创建
    getPitchList: winchaingroupApi + 'good/pitchtime/?day',//球场时间查看
    getptimeList: winchaingroupApi + 'good/ptime/?store=',//球场时间列表

    //热点
    setActivelyData: winchaingroupApi + 'good/activity/',//热点
    deleteActivelyImg: winchaingroupApi + 'good/activity_image/',//主推热点详情图删除

    //员工
    userList: winchaingroupApi + 'user/staff/',//员工

    //商品
    getProjectDara: winchaingroupApi +'good/good/',//商品
    deleteProjectDetailImg: winchaingroupApi + 'good/image/',//商品详情图删除
}