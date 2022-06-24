<template>
  <div class="vod-result">
    <kd-header url="/search?isLive=false">
      <span>点播播课程-搜索结果</span>
      <div class="condition-wrap">
        <condition-tag
          v-if="conditions.courseName"
          @close-tag="handleTagClose(0)">
          <span class="condition-title">课程：</span>
          <span>{{conditions.courseName}}</span>
        </condition-tag>
        <condition-tag
          v-if="conditions.teacher && conditions.teacher.id"
          @close-tag="handleTagClose(1)">
          <span class="condition-title">教师：</span>
          <span>{{conditions.teacher.name}}</span>
        </condition-tag>
        <condition-tag
          v-if="conditions.classroom && conditions.classroom.id"
          @close-tag="handleTagClose(2)">
          <span class="condition-title">教室：</span>
          <span>{{conditions.classroom.name}}</span>
        </condition-tag>
        <condition-tag
          v-if="conditions.organization && conditions.organization.id"
          @close-tag="handleTagClose(3)">
          <span class="condition-title">院系：</span>
          <span>{{conditions.organization.organizationName}}</span>
        </condition-tag>
        <condition-tag
          v-if="conditions.semester && conditions.semester.id"
          @close-tag="handleTagClose(4)">
          <span class="condition-title">学期：</span>
          <span>{{conditions.semester.name}}</span>
        </condition-tag>
      </div>
    </kd-header>
    <video-list :queryParams="params"></video-list>
  </div>
</template>
<script>
import videoList from '@/views/videoList'
import conditionTag from './components/conditionTag.vue'
export default {
  components: {
    videoList,
    conditionTag
  },
  computed: {
    params () {
      const {
        courseName,
        teacher,
        classroom,
        organization,
        semester
      } = this.$store.getters
      const parmObj = {
        courseName: courseName,
        teacherId: teacher ? teacher.userCode : undefined,
        classroomId: classroom ? classroom.id : undefined,
        organizationId: organization ? organization.id : undefined,
        termTimeId: semester ? semester.id : undefined
      }
      return parmObj
    },
    conditions () {
      const {
        courseName,
        teacher,
        classroom,
        semester,
        organization
      } = this.$store.getters
      return {
        courseName,
        teacher,
        classroom,
        semester,
        organization
      }
    }
  },
  methods: {
    handleTagClose (key) {
      switch (key) {
        case 0:
          this.$store.commit('setQueryCourseName', '')
          break
        case 1:
          this.$store.commit('setQueryTeacher', null)
          break
        case 2:
          this.$store.commit('setQueryClassroom', null)
          break
        case 3:
          this.$store.commit('setQueryOrg', null)
          break
        case 4:
          this.$store.commit('setQuerySemester', null)
          break
      }
    }
  }
}
</script>
<style lang="scss">
.vod-result {
  background-color: #F2F2F7;

  .condition-wrap {
    width: 100%;
    margin-top: 20px;
    margin-left: 12px;
    white-space: nowrap;
    overflow-x: auto;
  }

  .condition-title {
    color: #5d5d5d;
  }
}
</style>
