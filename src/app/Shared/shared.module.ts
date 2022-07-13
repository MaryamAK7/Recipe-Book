import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    LoadingComponent,
    AlertComponent,
    DropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    LoadingComponent,
    AlertComponent,
    DropdownDirective,
    CommonModule,
  ],
})
export class SharedModule {}
