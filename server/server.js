//Подключим express
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Создадим post запрос - который создаст коллекцию (в данном случае Заметок)
app.post('/notes', function (req, res) {
    //Опишем данные (опишем как должна выглядит новая заметка)
    var newnote = {
        title: req.body.title,
        description: req.body.description
    };
    //Создадим коллекцию (в данном случае заметок)
    db.collection('notes').insert(newnote, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500); //Значит проблема на сервере
        }        
        res.send(newnote) //Вернуть данные (в данном случае заметки)
    })  
})

app.get('/', function (req, res) {
   res.send('Hello Api') 
});

//Подключим mongodb где myNotes - это имя нашей базы данных 
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) {
        return console.log(err);
    }
    db = client.db("notes");
    //Старт сервера только после запуска базы данных
    app.listen(3012, function() {
        console.log('Api app started')
    });
})

//Команда для запуска сервера node server.js
//Команда для запуска mongodb mongod (в отдельной вкладке после запуска сервера)