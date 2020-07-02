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
        var len =doc.data().codes.length
        for(i=0;i<len;i++){
            var cCode = doc.data().codes[i];
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
            putHtml +='<tr><td onclick="displayFeedbacks(';
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

function displayFeedbacks(obj,teachCode,subCode){
    var cCode = obj.id;//college code
    var tCode = teachCode.id;//Teacher Id
    const docRef = firestore.collection(cCode).doc('Teachers').collection(tCode).doc('academicDetails').collection(subCode).doc('feedback');
    docRef.get().then(function(doc){
        var no_Feedbacks=doc.data().feedbacks.length;
        console.log(no_Feedbacks);
        var putHtml="";
        for(var i=0;i<no_Feedbacks;i++){
            var complaint = doc.data().feedbacks[i].complaint;
            var ratings = doc.data().feedbacks[i].rating;
            if(ratings>=1 && ratings<2){
                putHtml += '<div class="card col-lg-3 col-sm-4" style="background-color:brown;"><p>FEEDBACK</p>';
                putHtml += '<p>COMMENT: '+complaint+'</p>';
                putHtml += '<p>RATING: '+ratings+'</p></div>';
            }
            else if(ratings>=2 && ratings<3){
                putHtml += '<div class="card col-lg-3 col-sm-4" style="background-color:tomato;"><p>FEEDBACK</p>';
                putHtml += '<p>COMMENT: '+complaint+'</p>';
                putHtml += '<p>RATING: '+ratings+'</p></div>';
            }
            else if(ratings>=3 && ratings<4){
                putHtml += '<div class="card col-lg-3 col-sm-4" style="background-color:goldenrod;"><p>FEEDBACK</p>';
                putHtml += '<p>COMMENT: '+complaint+'</p>';
                putHtml += '<p>RATING: '+ratings+'</p></div>';
            }
            else if(ratings>=4 && ratings<5){
                putHtml += '<div class="card col-lg-3 col-sm-4" style="background-color:darkolivegreen;"><p>FEEDBACK</p>';
                putHtml += '<p>COMMENT: '+complaint+'</p>';
                putHtml += '<p>RATING: '+ratings+'</p></div>';
            }
            else{
                putHtml += '<div class="card col-lg-3 col-sm-4" style="background-color:darkgreen;"><p>FEEDBACK</p>';
                putHtml += '<p>COMMENT: '+complaint+'</p>';
                putHtml += '<p>RATING: '+ratings+'</p></div>';
            }
            document.getElementById('feedback').innerHTML=putHtml;
        }
    })
    .catch(function(error){
        console.log('Error!: ',error);
    })
}
/*
const firestore = firebase.firestore();
const docRef = firestore.collection('Colleges').doc('collegeCodes');
//Important variables
var no_Colleges,cCode,cName;
var putHtml = '',j=0;
var collegeCodesArray=[];
//code
docRef.get().then(function(doc){
    no_Colleges = Object.keys(doc.data()).length;
    for(var i=1;i<=no_Colleges;i++){
        cCode = doc.data()[i];
        collegeCodesArray.push(cCode);
    }
    if(i===no_Colleges+1){
        var l = collegeCodesArray.length; 
        for(j=0;j<collegeCodesArray.length;j++){
            cCode=collegeCodesArray[j];
            check(cCode,j,l);
        }
    }
})
.catch(function(error){
    console.log('Error! : ',error);
});
function check(cCode,j,l){
    const colRef = firestore.collection(cCode).doc('collegeDetails');
    colRef.get().then(function(cdoc){
        cName = cdoc.data().collegeName;
        putHtml += '<h1>'+cName+'</h1>';
    })
    .catch(function(cerror){
        console.log('Error!: ',cerror);
    });
    const teachRef = firestore.collection(cCode).doc('Teachers');
        teachRef.get().then(function(tdoc){
            if(tdoc.exists){
                if(tdoc.data().teacherId != undefined){
                    var no_Teachers = tdoc.data().teacherId.length;
                    for(var i=0;i<no_Teachers;i++){
                        var teachCode = tdoc.data().teacherId[i];
                        putHtml += '<h2>TEACHER ID: '+teachCode+'</h2>';
                        checkTeach(cCode,teachCode,j,l);
                    }
                }
            }
    })
    .catch(function(terror){
            console.log('Error!: ',terror);
    });
}
function checkTeach(cCode,teachCode,j,l){
    const tRef = firestore.collection(cCode).doc('Teachers').collection(teachCode).doc('academicDetails');
    tRef.get().then(function(teachdoc){
        if(teachdoc.exists){
            var no_subjects = teachdoc.data().subjectLists.length;
            for(var i=0;i<no_subjects;i++){
                var subjectCode = teachdoc.data().subjectLists[i];
                putHtml += '<div class="row"><h3>SUBJECT ID: '+subjectCode+'</h3>';
                checkSubject(cCode,teachCode,subjectCode,j,l);
            }
        }
    })
    .catch(function(teacherror){
        console.log('Error!: ',teacherror);
    });
}

function checkSubject(cCode,teachCode,subjectCode,j,l){
    const subRef = firestore.collection(cCode).doc('Teachers').collection(teachCode).doc('academicDetails').collection(subjectCode).doc('feedback');
    subRef.get().then(function(subdoc){
    if(subdoc.exists){
    var no_Feedbacks = subdoc.data().feedbacks.length;
    for(var i=0;i<no_Feedbacks;i++){
        var ratings = subdoc.data().feedbacks[i].rating;
        var complaint = subdoc.data().feedbacks[i].complaint;
            if(ratings>=1 && ratings<2){
                putHtml += '<div class="card col-lg-3 col-sm-4" style="background-color:brown;"><p>FEEDBACK</p>';
                putHtml += '<p>COMMENT: '+complaint+'</p>';
                putHtml += '<p>RATING: '+ratings+'</p></div>';
            }
            else if(ratings>=2 && ratings<3){
                putHtml += '<div class="card col-lg-3 col-sm-4" style="background-color:tomato;"><p>FEEDBACK</p>';
                putHtml += '<p>COMMENT: '+complaint+'</p>';
                putHtml += '<p>RATING: '+ratings+'</p></div>';
            }
            else if(ratings>=3 && ratings<4){
                putHtml += '<div class="card col-lg-3 col-sm-4" style="background-color:goldenrod;"><p>FEEDBACK</p>';
                putHtml += '<p>COMMENT: '+complaint+'</p>';
                putHtml += '<p>RATING: '+ratings+'</p></div>';
            }
            else if(ratings>=4 && ratings<5){
                putHtml += '<div class="card col-lg-3 col-sm-4" style="background-color:darkolivegreen;"><p>FEEDBACK</p>';
                putHtml += '<p>COMMENT: '+complaint+'</p>';
                putHtml += '<p>RATING: '+ratings+'</p></div>';
            }
            else{
                putHtml += '<div class="card col-lg-3 col-sm-4" style="background-color:darkgreen;"><p>FEEDBACK</p>';
                putHtml += '<p>COMMENT: '+complaint+'</p>';
                putHtml += '<p>RATING: '+ratings+'</p></div>';
            }
        }
    }
    if(j==l-1){
        document.getElementById("fetchHere").innerHTML= putHtml;
    }
    })
    .catch(function(suberror){
        console.log('Error!: ',suberror);
    });

}
*/