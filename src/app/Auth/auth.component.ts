import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  
 
  @ViewChild('dynamic', {static:true, read: ViewContainerRef }) viewRef : ViewContainerRef;

  constructor() {}
 

  ngOnInit(): void {
  }

 
 


}
