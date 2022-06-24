/**
 *Created by zhangbin on 2019/1/2
 * 定义全局的storage_key避免使用key重复
 * 定义 其他常量
 */
const constants = {
  STORAGE_KEY_USER_INFO: 'STORAGE_KEY_USER_INFO',
  STORAGE_KEY_TOKEN: 'STORAGE_KEY_TOKEN',
  STORAGE_COURSE_INDEX: 'STORAGE_COURSE_INDEX',
  STORAGE_SUBJECT_INFO: 'STORAGE_SUBJECT_INFO',
  BEGIN_COUR_TIME: 5 * 60 * 1000, // 五分钟前可以进入直播
  END_COUR_TIME: 10 * 60 * 1000, // 直播结束10分钟之内可以评论
  UPDATE_LIVE_TIME: 5 * 60 * 1000, // 每五分钟更新观看直播时间
  VOD_COMMENT_TIME: 5 // 点播结束5s前可评论
}
export default constants
