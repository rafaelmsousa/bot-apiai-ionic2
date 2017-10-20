import { HomePage } from './../home/home';
import { Http, RequestOptions, Headers } from "@angular/http";
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  erroBackend:string;
  userName:string;
  senhaIbc:string;
  segmento:string="1";
  lembrarUsuario:boolean=true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private https: Http) {

    this.iniciarSeedIBC();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin(){
   
    let params = new URLSearchParams();
    params.set('nomeUsuario', this.userName);
    params.set('segmento', this.segmento);
    params.set('userAgent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1');
    let requestBody = params.toString();
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
    });

    //console.log("----> HTTPS Post: 3 - Validar Usuario: requestBody "+JSON.stringify(requestBody));
    //console.log("----> HTTPS Post: 3 - Validar Usuario: headers "+JSON.stringify(this.headers));
    
    //3 - Validar Usuario
    //https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/login/authUserNameTp?nocache=1489668722708
    this.https.post('https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/login/authUserNameTp?nocache=1489668722708', requestBody, {headers: headers, withCredentials: true }).subscribe(rsp3 =>
    {
      console.log("----> HTTPS Post: 3 - Validar Usuario: status "+rsp3.status);
      //console.log("----> HTTPS Post: 3 - Validar Usuario: data contem " + rsp3.text("iso-8859").split(/\r\n|\r|\n/).length+" linhas");
      console.log("----> HTTPS Post: 3 - Validar Usuario: data "+rsp3.text("iso-8859")); // data received by server
      //console.log("----> HTTPS Post: 3 - Validar Usuario: headers "+rsp3.headers);

      let params = new URLSearchParams();
      params.set('password', this.senhaIbc);
      params.set('userAgent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1');
      let requestBody = params.toString();
      
      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      //console.log("----> HTTPS Post: 3 - Validar Usuario: requestBody "+JSON.stringify(requestBody));
      //console.log("----> HTTPS Post: 3 - Validar Usuario: headers "+JSON.stringify(this.headers));

      //4 - Valida Senha
      //https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/login/authPasswordTp?nocache=1489668888143
      this.https.post('https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/login/authPasswordTp?nocache=1489668888143', requestBody, {headers: headers, withCredentials: true }).subscribe(rsp4 => 
      {
        console.log("----> HTTPS Post: 4 - Valida Senha: status "+rsp4.status);
        //console.log("----> HTTPS Post: 4 - Valida Senha: data contem " + rsp4.text("iso-8859").split(/\r\n|\r|\n/).length+" linhas");
        console.log("----> HTTPS Post: 4 - Valida Senha: data "+rsp4.text("iso-8859")); // data received by server
        //console.log("----> HTTPS Post: 4 - Valida Senha: headers "+rsp4.headers);

        //if(rsp4.text("iso-8859").toString().indexOf("Erro") != -1){
        if(rsp4.status != 200){
          alert("Usuário ou senha incorretos");
        }else{
          //redireciona para a tela inicial
          this.navCtrl.setRoot(HomePage);
        }

      },
      error => {
        console.log("----> ERRO HTTPS Post: 4 - Valida Senha: status "+error.status);
        console.log("----> ERRO HTTPS Post: 4 - Valida Senha: error "+error.error); // error message as string
        console.log("----> ERRO HTTPS Post: 4 - Valida Senha: headers "+error.headers);
        alert("Erro ao validar senha");
      });

    },
    error => {
  
      console.log("----> ERRO HTTPS Get: 3 - Validar Usuario: status "+error.status);
      console.log("----> ERRO HTTPS Get: 3 - Validar Usuario: error "+error.error); // error message as string
      console.log("----> ERRO HTTPS Get: 3 - Validar Usuario: headers "+error.headers);
      alert("Erro ao validar usuário");
  
    });
  }

  pularLogin(){
    this.navCtrl.setRoot(HomePage);
  }

  iniciarSeedIBC(){
    
      let headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      });
  
      let requestOptions = new RequestOptions({headers: headers, withCredentials: true});
  
      //1 - Recebe Seed
      //https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/tpSeed?deviceKey=YAoUUggz8KebJxOyHksSYPP0y9eBLUzFcPcb%2BbVf%2Bd24LP2zicSXUsKaWEdVW1Nxc1CQyABZX2saiVu8Xrb4v3YBSc6L6t11Tp04IgnSqsRPX6f2v%2Fvcs9rveG8cWlNjrQpwilPnPO3Vuj1wq9H7KkthuLCmu4f5%2FZOCvmy%2BCqqmmO4qzocuInJwP0eg7tIgb82QZS3yTy26tgkir%2BP%2F1PTwwyM5M7oV0c5KA9EO5uY3Hm6Au%2FpjJiIg%2FULeHGovLRHV68ZwGmDAuFyUshyuannhAOB2seY19URAeEZzYxZ36rrdVR0wBDXOmM0P5USjjjq6T4fi0yhud%2BiS%2BGn1O%2BQ4IlKv5Q%3D%3D
      this.https.post('https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/tpSeed?deviceKey=YAoUUggz8KebJxOyHksSYPP0y9eBLUzFcPcb%2BbVf%2Bd24LP2zicSXUsKaWEdVW1Nxc1CQyABZX2saiVu8Xrb4v3YBSc6L6t11Tp04IgnSqsRPX6f2v%2Fvcs9rveG8cWlNjrQpwilPnPO3Vuj1wq9H7KkthuLCmu4f5%2FZOCvmy%2BCqqmmO4qzocuInJwP0eg7tIgb82QZS3yTy26tgkir%2BP%2F1PTwwyM5M7oV0c5KA9EO5uY3Hm6Au%2FpjJiIg%2FULeHGovLRHV68ZwGmDAuFyUshyuannhAOB2seY19URAeEZzYxZ36rrdVR0wBDXOmM0P5USjjjq6T4fi0yhud%2BiS%2BGn1O%2BQ4IlKv5Q%3D%3D', {}, requestOptions).subscribe(response => {
        console.log("----> HTTPS Post: 1 - Recebe Seed: status"+response.status);
        //console.log("----> HTTPS Post: 1 - Recebe Seed: data contem "+response.text("iso-8859").split(/\r\n|\r|\n/).length+" linhas");
        //console.log("----> HTTPS Post: 1 - Recebe Seed: data"+response.text("iso-8859")); // data received by server
        //console.log("----> HTTPS Post: 1 - Recebe Seed: headers"+response.headers);
  
        //2 - Envia Chave
        //https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/loginTp?nocache=1489679149924&context=sinbc
        this.https.get('https://tgy64w74i567hklqjb-internetbanking.caixa.gov.br/sinbc/nb/loginTp?nocache=1489679149924&context=sinbc', requestOptions).subscribe(rsp2 => {
          console.log("----> HTTPS Get: 2 - Envia Chave: status "+rsp2.status);
          //console.log("----> HTTPS Get: 2 - Envia Chave: data contem "+rsp2.text("iso-8859").split(/\r\n|\r|\n/).length+" linhas");
          //console.log("----> HTTPS Get: 2 - Envia Chave: data "+rsp2.text("iso-8859")); // data received by server
          //console.log("----> HTTPS Get: 2 - Envia Chave: headers "+response.headers);
        },
        error => {
          console.log("----> ERRO HTTPS Get: 2 - Envia Chave: status "+error.status);
          alert("Erro ao obter seed");
  
        });
      },
      error => {
        console.log("----> ERRO HTTPS Post: 1 - Recebe Seed: status "+error.status);
        alert("Erro ao obter seed");
      });
    }

}
