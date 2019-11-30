export const auth = {
	isAuthenticated: false,
	token: '',
	tipo: '',
	config:'',
	baseURL:"http://localhost:3333",
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
	
