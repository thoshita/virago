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
const docRef = firestore.collection('Colleges').doc('collegeCodes');
var putHtml = '';
docRef.get().then(function(doc){
    const len = Object.keys(doc.data()).length;
    putHtml +='<label>College Code: </label><select onchange="foo(this)" id="cCodes" name="codes"><option value=" ">--choose--</option>'; 
    for(var i=1;i<=len;i++){
        putHtml += '<option value="'+doc.data()[i]+'">'+doc.data()[i]+'</option>';
    }
    putHtml +='</select>';
    document.getElementById('putCollegeCode').innerHTML=putHtml;
})
.catch(function(error){
    console.log('Error!: ',error);
});

var code,teach;
function foo(select) {
   code = select.options[select.selectedIndex].getAttribute("value");
   if(code ==" "){
       alert('Invalid college code.Choose again.');
   }
   else{
       const cRef = firestore.collection(code).doc('Teachers');
       cRef.get().then(function(cdoc){
        const len = Object.keys(cdoc.data()).length;
        var putHtml = '';
        putHtml +='<label>Teacher Code: </label><select onchange="sub(this);" id="tCodes" name="Teacher"><option value=" ">--choose--</option>'; 
        for(var i=0;i<=len;i++){
            putHtml += '<option value="'+cdoc.data().teacherId[i]+'">'+cdoc.data().teacherId[i]+'</option>';
        }
        putHtml +='</select>';
        document.getElementById('putTeacherCode').innerHTML=putHtml;
       })
       .catch(function(cerror){
        console.log('Error!: ');
       });
   }
}

function sub(select){
    console.log(code);
    teach = select.options[select.selectedIndex].getAttribute("value");
}
