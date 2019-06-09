const http = require('http');
const socket_io = require('socket.io');

const server = http.createServer((req, res) =>{
    res.end('hey');
});

server.listen(3000);

const io = socket_io.listen(server);

/*
io.sockets.on('connection', (socket)=>{
    console.log(('Kullanıcı bağlandı.'));
    //console.log(socket);

    socket.on('disconnect', ()=>{
        console.log('Kullanıcı ayrıldı');
    });

    // events
    socket.on('new-user', (newUser)=>{
        console.log(newUser.name);
        socket.broadcast.emit('user', {name: newUser.name});
    });

});
*/

const io93 = io.of('/93creative');
io93.on('connection', (socket)=>{
    console.log(('Kullanıcı bağlandı. 93creative'));

    socket.on('disconnect', ()=>{
        console.log('Kullanıcı ayrıldı 93creative');
    });

    // events
    socket.on('new-user', (newUser)=>{
        console.log(newUser.user_name);

        socket.broadcast.emit('new join', {user_name: newUser.user_name, room_name: 'public'});

        socket.join(newUser.room_name, ()=>{
            console.log(newUser.user_name, ' has login to room.');

            //io.sockets.adapter.rooms[newUser.room_name].length;
            let rooms_user_count = io93.adapter.rooms;
            console.log(rooms_user_count);

            socket.to(newUser.room_name).emit('new join', {
                user_name:newUser.user_name,
                room_name:newUser.room_name
            });
        });

    });

    socket.on('leave-user', (leavedUser)=>{
        console.log(leavedUser.user_name);

        socket.leave(leavedUser.room_name, ()=>{
            console.log(leavedUser.user_name, ' has log out from ' + leavedUser.room_name + 'room.');

            //io.sockets.adapter.rooms[newUser.room_name].length;
            let rooms_user_count = io93.adapter.rooms[leavedUser.room_name].length;
            console.log(rooms_user_count);

            socket.to(leavedUser.room_name).emit('log-out', {
                user_name:leavedUser.user_name,
                room_name:leavedUser.room_name
            });
        });

    });

});