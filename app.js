var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static("public"));
// đọc dữ liệu ng dùng gửi lên là json
app.use(bodyParser.json()); 
// đọc dữ liệu ng dùng gửi lên là data form
app.use(bodyParser.urlencoded({ extended: true}));

app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on("connection", function(socket){
    console.log("co ng ket noi: "+socket.id);

    socket.on("disconnect", function(){
        console.log(socket.id+ " ngat ket noi");
    })

    socket.on("csd", function(data){
        console.log(data);
        io.sockets.emit("ssd", data);
    })
    
})

app.get("/", function(req, res){
    res.render("index");
})