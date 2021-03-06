import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {TodoService} from '../../app/todo.service';
import { NavController, LoadingController, MenuController } from 'ionic-angular';
import {TodosPage} from '../todos/todos';
import {SignUpPage} from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnDestroy {
	loginForm: FormGroup;
	testArray = [];
	token;
	subscription;
	loader;
	constructor(public fb: FormBuilder, public http: Http, public todoService: TodoService, public navController: NavController, public loadingCtrl: LoadingController, public menu: MenuController) {
		this.loginForm = fb.group({
            "email": ["", Validators.required],
            "password":["", Validators.required]
        });
	}
	
	doLogin(event) {
		this.showLoading();
		
		console.log(event);
		console.log(this.loginForm.value);
		
		this.subscription = this.todoService.login(this.loginForm.value.email, this.loginForm.value.password)
			.subscribe(res => {
				
				console.log('login res', res);
				
				this.loader.dismiss();
				
				this.menu.enable(true, 'authenticated');
				this.menu.enable(false, 'unauthenticated');
				
				this.todoService.setHeaders(res.headers.get('x-auth'));
				this.navController.setRoot(TodosPage);
				
			});
	}
	
	showLoading(){
		this.loader = this.loadingCtrl.create({
			content: "Logging in...",
		});
		this.loader.present();
	}
	
	goToSignUp(){
		this.navController.setRoot(SignUpPage);
	}
	
	ngOnDestroy(){
		if (this.subscription){
		  this.subscription.unsubscribe();
		}
	}
}
