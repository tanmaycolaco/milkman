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

 async function addOrder(username,orders){
     try{
        var snapshot = await firebase.database().ref('users/'+username+"/orders").set(orders);
     }catch(e){
         console.log(e)
     }
 }

 async function getOrders(username){
    var snapshot = await firebase.database().ref('users/'+username+'/orders').once('value');
    return snapshot.val();
}


export{
    getUserData,
    getProductData,
    getOrders,
    addOrder
}