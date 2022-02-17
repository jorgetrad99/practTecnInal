import { useIonLoading, IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial';
import { chevronDownOutline } from 'ionicons/icons';
import { chevronUpOutline } from 'ionicons/icons';

import './Tab2.css';

/* interface Device {
  name: string,
  address: string
} */

const Tab2: React.FC = () => {
  const bluetoothSerial = BluetoothSerial;

  const [present, dismiss] = useIonLoading();

  const [ aButtonState, setAButtonState ] = useState(false);
  const [ bButtonState, setBButtonState ] = useState(false);
  const [ cButtonState, setCButtonState ] = useState(false);
  const [ dButtonState, setDButtonState ] = useState(false);

  const [ pairedDevices, setPairedDevices ] = useState<any[]>([]);
  const [ pairedDevicesToggle, setPairedDevicesToggle ] = useState(false);

  const [ unpairedDevices, setUnpairedDevices ] = useState<any[]>([]);
  const [ unpairedDevicesToggle, setUnpairedDevicesToggle ] = useState(false);

  const [showAlert2, setShowAlert2] = useState(false);
  const [ message, setMessage ]  = useState('');

  const [ isConnected, setIsConnected ] = useState(false);

  const connectBluetooth = () => {
    
    /* bluetoothSerial.connect('98:DA:20:00:E8:C2'); */
    

    bluetoothSerial.isEnabled().then(() => {
      setMessage('On');
    }, () => {
      setMessage('Not on');
    });
    
  };

  const listPairedDevices = () => {
    bluetoothSerial.list().then((response) => {
      if(response.length > 0) {
        setPairedDevices(response);
        if(pairedDevicesToggle) {
          setPairedDevices([]);
        }
        setPairedDevicesToggle(!pairedDevicesToggle);
      }
    }, (error) => {
      setMessage(error);
    })
  }

  const listUnpairedDevices = async () => {
    
    await bluetoothSerial.discoverUnpaired().then((response) => {
      if(response.length > 0) {
        setMessage('Some unpaired devices found');
        setUnpairedDevices(response);
        
        if(pairedDevicesToggle) {
          setUnpairedDevices([]);
        }
        setUnpairedDevicesToggle(!unpairedDevicesToggle);
      } else {
        setMessage('No unpaired devices');
      }
    }, (error) => {
      setMessage(error);
    })
    if(unpairedDevices.length < 1) {
      present('Loading', 2000, 'dots')
    }
  }

  const connectDevice = (address: any) => {
    bluetoothSerial.connect(address).subscribe(
      () => {
        deviceConnected();
      }, (error) => {
        setMessage(error);
      },
    );
  }

  const deviceConnected = () => {
    bluetoothSerial.subscribe('/n').subscribe((success) => {
      /* setMessage('The device has been succesfully connected'); */
      setMessage(success);
    }, error => {
      setMessage(error);
    })
  }

  const sendData = (data: String) => {
    bluetoothSerial.write(data).then(response => {
      setMessage(response);
    }, (error) => {
      setMessage(error);
    })
  }

  useEffect(() => {
    bluetoothSerial.isConnected().then(() => {
      setIsConnected(true);
    }, () => {
      setIsConnected(false);
    })
  }, [ message, pairedDevices, unpairedDevices, isConnected ]);
 
  return (
    
    <IonPage>
      
      <IonHeader>
        <IonToolbar>
          <IonTitle>Practice 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        { message.length > 0 && (
            <IonAlert
              isOpen={true}
              onDidDismiss={() => {
                  setMessage('');
                  setShowAlert2(false)
                }
              }
              cssClass='my-custom-class'
              header={'Alert'}
              /* subHeader={'Subtitle'} */
              message={message}
              buttons={['Ok']}
            /> 
          )
        }
        <IonButton onClick={connectBluetooth}>Is Bluetooth on?</IonButton>
        <IonButton onClick={listPairedDevices}>Paired devices List { pairedDevicesToggle ? <IonIcon icon={chevronUpOutline}></IonIcon> : <IonIcon icon={chevronDownOutline}></IonIcon> }</IonButton>
        <IonButton onClick={listUnpairedDevices}>Unpaired Devices List { unpairedDevicesToggle ? <IonIcon icon={chevronUpOutline}></IonIcon> : <IonIcon icon={chevronDownOutline}></IonIcon> }</IonButton>
        {pairedDevices.length > 0 && (
          <div>
            <h3>Paired Devices List</h3>
            <IonList>
            {pairedDevices.map((device: any) => {
              return (
                <IonItem>
                  <IonLabel>{device.name}</IonLabel>
                  <IonLabel>{device.address}</IonLabel>
                  <IonButton onClick={() => connectDevice(device.address)}>Connect</IonButton>
                </IonItem>
              )
            })}
            </IonList>
          </div>
        )}
        {unpairedDevices.length > 0 && (
          <div>
            <h3>Unpaired Devices List</h3>
            <IonList>
            {unpairedDevices.map((device: any) => {
              return (
                <IonItem>
                  <IonLabel>{device.name}</IonLabel>
                  <IonLabel>{device.address}</IonLabel>
                  <IonButton onClick={() => connectDevice(device.address)}>Connect</IonButton>
                </IonItem>
              )
            })}
            </IonList>
          </div>
        )}
        { isConnected && (<p>Device connected</p>)}
        { !isConnected && (<p>Device not connected</p>)}
        
        
        <div className='buttons'>
        <IonGrid>
          <IonRow>
            <IonCol>
            <IonButton shape="round" size="large" className='controllers' onClick={() => sendData('A')}>A</IonButton>
            </IonCol>
            <IonCol>
              <IonButton shape="round" size="large" className='controllers' onClick={() => sendData('B')}>B</IonButton>
            </IonCol>
            <IonCol>
              <IonButton shape="round" size="large" className='controllers' onClick={() => sendData('C')}>C</IonButton>
            </IonCol>
            <IonCol>
              <IonButton shape="round" size="large" className='controllers' onClick={() => sendData('D')}>D</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
