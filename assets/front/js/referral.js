function urlParams() {
    var search = window.location.search.substr(1),
        result = {};
    if (search.length) {
        search.split('&').forEach(function (item) {
            var buf = item.split('=');
            if (buf.length == 2)
                result[buf[0]] = decodeURIComponent(buf[1]);
        });
    }
    return result;
}  //url data

let refCode = urlParams().r;

if(refCode !== null && refCode !== undefined){
    let ref = document.getElementById("ref");
    ref.value = refCode;
    //prevent app to keep the track
    // document.getElementById("downloadApp").setAttribute('onclick','showRefAppMessage()')
    for(let i = 0; i < document.getElementsByClassName('downloadAppLink').length; i++){
        document.getElementsByClassName('downloadAppLink')[i].setAttribute("onclick", "showRefAppMessage()");
        document.getElementsByClassName('downloadAppLink')[i].setAttribute("href", "#");
    }
}

function showRefAppMessage(){
    Swal.fire({
        type: 'info',
        title: 'Приложение',
        text: "Перед началом, создайте аккаунт!",
      })
}