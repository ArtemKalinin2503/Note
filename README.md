Создание заметок на React

Использованные технологий:
React + Redux + Express server + MongoDB + Mongoose

Развертвование проекта:
- https://github.com/ArtemKalinin2503/ExpressMongoDB (описанно как установить локальный сервер Express и установить MongoDB)
- Для работы с базой данных используем Mongoose (для написание запросов из JS) и программу Postman (которая поможет проверять работу сервера и MongoDB)
- В основе компонент AddNoteComponent который осуществляет рендер всей разметки сайта, а также описание событий на элементах страницы типа полей ввода (input) с написание Заголовка и Содержания разметки.

Опишу подробнее порядок разработки:

- После выполнения всех необходимых мероприятий описанных в https://github.com/ArtemKalinin2503/ExpressMongoDB, переходим в описание работы нашего сервера Express и MongoDB (server.js):
  - Создаем схему для заполнения данными БД
  - Описываем схему путем указанния в ней какие поля будет сожержать каждая новая запись в БД
  - Создадим модель в которую передадим в качестве аругументов имя БД (в данном случае Note) и вторым аргументом имя Схемы    (NoteSchema)
  - Создадим подключение БД к серверу путем описания функции setUpConnection, в данной функции с помощью метода mongoose.connect укажем URL . по которому доступна БД (mongodb://localhost/notes)
  - С помощью функции createNote опишем как будет осуществляться запись в БД 
  - Опишем метод post, в который передадим имя БД (notes) и ранее описанную функцию createNote
  - Опишем метод get, в который также передадим имя БД и функцию listNotes - которая осуществит поиск всех записей в БД 
