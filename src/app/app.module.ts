import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { FirebaseServiceProvider } from "../providers/firebase-service/firebase-service";
import {HttpModule} from '@angular/http';
import {AngularFireDatabaseModule} from 'angularfire2/database'; 
import {AngularFireModule} from 'angularfire2';


const firebaseConfig = {
  apiKey: "AIzaSyB5OXLfx5gCV0wVUDBt6pcxNO61JCKEztg",
  authDomain: "onestepfurther-7ac5b.firebaseapp.com",
  databaseURL: "https://onestepfurther-7ac5b.firebaseio.com",
  projectId: "onestepfurther-7ac5b",
  storageBucket: "onestepfurther-7ac5b.appspot.com",
  messagingSenderId: "886655083650"
};

@NgModule({
  declarations: [MyApp, AboutPage, ContactPage, HomePage, TabsPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, AboutPage, ContactPage, HomePage, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseServiceProvider
  ]
})
export class AppModule {}
