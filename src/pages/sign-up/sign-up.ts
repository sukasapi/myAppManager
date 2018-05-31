import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  Loading,
  LoadingController,
  Alert,
  AlertController
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { HomePage } from "../home/home";
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})


export class SignUpPage {


  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public formBuilder: FormBuilder,
              public authProvider: AuthProvider,
              public alertCtrl: AlertController) {
    

            this.signupForm=formBuilder.group({
              email: [
                "", //menandakan inputan tipe string
                Validators.compose([Validators.required])
              ],
              pass: [
                "",
                Validators.compose([Validators.required, Validators.minLength(6)])
              ]
            })
  }


    ///fungsi proses signup
    signupUser():void{
      if(!this.signupForm.valid){
        console.log(`Form not valid:${this.signupForm.value}`)
      }
      else
      {
         //baca nilai input yang ada di form
      const email = this.signupForm.value.email;
      const pass = this.signupForm.value.pass;

      //cocokan nilai dengan firebase
      this.authProvider.signupuser(email, pass).then(
        //resolve - Jika terpenuhi
        authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        },
        //reject
        error => {
          this.loading.dismiss().then(()=>{
            const alert: Alert = this.alertCtrl.create({ //buat alert message
              message : error.message,
              buttons: [{
                text: 'OK', role:'batal'
              }]
            });
            alert.present();//tampilkan alert
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
        


      }

      //panggil fungsi signupUser dari provider Auth
     
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

}
