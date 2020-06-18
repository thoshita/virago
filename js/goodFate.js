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
const docRef = firestore.collection('Colleges').doc('collegeCodes');
docRef.get().then(function(doc){
        var len =Object.keys(doc.data()).length
        for(i=1;i<=len;i++){
            var cCode = doc.data()[i];
            const colRef = firestore.collection(cCode).doc('collegeDetails');
            colRef.get().then(function(cdoc){
                var cName = cdoc.data().collegeName;
                var cSite = cdoc.data().website;
                var table = document.getElementById("tdata");
                var row = table.insertRow(j);
                row.insertCell(0).innerHTML=cName;
                row.insertCell(1).innerHTML=cCode;
                var cell2 = row.insertCell(2);
                if(cSite==null){
                    cell2.innerHTML = cSite;
                }
                else{
                    cell2.innerHTML = `<a href="${cSite}">${cSite}</a>`;
                }
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
/*
var database = firebase.database();
var ref=database.ref('Colleges');
var name,code,url;
ref.on('value',gotData,errData);
function gotData(data){
    var dataRetrieve = data.val();
    var keys = Object.keys(dataRetrieve);
    for(var i=0;i<keys.length;i++)
    {
        code=keys[i];
        name=dataRetrieve[code].collegeName;
        url=dataRetrieve[code].website;
        //feed back retrieval section
        //console.log(dataRetrieve[code].feedback);
        if(dataRetrieve[code].feedback!=undefined){
            var fref = database.ref('Colleges/'+code+'/feedback');
            fref.on('value',fgotData,ferrData);
            function fgotData(fdata){
                var fdataRetrieve = fdata.val();
                var fkeys = Object.keys(fdataRetrieve);
                for(var fi=0;fi<fkeys.length;fi++){
                    var teacherId = fkeys[fi];
                    var sref = database.ref('Colleges/'+code+'/feedback/'+teacherId);
                    sref.on('value',sgotData,serrData);
                    function sgotData(sdata){
                        var sdataRetrieve = sdata.val();
                        var skeys = Object.keys(sdataRetrieve);
                        for(var si=0;si<skeys.length;si++){
                            var subjectId = skeys[si];
                            var pref = database.ref('Colleges/'+code+'/feedback/'+teacherId+'/'+subjectId);
                            pref.on('value',pgotData,perrData);
                            function pgotData(pdata){
                                var pdataRetrieve = pdata.val();
                                var pkeys = Object.keys(pdataRetrieve);
                                for(pi=0;pi<pkeys.length;pi++){
                                    var studentId = pkeys[pi];
                                    var complaint = pdataRetrieve[studentId].complain
                                    var mailId = pdataRetrieve[studentId].mail
                                    var ratings = pdataRetrieve[studentId].rating 
                                }
                            }
                            function perrData(perr){
                                console.log('Error!');
                                console.log(perr);
                            }
                        }
                    }
                    function serrData(serr){
                        console.log('Error!');
                        console.log(serr);
                    }
                }
            }
            function ferrData(ferr){
                console.log('Error!');
                console.log(ferr);
            }
        }
        //console.log(fref);  
        var table = document.getElementById("tdata");
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML=name;
        row.insertCell(1).innerHTML=code;
        var cell2 = row.insertCell(2);
        if(url==null){
            cell2.innerHTML = url;
        }
        else{
            cell2.innerHTML = `<a href="${url}">${url}</a>`;
        }
    }
}
function errData(err){
    console.log("Error!");
    console.log(err); 
}*/