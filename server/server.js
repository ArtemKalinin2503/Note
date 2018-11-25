//Подключим mongoose для работы с MongoDb (npm install mongoose --save)
var mongoose = require('mongoose');
//Подключим express
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

{/*Работа с Mongoose*/}

//Создадим схему данных
const Schema = mongoose.Schema; 

//Опишем схему данных
const NoteSchema = new Schema({
    title: {type: String},
    description: {type: String}
});

//Создадим модель данных и передадим туда схему
const Note = mongoose.model('Note', NoteSchema);

//Передадим модель
const Notes = mongoose.model('Note');

//Создадим подключение к БД (notes - имя БД)
export function setUpConnection() {
    mongoose.connect('mongodb://localhost/notes', {useNewUrlParser:true}, function (err) {
        if (err) throw err;
        console.log ('Successfully connected!!!');
    });
};

//Создадим запрос к БД (метод find выведит все данные из БД)
export function listNotes() {
    return Notes.find();
};

//Создадим запрос который будет создавать новую заметку
export function createNote(data) {
    const note = new Notes({
        title: data.title,
        description: data.description
    });
    return note.save();
};

//Создадим запрос который будет удалять записи из БД
export function deleteNote(id) {
    return Notes.findById(id).remove();
};

//Вызов сервера express
var app = express();

//Переменная для работы с БД
var db;

//Установим соединение с БД
db.setUpConnection();

//Преобразуем данные из БД в Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Метод post будет создавать записи в БД
app.post('/notes', (req, res) => {
    //Вызовим запрос createNote
    db.createNote(req, body).then(data => res.send(data));
    //Создадим новую запись в БД
    db.createNote({ title: 'New note', description: 'Description note' })
});

//Метод get будет вывводить данные из БД
app.get('/notes', (req, res) => {
    //Вызовим запрос listNotes
    db.listNotes().then(data => res.send(data));
});

//Метод delete будет удалять данные из БД
app.delete('/notes/:id', (req, res) => {
    //Вызовим звпрос deleteNote
    db.deleteNote(req.params.id).then(data => res.send(data));
});

//Подключим mongodb где notes - это имя БД
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


{/*Код от нативного метода работы с MongoDB без использования mongoose*/}

// //Создадим post запрос - который создаст коллекцию (в данном случае Заметок) (в Postam выбираем post и создаем новые заметки например "title": "Note Title", "description":"new description")
// app.post('/notes', function (req, res) {
//     //Опишем данные (опишем как должна выглядит новая заметка)
//     var newnote = {
//         title: req.body.title,
//         description: req.body.description
//     };
//     //Создадим коллекцию (в данном случае заметок)
//     db.collection('notes').insert(newnote, function (err, result) {
//         if (err) {
//             console.log(err);
//             return res.sendStatus(500); //Значит проблема на сервере
//         }        
//         res.send(newnote) //Вернуть данные (в данном случае заметки)
//     })  
// })

// //Создадим get запрос - который будет вытаскивать данные из БД
// app.get('/notes', function (req, res) {
//     db.collection('notes').find().toArray(function (err, docs){
//         if (err) {
//             console.log(err);
//             return res.sendStatus(500);
//         }
//         res.send(docs); //Выведим все данные из БД
//     })
// });

// //Создадим get запрос - который будет выводить данные из БД по переданному id в url (например http://localhost:3012/notes/5bef2f383197ba060f78c97f) - где 5bef2f383197ba060f78c97f - это id записи
// app.get('/notes/:id', function (req, res) {
//     db.collection('notes').findOne({ _id: ObjectID(req.params.id) }, function (err, doc) {
//         if (err) {
//             console.log(err);
//             return res.sendStatus(500);
//         }
//         res.send(doc)
//     })
// });

// //Создадим put запрос - который будет обновлять переданные в него данные в БД (в Postman укажем  url http://localhost:3012/notes/5befd6e6e3ee3e0822067b42) -  где цифры это id записи в БД которую мы хотим перезаписать дальше пишем (например "tetle": "new title")
// app.put('/notes/:id', function (req, res) {
//     db.collection('notes').update (
//         {_id: ObjectID(req.params.id) },
//         {title: req.body.title},
//         {description: req.body.description},
//         function (err, result) {
//             if (err) {
//                 console.log(err);
//                 return res.sendStatus(500);
//             }
//             res.sendStatus(200);
//         }
//     )
// });

// //Создадим Delete запрос - который будет удалять запись в БД (например удалим запись через Postman  указав  url в нем  http://localhost:3012/notes/5bef2f383197ba060f78c97f) и выбрав метод delete - удалим запись с данным id
// app.delete('/notes/:id', function (req, res) {
//     db.collection('notes').deleteOne (
//         {_id: ObjectID(req.params.id) },
//         function (err, result) {
//             if (err) {
//                 console.log(err);
//                 return res.sendStatus(500);
//             }
//             res.sendStatus(200);
//         }
//     )
// });

// //Подключим mongodb где myNotes - это имя нашей базы данных 
// MongoClient.connect('mongodb://localhost:27017', function (err, client) {
//     if (err) {
//         return console.log(err);
//     }
//     db = client.db("notes");
//     //Старт сервера только после запуска базы данных
//     app.listen(3012, function() {
//         console.log('Api app started')
//     });
// })

//Команда для запуска mongodb mongod (в отдельной вкладке после запуска сервера)
//Команда для запуска сервера node server.js
//Ссылка на проект http://localhost:3012/notes
