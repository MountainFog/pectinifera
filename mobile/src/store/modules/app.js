import moment from 'moment'

export default {
  state: {
    // 页面切换方向
    direction: 'forward',
    // 直播列表查询日期
    time: moment().format('yyyy-MM-DD'),
    // 查询条件 - 课程名称
    courseName: '',
    // 查询条件 - 教室
    classroom: {},
    // 查询条件 - 教师
    teacher: {},
    // 查询条件 - 学年学期
    semester: {},
    // 查询条件 - 院系
    organization: {}
  },
  mutations: {
    // 更新页面切换方向
    updateDirection (state, direction) {
      state.direction = direction
    },
    setQueryCourseName (state, value) {
      state.courseName = value
    },
    setQueryTime (state, time) {
      state.time = time
    },
    setQueryClassroom (state, param) {
      state.classroom = param
    },
    setQueryTeacher (state, param) {
      state.teacher = param
    },
    setQuerySemester (state, param) {
      state.semester = param
    },
    setQueryOrg (state, param) {
      state.organization = param
    }
  }
}
