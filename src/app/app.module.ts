import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';
import { EventProvider } from '../providers/event/event';

// Import ionic plugin
import {Camera, CameraOptions} from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  //meletakkan plugin diluar cordova
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  //meletakkan plugin diluar cordova
  providers: [  
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ProfileProvider,
    EventProvider, 
    Camera,  

  ]
})

//constructor untuk panggil kamera



export class AppModule {}
