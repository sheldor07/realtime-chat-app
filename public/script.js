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
$('#loginBox').show()
$('#chatBox').hide()
$('#btnStart').click(function () {
    socket.emit('login', {
        username: $('#inpUsername').val(),
        password:$('#inpPassword').val()
    })
})


socket.on('login_failed',()=>{
    window.alert('incorrect username or password')
})
socket.on('logged_in', function () {
    $('#loginBox').hide()
    $('#chatBox').show()
})
$('#btnSend').click(function(){
    socket.emit('msg_send', {
                to:$('#inpToUser').val(),
                msg: $("#inpNewMsg").val()
            })
            $("#inpNewMsg").val()
})
socket.on('msg_rcvd', (data) => {
    console.log(data)
        let liNewMsg = document.createElement('li')
        liNewMsg.innerText = data.from + "->"+ data.msg
        $('#ulMsgList').append(liNewMsg)
    })