import { Injectable } from '@angular/core';
import { PushNotification, PushNotificationActionPerformed, PushNotifications, PushNotificationToken } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FcmService {


  fcm_token: string;
  // fcm_task: any;

  constructor(
    public platform: Platform,
  ) {
    //alert();
    if (this.platform.is('android')) {
      PushNotifications.register();      
    }
    else {
      PushNotifications.checkPermissions().then((permissions) => {
        if (permissions.receive === 'prompt') {
          PushNotifications.requestPermissions();
        }
      
        if (permissions.receive !== 'granted') {
          console.log('User denied permissions!');
        }
        else { 
          PushNotifications.register();
        }
      });

    }
    console.log("if notification constructer is hitting", );

    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log('My token: ' + JSON.stringify(token));
        this.fcm_token = JSON.stringify(token);
        console.log("my token ", this.fcm_token);
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
      }
    );



   }


   
}
