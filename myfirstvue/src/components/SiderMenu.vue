<template>
    <Menu id="siderMenuList" :theme="theme2" :active-name="currentRouter" :open-names="['home_index']" :style="{width:'170px',height:'101%'}" @on-select="changeRouter">
        <Submenu name="home_index">
            <template slot="title">
                <Icon type="ios-paper" :style="{transform:SiderMenuTileToggle}"></Icon>
                <span v-show="isSubmenuShow">内容管理</span>
            </template>
            <MenuItem name="home_index_1">
                <Icon type="navicon-round" size="16"></Icon>
                <span v-show="isSubmenuShow">表单测试</span>
            </MenuItem>
            <MenuItem name="home_index_2">
                <Icon type="navicon-round" size="16"></Icon>
                <span v-show="isSubmenuShow">表格测试</span>
            </MenuItem>
            <MenuItem name="upload">
                <Icon type="navicon-round" size="16"></Icon>
                <span v-show="isSubmenuShow">文件上传</span>
            </MenuItem>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-people" :style="{transform:SiderMenuTileToggle}"></Icon>
                <span v-show="isSubmenuShow">用户管理</span>
            </template>
            <MenuItem name="2-1"><Icon type="navicon-round" size="16"></Icon></Icon><span v-show="isSubmenuShow">新增用户</span></MenuItem>
            <MenuItem name="2-2"><Icon type="navicon-round" size="16"></Icon></Icon><span v-show="isSubmenuShow">活跃用户</span></MenuItem>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="stats-bars" :style="{transform:SiderMenuTileToggle}"></Icon>
                <span v-show="isSubmenuShow">统计分析</span>
            </template>
            <MenuItem name="3-1"><Icon type="navicon-round" size="16"></Icon><span v-show="isSubmenuShow">新增和启动</span></MenuItem>
            <MenuItem name="3-2"><Icon type="navicon-round" size="16"></Icon><span v-show="isSubmenuShow">活跃分析</span></MenuItem>
            <MenuItem name="3-3"><Icon type="navicon-round" size="16"></Icon><span v-show="isSubmenuShow">时段分析</span></MenuItem>
            <MenuItem name="3-4"><Icon type="navicon-round" size="16"></Icon></Icon><span v-show="isSubmenuShow">用户留存</span></MenuItem>
            <MenuItem name="3-5"><Icon type="navicon-round" size="16"></Icon></Icon><span v-show="isSubmenuShow">流失用户</span></MenuItem>
        </Submenu>
    </Menu>

</template>
<script>
import { mapState } from 'vuex'
    export default {
        name: 'siderMenu',
        data () {
            return {
                theme2: 'dark'
            }
        },
        props:['isSubmenuShow'],
        computed:{
            ...mapState([
                'currentRouter',
                'SiderMenuTileToggle'
              ])
        },
        methods:{
            changeRouter(name){
                this.$store.commit('chageActiveMenu',name);
                this.$router.push({
                    name: name
                });
            }
        }
    }
</script>
<style scoped>
   a{
    color:rgba(255,255,255,.7)
  }
  a:hover {
    color: #fff;
    background: 0 0!important;
  }
  .ivu-menu-item-active>a{
    border-right: none;
    color: #fff;
    background: #2d8cf0!important;
} 
</style>