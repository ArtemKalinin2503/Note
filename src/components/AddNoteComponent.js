import React, { Component } from 'react';
import {Link} from 'react-router-dom'; //Для роутинга
import { connect } from 'react-redux'; //connect нужен для связи компонента со store
import store from '../store';
import {getData} from '../reducers'; //импортируем actions

class AddNoteComponent extends Component {
    //Компонент componentDidMount сработает сразу после загрузки
    componentDidMount() {
 
    }

    render() {
        return (
            <div className="wrapper-note__component">
                <form className="note__form">
                    <label>
                        <p>Название заметки</p>
                        <input type="text" className="note__title"/>
                    </label>
                    <label>
                        <p>Описание заметки</p>
                        <textarea className="note__description"></textarea>
                    </label>
                    <button className="note__add-button">Добавить заметку</button>
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