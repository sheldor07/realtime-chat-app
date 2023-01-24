let socket = io()
// let btnSend = document.getElementById('btnSend')
// let inpMsg = document.getElementById('inpMsg')
// let ulMsgList = document.getElementById('ulMsgList')

// btnSend.onclick = function () {
//     socket.emit('msg_send', {
//         msg: inpMsg.value
//     })
//     inpMsg.value
// }
// socket.on('msg_rcvd', (data) => {
//     let liNewMsg = document.createElement('li')
//     liNewMsg.innerText = data.msg
//     ulMsgList.appendChild(liNewMsg)
// })
$('#login-container').show()
$('#chat-container').hide()
$('#btnStart').click(function () {
    socket.emit('login', {
        username: $('#inpUsername').val(),
        password: $('#inpPassword').val()
    })
    console.log("clicked")
})


socket.on('login_failed', () => {
    window.alert('incorrect username or password')
})
socket.on('logged_in', function () {
    $('.login-container').hide()
    $('#chat-container').show()
})
$('#btnSend').click(function () {
    socket.emit('msg_send', {
        to: $('#inpToUser').val(),
        msg: $("#inpNewMsg").val()
    })
    $("#inpNewMsg").val()
})
socket.on('msg_rcvd', (data) => {
    console.log(data)
    let liNewMsg = document.createElement('li')
    liNewMsg.innerText = data.from + "->" + data.msg
    console.log(liNewMsg)
    if(data.from == socket.id){
        liNewMsg.setAttribute('sender','self')
    }else{
        liNewMsg.setAttribute('sender','other')
    }
    $('#ulMsgList').append(liNewMsg)
})
// $(() => {
//     let seePassword = document.getElementById('#seePassword')
//     seePassword.onchange = function () {
//         if ($('#passwordCheck').val() == "on") {
//             $("#inpPassword").prop("type", "text");
//         } else {
//             $("#inpPassword").prop("type", "password");
//         }
//     }
// })