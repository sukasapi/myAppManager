//import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import firebase from "firebase";
import { User } from "@firebase/auth-types";
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {//public http: HttpClient
  constructor() {
    console.log("Hello AuthProvider Provider");
  }

  //fungsi Login User
  LoginUser(email: string, pass: string): Promise<void> {
    return firebase.auth().signInWithEmailAndPassword(email, pass);
  }

  //fungsi signup
  signupuser(email: string, pass: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(newUser => {
        //RESOLVE (Jika Berhasil)
        firebase
          .database() //disimpan ke database firebase
          .ref(`/userprof/${newUser.uid}/email`)
          .set(email); //simpan ke dalam direktori

      })
      .catch(error => {
        //CATCH (Jika Gagal)
        console.error(error);
        throw new Error(error);
      });
  }

  //Fungsi reset password
  resetPass(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  //logout user
  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`userprof/${userId}`)
      .off();
    return firebase.auth().signOut();
  }


  //cekUID FIREBASE
  
}
