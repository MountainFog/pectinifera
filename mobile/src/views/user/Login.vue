<template>
  <div class="login-page">
    <div class="login-banner">
      <div class="login-form">
        <div class="login-title-h1">视讯云课堂</div>
        <div class="login-title-h3">账号登录</div>
        <div class="login-info">
          <van-field
            readonly
            clickable
            label="租户"
            :value="tenantName"
            placeholder="选择租户"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" round position="bottom">
            <van-picker
              show-toolbar
              :columns="tenantSets"
              value-key="name"
              @cancel="showPicker = false"
              @confirm="onConfirm"
            />
          </van-popup>
          <van-field v-model="username" type="text" placeholder="请输入账号" left-icon="manager" />
          <van-field v-model="password" type="password" placeholder="请输入密码" left-icon="lock" />
        </div>
        <van-button @click="handleLogin" type="primary">登录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Field, Icon, Button, Picker, Popup } from 'vant'
import { mapActions } from 'vuex'
import { getTenant } from '@/api/login.js'
// import { sha256 } from 'js-sha256'
export default {
  name: 'Login',
  components: {
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  data () {
    return {
      showPicker: false,
      tenantName: '',
      tenantId: '',
      username: '',
      password: '',
      tenantSets: []
    }
  },
  mounted () {
    this.getTenant()
  },
  methods: {
    getTenant () {
      getTenant().then(res => {
        this.tenantSets = res.data.result.tenantSets
        if (this.tenantSets.length) {
          this.tenantName = this.tenantSets[0].name
          this.tenantId = this.tenantSets[0].sign
        }
      })
    },
    handleLogin () {
      const data = {
        username: this.username,
        password: this.password,
        tenantId: this.tenantId
      }
      this.login(data)
    },
    onConfirm (value) {
      this.showPicker = false
      this.tenantName = value.name
      this.tenantId = value.sign
    },
    ...mapActions({
      login: 'user/login'
    })
  }
}
</script>
<style lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: linear-gradient(180deg, #96D5FF 0%, #F2F2F7 100%);

  .login-banner {
    width: 360px;
    height: 700px;
    background-image: url(~@/assets/login_banner.png);
    background-size: cover;
    text-align: center;

    .login-form {
      display: inline-block;
      width: 266px;
      margin-top: 194px;

      .van-cell {
        margin-top: 22px;
      }
    }

    .login-title-h1 {
      font-size: 26px;
      color: #00B36E;
      letter-spacing: 2px;
      font-weight: Medium;
    }

    .login-title-h3 {
      margin-top: 8px;
      font-size: 16px;
      color: #999999;
      letter-spacing: 2px;
    }

    .login-info {
      margin-top: 44px;
    }

    .van-button {
      margin-top: 64px;
      width: 100%;
      height: 44px;

      .van-button__text {
        font-size: 18px;
        color: #FFFFFF;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
  .header{
    width: 100%;
    height: 165px;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
  }
  .content{
    width: 100%;
    height: auto;
    padding: 0 15px;
    box-sizing: border-box;
    .button-wrap{
      width: 100%;
      height: auto;
      margin-top: 15px;
    }
  }
  .more-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    font-size: 14px;
    a.link{
      color: #1989fa;
    }
    .switch-way{
      color: #333;
    }
  }

</style>
