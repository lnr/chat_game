const ws = new WebSocket('ws://' + location.host);

ws.onopen = () => console.log("Соединение установлено.");

ws.onclose = event => {
    if (event.wasClean) {
        console.log('Соединение закрыто чисто');
    } else {
        console.log('Обрыв соединения'); // например, "убит" процесс сервера
    }
    console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

ws.onmessage = event => {
    let {action, body} = JSON.parse(event.data);

    if (action === 'shake') {
        alert('Hello, ' + body.name);
    } else if (action === 'updateField') {
        console.log(body.coordinates);
    } else {
        let row = document.createElement("div");
        row.innerHTML = body;
        document.getElementById('content').appendChild(row);
    }
};

ws.onerror = error => console.log(error);

const   codes = {37: 'left', 38: 'up', 39: 'right', 40: 'down'},
        keys = Object.keys(codes);

document.getElementById('input').onkeyup = function(e) {

    if (keys.indexOf(e.keyCode.toString()) !== -1) {
        ws.send(JSON.stringify({
            action: 'move',
            direction: codes[e.keyCode]
        }));
    } else if(e.keyCode === 13) {
        ws.send(JSON.stringify({
            action: 'message',
            body: this.value
        }));
        this.value = '';
	}
};
