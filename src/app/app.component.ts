import { Pagamentos } from './../pages/pagamentos/pagamentos';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MinhaConta } from '../pages/list/list';
import { LoginPage } from './../pages/login/login';
import { Transferencias } from './../pages/transferencias/transferencias';

declare var ApiAIPlugin:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, icon: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage},
      { title: 'Minha Conta', icon: 'cash', component: MinhaConta },
      { title: 'Pagamentos', icon: 'barcode', component: Pagamentos},
      { title: 'Transferências', icon: 'redo', component: Transferencias }, 
      { title: 'Sair', icon: 'log-out', component: LoginPage }
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      ApiAIPlugin.init(
        {
            //AccessToken CaixaBot API.AI
            clientAccessToken: "f0f5ee7f67364f5ca2c63324bc760590", // insert your client access token key here
            lang: "pt-BR" // set lang tag from list of supported languages
        },
        function(result) { 
          console.log("----> ApiAIPlugin iniciado com sucesso!")
        },
        function(error) { 
          alert("----> Erro APIAIPlugin Init: "+ error)
         }
      );

      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
