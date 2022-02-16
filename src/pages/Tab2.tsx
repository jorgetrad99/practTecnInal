import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';

import './Tab2.css';

const Tab2: React.FC = () => {
  const [ aButtonState, setAButtonState ] = useState(false);
  const [ bButtonState, setBButtonState ] = useState(false);
  const [ cButtonState, setCButtonState ] = useState(false);
  const [ dButtonState, setDButtonState ] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
              <IonButton shape="round" size="large">C</IonButton>
            </IonCol>
            <IonCol>
              <IonButton shape="round" size="large">D</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
         {/*  <IonButton shape="round" size="large">A</IonButton> */}
          {/* <IonButton shape="round" size="large">B</IonButton>
          <IonButton shape="round" size="large">C</IonButton>
          <IonButton shape="round" size="large">D</IonButton> */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
