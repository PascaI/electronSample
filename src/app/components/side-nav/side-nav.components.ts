
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

    }

    notify() {
        console.log("test");
        //console.log(Notification.isSupported())
        console.log(Notification.requestPermission());
        var notification = this.notificationService.notify("Electron", "This is a notification")
        
        notification.onclick = () => {
            console.log("Notification clicked");
        };
        
        
    }
}
