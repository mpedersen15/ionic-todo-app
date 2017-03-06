import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { TodosPage } from '../pages/todos/todos';
import { TodoService } from './todo.service';

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
	LoginPage,
	TodosPage
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
	TodosPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, TodoService ]
})
export class AppModule {}
