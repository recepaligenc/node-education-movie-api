const http = require('http');
const socket_io = require('socket.io');

const server = http.createServer((req, res) =>{
    res.end('hey');
});

server.listen(3000);

const io = socket_io.listen(server);

io.sockets.on('connection', (socket)=>{
    console.log(('Kullanıcı bağlandı.'));

    socket.on('disconnect', ()=>{
        console.log('Kullanıcı ayrıldı');
    });

    // events
    socket.on('new-user', (newUser)=>{
        console.log(newUser.name);
        socket.broadcast.emit('user', {name: newUser.name});
    });

});
