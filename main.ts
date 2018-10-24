import { app, autoUpdater, BrowserWindow, dialog, screen, Tray, Menu, TouchBar, nativeImage,  } from 'electron';
import * as path from 'path';
import * as url from 'url';
const { TouchBarLabel, TouchBarButton, TouchBarSpacer, TouchBarSegmentedControl, TouchBarSlider } = TouchBar;
//import * as notifier from 'node-notifier';
const rootDir = path.join(__dirname, '/');

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  app.setAppUserModelId("com.example.app")

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1500,
    height: 800,
    minWidth: 100,
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    createWindow();
    createTouchBar();
    createDockMenu();
    createTrayMenu();
  });
  /*let tray = null
app.on('ready', () => {
  createWindow
  
  tray = new BrowserWindow({
    width: 100,
    height: 250,
  });
  tray = new Tray('C:\\Users\\pascal.keusch\\Pictures\\electron.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})
 */

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    };

    dialog.showMessageBox(dialogOpts, (response) => {
      if (response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });

  autoUpdater.on('error', message => {
    console.error('There was a problem updating the application')
    console.error(message);
  });

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 216000000);

} catch (e) {
  // Catch Error
  // throw e;
  console.log(e);
}

function checkForUpdates() {
  const server = 'https://your-deployment-url.com';
  const feed = `${server}/update/${process.platform}/${app.getVersion()}`;

  //autoUpdater.setFeedURL(feed)
}

function addTouchBar() {

}

function createTouchBar() {
  let spinning = false;

  // Reel labels
  const reel1 = new TouchBarLabel({ label: '' });
  const reel2 = new TouchBarLabel({ label: '' });
  const reel3 = new TouchBarLabel({ label: '' });

  // Spin result label
  const result = new TouchBarLabel({});

  // Spin button
  const spin = new TouchBarButton({
    label: '🎰 Spin',
    backgroundColor: '#7851A9',
    click: () => {
      // Ignore clicks if already spinning
      if (spinning) {
        return;
      }

      spinning = true;
      result.label = '';

      let timeout = 10;
      const spinLength = 4 * 1000; // 4 seconds
      const startTime = Date.now();

      const spinReels = () => {
        updateReels();

        if ((Date.now() - startTime) >= spinLength) {
          finishSpin();
        } else {
          // Slow down a bit on each spin
          timeout *= 1.1;
          setTimeout(spinReels, timeout);
        }
      };

      spinReels();
    }
  });

  const getRandomValue = () => {
    const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀'];
    return values[Math.floor(Math.random() * values.length)];
  };

  const updateReels = () => {
    reel1.label = getRandomValue();
    reel2.label = getRandomValue();
    reel3.label = getRandomValue();
  };

  const finishSpin = () => {
    const uniqueValues = new Set([reel1.label, reel2.label, reel3.label]).size;
    if (uniqueValues === 1) {
      // All 3 values are the same
      result.label = '💰 Jackpot!';
      result.textColor = '#FDFF00';
    } else if (uniqueValues === 2) {
      // 2 values are the same
      result.label = '😍 Winner!';
      result.textColor = '#FDFF00';
    } else {
      // No values are the same
      result.label = '🙁 Spin Again';
      result.textColor = null;
    }
    spinning = false;
  };

  const slider = new TouchBarSlider({
    value: 10,
    minValue: 0,
    maxValue: 100
  });


  const touchBar = new TouchBar({
    items: [
      spin,
      new TouchBarSpacer({ size: 'large' }),
      reel1,
      new TouchBarSpacer({ size: 'small' }),
      reel2,
      new TouchBarSpacer({ size: 'small' }),
      reel3,
      new TouchBarSpacer({ size: 'large' }),
      result,
      new TouchBarSpacer({ size: 'small'}),
      slider
    ]
  });

  win.setTouchBar(touchBar);
}


function createDockMenu() {
  const dockMenu = Menu.buildFromTemplate([
    {
      label: 'New Window',
      click() {
        console.log('New Window');
      }
    }, {
      label: 'New Window with Settings',
      submenu: [
        { label: 'Basic' },
        { label: 'Pro' }
      ]
    },
    { label: 'New Command...' }
  ]);

  app.dock.setMenu(dockMenu);
}

function createTrayMenu() {
  console.log('display tray: ');
  let tray = null;
  var iconPath = path.join(__dirname, 'icon.png');
  let trayIcon = nativeImage.createFromPath(iconPath);
  trayIcon = trayIcon.resize({ width: 32, height: 32 });
  tray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ]);
  //tray.loadURL
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
}

