
import { Component, OnInit} from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { NotificationService } from '../../services/notification.service';


@Component({
    selector: 'side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
    public showNotificationButton: boolean = true;


    constructor(private electronService: ElectronService,
        private notificationService: NotificationService) { }

    ngOnInit(): void {
        console.log(this.electronService.getLocale());
        /*if (this.electronService.isElectron) {
            this.electronService.ipcRenderer.on('toggle-notifications', () => {
                this._ngZone.run(() => {
                    this.showNotificationButton = !this.showNotificationButton;
                });
            });
        }*/
    }

    notify() {
        console.log("test");
        //console.log(Notification.isSupported())
        console.log(Notification.requestPermission());
        Notification.requestPermission().then(() => {
            console.log("granted");
            var myNotification = new Notification("Bob: Hi / Are you free this afternoon?", { 'body': 'chat_Bob' });
        });
        this.electronService.testnotify();
        this.notificationService.notifyNotifier();
        new Notification("Bob: Hi / Are you free this afternoon?", { body: 'chat_Bob' });
        /*
        this.electronService.publishNotification();
        this.electronService.notify(
            'My notification',
            'Hello, there!'
          );
        */

        /*let notification = this.notificationService.notify('Miou!',
            `This is, miou!`, `http://placekitten.com/100/100`);
        notification.onclick = () => {
            // do something here
        };*/

        //app.setAppUserModelId("appid");
        /*
        let nt = new Notification({
            title: "test",
            body: "body"
        });
        nt.show();
        */
    }
}
