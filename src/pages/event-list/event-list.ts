import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";

/**
 * Generated class for the EventListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-event-list",
  templateUrl: "event-list.html"
})
export class EventListPage {
  public eventList: Array<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider
  ) {}

  ionViewDidLoad() {
    this.eventProvider.getEventList().on("value", eventListSnapshot => {
      this.eventList = [];
      eventListSnapshot.forEach(snap => { //jika ada event
        this.eventList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date 
        });
        return false;
      });
    });
    //console.log('ionViewDidLoad EventListPage');
  }

  goToEventDetail(eventId):void {
    this.navCtrl.push('EventDetailPage', { eventId: eventId });
    }
}
