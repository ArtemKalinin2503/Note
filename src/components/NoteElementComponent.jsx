import * as React from "react";

//Компонент который будет выводить input (для изменения данных)
export default class NoteElementComponent extends React.Component {
    //Конструктор для изменния переданных состояний
    constructor(props) {
        super(props);
        this.state = {
            title: props.el.title,
            description: props.el.description
        };
        //Вызовим событие handleUpdateNote - которое вызовит thunk getPut (который записан в свойство put в mapDispatchToProps)
        this.sendUpdateToRedux = this.props.handleUpdateNote;
    }
    render(){
        return <div key={this.props.el._id}>
                <p>{this.props.el.title}:</p> 
                <p>{this.props.el.description}</p>
                {/*При клике на кнопку вызовим событие handleUpdateNote которое вызовит thunk getPut*/}
                <button onClick={()=>(this.handleUpdateNote(this.props.el._id))}>Изменить</button>
                <div>
                    <input className="inpChangeTitle" type="text" value={this.state.title} onChange={(change)=>(this.handleOnChangeTitle(change))}/>
                    <input className="inpChangeDescription" type="text" value={this.state.description} onChange={(change)=>(this.handleOnChangeDescription(change))}/>
                </div>
            </div>;
    }

    //Событие ввода данных input title
    handleOnChangeTitle(change){
        this.setState({
            ...this.state,
            title: change.currentTarget.value
        });
    }

    //Событие ввода данных input description
    handleOnChangeDescription(change){
        this.setState({
            ...this.state,
            description: change.currentTarget.value
        });
    }
    
    //Событие кнопки Изменить
    handleUpdateNote(id){
        this.sendUpdateToRedux(id, {...this.state});
    }
}