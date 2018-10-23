import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, Menu } from 'electron';
const electron = require('electron')
import * as childProcess from 'child_process';
import * as fs from 'fs';
const notifier = require('node-notifier');
let app = electron.app ? electron.app : electron.remote.app

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  //notification: typeof Notification;

  menu: typeof Menu;
  template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
        },
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    }
  ];

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      //this.notification = window.require('electron').remote.Notification;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.menu = window.require('electron').remote.Menu;

      const menu = this.menu.buildFromTemplate(this.template);
      this.menu.setApplicationMenu(menu);

      this.setDockMenu()

      //console.log(app.getLocale());
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  getLocale() {
    return app.getLocale();
  }

  setDockMenu() {
    if (process.platform === 'darwin') {

      const dockMenu = Menu.buildFromTemplate([
        {
          label: 'New Window',
          click() { console.log('New Window') }
        }, {
          label: 'New Window with Settings',
          submenu: [
            { label: 'Basic' },
            { label: 'Pro' }
          ]
        },
        { label: 'New Command...' }
      ])

      app.dock.setMenu(dockMenu)
    }


  }

  testnotify() {
    const notifier = require('node-notifier');
    notifier.notify('Message');
    notifier.notify({
      title: "fsfdsf",
      //message: "sdfdfsaf"
    });
  }

  notify(title: string, message: string) {
    notifier.notify({
      title: title,
      message: message
    });
  }

  publishNotification() {
    let options = {
      body: 'Notification Body'
    };
    new Notification('Notification Title', options);
  }
}



