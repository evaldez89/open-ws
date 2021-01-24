import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoryComponent } from 'src/app/components/history/history.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  @ViewChild(HistoryComponent) historyComponent: HistoryComponent;

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.historyComponent.loadHistory();
  }

}
