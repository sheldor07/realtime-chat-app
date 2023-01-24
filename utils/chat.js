function createChatBubble(data){
    let liNewMsg = document.createElement('li')
    let liMsgDiv = document.createElement("SPAN")
    console.log(liMsgDiv)
    liMsgDiv.textContent = data.from + "->" + data.msg
    liNewMsg.append(liMsgDiv)
    console.log(liNewMsg)

    if(data.from === username){
        liMsgDiv.setAttribute('sender','self')
    }else{
        liMsgDiv.setAttribute('sender','other')
    }
    return liNewMsg
}

module.exports ={
    createChatBubble
}