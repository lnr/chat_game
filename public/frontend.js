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
	let row = document.createElement("div");
	row.innerHTML = event.data;
	document.getElementById('content').appendChild(row);
};

ws.onerror = error => console.log(error);

document.getElementById('input').onkeyup = function(e) {
	if(e.keyCode === 13) {
		ws.send(this.value);
        this.value = '';
	}
};
