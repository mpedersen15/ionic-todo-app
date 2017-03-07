import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { TodosPage } from '../pages/todos/todos';
import { CreateTodoPage } from '../pages/create-todo/create-todo';
import { EditTodoPage } from '../pages/edit-todo/edit-todo';
import { TodoService } from './todo.service';

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
	LoginPage,
	SignUpPage,
	TodosPage,
	CreateTodoPage,
	EditTodoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
	HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
	LoginPage,
	SignUpPage,
	TodosPage,
	CreateTodoPage,
	EditTodoPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, TodoService ]
})
export class AppModule {}
