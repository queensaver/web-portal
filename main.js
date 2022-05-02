// create app
const app = Vue.createApp({
	// data
	data() {
		return {
			page: 'login'
		}
	},
	// mounted
	mounted: function() {
		this.loginSuccess();
	},
	// methods
	methods: {
		loginSuccess() {
			var cookie = this.getCookie('qs_login');
			if (cookie != '' && cookie != null) {
				this.page = 'dashboard';
			}
		},
		getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
			for(let i = 0; i <ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		},
		changePage(page) {
			this.page = page;
		}
	}
})

// global variables
app.config.globalProperties.$bhive_weight = null;
app.config.globalProperties.$bhive_temp = null;