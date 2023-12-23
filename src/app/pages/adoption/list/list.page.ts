import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../lib/service/common.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  // search: boolean = false;
// selected_filter_animal_category_boolean: any;
// filter: any;


list_of_adoption=[];
list_of_adoption_firebase=[];

adoption_name;
adoption_details;
adoption_contact_link;
adoption_post_id_no;
adoption_post_date;
user_id_firebase;

list_fetched_from_firebase=[];
loader=true;
bar_loader=true;
progress = 0;
weather={};
temp: any;
weather_icon: any;
weather_data: any;
weather_text_condition: any;
humidity: any;
animal_doption_list=[];
recent_animal_adoption_list: any;

search=false;
filter=false;
animal_master_category: any;
animal_doption_list_server: any;
selected_filter_animal_category_boolean=false;
selected_filter_animal_category: any;
noAdoptionFound: boolean = false;
animal_doption_count: any;

slideOpts={};
showing_ascending: boolean = true;
animal_doption_list_server_main: any;

  constructor(
    public commonservice: CommonService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.get_adoption();
  }


  async get_adoption(){
    let lastId = 0;
const that=this;
let endpoint = "adoption_list/" + lastId;
//let category_id=this.route.snapshot.params['category_id'];
let category_id=0;
this.commonservice.present_skeleton_and_bar_loading();
this.commonservice.http_Api_Get(endpoint).toPromise().then(      
  async res => {          
    //console.log('data api: ', res);
    if(res.status=='1'){
      // this.animal_doption_count = res.adoption_count;
      if (!res.data[0]) {
        this.noAdoptionFound = true;
      }
      this.animal_doption_list_server=res.data;
      this.animal_doption_list_server_main=res.data;
      res.data.forEach((rescuer,index) => {
        this.animal_doption_list.push(rescuer);
      })
      this.recent_animal_adoption_list=res.recent_adoption;
    }
    if (res.status == 0) {
      this.commonservice.presentToast("Something went wrong");
      this.router.navigate(["tabs/home"]);
    }
    //console.log(this.account_details);
    // this.commonservice.presentToast(res.message, res.status);
    this.commonservice.dismiss_skeleton_and_bar_loading();
    //this.loader=false;
  },
  error => {
    console.log("error::::" + error);
    this.commonservice.presentToast(error, '0');
    this.commonservice.dismiss_skeleton_and_bar_loading();
    //this.loader=false;
  });

}

}
