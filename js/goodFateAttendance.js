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
var i,j=0;
var collegeCodesArray=[];
const docRef = firestore.collection('Colleges').doc('collegeCodes');
docRef.get().then(function(doc){
        var len =Object.keys(doc.data()).length
        for(i=1;i<=len;i++){
            var cCode = doc.data()[i];
            collegeCodesArray.push(cCode);
            const colRef = firestore.collection(cCode).doc('collegeDetails');
            colRef.get().then(function(cdoc){
                var cName = cdoc.data().collegeName;
                var table = document.getElementById("tdata");
                var row = table.insertRow(j);
                var putHtml = '<div id="';
                putHtml +=collegeCodesArray[j];
                putHtml+='" onclick="handle_click_event(id)" class="expand">';
                putHtml+=cName;
                putHtml+='</div>';
                row.insertCell(0).innerHTML=putHtml;
                j++;
            })
            .catch(function(error){
                console.log('Eror!: ',error);
            });
        }
})
.catch(function(error){
    console.log('Eror!: ',error);
});
 
function handle_click_event(cCode){
    const colRef = firestore.collection(cCode).doc('Teachers');
    colRef.get().then(function(cdoc){
        var no_teachers=cdoc.data().teacherId.length;
        var teachersCodeArray = [];
        for(var i=0;i<no_teachers;i++){
            teachersCodeArray.push(cdoc.data().teacherId[i]);
        }
        var putHtml="<h4>COLLEGE CODE: ";
        putHtml+=cCode+'</h4>';
        for(var j=0;j<no_teachers;j++){
            var table = document.getElementById("teachdata"); 
            putHtml += '<tr><td onclick="tdclick(';
            putHtml +=cCode+',id)" id="';
            putHtml+=teachersCodeArray[j]+'">';
            putHtml +=teachersCodeArray[j];
            putHtml+='</td></tr>';
            table.innerHTML=putHtml;
        }
    })
    .catch(function(cerror){
        console.log('Error!: ',cerror);
    });
}

function tdclick(obj,teachCode){
    var cCode = obj.id;
    const subRef = firestore.collection(cCode).doc('Teachers').collection(teachCode).doc('academicDetails');
    subRef.get().then(function(subjects){
        var no_subjects = subjects.data().subjectLists.length; 
        var putHtml = "<h4>TEACHER ID: ";
        putHtml += teachCode+'</h4>';
        for(var i=0;i<no_subjects;i++){
            var table = document.getElementById("subdata");
            putHtml +='<tr><td onclick="displayAttendance(';
            putHtml +=cCode+','+teachCode+',id);" id="';
            putHtml +=subjects.data().subjectLists[i]+'">'+subjects.data().subjectLists[i];
            putHtml +='</tr></td>';
            table.innerHTML=putHtml;
        }
    })
    .catch(function(serror){
        console.log('Error!: ',serror);
    });
}

function displayAttendance(obj,teachCode,subCode){
    var cCode = obj.id;//college code
    var tCode = teachCode.id;//Teacher Id
    const docRef = firestore.collection(cCode).doc('Teachers').collection(tCode).doc('academicDetails').collection(subCode).doc('attendance');
    docRef.get().then(function(doc){
        var current=doc.data().attended;
        var total=doc.data().totalClasses;
        var putHtml = '<h4>SUBJECT CODE: ';
        putHtml += subCode+'</h4>'+'<tr><td>TOTAL CLASSES TO BE TAKEN: '+total+'</td></tr><tr><td>No. OF CLASSES TAKEN: '+current+'</td></tr>';
        document.getElementById('attdata').innerHTML=putHtml; 
    })
    .catch(function(error){
        console.log('Error!: ',error);
    })
}
