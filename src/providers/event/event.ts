import { Injectable } from "@angular/core";
import firebase from "firebase";
import { Reference, ThenableReference } from "@firebase/database-types";
/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {
  public eventListRef: Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/eventList`);
      }
    });
    //console.log('Hello EventProvider Provider');
  }

  //fungsi buat event baru
  createEvent(
    eventName: string,
    eventDate: string,
    eventPrice: number,
    eventContact: number
  ): ThenableReference {
    return this.eventListRef.push({
      name: eventName,
      date: eventDate,
      price: eventPrice * 1, //tipe data number pake *1
      contact: eventContact * 1,
    });
  }

  //fungsi lihat daftar event
  getEventList(): Reference {
    return this.eventListRef;
    }
  //fungsi lihat detail event

  getEventDetail(eventId:string): Reference {
    return this.eventListRef.child(eventId);
    }
//update tanggal
    updateDate(date:string): Promise<any> {
      return this.eventListRef.update({date});
    }
}
