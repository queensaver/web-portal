app.component('qs-login', {
	template: `
		<div class="qs-login">
			<h1>Login</h1>
			<div class="form">
				<div class="user">
					<input v-model="username" type="text" placeholder="Username" />
				</div>
				<div class="pass">
					<input v-model="password" type="password" placeholder="Password" />
				</div>
				<button @click="doLogin(username, password)">Login</button>
				<div class='error' v-if="form_error">{{form_error}}</div>
			</div>
			<p>No Account? <a @click="changePage('reg')">Register</a></p>
		</div>
	`,
	data() {
		return {
			username: '',
			password: '',
			form_error: ''
		}
	},
	methods: {
		doLogin(username, password) {
			// login form is filled out
			if (this.username != '' && this.password != '') {
				// store credentials as form data
				var data = new FormData();
				data.append('username', this.username);
				data.append('password', this.password);
				// fetch
				axios({
					method: 'post',
					url: 'https://api.queensaver.com/v1/login',
					withCredentials: true,
					data: data
				})
				// fetch success
				.then(function (response) {
					// reset error message
					this.form_error = '';
					// set client login cookie
					const expire_date = new Date();
					expire_date.setTime(expire_date.getTime() + 1 * 24 * 60 * 60 * 1000);
					const expires = "expires=" + expire_date.toUTCString();
					document.cookie = "qs_login=true;" + expires + ";path=/";
					// emit login success
					this.$emit('login-success');
					// log response
					console.log(response);
				}.bind(this))
				// fetch error
				.catch(function (error) {
					// 401: wrong credentials
					if (error.response.status == 401) {
						// log error
						console.log(error.response.data);
						// set error message
						this.form_error = error.response.data;
					}
					// undefined error
					else {
						// log error
						console.log(error);
					}
				}.bind(this));
			}
			// login form is not filled out
			else {
				this.form_error = 'All fields are required';
			}
		},
		changePage(page) {
			// emit page change
			this.$emit('change-page', page);
		}
	}
})