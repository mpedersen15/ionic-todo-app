import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {TodoService} from '../../app/todo.service';
import { NavController, LoadingController, MenuController } from 'ionic-angular';
import {TodosPage} from '../todos/todos';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUpPage implements OnDestroy {
	signUpForm: FormGroup;
	testArray = [];
	token;
	subscription;
	loader;
	constructor(public fb: FormBuilder, public http: Http, public todoService: TodoService, public navController: NavController, public loadingCtrl: LoadingController, public menu: MenuController) {
		this.signUpForm = fb.group({
            "email": ["", Validators.required],
            "password":["", Validators.required]/* ,  
            "password-confirm":["", Validators.required] */
        });
	}
	
	doSignUp(event) {
		this.showLoading();
		
		console.log('sign up',event);
		console.log(this.signUpForm.value);
		
		this.subscription = this.todoService.signup(this.signUpForm.value.email, this.signUpForm.value.password)
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
			content: "Signing up..."
		});
		this.loader.present();
	}
	
	goToLogin(){
		this.navController.setRoot(LoginPage);
	}
	
	ngOnDestroy(){
		if (this.subscription){
			this.subscription.unsubscribe();
		}
	}
}
