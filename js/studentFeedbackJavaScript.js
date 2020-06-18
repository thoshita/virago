var firebaseConfig = {
    apiKey: "AIzaSyDvPPEEcI8SpO8Noz7V4l_9CNoSgImZomU",
    authDomain: "virago-9edc5.firebaseapp.com",
    databaseURL: "https://virago-9edc5.firebaseio.com",
    projectId: "virago-9edc5",
    storageBucket: "virago-9edc5.appspot.com",
    messagingSenderId: "313381718138",
    appId: "1:313381718138:web:914f0462b7b47a51ac53c3",
    measurementId: "G-QCZL8R41M1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

const submitbtn = document.querySelector('#submitbtn');

var val,data={};
submitbtn.addEventListener('click',function(){
    document.getElementById('submitbtn').style.display='none';
    const usercollege = document.querySelector('#ccode').value;
    const usersubject = document.querySelector('#subcode').value;
    const userprofessor = document.querySelector('#pname').value;
    const userrating = document.querySelector('#rate').value;
    const usercomment = document.querySelector('#comment').value;
    const username = document.querySelector('#name').value;
    const docRef = firestore.collection(usercollege).doc('Teachers').collection(userprofessor).doc('academicDetails').collection(usersubject).doc('feedback');
    docRef.get().then(function(doc){
        var len = doc.data().feedbacks.length;
        var feedbacks=doc.data().feedbacks;
        feedbacks.push({complaint:usercomment,rating:userrating});
        var feed={feedbacks};
        docRef.update(feed).then(function(){
            document.getElementById('submitbtn').style.display='block';
            window.alert('Feedback successfully saved');
            location.reload();
        });
    })
    .catch(function(error){
        console.log('Error: ',error);
    })
});


