import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";
import {
  Alert,
  AlertController,
  } from "ionic-angular";

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'event-detail/:eventId' //parameter yang ditangkap
})
@Component({
  selector: "page-event-detail",
  templateUrl: "event-detail.html"
})
export class EventDetailPage {
  public currentEvent: any = {}; //siapkan array penampung isi current event
 public eventDate:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public alertCtrl: AlertController,
  ) {}

  ionViewDidLoad() { //langsung muncul ketika page di load
    this.eventProvider
      .getEventDetail(this.navParams.get("eventId"))
      .on("value", eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });
    //console.log('ionViewDidLoad EventDetailPage');
  }

  updateDate(): void{
    const alert: Alert = this.alertCtrl.create({
      message:"edit tanggal event",
      inputs : [{
        name:"date",
        placeholder:"edit tanggal event",
        value:this.currentEvent.date
      }],
      buttons: [
        {text:"cancel"},
        {
          text:"simpan",
          handler: data =>{
            this.eventProvider.updateDate(data.date);
          }
        }
      ]
    }); alert.present();
  }

}
