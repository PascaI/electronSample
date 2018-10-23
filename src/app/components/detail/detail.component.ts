
import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { NotificationService } from '../../services/notification.service';
import { clipboard } from 'electron';
import { DialogService } from '../../services/dialog.service';

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    constructor(private electronService: ElectronService,
        private notificationService: NotificationService,
        private dialogService: DialogService) { }

    ngOnInit(): void {

    }

    clipboard() {
        clipboard.writeText('Example String')

    }

    dialog() {
        console.log(this.dialogService.openDialog());
    }

    save() {
        console.log(this.dialogService.saveDialog());
    }


}
