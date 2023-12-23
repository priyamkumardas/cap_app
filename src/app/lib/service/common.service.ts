import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ActionSheetController,ToastController,ModalController,AlertController  } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Network } from '@capacitor/network';
import { Storage } from '@ionic/storage-angular';

// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { FcmService } from '../service/fcm.service';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public onlineOffline: boolean = navigator.onLine;
  loading;
  access_token;
  loading_boolean=false;
  isLoading: any;
  bar_loader: boolean;
  loader: boolean;
  alert: HTMLIonAlertElement;
  uid: string;
  user_id: string;


  constructor(
    private router: Router,
    // private network: Network,
    private http: HttpClient,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private storage: Storage,
    
    private alertctrl: AlertController,
    // private localNotifications: LocalNotifications,
    private notification: FcmService,
    // private auth: AuthService

  ) { 
    // alert("test");

    this.storage.get('token').then((response) => {
      console.log('token',response);
      this.access_token=response;
      console.log('this.access_token',this.access_token);
      
    });

    

    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
    });

  this.storage.get('pet_details').then((response) => {
    // console.log('common service line  52 cart_items',response);
    // this.cart_item=response;
    console.log('Pet tasks saved', response);



    // ----------------------------getting current time in int--------------
    
    let current_date_date = new Date();
    let current_year = parseInt(current_date_date.getFullYear().toString());
    let current_month = parseInt(current_date_date.getMonth().toString());
    let current_day = parseInt(current_date_date.getDate().toString()); 
    let current_date = ((current_year - 2000)*365) + ((current_month + 1) * 30) + current_day;
    console.log(current_date);


    let pet_tasks = response.pet_tasks;
    
    

  });


console.log("fcm token check in constructor", this.notification.fcm_token);

// this.get_user_details_from_local();
if(this.uid == undefined || this.user_id == undefined) {
  this.get_user_details_from_local();
}

}

async get_user_details_from_local() {
  this.storage.get('user_straydopt_ionic').then((response) => {
    if (response) {
      console.log(response);
      //this.router.navigate(['/home']);
      this.uid = response.uid;
      this.user_id = response.id;
      if(response == undefined || response.id == undefined) {
        this.get_user_details_from_local();
      }
    }
  });
}

checkNetworkDisconnect() {
  //console.log('navigator.onLine',navigator.onLine)
  if (!navigator.onLine) {
    this.alert_box("Connection","Please check your internet connection!!");
    this.dissmiss_loading();
    return true;
  } else {
    return false;
  }

}

check_access_token(){
  if(this.access_token == undefined || this.access_token == null){
    this.router.navigate(['/login']);
    this.alert_box("Security","Your Access token was not found!!");
    this.dissmiss_loading();
    return true;
  }else{
    return false;
  }
}

gen_user_access_token() {
  if (this.access_token ==undefined || this.uid == undefined || this.notification.fcm_token == undefined || this.user_id == undefined) {
    this.get_user_details_from_local();
  }

  let token = this.access_token + "-*-" + this.uid + "-*-" + this.notification.fcm_token + "-*-" + this.user_id
  console.log("user access token raw", token);
  let user_access_token = btoa(token);
  console.log("user access token", user_access_token);
  return user_access_token;
}



http_Api_login(endpoint,data: any): Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'content':"application/json",
      'content-type':"application/x-www-form-urlencoded"
    })
  };    
if (!this.checkNetworkDisconnect())
  return this.http.post(environment.apiEndpoint + endpoint, data,httpOptions);
}

http_Api_Post(endpoint,data: any): Observable<any>{
  // console.log("fcm token check", this.notification.fcm_token);
  // // let user_access_token = this.gen_user_access_token();
  // // let token = this.access_token + "-" + this.uid + "-" + this.notification.fcm_token + "-" + this.user_id
  // let token = this.access_token + "-*-" + this.uid + "-*-" + this.notification.fcm_token + "-*-" + this.user_id
  // console.log("user access token raw", token);
  // let user_access_token = btoa(token);
  let user_access_token = this.gen_user_access_token();
  console.log("user access token encoded", user_access_token);

  // let user_access_token = this.gen_user_access_token();
  const httpOptions = {
    headers: new HttpHeaders({
      'content':"application/json",
      'content-type':"application/x-www-form-urlencoded",
      'Authorization': "Bearer "+this.access_token,
      // 'fcm-token': this.notification.fcm_token,
      'user-access-token': user_access_token,
    })
  };    
if (!this.checkNetworkDisconnect() && !this.check_access_token()){

  return this.http.post(environment.apiEndpoint + endpoint, data,httpOptions);
}
  
}

