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
$(function() {
    $('input:radio[name="optradio"]').change(function() {
        if ($(this).val() == '0') {
         document.getElementById('file_in').style.display='none';
        }
        else{
            document.getElementById('file_in').style.display='block';
        }
    });
});
var msg,file_flag;
var storage= firebase.storage();
function inUpdate(){
    msg=document.getElementById('Announcement').value;
    if(document.getElementById('one').checked){
        file_flag=document.getElementById('one').value;
    }
    else{
        file_flag=document.getElementById('two').value;
    }
    // has no pdf directly put the content into Firestore
    if(file_flag==0){
        const upRef = firestore.collection('Updates').doc('Announcements');
        upRef.get().then(function(doc){
            var headlines=doc.data().headlines;
            const time = new Date();
            headlines.push({content:msg,attachment:false,updatedOn:time});
            var feed={headlines};
            upRef.update(feed).then(function(){
                window.alert('Announcement successfully saved');
                location.reload();
            });
        })
        .catch(function(error){
            console.log('Error: ',error);
        })
    }
    else{
        var file = document.querySelector('#file_announcement').files[0];
        var storageRef = storage.ref('Announcements/'+file.name);
        storageRef.put(file);
        const time = new Date();
        const task = storageRef.put(file);
        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
            const pRef = firestore.collection('Updates').doc('Announcements');
            pRef.get().then(function(pdoc){
                var headlines=pdoc.data().headlines;
                headlines.push({content:msg,attachment:url,updatedOn:time,fileName:file.name});
                var feed={headlines};
                pRef.update(feed).then(function(){
                    window.alert('Announcement successfully saved');
                    location.reload();
                });
             })
            .catch(function(error){
                console.log('Error: ',error);
            })
        })
        .catch(console.error);
    }
}
//existing updates

var i,putHtml=' ';
const upRef = firestore.collection('Updates').doc('Announcements');
upRef.get().then(function(doc){
    var len=doc.data().headlines.length;
    for(i=len-1;i>=0;i--){
        if(doc.data().headlines[i].attachment===false){
            putHtml+='<div class="sampleUpdates"><p><button id="'+i+'" onclick="somefunction('+'id'+');"type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span> Delete</button> '+doc.data().headlines[i].content;
            putHtml+='</p></div>';
        }
        else{
            var url = doc.data().headlines[i].attachment;        
            putHtml+='<div class="sampleUpdates"><p><button id="'+i+'" onclick="somefunction('+'id'+');"type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span> Delete</button> '+doc.data().headlines[i].content+' <a href='+url+'>Click Here</a>';
            putHtml+='</p></div>';
        }
    }
    document.getElementById('putUpdates').innerHTML=putHtml;
})
.catch(function(error){
    console.log('Error: ',error);
});

function somefunction(i){
    const delRef = firestore.collection('Updates').doc('Announcements');
    delRef.get().then(function(deldoc){
        console.log(deldoc.data().headlines[i]);
        var darling = deldoc.data().headlines[i];
        if(deldoc.data().headlines[i].attachment===false){
            //just update the headlines section by deleting the ith index field
            console.log('I dont have an attachment');
            var headlines=[];
            for(var j = 0;j<deldoc.data().headlines.length;j++){
                if(j!=i){
                    headlines.push(deldoc.data().headlines[j]);
                }
            }
            console.log(headlines);
            var feed={headlines};
            delRef.update(feed).then(function(){
                window.alert('Announcement successfully deleted');
                location.reload();
            });
        }
        else{
            //along with deleting the field delete the respective attachment
            var filename = deldoc.data().headlines[i].fileName;
            var headlines=[];
            for(var j = 0;j<deldoc.data().headlines.length;j++){
                if(j!=i){
                    headlines.push(deldoc.data().headlines[j]);
                }
            }
            console.log(headlines);
            var feed={headlines};
            delRef.update(feed).then(function(){
                // Create a reference to the file to delete
                var storageRef = storage.ref();
                var deleteRef = storageRef.child('Announcements/'+filename);

                // Delete the file
                deleteRef.delete().then(function() {
                // File deleted successfully
                window.alert('Announcement successfully deleted');
                location.reload();
                }).catch(function(error) {
                // Uh-oh, an error occurred!
                });
            });

        }
    })
    .catch(function(e){
        console.log('Error!: ',e);
    })
}