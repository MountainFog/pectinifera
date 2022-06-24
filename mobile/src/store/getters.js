const getters = {
  userData: state => state.user.userData,
  direction: state => state.app.direction,
  time: state => state.app.time,
  courseName: state => state.app.courseName,
  classroom: state => state.app.classroom,
  teacher: state => state.app.teacher,
  organization: state => state.app.organization,
  semester: state => state.app.semester
}

export default getters
