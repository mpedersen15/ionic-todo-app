import { Component , OnInit, OnDestroy} from '@angular/core';
import { TodoService } from '../../app/todo.service';
import { NavController, ModalController } from 'ionic-angular';
import { CreateTodoPage } from '../create-todo/create-todo';
import { EditTodoPage } from '../edit-todo/edit-todo';

@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html'
})
export class TodosPage implements OnInit, OnDestroy{
	todos;
	subscription;
	
	constructor(public todoService: TodoService, public modalController: ModalController){
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
	
	deleteTodo(e, todo){
		console.log('todo to delete', todo);
		this.subscription = this.todoService.deleteTodo(todo)
			.subscribe( res => {
				console.log('delete todo res',res);
				
				this.getTodos();
				
			});
	}
	
	openCreateModal(){
		let modal = this.modalController.create(CreateTodoPage);
		
		modal.onDidDismiss( data => {
			console.log(data);
			if (data === 'todo created'){
				this.getTodos();
			}
		})
		
		modal.present();
	}
	
	getTodos(){
		console.log('in getTodos');
		this.subscription = this.todoService.getTodos()
			.subscribe(res => {
				//this.todos = res.todos;
				console.log(res);
				this.todos = res.todos;
			})
	}
	
	openEditModal(e,todo){
		let modal = this.modalController.create(EditTodoPage, {todo});
		
		modal.onDidDismiss( data => {
			console.log(data);
			if (data === 'todo created'){
				this.getTodos();
			}
		})
		
		modal.present();
	}
	
	ngOnInit(){
		console.log('todos page inited. getting todos...');
		console.log(this.todoService);
		this.getTodos();
		/* this.subscription = this.todoService.getTodos()
			.subscribe(res => {
				//this.todos = res.todos;
				console.log(res);
				this.todos = res.todos;
			}) */
	}
	
	
	
	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}
