export const auth = {
	isAuthenticated: false,
	token: '',
	tipo: '',
	config:'',
	baseURL:"https://api.humanusjr.com",
	authenticate(tipo, token, cb){
		this.token = token;
		this.isAuthenticated = true;
		this.tipo = tipo;
		this.config = {
          headers: {
            Authorization: "Bearer "+this.token,
          }
        }
		setTimeout(cb, 100);
	},
	signout(cb){
		this.isAuthenticated = false;
		setTimeout(cb, 100);
	}
}
	
