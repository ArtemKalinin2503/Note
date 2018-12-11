import * as React from "react";

export default class NoteElementComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: props.el.title,
            description: props.el.description
        };
        this.sendUpdateToRedux = this.props.handleUpdateNote;
    }
    render(){
        return <div key={this.props.el._id}>
                <p>{this.props.el.title}:</p> 
                <p>{this.props.el.description}</p>
                <button onClick={()=>(this.handleUpdateNote(this.props.el._id))}>Изменить</button>
                <div>
                    <input className="inpChangeTitle" type="text" value={this.state.title} onChange={(change)=>(this.handleOnChangeTitle(change))}/>
                    <input className="inpChangeDescription" type="text" value={this.state.description} onChange={(change)=>(this.handleOnChangeDescription(change))}/>
                </div>
            </div>;
    }

    handleOnChangeDescription(change){
        this.setState({
            ...this.state,
            description: change.currentTarget.value
        });
    }
    handleOnChangeTitle(change){
        this.setState({
            ...this.state,
            title: change.currentTarget.value
        });
    }
    handleUpdateNote(id){
        this.sendUpdateToRedux(id, {...this.state});
    }
}