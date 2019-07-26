// 开发环境配置
const winchaingroupApi = "http://47.103.94.61:8080/";
// const winchaingroupApi = "http://94.191.15.122/";
// const winchaingroupApi = "http://10.102.100.23:8080/";



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
    getCourse_time: winchaingroupApi + 'good/course_time/?course=',//课程课表 
    setUpdataFile: winchaingroupApi + 'good/up/',//课程时间上传  todo
    getCourse_student: winchaingroupApi + 'good/course_student/?lesson=',//课表学生

    //场地
    setPitchData: winchaingroupApi + 'good/pitch/',//场地
    createdPitchTime: winchaingroupApi + 'good/pitchtime/',//球场时间创建
    getPitchList: winchaingroupApi + 'good/pitchtime/?day',//球场时间查看
    getptimeList: winchaingroupApi + 'good/ptime/?store=',//球场时间列表
    getAcitvelyThreeLifeList: winchaingroupApi + 'order/detail/?time=',//预定详情

    //热点
    setActivelyData: winchaingroupApi + 'good/activity/',//热点
    deleteActivelyImg: winchaingroupApi + 'good/activity_image/',//主推热点详情图删除

    //员工
    userList: winchaingroupApi + 'user/staff/',//员工
    getAssessList: winchaingroupApi + 'assess/assess/?user=',//考核列表
    upAssess: winchaingroupApi + 'assess/assess/',//发起考核
    getcoachassess: winchaingroupApi + 'assess/coachassess/?user=',//考核评分列表

    //商品
    getProjectDara: winchaingroupApi +'good/good/',//商品
    deleteProjectDetailImg: winchaingroupApi + 'good/image/',//商品详情图删除

    //订单列表
    getOrderList: winchaingroupApi + 'order/order/?classify=',//订单列表
    getOrderDetail: winchaingroupApi + 'order/',//商品订单详情;试听订单详情;课程订单详情;球场订单详情 -- 此处根据需求在页面中处理详细接口在AddOrder页面中
    searchPhone: winchaingroupApi + 'user/search/?search=',//订单电话搜索
    orderClassData: winchaingroupApi + 'good/order_goods/',//订单课程
    setOrderClass: winchaingroupApi + 'order/order/',//创建订单课程
}