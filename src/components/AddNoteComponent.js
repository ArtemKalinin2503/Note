import React, { Component } from 'react';
import {Link} from 'react-router-dom'; //Для роутинга
import { connect } from 'react-redux'; //connect нужен для связи компонента со store
import store from '../store';
import {getData} from '../reducers'; //импортируем actions

class AddNoteComponent extends Component {

    componentDidMount() {
 
    };

    //Событие клика по кнопке Добавить заметку
    handleClick(e) {
        e.preventDefault();
        let inpTitleValue = this.refs.inputTitleNote.value;
        let inpDescriptionValue = this.refs.inputDescriptionNote.value;
        console.log(inpTitleValue);
        console.log(inpDescriptionValue);
    };

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
            </div>
        )
    }
};

//Для связи со store
const mapStateToProps = (state,ownProps={}) => ({
    id: state.mainReducer.id,
    title: state.mainReducer.title,
    description: state.mainReducer.description,
    apiData: state.mainReducer.fetchResult,
    apiFetching: state.mainReducer.isFetching
});

//Передаем thunk компонент
const mapDispatchToProps = {
    fetchData: getData
}

//Обвернем данный компонент в connect для свзяи с хранилищем
const NoteComponent = connect (
    mapStateToProps,
    mapDispatchToProps
)(AddNoteComponent);

export default NoteComponent;