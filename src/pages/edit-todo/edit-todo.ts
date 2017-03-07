import { Component, OnDestroy } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../../app/todo.service';


@Component({
  templateUrl: 'edit-todo.html'
})
export class EditTodoPage implements OnDestroy{
  editTodoForm: FormGroup;
  subscription;
  
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
	public fb: FormBuilder,
	public todoService: TodoService,
	public navParams: NavParams 
  ) {
	console.log(this.navParams);
	this.editTodoForm = fb.group({
		"text": [this.navParams.data.todo.text, Validators.required]
	});
  }

  editTodo(event){
	console.log('edit todo',event, this.editTodoForm.value);
	this.subscription = this.todoService.updateTodo({_id: this.navParams.data.todo._id, text: this.editTodoForm.value.text, completed: this.navParams.data.todo.completed})
		.subscribe( res =>{
			console.log('update res',res);
			this.viewCtrl.dismiss('todo created');
		});
	   
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  ngOnDestroy(){
	  if (this.subscription){
		  this.subscription.unsubscribe();
	  }
	  
  }
}