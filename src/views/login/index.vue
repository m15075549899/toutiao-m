<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录" />
        <!-- /导航栏 -->

        <!-- 登录表单 -->
        <van-form ref="loginForm" @submit="onSubmit">
            <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" :rules="userFormRules.mobile"
                type="number" maxlength="11">
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field v-model="user.code" name="code" placeholder="请输入验证码" :rules="userFormRules.code" type="number"
                maxlength="6">
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <template #button>
                    <van-count-down v-if="isCountDownShow" :time="1000 * 10" format="ss s"
                        @finish="isCountDownShow = false" />
                    <van-button v-else class="send-sms-btn" native-type="button" round size="small" type="default"
                        @click="onSendSms">发送验证码</van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
        <!-- 登录表单 -->
    </div>
</template>

<script>
    import { login, sendSms } from "@/api/user.js"
    export default {
        name: "LoginIndex",
        data() {
            return {
                user: {
                    mobile: "", //手机号
                    code: "", //验证码
                },
                userFormRules: {
                    mobile: [{
                        required: true,
                        message: '手机号不能为空'
                    }, {
                        pattern: /^1[3|5|7|8|9]\d{9}$/,
                        message: '手机号格式错误'
                    }],
                    code: [{
                        required: true,
                        message: '验证码不能为空'
                    }, {
                        pattern: /^\d{6}$/,
                        message: '验证码格式错误'
                    }]
                },
                isCountDownShow: false
            }
        },

        mounted() { },

        methods: {
            async onSubmit() {
                this.$toast.loading({
                    message: "登录中...",
                    forbidClick: true,
                    duration: 0
                })
                // 提交表单请求登录
                try {
                    const { data } = await login(this.user)
                    this.$store.commit('setUser', data.data)
                    this.$toast.success('登录成功')
                } catch (err) {
                    if (err.response.status === 400) {
                        this.$toast.fail('手机号或验证码错误')
                    } else {
                        this.$toast.fail('登录失败，请稍后重试')
                    }
                }
            },
            async onSendSms() {
                try {
                    await this.$refs.loginForm.validate('mobile')
                    console.log('验证成功')
                } catch (err) {
                    return console.log('验证失败', err)
                }
                this.isCountDownShow = true
                try {
                    await sendSms(this.user.mobile)
                    this.$toast('发送成功')
                } catch (err) {
                    // 发送失败，关闭倒计时
                    this.isCountDownShow = false
                    if (err.response.status === 429) {
                        this.$toast('发送太频繁了，请稍后重试')
                    } else {
                        this.$toast('发送失败，请稍后重试')
                    }
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .toutiao {
        font-size: 19px;
    }

    .send-sms-btn {
        width: 76px;
        height: 23px;
        line-height: 23px;
        background-color: #ededed;
        border-radius: 12px;
        font-size: 11px;
        color: #666;
    }

    .van-button--small {
        padding: 0;
    }

    .login-btn-wrap {
        padding: 27px 14px;
        border-radius: 5px;
    }

    .login-btn {
        background-color: #6db4fb;
        border: none;
    }
</style>