import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial';

import './Tab2.css';

/* interface Device {
  name: string,
  address: string
} */

const Tab2: React.FC = () => {
  const bluetoothSerial = BluetoothSerial;

  const [ aButtonState, setAButtonState ] = useState(false);
  const [ bButtonState, setBButtonState ] = useState(false);
  const [ cButtonState, setCButtonState ] = useState(false);
  const [ dButtonState, setDButtonState ] = useState(false);

  const [ devices, setDevices ] = useState<any[]>([]);

  const [showAlert2, setShowAlert2] = useState(false);
  const [ message, setMessage ]  = useState('');

  const connectBluetooth = () => {
    
    /* bluetoothSerial.connect('98:DA:20:00:E8:C2'); */
    

    bluetoothSerial.isEnabled().then(() => {
      setMessage('On');
    }, () => {
      setMessage('Not on');
    });
    
  };

  const listDevices = () => {
    bluetoothSerial.list().then((response) => {
      if(response.length > 0) {
        setMessage('Some devices found');
        setDevices(response);
      }
    }, (error) => {
      setMessage(error);
    })
  }

  useEffect(() => {
    
  }, [ message, devices ]);
 
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
        <IonButton onClick={listDevices}>Devices List</IonButton>
        {devices.length > 0 && (
          <div>
            <h3>Devices list</h3>
            <IonList>
            {devices.map((device) => {
              return (
                <IonItem>
                  <IonLabel>{device.name}</IonLabel>
                  <IonLabel>{device.address}</IonLabel>
                </IonItem>
              )
            })}
            </IonList>
          </div>
        )}
        
        <div className='buttons'>
        <IonGrid>
          <IonRow>
            <IonCol>
            <IonButton shape="round" size="large" className='controllers'>A</IonButton>
            </IonCol>
            <IonCol>
              <IonButton shape="round" size="large" className='controllers'>B</IonButton>
            </IonCol>
            <IonCol>
              <IonButton shape="round" size="large" className='controllers'>C</IonButton>
            </IonCol>
            <IonCol>
              <IonButton shape="round" size="large" className='controllers'>D</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
