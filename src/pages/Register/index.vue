<template>
    <!-- 注册内容 -->
    <div class="register">
        <h3>
            注册新用户
            <span class="go"
                >我有账号，去
                <router-link to="/login">登陆</router-link>
            </span>
        </h3>
        <div class="content">
            <label>手机号:</label>
            <!-- 使用veevalidata进行表单验证必须写name，因为插件需要name的字段进行匹配 -->
            <!-- v-validata=“”指令是插件自带的指令，vue本身没有，和图片懒加载插件一样，require：true表示：
            这个输入框必须填写内容，regex是正则验证，class里面的invalid也是插件自定义的类，当errors判定为true时显示 -->
            <!-- errors.has（‘phone’）用于判断phone格式是否错误，以及是否填写，错误返回true，正确返回false -->
            <input
                v-model="phone"
                name="phone"
                v-validate="{ require: true, regex: /^1\d{10}$/ }"
                :class="{ invalid: errors.has('phone') }"
            />
            <!-- error.first根据字段信息phone获得错误信息， -->
            <span class="error-msg">{{ errors.first("phone") }}</span>

            <!-- <input type="text" placeholder="请输入你的手机号" v-model="phone" />
            <span class="error-msg">错误提示信息</span> -->
        </div>
        <div class="content">
            <label>验证码:</label>
            <input type="text" placeholder="请输入验证码" v-model="code" />
            <button @click="passPort" style="width: 100px; height: 37px">
                获取验证码
            </button>
            <span class="error-msg">错误提示信息</span>
        </div>
        <div class="content">
            <label>登录密码:</label>
            <input
                type="text"
                placeholder="请输入你的登录密码"
                v-model="password"
            />
            <span class="error-msg">错误提示信息</span>
        </div>
        <div class="content">
            <label>确认密码:</label>
            <input
                type="text"
                placeholder="请输入确认密码"
                v-model="password2"
            />
            <span class="error-msg">错误提示信息</span>
        </div>
        <div class="controls">
            <input name="m1" type="checkbox" v-model="isCheck" />
            <span>同意协议并注册《尚品汇用户协议》</span>
            <span class="error-msg">错误提示信息</span>
        </div>
        <div class="btn">
            <button @click="register">完成注册</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            phone: "",
            password: "",
            password2: "",
            code: "",
            isCheck: true,
        };
    },
    methods: {
        async passPort() {
            try {
                await this.$store.dispatch("getCode", this.phone);
                this.code = this.$store.state.user.code;
            } catch (error) {
                alert("获取验证码失败：" + error.message);
            }
        },
        async register() {
            try {
                await this.$store.dispatch("getRegister", {
                    phone: this.phone,
                    password: this.password,
                    password2: this.password2,
                    code: this.code,
                    isCheck: true,
                });
                this.$router.push("/login");
            } catch (error) {
                alert("注册失败：" + error.message);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
            font-size: 14px;
            float: right;

            a {
                color: #e1251b;
            }
        }
    }

    div:nth-of-type(1) {
        margin-top: 40px;
    }

    .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
            font-size: 14px;
            width: 96px;
            text-align: right;
            display: inline-block;
        }

        input {
            width: 270px;
            height: 38px;
            padding-left: 8px;
            box-sizing: border-box;
            margin-left: 5px;
            outline: none;
            border: 1px solid #999;
        }

        img {
            vertical-align: sub;
        }

        .error-msg {
            position: absolute;
            top: 100%;
            left: 495px;
            color: red;
        }
    }

    .controls {
        text-align: center;
        position: relative;

        input {
            vertical-align: middle;
        }

        .error-msg {
            position: absolute;
            top: 100%;
            left: 495px;
            color: red;
        }
    }

    .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
            outline: none;
            width: 270px;
            height: 36px;
            background: #e1251b;
            color: #fff !important;
            display: inline-block;
            font-size: 16px;
        }
    }
}
</style>