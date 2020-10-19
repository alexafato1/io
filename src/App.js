import React,{useState} from 'react';
import './App.css';
import {firestore, auth} from './firebase'
import ChatRoom from './ChatRoom'
import firebase from 'firebase/app'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'



function App() {
  const [user] = useAuthState(auth)

  function SignOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
   
    }

  return (
    <div className="App">
    
      <section>
        {user ? 
        <div>
             <header >
         <button style={{color: 'white', backgroundColor: 'blue'}} onClick={SignOut}>SignOut</button> 
      </header>
        <ChatRoom/> 
     
        </div>
         : <SignIn/>}
      </section>
    </div>
  );
}   


function SignIn() {
  const auth = firebase.auth();
 
  const signInWithGoogle = () => {
     const provider = new firebase.auth.GoogleAuthProvider();
     auth.signInWithPopup(provider);
  }

 
  
  return (
      <div>
         <button onClick={signInWithGoogle}>Sign in with Google</button> 
      </div>
  )

 

}
export default App;
