import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public events: Events, public modalCtrl : ModalController) {

  }

  openVoiceModal() {
    var modalPage = this.modalCtrl.create('ModalPage'); modalPage.present(); 

    this.events.publish('openVoiceModal:buttonClicked', this.navCtrl.getActive);
  }

}
