import {Injectable} from '@angular/core';
import * as notifier from 'node-notifier';
declare const Notification: any;

export interface INotification {
    onclick: () => void;
}

@Injectable()
export class NotificationService {

    public notify(title: string, body: string, icon: string = null): INotification {
        return <INotification>(new Notification(title, {
            body: body,
            icon: icon
        }));

    }

    notifyNotifier() {
        notifier.notify(
            {
              title: 'My awesome title',
              message: 'Hello from node, Mr. User!',
              sound: true, // Only Notification Center or Windows Toasters
              wait: true // Wait with callback, until user action is taken against notification
            },
            function(err, response) {
              console.log(err, response);
              // Response is response from notification
            }
          );
    }
}