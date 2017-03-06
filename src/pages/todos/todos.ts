import { Component , OnInit, OnDestroy} from '@angular/core';
import {TodoService} from '../../app/todo.service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html'
})
export class TodosPage implements OnInit, OnDestroy{
	todos;
	subscription;
	
	constructor(public todoService: TodoService){
		//console.log('in todoService constructor');
		
	}
	
	handleTodoChange(e, todo){
		console.log('todo changed', e);
		console.log(todo._id);
		
		// need to call API to update todo
		
		this.subscription = this.todoService.updateTodo(todo)
			.subscribe( res =>{
				console.log('update res',res);
			});
	}
	
	ngOnInit(){
		console.log('todos page inited. getting todos...');
		console.log(this.todoService);
		this.todoService.getTodos()
			.subscribe(res => {
				//this.todos = res.todos;
				console.log(res);
				this.todos = res.todos;
			})
	}
	
	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}
