const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class cycle {
    users_list = []
    broadcast() {
        for (var i = 0; i < this.users_list.length; i++) {
            this.users_list[i].send(JSON.stringify(messages_sent))
        }
    }
    add(res) {
        this.users_list.push(res)
    }
    clear() {
        this.users_list = []
    }
}

var messages_sent = []
var msgListener = new cycle

app.get("/", function (req, res) {
    res.sendFile("index.html")
})
app.post("/receiver", function (req, res) {
    msgListener.add(res)
})
app.post("/sender", function (req, res) {
    console.log(req.body)
    var date = new Date()
    var strDate = date.getHours() + ":" + date.getMinutes()
    messages_sent.push({ id: messages_sent.length, time: strDate, user: req.body.name, color: req.body.color, value: req.body.content })
    msgListener.broadcast()
    msgListener.clear()
    res.end()
})

app.post("/logger", function (req, res) {
    res.send(JSON.stringify({ id: messages_sent.length }))
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})