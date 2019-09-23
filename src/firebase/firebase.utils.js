import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBw743P8MOFyPQ46qo1S2bsiPbNOl-rjw8",
    authDomain: "topcorner-e4a60.firebaseapp.com",
    databaseURL: "https://topcorner-e4a60.firebaseio.com",
    projectId: "topcorner-e4a60",
    storageBucket: "",
    messagingSenderId: "763299378310",
    appId: "1:763299378310:web:173aa5ee4a31392c244d07"
  };

  firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if(!snapShot.exists){
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error){
      console.log('error creating the user ', error.message );
      
    }
  }
  return userRef
  
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;