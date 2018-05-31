import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
/////// splash screen
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
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-log-in",
  templateUrl: "log-in.html"
})
export class LogInPage {
  //global setting
  public loginForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController
  ) {
    this.loginForm = formBuilder.group({
      email: [
        "", //menandakan inputan tipe string
        Validators.compose([Validators.required])
      ],
      pass: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  //fungsi untuk login
  LoginUser(): void {
    //cek apakah from login sudah valid atau belum
    if (!this.loginForm.valid) {
      console.log(`isian belum valid : ${this.loginForm.value}`);
    } else {
      //baca nilai input yang ada di form
      const email = this.loginForm.value.email;
      const pass = this.loginForm.value.pass;

      //cocokan nilai dengan firebase
      this.authProvider.LoginUser(email, pass).then(
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
  }


  goToSignup():void {
    this.navCtrl.push('SignUpPage');
  }

  goToReset(){
    this.navCtrl.push('ResetPassPage')
  }

  ionViewDidLoad() {
    //semua perintah dikerjakan
    console.log("ionViewDidLoad LogInPage");
  }
}
