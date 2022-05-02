app.component('qs-reg', {
	template: `
		<div class="qs-reg">
			<h1>Register</h1>
			<div class="form">
				<div class="user">
					<input v-model="user" type="text" placeholder="Username" />
				</div>
				<div class="pass">
					<input v-model="password" type="password" placeholder="Password" />
				</div>
				<div class="firstname">
					<input v-model="firstname" type="text" placeholder="First Name" />
				</div>
				<div class="lastname">
					<input v-model="lastname" type="text" placeholder="Last Name" />
				</div>
				<button @click="doReg()">Register</button>
				<div class='error' v-if="form_error">{{form_error}}</div>
			</div>
			<p class="success" v-if="success">Registration was successful!</p>
			<p>Already registered? <a @click="changePage('login')">Login</a></p>
		</div>
	`,
	data() {
		return {
			user: null,
			password: null,
			firstname: null,
			lastname: null,
			form_error: '',
			success: false
		}
	},
	methods: {
		doReg() {
			// reg form is filled out
			if (this.user && this.password && this.firstname && this.lastname) {
				// prepare reg data
				const data = JSON.stringify({
					username: this.user,
					password: this.password,
					firstName: this.firstname,
					lastName: this.lastname
				});
				// set header
				const header = {
					'Content-Type': 'application/json'
				}
				// do reg
				axios.post('https://api.queensaver.com/v1/user', data, header)
				// success
				.then(function (response) {
					console.log(response);
					this.success = true
				}.bind(this))
				// error
				.catch(function (error) {
					// 409: user already exists
					if (error.response.status == 409) {
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
			// reg form is not filled out
			else {
				this.form_error = 'All fields are required!';
			}
		},
		changePage(page) {
			// emit page change
			this.$emit('change-page', page);
		}
	}
})