import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { LoadingController } from 'ionic-angular';

declare var ApiAIPlugin:any;


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  retornoServidor:any;
  isRecording = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, private tts: TextToSpeech, public events: Events, public loadingCtrl: LoadingController) {

    /*this.events.subscribe('openVoiceModal:buttonClicked', userEventData => { 
      this.sendVoice();
    });*/
    this.tts.speak({
      text: 'Olá! Diga o que deseja após o sinal.',
      locale: 'pt-BR'
    });
    this.sendVoice();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  sendVoice(){

    try {     
      ApiAIPlugin.setListeningStartCallback(function () {
        console.log("listening started");
        this.isRecording = true;
        this.presentLoading("Ouvindo...");
      });
    
      ApiAIPlugin.setListeningFinishCallback(function () {
        console.log("listening stopped");
        this.isRecording = false;
      });

      ApiAIPlugin.requestVoice(
        {}, // empty for simple requests, some optional parameters can be here
        function (response) {
            // place your result processing here
            alert(JSON.stringify(response));
            this.tts.speak({
              text: JSON.stringify(response.result.fulfillment.speech),
              locale: 'pt-BR'
            }).then(() => console.log('Success'))
            .catch((reason: any) => console.log(reason));

            this.retornoServidor = JSON.stringify(response.result.fulfillment.speech);
        },
        function (error) {
            // place your error processing here
            alert(error);
        });                
    } catch (e) {
        alert(e);
    } 

  }

  presentLoading(texto) {
    let loader = this.loadingCtrl.create({
      content: texto,
      duration: 3000
    });
    loader.present();
  }

}
