import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

   values: any[] = [0, 0, 0, 0];
   urls: string[] = ["https://api.thingspeak.com/channels/756771/fields/1/last", "https://api.thingspeak.com/channels/756771/fields/2/last", "https://api.thingspeak.com/channels/756771/fields/3/last", "https://api.thingspeak.com/channels/756771/fields/4/last"];


    // url1:string = "https://api.thingspeak.com/channels/756771/fields/1/last";
    // url2:string = "https://api.thingspeak.com/channels/756771/fields/2/last";
    // url3:string = "https://api.thingspeak.com/channels/756771/fields/3/last";


  rootPage: any = 'SplashScreenPage';
  isLoggedIn: boolean = false;

  constructor(app: App, public platform: Platform,private http: HttpClient, public statusBar: StatusBar, public splashScreen: SplashScreen, public afAuth: AngularFireAuth) {




    this.initializeApp();
    app.viewDidEnter.subscribe((e) => {
      this.isAuth();
    })
    try {
      const firebaseConfig = {
        apiKey: "AIzaSyCLRhF3Ffsun4v-AfArooB47Eeha7EyWTU",
        authDomain: "tccwave.firebaseapp.com",
        databaseURL: "https://tccwave.firebaseio.com",
        projectId: "tccwave",
        storageBucket: "tccwave.appspot.com",
        messagingSenderId: "47170140012",
        appId: "1:47170140012:web:a1f9377ff3223c1235a549"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }
    catch {

    }




    for(let i in this.urls){
      this.getData(this.urls[i]).then((resp) => {
        this.values[i] = resp;
        console.log(resp)
        console.log(this.values[i]);
        console.log("Refreshing Almoxarifado stats");
      }).catch((err) => {

      })
    }
  }


  refresh(){
    if(this.isLoggedIn == true){ 
      for(let i in this.urls){
        this.getData(this.urls[i]).then((resp) => {
          this.values[i] = Number(resp);
        }).catch((err) => {
  
        })
      }
      console.log("Refreshing Almoxarifado stats: ");
  }
}

  getData(url: string) {
    return this.http.get(url).toPromise();
  }


  isAuth() {
    this.afAuth.authState.subscribe(user => {
      try {
        if(user.email) {
          this.isLoggedIn = true;
        }
        else {
          this.isLoggedIn = false;
        }
      }
      catch {
        this.isLoggedIn = false;
      }
    })
  }



  login(){
      this.isLoggedIn = true;
  }

  logout(){
      this.afAuth.auth.signOut();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

    openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    }

    push(page: string){
      this.nav.setRoot(page);
    }

    pushList(classToList: string){
      this.nav.setRoot('ListPage',{ classToList: classToList });
    }
}
