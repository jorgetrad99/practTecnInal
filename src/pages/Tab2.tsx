import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial';

import './Tab2.css';

const Tab2: React.FC = () => {
  const [ aButtonState, setAButtonState ] = useState(false);
  const [ bButtonState, setBButtonState ] = useState(false);
  const [ cButtonState, setCButtonState ] = useState(false);
  const [ dButtonState, setDButtonState ] = useState(false);

  const [showAlert2, setShowAlert2] = useState(false);
  const [ message, setMessage ]  = useState('');

  const connectBluetooth = () => {
    const bluetoothSerial = BluetoothSerial;
    /* bluetoothSerial.connect('98:DA:20:00:E8:C2'); */
    

    bluetoothSerial.isEnabled().then(() => {
      setMessage('On');
    }, () => {
      setMessage('Not on');
    });
    
  };

  useEffect(() => {
    
  }, [ message ]);
 
  return (
    
    <IonPage>
      
      <IonHeader>
        <IonToolbar>
          <IonTitle>Practice 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        { message.length > 0 && <IonAlert
          isOpen={true}
          onDidDismiss={() => {
              setMessage('');
              setShowAlert2(false)

            }
          }
          cssClass='my-custom-class'
          header={'Alert'}
          subHeader={'Subtitle'}
          message={message}
          buttons={['Ok']}
        /> }
        <div className='buttons'>
        <IonGrid>
          <IonRow>
            <IonCol>
            <IonButton shape="round" size="large">A</IonButton>
            </IonCol>
            <IonCol>
              <IonButton shape="round" size="large">B</IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={connectBluetooth} shape="round" size="large">C</IonButton>
            </IonCol>
            <IonCol>
              <IonButton shape="round" size="large">D</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
