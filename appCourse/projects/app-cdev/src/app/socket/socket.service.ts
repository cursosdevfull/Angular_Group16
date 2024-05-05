import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as io from 'socket.io-client';

import env from '../../assets/env.json';
import { StorageApplication } from '../storage/application/storage.application';

export interface INotification {
  action: 'UPDATE' | 'CREATE' | 'DELETE';
  data: any;
}

@Injectable()
export class SocketService {
  private socket: io.Socket;

  constructor(private readonly storage: StorageApplication) {}

  connect() {
    const token = this.storage.get('accessToken');
    this.socket = io.connect(`${env.urlApi}`, { auth: { token } });
  }

  subscribe(roomToSubscribe: string) {
    this.socket.emit(roomToSubscribe);
  }

  getNotifications(notification: string) {
    const observable = new Observable((observer: Observer<INotification>) => {
      this.socket.on(notification, (data: INotification) => {
        observer.next(data);
      });
    });

    return observable;
  }
}
