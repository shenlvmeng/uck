<template>
  <!--Form-->
  <div
    :class="prefix"
  >
    <form
      action="http://impservice.youdao.com/shutup/submit.s"
      method="get"
      autocomplete="off"
      target="hidden_frame"
      ref="form"
    >
      <input
        type="tel"
        :class="`${prefix}-input`"
        name="phone"
        placeholder="请输入手机号码"
        v-model="phoneNum"
        @focus="handleFocus('phone')"
      >
      <div
        :class="`${prefix}-input`"
      >
        <input
          type="tel"
          :class="`${prefix}-input-checkcode`"
          name="code"
          v-model="checkCode"
          placeholder="请输入验证码"
          maxLength="6"
          @focus="handleFocus('code')"
        >
        <a
          href="javascript:;"
          id="getCode"
          @click="getCode"
          :class="{disabled: isDisabled}"
        >
          <span
            :class="{disabled: isDisabled}"
          >
            {{ isDisabled ? timer + '秒后重发' : '获取验证码'}}
          </span>
        </a>
      </div>
      <input
        type="text"
        :class="`${prefix}-input`"
        name="name"
        placeholder="请输入您的姓名"
        v-if="hasName"
        v-model="userName"
        @focus="handleFocus('name')"
      >
      <input
        type="text"
        :class="`${prefix}-input`"
        name="address"
        placeholder="请输入收件地址"
        v-if="hasAddr"
        v-model="userAddr"
        @focus="handleFocus('addr')"
      >
      <input
        type="hidden"
        name="from"
        :value="pvkey"
        id="formId"
      >
      <input
        type="hidden"
        name="vendor"
        :value="vendor"
      >
      <input
        type="submit"
        :class="`${prefix}-submit`"
        value=""
        id="order"
        @click="verifyCode($event)"
      >
    </form>
    <iframe
      src=""
      :class="`${prefix}-hidden`"
      name="hidden_frame"
      id="hidden_frame"
    ></iframe>
  </div>
  <!--end Form-->
</template>

<script>
  const prefix = "uck-form";

  export default {
    name: "Form",
    props: {
      pvkey: {
        type: String,
        required: true
      },

      hasName: {
        type: Boolean,
        default: false
      },

      hasAddr: {
        type: Boolean,
        default: false
      },

      countKey: {
        type: String,
        default: ""
      }

    },
    data () {
      return {
        prefix: prefix,
        phoneNum: "",
        checkCode: "",
        userName: "",
        userAddr: "",
        // checkcode button status
        isDisabled: false,
        // checkcode countdown
        timer: 60
      }
    },
    methods: {
      // 手机号正则匹配
      isMobile (str) {
        var mobilePattern = '^0*' +
          '(13|15|18|14|17)' +
          '(\\d{9}|' +
          '\\d-\\d{3}-\\d{5}|' +
          '\\d-\\d{4}-\\d{4}|' +
          '\\d{2}-\\d{3}-\\d{4}|' +
          '\\d{2}-\\d{4}-\\d{3})$',
          mobileRegExp = new RegExp(mobilePattern);

        if (!str) {
          return false;
        } else {
          return mobileRegExp.test(str);
        }
      },
      // 验证手机号是否合法
      mobileVerify () {
        var num = this.phoneNum.trim();
        if (!num) {
          alert('请输入电话号码');
          return false;
        } else if (!this.isMobile(num)) {
          alert('请输入正确的电话号码');
          return false;
        } else {
          return true;
        }
      },
      // 获取验证码和相关倒计时
      getCode () {
        if (this.isDisabled) return false;
        if (this.mobileVerify()) {
          this.$http.jsonp("http://xue.youdao.com/course/operation/vcodeFetch.json?mobile="+this.phoneNum.trim()).then((res) => {
            // success callback
            // 倒计时
            this.isDisabled = true;
            let countDown = () => {
              if (false == this.isDisabled) return;
              if (--this.timer <= 0) {
                this.timer = 60;
                this.isDisabled = false;
              } else {
                setTimeout(countDown, 1000);
              }
            };
            setTimeout(countDown, 1000);
          }, (err) => {
            // error callback
            console.log("验证码获取失败。网络错误：", err);
          });
        }
      },
      // 核对验证码
      verifyCode (e) {
        e.preventDefault();
        if (!this.mobileVerify()) {
          return false;
        }
        if (!this.checkCode) {
          alert('请输入您的验证码');
          return false;
        }
        this.$http.jsonp(`http://xue.youdao.com/course/operation/vcodeVerify.json?mobile=${this.phoneNum}&code=${this.checkCode}`).then((res) => {
          let {result, success} = res.data;
          if (2 == result && false == success) {
            alert('验证码错误');
          } else if (0 == result && true == success) {
            this.isDisabled = false;
            this.submit();
          } else {
            ;
          }
        }, (err) => {
          // error callback
          console.log('核对验证码失败。错误：', err);
        });
      },
      // 提交表单到后台表单系统
      submit () {
        this.$refs.form.submit();
        this.$emit('success', {
          num: phoneNum,
          code: checkCode,
          name: userName,
          addr: userAddr
        });
        // 有计数功能时才会发送下面的请求
        if (this.countKey !== "") {
          this.$http.jsonp(`http://xue.youdao.com/api/count.jsonp?key=${countKey}`).then((res) => {
            // 使用返回值
            console.log(res.json().data.count);
          }, (err) => {
            // error callback
            console.log(`用户计数失败。错误：${err}`);
          });
        }
      },
      // 触发聚焦事件
      handleFocus (type) {
        this.$emit('type', { type });
      }
    },
    computed: {
      vendor () {
        const r = new RegExp(`(\\?|#|&)vendor=([^&#]*)(&|#|$)`);
        const m = window.location.href.match(r);
        return decodeURIComponent(!m ? '' : m[2]);
      }
    }
  }
</script>

<style>
</style>