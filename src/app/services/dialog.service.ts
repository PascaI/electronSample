
import { Injectable } from '@angular/core';
const electron = require('electron').remote
const dialog = electron.dialog


@Injectable()
export class DialogService {


    openDialog() {
        return dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] });
    }

    saveDialog() {
        return dialog.showSaveDialog({
            title: "Save file..."
        })
    }
}