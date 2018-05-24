<template>
    <Tabs value="name1" @on-click="handlerTabs">
        <TabPane :label="label" name="name1">
            <ATaskTodo></ATaskTodo>
        </TabPane>
        <TabPane label="标签二" name="name2">标签二的内容</TabPane>
        <TabPane label="标签三" name="name3">
            <HelloWorld></HelloWorld>
        </TabPane>
    </Tabs>
</template>
<script>
console.log('开始加载ATask组件');
    export default {
        name: 'ATask',
        components:{
            ATaskTodo:() =>import('@/components/ATaskTodo'),
            HelloWorld:()=>import('@/components/HelloWorld')
        },
        methods:{
            handlerTabs(name){
                console.log("当前选择的tabs:"+name);
            }
        },
         data () {
            return {
                label: (h) => {
                    return h('div', [
                        h('span', '标签一'),
                        h('Badge', {
                            props: {
                                count: 3
                            }
                        })
                    ])
                }
            }
        }
    }
</script>
