import { useIonLoading, IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial';
import { chevronDownOutline } from 'ionicons/icons';
import { chevronUpOutline } from 'ionicons/icons';

import './Tab2.css';

const Tab2: React.FC = () => {
  const bluetoothSerial = BluetoothSerial;

  const [present, dismiss] = useIonLoading();

  const [ aButtonState, setAButtonState ] = useState(false);
  const [ bButtonState, setBButtonState ] = useState(false);
  const [ cButtonState, setCButtonState ] = useState(false);
  const [ dButtonState, setDButtonState ] = useState(false);

  const [ pairedDevices, setPairedDevices ] = useState<any[]>([]);
  const [ pairedDevicesToggle, setPairedDevicesToggle ] = useState(false);

  const [showAlert2, setShowAlert2] = useState(false);
  const [ message, setMessage ]  = useState('');

  const [ isConnected, setIsConnected ] = useState(false);

  const [ dataSent, setDataSent ] = useState<String>('');

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

  const connectDevice = (address: any) => {
    bluetoothSerial.connect(address).subscribe(
      () => {
        deviceConnected();
        setIsConnected(true)
      }, (error) => {
        setMessage(error);
      },
    );
  }

  const deviceConnected = () => {
    bluetoothSerial.subscribe('/n').subscribe((success) => {
      setMessage('The device has been succesfully connected: ' + success);
    }, error => {
      setMessage(error);
    })
  }

  const sendData = (data: String) => {
    bluetoothSerial.write(data).then(() => {
      if(dataSent.length === 0) {
        setDataSent(data);
      }
      setTimeout(() => {
        setDataSent('');
      }, 500);
    }, (error) => {
      setMessage(error);
    })
  }

  bluetoothSerial.isConnected().then(() => {
    setIsConnected(true);
  }, () => {
    setIsConnected(false);
  })

  useEffect(() => {
    
  }, [ message, pairedDevices, isConnected, aButtonState, bButtonState, cButtonState, dButtonState ]);
 
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
              message={message}
              buttons={['Ok']}
            /> 
          )
        }
        <IonButton onClick={connectBluetooth}>Is Bluetooth on?</IonButton>
        <IonButton onClick={listPairedDevices}>Paired devices List { pairedDevicesToggle ? <IonIcon icon={chevronUpOutline}></IonIcon> : <IonIcon icon={chevronDownOutline}></IonIcon> }</IonButton>
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
        { isConnected && (<p id="is-connected">Device connected</p>)}
        { !isConnected && (<p id="is-not-connected">Device not connected</p>)}
        
        <IonItem>
        {
          dataSent.length > 0 && (
            <IonLabel>Sending "{dataSent}" to the device</IonLabel>
          ) 
        }
        </IonItem>

        <div className='buttons'>
        <IonGrid>
          <IonRow>
            <IonCol>
              { aButtonState ? (
                  <IonButton shape="round" size="large" className='controllers' 
                    style={{ '--background': 'var(--ion-color-danger-shade)' }} 
                    onClick={() => {
                      bluetoothSerial.isConnected().then(() => {
                        sendData('A')
                        setAButtonState(!aButtonState);
                      }, () => {
                        setMessage('Device not connnected');
                      })
                   }
                  }>
                    A
                  </IonButton>
                ) : (
                  <IonButton shape="round" size="large" className='controllers' 
                    onClick={() => {
                      bluetoothSerial.isConnected().then(() => {
                        sendData('A')
                        setAButtonState(!aButtonState);
                      }, () => {
                        setMessage('Device not connnected');
                      })
                   }
                  }>
                    A
                  </IonButton>
                )
              }
            </IonCol>
            <IonCol>
            { bButtonState ? (
                  <IonButton shape="round" size="large" className='controllers' 
                    style={{ '--background': 'var(--ion-color-danger-shade)' }} 
                    onClick={() => {
                      bluetoothSerial.isConnected().then(() => {
                        sendData('B')
                        setBButtonState(!bButtonState);
                      }, () => {
                        setMessage('Device not connnected');
                      })
                   }
                  }>
                    B
                  </IonButton>
                ) : (
                  <IonButton shape="round" size="large" className='controllers' 
                    onClick={() => {
                      bluetoothSerial.isConnected().then(() => {
                        sendData('B')
                        setBButtonState(!bButtonState);
                      }, () => {
                        setMessage('Device not connnected');
                      })
                   }
                  }>
                    B
                  </IonButton>
                )
              }
            </IonCol>
            <IonCol>
            { cButtonState ? (
                  <IonButton shape="round" size="large" className='controllers' 
                    style={{ '--background': 'var(--ion-color-danger-shade)' }} 
                    onClick={() => {
                      bluetoothSerial.isConnected().then(() => {
                        sendData('C')
                        setCButtonState(!cButtonState);
                      }, () => {
                        setMessage('Device not connnected');
                      })
                   }
                  }>
                    C
                  </IonButton>
                ) : (
                  <IonButton shape="round" size="large" className='controllers' 
                    onClick={() => {
                      bluetoothSerial.isConnected().then(() => {
                        sendData('C')
                        setCButtonState(!cButtonState);
                      }, () => {
                        setMessage('Device not connnected');
                      })
                   }
                  }>
                    C
                  </IonButton>
                )
              }
            </IonCol>
            <IonCol>
            { dButtonState ? (
                  <IonButton shape="round" size="large" className='controllers' 
                    style={{ '--background': 'var(--ion-color-danger-shade)' }} 
                    onClick={() => {
                      bluetoothSerial.isConnected().then(() => {
                        sendData('D')
                        setDButtonState(!dButtonState);
                      }, () => {
                        setMessage('Device not connnected');
                      })
                   }
                  }>
                    D
                  </IonButton>
                ) : (
                  <IonButton shape="round" size="large" className='controllers' 
                    onClick={() => {
                      bluetoothSerial.isConnected().then(() => {
                        sendData('D')
                        setDButtonState(!dButtonState);
                      }, () => {
                        setMessage('Device not connnected');
                      })
                   }
                  }>
                    D
                  </IonButton>
                )
              }
            </IonCol>
          </IonRow>
        </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
