import firebase from 'firebase';
import config from '../Config/FirebaseConfig.json'

var users = {}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

async function getUserData (user){
   var snapshot = await firebase.database().ref('users/'+user).once('value');
   return snapshot.val();
};

async function getProductData(){
    var snapshot = await firebase.database().ref('products/').once('value');
    return snapshot.val();
 };


export{
    getUserData,
    getProductData
}