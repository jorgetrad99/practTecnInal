# Wireless Technology Practices

# Project Description

This is a set of practical projects on the subject of Wireless Technologies. Here you can find all the practices carried out in the eighth semester of the Information Technology career at the Technological Institute of Conkal in a single project.
The different projects are focused on Android applications capable of controlling different Arduino modules.
For the development of each project, Ionic was used together with Capacitor and React.js to create easily adaptable hybrid applications for IOS, Android and Web operating systems. However, when it is necessary to work with native features of mobile devices, the web version will not be able to work properly.
Over time, this repository will be updated and new practices on the subject will be implemented.

# Table of Contents

- [Used Tools](#used-tools)
- [Getting Started](#getting-started)
- [Projects](#projects)
  - [Project 1 Android to Arduino Bluetooth Communication](#project-1-android-to-arduino-bluetooth-communication)
    - [Procedure Project 1](#procedure-project-1)
    - [App Preview Project 1](#app-preview-project-1)

# Used tools

![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=Capacitor&logoColor=white)

- HTML. It is a language that helps define the structure of a web page and determine the elements that will be kept in it.
- CSS. The language to define some specific styles of the web page.
- JavaScript. It is a programming language used to give interactivity to the web page.
- npm. It is a tool that helps to manage the packages or libraries required in our projects.
- React.js. It is a Javascript library that helps in the creation of user interfaces.
- Ionic. It is a development framework that helps create user interfaces for hybrid mobile applications with a wide range of native components for IOS, Android and Electron.
- Capacitor. It is a framework that allows working with the native functions of mobile devices.

# Getting Started

- [Download the installer](https://nodejs.org/) for Node LTS.
- Install the ionic CLI globally on your terminal: `npm install -g ionic`
- Clone this repository: `git clone https://github.com/jorgetrad99/practTecnInal.git`.
- Run `npm install` from the project root.
- Run `npm serve` in a terminal from the project root.

# Projects

## Project 1 Android to Arduino Bluetooth Communication

The purpose of this project is to connect a bluetooth module HC-06 with a mobile device with Android operating system. This is achieved through an Arduino, which fulfills the function of reading if the Android device sends a character. If the character sent is A, B, C or D, the Arduino should turn on or off one of the 4 LED's placed in the circuit.

### Procedure Project 1

In the src/pages/Tab2.tsx file:

1. Include the Ionic buttons and components needed to control te HC-06 module. Example:

```jsx
<IonGrid>
  <IonRow>
    <IonCol>
      <IonButton shape='round' size='large'>
        A
      </IonButton>
    </IonCol>
    <IonCol>
      <IonButton shape='round' size='large'>
        B
      </IonButton>
    </IonCol>
    <IonCol>
      <IonButton shape='round' size='large'>
        C
      </IonButton>
    </IonCol>
    <IonCol>
      <IonButton shape='round' size='large'>
        D
      </IonButton>
    </IonCol>
  </IonRow>
</IonGrid>
```

Remember to import this components:

```js
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
```

2. Install the library that allows bluetooth serial connection

   `npm install @awesome-cordova-plugins/bluetooth-serial`

3. Use the library

   - Import the library in the page

   ```js
   import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial';
   ```

   - Instance the library in the project

   ```js
   const bluetoothSerial = BluetoothSerial;
   ```

4. Define all the functions and methods needed to manage the bluetooth connection:

   1. connectBluetooth: Evaluate if the bluetooth of the device is turned on.

   ```js
   const connectBluetooth = () => {
     bluetoothSerial.isEnabled().then(
       () => {
         setMessage('On');
       },
       () => {
         setMessage('Not on');
       }
     );
   };
   ```

   2. listPairedDevices: Search for already paired devices available to establish connection. Device information is represented through a JSON format and stored in a state accessible by the application.

   ```js
   const listPairedDevices = () => {
     bluetoothSerial.list().then(
       (response) => {
         if (response.length > 0) {
           setPairedDevices(response);
           if (pairedDevicesToggle) {
             setPairedDevices([]);
           }
           setPairedDevicesToggle(!pairedDevicesToggle);
         }
       },
       (error) => {
         setMessage(error);
       }
     );
   };
   ```

   3. connectDevice: Connect Android device with HC-06 module.

   ```jsx
   const connectDevice = (address: any) => {
     bluetoothSerial.connect(address).subscribe(
       () => {
         deviceConnected();
         setIsConnected(true);
       },
       (error) => {
         setMessage(error);
       }
     );
   };
   ```

   4. deviceConnected: Evaluate if the device is properly connected.

   ```jsx
   const deviceConnected = () => {
     bluetoothSerial.subscribe('/n').subscribe(
       (success) => {
         setMessage('The device has been succesfully connected: ' + success);
       },
       (error) => {
         setMessage(error);
       }
     );
   };
   ```

   5. sendData: It sends a data to the HC-06 module.

   ```js
   const sendData = (data: String) => {
     bluetoothSerial.write(data).then(
       () => {
         if (dataSent.length === 0) {
           setDataSent(data);
         }
         setTimeout(() => {
           setDataSent('');
         }, 500);
       },
       (error) => {
         setMessage(error);
       }
     );
   };
   ```

   6. The following code constantly listens if the device is connected or not. If yes, the state is saved as true in a variable to later make decisions to have a dynamic UI.

   ```js
   bluetoothSerial.isConnected().then(
     () => {
       setIsConnected(true);
     },
     () => {
       setIsConnected(false);
     }
   );
   ```

### App Preview Project 1

<img src="https://i.ibb.co/QbvxTM8/Screenshot-20220218-184506-01.jpg" alt="drawing" width="200"/>
<img src="https://i.ibb.co/HDZWvKz/Screenshot-20220218-184513-01.jpg" alt="drawing" width="200"/>
<img src="https://i.ibb.co/NTKvwcF/Screenshot-20220218-184520-01.jpg" alt="drawing" width="200"/>
