<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            <router-link :to='{name:"login"}'>logout</router-link>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
              <Sider :style="{width:SiderMenuwidth,minWidth: 'auto',maxWidth: 'none',flex: '0 0 auto',overflowX:'hidden',overflowY:'auto',zIndex:'5'}">
                <div @click="toggleSiderMenu()" :style="{width:'100%',textAlign:'center',height:'20px'}">
                  <Icon :style="{cursor:'pointer'}" type="navicon-round" color="white" size="18"></Icon>
                </div>
                <siderMenu :isSubmenuShow="isShow"></siderMenu>
              </Sider>
                <Layout :style="{padding: '10px',position:'relative',left:'-15px',zIndex:'10'}">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                      <keep-alive>
                        <router-view></router-view>
                      </keep-alive>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
  name: 'home_index',
  components:{
    siderMenu:() =>import('@/components/siderMenu')
  },
  data(){
    return {
      isFlexible:false,
      SiderMenuwidth:'170px',
      isShow:true
    }
  },
  methods:{
    logout(){
      this.$router.push({
                    name: 'login'
                });
    },
    toggleSiderMenu(){
      if(!this.isFlexible){
        this.isFlexible=true;
        this.SiderMenuwidth='64px';
        this.isShow=false;
        this.$store.commit('chageSiderMenuToggle','translateX(-6px)');
        this.$nextTick(function(){
          $("#siderMenuList .ivu-menu-item").css("paddingLeft","18px");
          $('body').addClass("shrink");
        });
      }else{
        this.isFlexible=false;
        this.SiderMenuwidth='170px';
        this.isShow=true;
        this.$store.commit('chageSiderMenuToggle','translateX(-0px)');
        this.$nextTick(function(){
          $("#siderMenuList .ivu-menu-item").css("paddingLeft","43px");
          $('body').removeClass("shrink");
        });
      }
      
    }
  }
}
</script>
<style>
.ivu-menu-submenu-title:hover{
  background:#2d8cf0!important;
}
  .layout{
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      position: absolute;
      width: 100%;
      height: 100%;
  }
  .ivu-layout{
    height: 100%;
  }
  .layout-logo{
      width: 100px;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 15px;
      left: 20px;
  }
  .layout-nav{
      width: 420px;
      margin: 0 auto;
      margin-right: 20px;
  }
</style>
