import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/interfaces/log';
import { LocalDataService } from 'src/app/service/local-data.service';

@Component({
  selector: 'app-log-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  historyRecords: Log[];

  constructor(private localData: LocalDataService) { }

  ngOnInit() {
    this.loadHistory();
  }

  async loadHistory(){
    this.historyRecords = (await this.localData.loadHistory()) || [];
  }

  deleteAll(){
    console.log(this.historyRecords);
    this.localData.remoteItem('history');
    // TODO: Let the user know the records will be deleted
    this.loadHistory();
    console.log(this.historyRecords);
  }

}
