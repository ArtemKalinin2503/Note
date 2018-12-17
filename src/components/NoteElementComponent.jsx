import * as React from "react";

//Компонент который будет выводить input (для изменения данных)
export default class NoteElementComponent extends React.Component {
    //Конструктор для изменния переданных состояний
    constructor(props) {
        super(props);
        this.state = {
            title: props.el.title,
            description: props.el.description,
            date: props.el.date
        };
        //Вызовим событие handleUpdateNote - которое вызовит thunk getPut (который записан в свойство put в mapDispatchToProps)
        this.sendUpdateToRedux = this.props.handleUpdateNote;
        this.sendDelete = this.props.handleDeleteNote;
    }

    render(){
        return <div key={this.props.el._id}>
                    {/*Вывод всех данных из БД*/}
                    <p>{this.props.el.title}:</p> 
                    <p>{this.props.el.description}</p>
                    <p>{this.props.el.date}</p>
                    {/*При клике на кнопку вызовим событие handleUpdateNote которое вызовит thunk getPut*/}
                    <button onClick={()=>(this.handleUpdateNote(this.props.el._id))}>Изменить</button>
                    <button onClick={()=>(this.handleDelete)(this.props.el._id)}>Удалить</button>
                    <div className="modalChangeNote">
                        <input className="inpChangeTitle" type="text" value={this.state.title} onChange={(change)=>(this.handleOnChangeTitle(change))}/>
                        <textarea className="inpChangeDescription" value={this.state.description} onChange={(change)=>(this.handleOnChangeDescription(change))}></textarea>
                        <input className="inpChangeDate" type="date" value={this.state.date} onChange={(change)=>(this.handleOnChangeDate(change))}/>
                    </div>
                </div>;
    }

    //Событие ввода новых данных input title
    handleOnChangeTitle(change){
        this.setState({
            ...this.state,
            title: change.currentTarget.value
        });
    }

    //Событие ввода новых данных input description
    handleOnChangeDescription(change){
        this.setState({
            ...this.state,
            description: change.currentTarget.value
        });
    }

     //Событие ввода новых данных input date
     handleOnChangeDate(change){
        this.setState({
            ...this.state,
            date: change.currentTarget.value
        });
    }
    
    //Событие кнопки Изменить
    handleUpdateNote(id){
        this.sendUpdateToRedux(id, {...this.state});
    }

    //Соьытие кнопки Удалить
    handleDelete(id){
        this.sendDelete(id);
    }
}