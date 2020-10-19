import React,{useState, useRef} from 'react'
import { useCollectionData, useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import {auth, firestore} from './firebase'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'


function ChatRoom() {
    const [user] = useAuthState(auth)
    const messagesRef = firestore.collection('messages')
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, {idField: 'id'})
    const [formValue, setFormValue] = useState('');
    const dummy = useRef()

    const sendMessage = async(e) => {
        e.preventDefault();
        const {uid, photoURL} = auth.currentUser;
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });

        setFormValue('')
        dummy.current.scrollIntoView({ behavior: 'smooth'})
    }
  
    return (
        <>    
        <div>
             
             {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}  
             <div ref={dummy}></div>
        </div>
        <form onSubmit={sendMessage}  style={{padding:'20px', backgroundColor:'lightskyblue'}}>
           <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
           <button type='submit'>Go</button> 
        </form>
        </>
    )
}


 
function ChatMessage(props) {
    const {text, uid} = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (

    <div className={`message ${messageClass}`} >
        <img src={props.photoURL}/>
     <p>{text}</p>
    </div>

    )

}
 
export default ChatRoom
