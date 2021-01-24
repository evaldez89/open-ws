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

  constructor(private socialSharing: SocialSharing,
              private platform: Platform,
              private localData: LocalDataService) { }

  ngOnInit() {
    this.loadHistory();
  }

  async loadHistory(){
    this.historyRecords = (await this.localData.loadHistory());
  }

  async share(item: Log){
    let url = `${await this.localData.wsApiUrl}${item.phoneNumber}`;

    url = url.replace('whatsapp://', '')

    const options = {
      message: `Chat con Número: *${item.phoneNumber}*\n`,
      subject: "Compartir Número de Teléfono",
      url
    };

    if(this.platform.is('capacitor') || this.platform.is('cordova')) {
      this.socialSharing.shareWithOptions(options);
      // this.socialSharing.shareWithOptions(options).then(resp => {console.log('success'); })
    } else if (navigator['share']) {
      navigator['share'](options)
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    }
  }

  deleteAll(){
    console.log(this.historyRecords);
    this.localData.remoteItem('history');
    // TODO: Let the user know the records will be deleted
    this.loadHistory();
    console.log(this.historyRecords);
  }

}
