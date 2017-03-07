import { Component, OnDestroy } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../../app/todo.service';


@Component({
  templateUrl: 'create-todo.html'
})
export class CreateTodoPage implements OnDestroy{
  createTodoForm: FormGroup;
  subscription;
  
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
	public fb: FormBuilder,
	public todoService: TodoService
  ) {
	this.createTodoForm = fb.group({
		"text": ["", Validators.required]
	});
  }

  createTodo(event){
	  console.log('createTodo',event, this.createTodoForm.value);
	  this.subscription = this.todoService.createTodo(this.createTodoForm.value.text).subscribe(res => {
		  console.log('createTodo res', res);
		  
		  this.viewCtrl.dismiss();
		  
		  // Emit an event to todos.ts to update todo list
	  });
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  ngOnDestroy(){
	  this.subscription.unsubscribe();
  }
}