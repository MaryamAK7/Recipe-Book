import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations:[
    trigger('alertBox',[
      state('in',style({
        transform : 'scale(1)'
      })),
      transition('void => *', [style({
        transform : 'scale(0.5)'
      }), animate(300)])
    ])
  ]
})
export class AlertComponent implements OnInit {

  @Input() message:string;
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
  onClose(){
    this.close.emit();
  }
}
