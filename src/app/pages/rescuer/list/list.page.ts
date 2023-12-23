import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {


  rescuer_list=[];
  no_location_permission;
  // user_location :Observable<any>;
  // firebase_data :Observable<any>;

  rescuer_displayName;
  rescuer_details;
  rescuer_phonenumber;
  rescuer_location
  merch_banner;
  recieved_merch_banner=false;
  bar_loader=true;
  animal_master_category: any;
  selected_filter_animal_category:any={};
  selected_filter_animal_category_boolean: any;
  lat: number;
  lng: number;
  rescuer_list_from_server: any;
  noRescueFound: boolean = false;

  slideOpts :any={};
  user_type: any;
  user_id: any;
  user: any;
  rescue_request_list: any;
  rescue_segment = 'rescues';
  rescueListContainer: any;
  fcm_task: any;
  noRescuerFound: boolean;

  constructor() { }

  ngOnInit() {
  }

}
