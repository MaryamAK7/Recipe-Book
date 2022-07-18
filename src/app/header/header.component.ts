import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../Auth/authService.service';
import { DataStorageService } from '../Shared/DataStorageService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private sub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authservice: AuthService,
  ) {}

  ngOnInit(): void {
    this.sub = this.authservice.user
      .subscribe((user) => {
        this.isAuthenticated = !!user;
        console.log(user);
      });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onSaveData() {
    this.dataStorageService.saveData();
  }
  onFetchData() {
    this.dataStorageService.fetchData().subscribe();
  }
  onLogOut() {
    this.authservice.logout();
  }
}
