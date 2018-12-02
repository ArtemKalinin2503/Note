Создание заметок на React

Использованные технологии:
React + Redux + Express server + MongoDB + Mongoose

Развертвование проекта:
- https://github.com/ArtemKalinin2503/ExpressMongoDB (описанно как установить локальный сервер Express и установить MongoDB)
- Для работы с базой данных используем Mongoose (для написание запросов из JS) и программу Postman (которая поможет проверять работу сервера и MongoDB)

Опишу подробнее последовательный порядок разработки:

- После выполнения всех необходимых мероприятий описанных в https://github.com/ArtemKalinin2503/ExpressMongoDB, переходим в описание работы нашего сервера Express и MongoDB (server.js):
  - Создаем схему для заполнения данными БД
  - Описываем схему путем указанния в ней какие поля будет содержать каждая новая запись в БД
  - Создадим модель в которую передадим в качестве аргументов имя БД (в данном случае Note) и вторым аргументом имя Схемы    (NoteSchema)
  - Создадим подключение БД к серверу путем описания функции setUpConnection, в данной функции с помощью метода mongoose.connect укажем URL, по которому доступна БД (mongodb://localhost/notes)
  - С помощью функции createNote опишем как будет осуществляться запись в БД 
  - Опишем метод post, в который передадим имя БД (notes) и ранее описанную функцию createNote
  - Опишем метод get, в который также передадим имя БД и функцию listNotes - которая осуществит поиск всех записей в БД 

- Далее опишу работу кода в reducers/index.js (в данном файле описанна работа всех actions, а также так называемые 'thunk' компоненты для работы в данном случае с сетевыми запросами)
  - Создадим все необходимые actions (в данном случае только для работы с сетевыми запросами к БД)
  - В mainReducer - описано что должен делать каждый actions (в данном случае это стандартный подход для создания actions которые будут осуществлять работу с сетевыми запросами)
  - Thunk postData - будет передовать данные в БД:
    - If нужен для проверки полей на заполнение 
    - С помощью axios обратимся к БД и дальше описаны классический подход к реализации post запроса
  - Thunk getData - будем вытаскивать данные из БД:
    - В данном tnunk компоненте описан стандартный код для обращения к БД с помощью axios 

 - Компонент AddNoteComponent который осуществляет рендер всей разметки сайта:
   - В компоненте componentDidMount вызовим наш thunk getData (который мы записали в свойство get,  в mapDispatchToProps)
   - В событие handleClick (которое отработает при нажатие кнопки 'Добавить заметку') получим значение value из input (название заметки и содержание заметки), использую refs чтобы прокинуть контекст (this)
   - Вызовим наш thuck postData (который также передали в свойство post - описанное в mapDispatchToProps) 
     - При вызове данного thunk обратимся к свойствам: title и description и передадим в них значения наших input (таким образом мы запишем данные в БД)  
