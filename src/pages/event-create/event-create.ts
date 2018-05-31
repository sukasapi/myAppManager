import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";

/**
 * Generated class for the EventCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-event-create",
  templateUrl: "event-create.html"
})
export class EventCreatePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad EventCreatePage");
  }

  createEvent(
    eventName: string,
    eventDate: string,
    eventPrice: number,
    eventContact: number
  ): void {
    this.eventProvider
      .createEvent(eventName, eventDate, eventPrice, eventContact)
      .then(newEvent => {
        this.navCtrl.pop();
      });
  }
}
