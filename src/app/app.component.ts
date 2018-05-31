import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

//koneksi FIREBASE
import firebase from 'firebase';
import { firebaseCon} from './credentials';

//testing
import { Unsubscribe } from '@firebase/util';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
   
    // INISIALISASI FIREBASE
    firebase.initializeApp(firebaseCon);
    // CEK USER
    const unsubscribe: Unsubscribe=firebase.auth()
      .onAuthStateChanged(user => {
      if(!user){ //belum terotentifikasi
        this.rootPage = 'LogInPage';
        unsubscribe();
      }
      else{
        this.rootPage = HomePage;
        unsubscribe();
      }
    });
    /*
    platform.ready().then(() => { //fatarrow berfungsi di javascript
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      /////////////////////////////////
      statusBar.styleDefault();
      splashScreen.hide();
    });*/
  }
}

