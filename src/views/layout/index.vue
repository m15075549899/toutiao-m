<template>
    <div class="layout-container">
        <!-- 子路由出口 -->
        <router-view />
        <!-- 子路由出口 -->
        <!-- 标签导航栏 -->
        <van-tabbar class="layout-tabbar" route>
            <van-tabbar-item to="/">
                <i slot="icon" class="toutiao toutiao-shouye"></i>
                <span class="text">首页</span>
            </van-tabbar-item>
            <van-tabbar-item to="/qa">
                <i slot="icon" class="toutiao toutiao-wenda"></i>
                <span class="text">问答</span>
            </van-tabbar-item>
            <van-tabbar-item to="/video">
                <i slot="icon" class="toutiao toutiao-shipin"></i>
                <span class="text">视频</span>
            </van-tabbar-item>
            <van-tabbar-item to="/my">
                <i slot="icon" class="toutiao toutiao-wode"></i>
                <span class="text">我的</span>
            </van-tabbar-item>
        </van-tabbar>
        <!-- 标签导航栏 -->
    </div>
</template>

<script>
export default {
    name: 'LayoutIndex',

    data() {
        return {
            active: 0,
        }
    },
    computed: {//计算属性  
        // active() {//获取到路由的名字给active赋值
        //     // return this.$route.name
        // }
    },
    mounted() {

    },

    methods: {

    },
};
</script>

<style lang="less" scoped>
.layout-container {
    .layout-tabbar {
        i.toutiao {
            font-size: 20px;
        }

        span.text {
            font-size: 10px;
        }
    }
}
</style>