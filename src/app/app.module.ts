import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MinhaConta } from '../pages/list/list';
import { Transferencias } from './../pages/transferencias/transferencias';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MinhaConta,
    Transferencias
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MinhaConta,
    Transferencias
  ],
  providers: [
    TextToSpeech, 
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
