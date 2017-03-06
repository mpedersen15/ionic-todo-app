import { Component , OnInit} from '@angular/core';
import {TodoService} from '../../app/todo.service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html'
})
export class TodosPage implements OnInit{
	todos;
	
	constructor(public todoService: TodoService){
		//console.log('in todoService constructor');
		
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
}
