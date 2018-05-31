import { Component } from "@angular/core";
import {
  Alert,
  AlertController,
  IonicPage,
  NavController,
  NavParams
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
/**
 * Generated class for the ResetPassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-reset-pass",
  templateUrl: "reset-pass.html"
})
export class ResetPassPage {
  public resetPasswordForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public AuthProvider: AuthProvider,
    formBuilder: FormBuilder
  ) {
    this.resetPasswordForm = formBuilder.group({
      email: ["", Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ResetPassPage");
  }

  resetPassword(): void {
    if (!this.resetPasswordForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.resetPasswordForm.value}`
      );
    } else {
      const email: string = this.resetPasswordForm.value.email;
      this.AuthProvider.resetPass(email).then(
        user => {
          const alert: Alert = this.alertCtrl.create({
            message: "Check your email for a password reset link",
            buttons: [
              {
                text: "Ok",
                role: "cancel",
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ]
          });
          alert.present();
        },
        error => {
          const errorAlert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: "Ok", role: "cancel" }]
          });
          errorAlert.present();
        }
      );
    }
  }
}
