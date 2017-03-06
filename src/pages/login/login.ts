import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {TodoService} from '../../app/todo.service';
import { NavController } from 'ionic-angular';
import {TodosPage} from '../todos/todos';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnDestroy {
	loginForm: FormGroup;
	testArray = [];
	token;
	subscription;
	
	constructor(public fb: FormBuilder, public http: Http, public todoService: TodoService, public navController: NavController) {
		this.loginForm = fb.group({
            "email": ["", Validators.required],
            "password":["", Validators.required]
        });
	}
	
	doLogin(event) {
		console.log(event);
		console.log(this.loginForm.value);
		
		this.subscription = this.todoService.login(this.loginForm.value.email, this.loginForm.value.password)
			.subscribe(res => {
				
				console.log('login res', res);

				this.todoService.setHeaders(res.headers.get('x-auth'));
				this.navController.push(TodosPage);
				
			});
	}
	
	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}
