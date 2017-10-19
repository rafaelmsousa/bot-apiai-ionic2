import { Transferencias } from './../transferencias/transferencias';
import { MinhaConta } from './../list/list';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { LoadingController } from 'ionic-angular';
import { ChangeDetectorRef } from '@angular/core';

declare var ApiAIPlugin:any;


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  retornoServidor:any;
  isRecording = false;
  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public tts: TextToSpeech, public events: Events, public loadingCtrl: LoadingController, public changeDetectorRef: ChangeDetectorRef) {

    /*this.events.subscribe('openVoiceModal:buttonClicked', userEventData => { 
      this.sendVoice();
    });*/

    this.retornoServidor = 'Diga o que deseja. Por exemplo: "Quero visualizar meu extrato"';
    this.pages = [
      { title: 'menu.Home', component: HomePage },
      { title: 'menu.MinhaConta', component: MinhaConta },
      { title: 'menu.Transferencias', component: Transferencias }
    ];
        
  }

  ionViewDidLoad() {
    console.log('----> ionViewDidLoad ModalPage');
    
    this.tts.speak({
      text: 'Olá! Em que posso ajudar?',
      locale: 'pt-BR'
    }).then(() => {
      console.log("----> TTS Speak Ola Sucesso");
      this.sendVoice(); 
    })
    .catch((reason: any) => {
      console.log("----> Erro TTS Speak" + reason);
    });
    
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public sendVoice(){
    var self = this;
    try {     
      
      ApiAIPlugin.setListeningStartCallback(function () {
        console.log("----> APIAI Listening Iniciou");
        self.isRecording = true;
        self.retornoServidor = '';
        self.presentLoading("Ouvindo...");
      });
    
      ApiAIPlugin.setListeningFinishCallback(function () {
        console.log("----> APIAI Listening Parou");
        self.isRecording = false;
        self.changeDetectorRef.detectChanges();
      });
      
      ApiAIPlugin.requestVoice(
        {}, // empty for simple requests, some optional parameters can be here
        function (response) {
            // place your result processing here
            //alert(JSON.stringify(response));
            console.log('----> APIAI Retorno Successo');
            console.log(JSON.stringify(response));
            self.tts.speak({
              text: response.result.fulfillment.speech,
              locale: 'pt-BR'
            }).then(() => {
              console.log('----> TTS Speak Retorno Successo');
              //se tiver uma acao no retorno entao redireciona para a pagina
              let responseAction:string = response.result.action;
              if(responseAction.length != 0 && responseAction != "" && responseAction.indexOf("menu") != -1){
                self.openPage(responseAction);
              }
            })
            .catch((reason: any) => {
              console.log("----> Erro TTS Speak" + reason);
            });

            self.retornoServidor = JSON.stringify(response.result.fulfillment.speech);
            self.changeDetectorRef.detectChanges();

        },
        function (error) {
            // place your error processing here
            console.log("----> Erro APIAI: " + error)
            alert(error);
        });                
    } catch (e) {
        console.log("----> Erro APIAI: " + e)
        alert(e);
    } 

  }

  public presentLoading(texto) {
    let loader = this.loadingCtrl.create({
      content: texto,
      duration: 3000
    });
    loader.present();
  }

  openPage(pageTitle:string) {
    
    this.navCtrl.push(this.pages.find(page => page.title===pageTitle).component);
    //this.closeModal();
  }

}
