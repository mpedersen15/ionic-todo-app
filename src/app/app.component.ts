import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { TodosPage } from '../pages/todos/todos';
import { TodoService } from './todo.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;
  authPages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
	public todoService: TodoService
  ) {
    this.initializeApp();

    // set our app's pages (UNAUTHENTICATED)
    this.pages = [
      //{ title: 'Hello Ionic', component: HelloIonicPage },
      //{ title: 'My First List', component: ListPage },
      { title: 'Login', component: LoginPage },
      { title: 'Sign Up', component: SignUpPage }
    ];
	
	this.authPages = [
		{ title: 'Todos', component: TodosPage }
	]

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
  
  logout(){
	  this.todoService.removeHeaders();
	  
	  this.menu.close();
	  
	  this.menu.enable(false, 'authenticated');
	  this.menu.enable(true, 'unauthenticated');
	  
	  this.nav.setRoot(LoginPage);
  }
}
