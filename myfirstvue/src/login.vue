<template>
	<div class="login">
        <div class="login-con" @keydown.enter="handleSubmit">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
	export default {
		name:'login',
		data(){
			return {
				form: {
	                userName: '',
	                password: ''
	            },
	            rules: {
	                userName: [
	                    { required: true, message: '账号不能为空', trigger: 'blur' }
	                ],
	                password: [
	                    { required: true, message: '密码不能为空', trigger: 'blur' }
	                ]
	            }
			};
		},
		methods:{
			handleSubmit(){
				this.$refs.loginForm.validate((valid) => {
					if(valid){
						this.$store.commit('chageActiveMenu','home_index_1');
						this.$router.push({
		                    name: 'home_index_1'
		                });
					}
				})
				
			}
		}
	}
</script>
<style lang="less">
    @import './login.less';
</style>