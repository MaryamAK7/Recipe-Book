import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../Shared/DataStorageService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  collapsed = true;
 
  constructor(private dataStorageService : DataStorageService) {}

  ngOnInit(): void {}
  
  onSaveData(){
    this.dataStorageService.saveData();
  }
  onFetchData(){
    this.dataStorageService.fetchData().subscribe();
  }
}
