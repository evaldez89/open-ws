import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/interfaces/log';
import { LocalDataService } from 'src/app/service/local-data.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-log-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  historyRecords: Log[];
  historyLoaded = false;
  selectedUrl: string;

  constructor(private socialSharing: SocialSharing,
              private platform: Platform,
              private localData: LocalDataService) { }

  ngOnInit() {
    this.loadHistory();
  }

  async loadHistory() {
    this.selectedUrl = '';
    this.historyLoaded = false;
    this.historyRecords = [];
    let recs = (await this.localData.loadHistory());
    setTimeout(() => {
      this.historyRecords = recs;
      this.historyLoaded = true;
    }, 500);
  }

  async share(item: Log){
    let url = `${await this.localData.wsApiUrl}${item.phoneNumber}`;

    url = url.replace('whatsapp://', '')

    const options = {
      message: `Chat con Número: *${item.phoneNumber}*:\n\n`,
      subject: "Compartir Chat con Número",
      url
    };

    if(this.platform.is('capacitor') || this.platform.is('cordova')) {
      this.socialSharing.shareWithOptions(options);
    } else if (navigator['share']) {
      navigator['share'](options)
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('Can not share using this browser');
    }
  }

  async send(phoneNumber: string) {
    this.selectedUrl = `${await this.localData.wsApiUrl}${phoneNumber}`;
    await this.localData.openApp(this.selectedUrl);
  }

  deleteAll(){
    this.localData.remoteItem('history');
    // TODO: Let the user know the records will be deleted
    this.historyRecords = [];
  }
}
