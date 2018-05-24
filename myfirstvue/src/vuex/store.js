import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        currentRouter:'home_index_2',
        siderMenuList:[
        	
        ],
        SiderMenuTileToggle:'translateX(-0px)'
    },
    mutations: {
        chageActiveMenu(state,name){
        	state.currentRouter=name;
        },
        chageSiderMenuToggle(state,arg){
            state.SiderMenuTileToggle=arg;
        }
    },
    actions: {

    },
});

export default store;