http_Api_Image_Post(endpoint,data: any): Observable<any>{
  let token = this.access_token + "-*-" + this.uid + "-*-" + this.notification.fcm_token + "-*-" + this.user_id
  console.log("user access token raw", token);
  let user_access_token = btoa(token);
  console.log("user access token encoded", user_access_token);
  const httpOptions = {
    headers: new HttpHeaders({
      'content':"application/json",
      
      'Authorization': "Bearer "+this.access_token,
      'user-access-token': user_access_token,

    })
  };    
if ( !this.check_access_token()){

  return this.http.post(environment.apiEndpoint + endpoint, data,httpOptions);
}
  
}

http_Api_Get(endpoint): Observable<any>{
  // console.log("fcm token check", this.notification.fcm_token);
  // // let token = this.access_token + "-" + this.uid + "-" + this.notification.fcm_token + "-" + this.user_id
  // let token = this.access_token + "-*-" + this.uid + "-*-" + this.notification.fcm_token + "-*-" + this.user_id

  // console.log("user access token raw", token);
  // let user_access_token = btoa(token);
  let user_access_token = this.gen_user_access_token();
  console.log("user access token encoded", user_access_token);
  // let user_access_token = this.gen_user_access_token();
  const httpOptions = {
    headers: new HttpHeaders({      
      'Authorization':"Bearer "+ this.access_token,
      // 'fcm-token': this.notification.fcm_token,
      'user-access-token': user_access_token, 
      // 'User-Access-Token': this.access_token,
    })
  };    
    // console.log("token",this.check_access_token());
    // console.log("network",this.checkNetworkDisconnect());
  if (!this.checkNetworkDisconnect() && !this.check_access_token()) {

    return this.http.get(environment.apiEndpoint + endpoint,httpOptions);
  }
  }



  async presentToast(text, colorCode?) {
    colorCode = colorCode || '1';
    var cssClass = 'toaster';
    if (colorCode === '0') {
      cssClass = 'toaster-red'
    }
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      // 'color':'medium',
      cssClass: cssClass,
      //color:'light'
    });
    toast.present();
  }


  async presentLoading() {
    const that=this;
    this.isLoading = true;
    return await this.loadingController.create({
      mode: 'ios'

    }).then(a => {
      a.present().then(() => {
        console.log('loading presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('loading abort presenting'));
        }
      });
    });

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }



  async dissmiss_loading(){
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
    }
    return null;
  }

  present_skeleton_and_bar_loading(){
    this.loader=true;
    this.bar_loader=true;
  }

  dismiss_skeleton_and_bar_loading(){
    this.loader=false;
    this.bar_loader=false;
  }

  async alert_box(header,text){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-alert',
      header: header,
      message: text,
      buttons: [{text: 'Ok' }]
    });
    

    await alert.present();
  }

  jsonToURI(json){
     //return encodeURIComponent(JSON.stringify(json)); 
    var formBody = [];
    for (var property in json) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(json[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
  }

  getUrlVars(url) {
    var hash;
    var myJson = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        myJson[hash[0]] = hash[1];
        // If you want to get in native datatypes
        // myJson[hash[0]] = JSON.parse(hash[1]); 
    }
    return myJson;
  }



  async present_alert(alertTitle, alertText, backdropDismiss){
    this.alert =await this.alertctrl.create({
      
      header: alertTitle,
      message: alertText,
      backdropDismiss: backdropDismiss,
    });
    await this.alert.present();
  }

  close_alert() {
    if (this.alert) {
      this.alert.dismiss();
    }
  }

  image_load_error(event, img_type){
    console.log(event.target.src)
    if (img_type === 'human') { 
      event.target.src="../../assets/profile/avatar.svg"
    }
    if (img_type === 'animal') { 
      event.target.src="../../assets/home/Playful_cat.svg"
    }
    if (img_type === 'placeholder-human') { 
      event.target.src="../../assets/profile/human-placeholder.jpg"
    }
  }

  set_to_storage(storage_key: any,data: any){
    //localStorage.setItem(storage_key, JSON.stringify(data));
    this.storage.set(storage_key, data);
  }

  async get_from_storage(storage_key:any){
    //return JSON.parse( localStorage.getItem(storage_key));
    return await this.storage.get(storage_key).then(val=>val)
    
  }

}
