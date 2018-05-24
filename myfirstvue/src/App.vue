<template>
    <div id="main" class="app-main">
        <router-view></router-view>
        <div id="tooltip"></div>
    </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    $(document).on("mouseover", ".ivu-menu-submenu-title,.ivu-menu-item",function () {
                if ($('body').hasClass('shrink')) {
                    var offset = $(this).offset();
                    $("#tooltip").css({
                        "top": offset.top + $(this).height() / 2 -6 + "px",
                        "left": offset.left + 74+ "px",
                        "display": "block"
                    }).text($(this).find("span").text());
                }
            });
            $(document).on("mouseout", ".ivu-menu-submenu-title,.ivu-menu-item",function () {
                $("#tooltip").css("display", "none");
            });
  }
}
</script>
<style>
  html,body{
      width: 100%;
      height: 100%;
      background: #f0f0f0;
      overflow: hidden;
  }
  .app-main{
      width: 100%;
      height: 100%;
  }
  .ivu-menu-submenu-title:hover{
        background: #2d8cf0!important;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu 
  .ivu-menu-item:not(.ivu-menu-item-active):hover{
    background: #495060!important;
  }
  #tooltip {
            width: auto;
            height: 40px;
            position: absolute;
            top: 0px;
            left: 0px;
            color: #fff;
            padding: 0px 15px;
            line-height: 40px;
            font-size: 14px;
            border-radius: 5px;
            background-color: #515F6E;
            display: none;
            z-index: 100;
        }
        #tooltip:before {
            content: '';
            display: block;
            font-size: 0;
            width: 0;
            height: 0;
            position: absolute;
            bottom: 11px;
            left: -15px;
            border-bottom: 9px solid transparent;
            border-top: 9px solid transparent;
            border-right: 16px solid #515F6E;
        }
</style>
