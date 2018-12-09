import React, { Component } from 'react';
import {Link} from 'react-router-dom'; //Для роутинга
import { connect } from 'react-redux'; //connect нужен для связи компонента со store
import store from '../store';
import {getData, postData, getPut} from '../reducers'; //импортируем actions

class AddNoteComponent extends Component {
    
    //Отработвает при загрузке страницы
    componentDidMount() {
       this.props.get(); //Вызовим thunk getData (передали в mapDispatchToProps) данный компонент просто выведит все значения из БД
    };

    //Кнопка Добавить заметку
    handleClick(e) {
        e.preventDefault();
        let inpTitleValue = this.refs.inputTitleNote.value;
        let inpDescriptionValue = this.refs.inputDescriptionNote.value;
        //Вызовим компонент thunk 'post' (передали в mapDispatchToProps)
        //Запишем в указанные состояния значения input (метод post описали в server.js где описали что при вызове метода post будет отрабатывать метод createNote, в которой мы описали какие состояния принимает данный метод)
        this.props.post({
            title: inpTitleValue, 
            description: inpDescriptionValue
        });
    };

    //Кнопка изменить запись
    handleUpdateNote() {
        this.props.put();
    }

    render() { 
        return (
            <div className="wrapper-note__component">
                <form className="note__form">
                    <label>
                        <p>Название заметки</p>
                        <input type="text" className="note__title" ref="inputTitleNote"/>
                    </label>
                    <label>
                        <p>Описание заметки</p>
                        <textarea className="note__description" ref="inputDescriptionNote"></textarea>
                    </label>
                    <button className="note__add-button" onClick={this.handleClick.bind(this)}>Добавить заметку</button>
                </form>
                {/*С помощью цикла map выведим все данные из БД где title и description  имя свойств*/}
                {this.props.apiData.map((el,i) =>
                    <div key={i}>
                        <p>{el.title}:</p> 
                        <p>{el.description}</p>
                        <button onClick={this.handleUpdateNote}>Изменить</button>
                    </div>
                )}
            </div>
        ) 
        
    }
};

//Для связи со store
const mapStateToProps = (state,ownProps={}) => ({
    apiData: state.mainReducer.fetchResult,
    apiFetching: state.mainReducer.isFetching
});

//Передаем thunk компонент
const mapDispatchToProps = {
    post: postData, //thunk postData - для записи данных в БД
    get: getData, //thunk getData - для получения данных из БД
    put: getPut //thunk getPut - для изменения данных из БД
}

//Обвернем данный компонент в connect для свзяи с хранилищем
const NoteComponent = connect (
    mapStateToProps,
    mapDispatchToProps
)(AddNoteComponent);

export default NoteComponent;