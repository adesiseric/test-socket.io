var socket = io.connect('http://localhost:8080', {'forceNew': true});

socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

function render (data) {
    var html = data.map(function (item, index) {
        return (`<div>
                    <strong>${item.author}</strong>:
                    <em>${item.text}</em>
                </div>`);
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

function addMessage (form) {
    var payload = {
        author: form.user.value,
        text: form.text.value
    };

    socket.emit('new-message', payload);

    return false;
}