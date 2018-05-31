import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { AuthProvider } from "../../providers/auth/auth";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  //ke profile
  goToProfile():void{
    this.navCtrl.push('ProfilePage');
  }

  //mengarah ke event baru
  goToCreate():void{
    this.navCtrl.push('EventCreatePage');
  }

  //mengarah ke list semua event
goTolist():void{
  this.navCtrl.push('EventListPage');
}
}
