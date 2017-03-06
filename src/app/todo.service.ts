import {Injectable} from "@angular/core";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
	
	todoUrl = 'https://obscure-woodland-53958.herokuapp.com';
	token = "default token";
	headers;
	todos = ['blah 1','blah 2'];
	
	constructor(public http: Http){
		console.log('in todoService constructor', this.token);
	}
	
	
	
	// Utility methods
	
	setHeaders(token){
		console.log('setting headers', token);
		this.token = token;
		this.headers = new Headers({ 'x-auth': token});
	}
	
	// User methods
	
	signup(email,password){
		
	}
	
	getMyInfo(){
		
	}
	
	logout(){
		
	}
	
	login(email, password){
		return this.http.post(this.todoUrl+"/users/login", {email, password});
			/* .map( res => res.json() ) 
			.subscribe( res => {
				console.log(res);
				//console.log(res.json());
				console.log(res.headers);
				console.log(res.headers.get('x-auth'));
				this.token = res.headers.get('x-auth');
			});*/
	}
	
	// Todo methods
	
	createTodo(){
		
	}
	
	getTodos(){
		console.log('headers', this.headers);
		console.log('token', this.token);
		return this.http.get(this.todoUrl+"/todos", {headers: this.headers}).map( res => res.json() ) ;
	}
	
	getTodoById(){
		
	}
	
	updateTodo(){
		
	}
	
	deleteTodo(){
		
	}
}