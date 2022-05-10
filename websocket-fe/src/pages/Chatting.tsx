const Chatting = () => {
  let ws: WebSocket;

  const join = () => {
    ws = new WebSocket("ws://192.168.61.28:8080/chat");
    ws.onmessage = (msg) => {
      let chatNameEl = document.getElementById("chatName") as HTMLInputElement;
      let chatName = chatNameEl?.value;

      let data = JSON.parse(msg.data);
      console.log("data", data);
      let cls = data.name === chatName ? "me" : "other";

      let chatWrapEl = document.getElementById("chatWrap");
      let msgWrapEl = document.createElement("li");
      msgWrapEl.className = cls;
      msgWrapEl.innerText = data.name + ": " + data.message;
      chatWrapEl?.appendChild(msgWrapEl);
    }
  }

  const send = () => {
    let chatNameEl = document.getElementById("chatName") as HTMLInputElement;
    let chatMessageEl = document.getElementById("chatMessage") as HTMLInputElement;
    let chatName = chatNameEl?.value;
    let chatMessage = chatMessageEl?.value;
    console.log("message ", chatMessage);
    if (chatMessage.trim() !== '') {
      let sendMsg = JSON.stringify({
        name: chatName,
        message: chatMessage.trim(),
        date: new Date().toLocaleString(),
      });
      ws.send(sendMsg);
    }
    chatMessageEl.value = "";
  }

  return (
    <div>
      <h1>Chatting</h1>
      <ul>
        <li>
          <input type="text" id="chatName" placeholder="이름" />
          <button type="button" onClick={join}>입장</button>
        </li>
        <li>
          <div style={{
            width: "500px",
            height: "350px",
            overflow: "scroll",
            border: "solid"
          }}>
            채팅 영역
            <ul id="chatWrap">

            </ul>
          </div>
        </li>
        <li>
          <input type="text" id="chatMessage" placeholder="메시지 입력" />
          <button type="button" onClick={send}>전송</button>
        </li>
      </ul>
      chatting
    </div>
  );
}

export default Chatting;
