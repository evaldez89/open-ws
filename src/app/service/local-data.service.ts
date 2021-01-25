import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { Log } from '../interfaces/log';

const { App } = Plugins;

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor() {}

  get wsApiUrl(): Promise<string> {
    return (async () => await this.getValue("wsApiUrl"))().then(resp => {
      if (resp.value) {
        return resp.value as string;
      } else {
        this.setValue('wsApiUrl', environment.wsApiUrl)
        return environment.wsApiUrl;
      }
    });
  }

  get historyLimit(): Promise<number> {
    return (async () => await this.getValue("historyLimit"))().then(resp => {
      if (resp.value) {
        return resp.value as number;
      } else {
        this.setValue('historyLimit', environment.historyLimit)
        return environment.historyLimit;
      }
    });
  }

  async setValue(key: string, value: any){
    await Storage.set({key, value});
  }

  async getValue(key: string): Promise<{ value: any }> {
    return (await Storage.get({ key }));
  }

  async getCastValue<T>(key: string){
    return (await this.getValue(key)).value as T;
  }

  async loadHistory(): Promise<Log[]> {
    const ret = await this.getValue('history');
    return JSON.parse(ret.value);
  }

  async saveToHistory(newNumber: string) {
    let newLog: Log = {phoneNumber: newNumber, date: new Date().toISOString()};
    let currentHistory = await this.loadHistory() || [];

    let existingNumberIndex = currentHistory.findIndex( log => log.phoneNumber == newNumber );

    if (existingNumberIndex > -1) {
      currentHistory.splice(existingNumberIndex, 1);
    }

    currentHistory.unshift(newLog);
    currentHistory = currentHistory.slice(0, await this.historyLimit);
    await this.setValue('history', JSON.stringify(currentHistory) );
  }

  async remoteItem(key: string){
    await this.setValue(key, null);
  }

  async openApp(url: string) {
    let message = `able to open ${url}`;
    // const canOpen = await App.canOpenUrl({ url });

    // if (canOpen.value) { }
    await App.openUrl({ url })
      .then(() => console.log(message))
      .catch(_ => console.log("un"+message));
  }
}
