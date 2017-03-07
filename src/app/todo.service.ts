import {Injectable} from "@angular/core";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
	
	todoUrl = 'https://obscure-woodland-53958.herokuapp.com';
	token;
	headers;
	todos = [];
	
	constructor(public http: Http){
		console.log('in todoService constructor', this.token);
	}
	
	
	
	// Utility methods
	
	setHeaders(token){
		console.log('setting headers', token);
		this.token = token;
		this.headers = new Headers({ 'x-auth': token});
	}
	
	removeHeaders(){
		this.headers.delete('x-auth');
	}
	
	// User methods
	
	signup(email,password){
		return this.http.post(this.todoUrl+"/users", {email, password});
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
	
	createTodo(text){
		console.log('createTodo service', text);
		return this.http.post(this.todoUrl+"/todos", {text}, {headers: this.headers});
	}
	
	getTodos(){
		console.log('headers', this.headers);
		console.log('token', this.token);
		return this.http.get(this.todoUrl+"/todos", {headers: this.headers}).map( res => res.json() ) ;
	}
	
	getTodoById(){
		
	}
	
	updateTodo(todo){
		let id = todo._id, text = todo.text, completed = todo.completed;
		//console.log(id, text, completed);
		//console.log(typeof id);
		return this.http.patch(this.todoUrl+"/todos/"+id, {text: text, completed}, {headers: this.headers});
	}
	
	deleteTodo(todo){
		console.log('in service delete', todo);
		let id = todo._id;
		return this.http.delete(this.todoUrl+"/todos/"+id, {headers: this.headers}).map( res => res.json() );
	}
}