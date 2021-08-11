import {db} from '../config/firebase'

  function AddUserToRoom(roomName,userName){
    // Create a reference to the SF doc.
    const sfDocRef = db.collection("chat-rooms").filter(doc => doc.displayName === roomName);
    console.log(sfDocRef);
// Uncomment to initialize the doc.
// sfDocRef.set({ population: 0 });

return db.runTransaction((transaction) => 
    // This code may get re-run multiple times if there are conflicts.
     transaction.get(sfDocRef).then((sfDoc) => {
        if (!sfDoc.exists) {
            throw new Error("Document does not exist!");
        }

        // Add one person to the city population.
        // Note: this could be done without a transaction
        //       by updating the population using FieldValue.increment()
        const newConnectedUsers = sfDoc.data().connectedUsers.push(userName);
        transaction.update(sfDocRef, { connectedUsers: newConnectedUsers });
    })
).then(() => {
    console.log("Transaction successfully committed!");
}).catch((error) => {
    console.log("Transaction failed: ", error);
});
    // let room = db.collection("chat-rooms").filter(doc=>{
    //     doc.displayName == roomName;
    // })
    // room.update({
    //     connectedUsers : room.connectedUsers.push(userName)
    // })
}


export default AddUserToRoom;
