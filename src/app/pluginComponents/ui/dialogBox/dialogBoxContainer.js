import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

class DialogContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
        this.toggleDialog = this.toggleDialog.bind(this);
    }

componentDidUpdate(prevProps, prevState){
  if(prevProps.isopen !== this.props.isopen){
    this.setState({
        visible: this.props.isopen
    });
  }
}
    toggleDialog() {
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        return (
            <div>
                 <button className="k-button" onClick={this.toggleDialog}></button>
                {this.state.visible && <Dialog title={"Please confirm"} onClose={this.toggleDialog}>
                    <p style={{ margin: "25px", textAlign: "center" }}>Are you sure you want to continue?</p>
                    <DialogActionsBar>
                        <button className="k-button" onClick={this.toggleDialog}>No</button>
                        <button className="k-button" onClick={this.toggleDialog}>Yes</button>
                    </DialogActionsBar>
                </Dialog>}
            </div>
        );
    }
}

export default DialogContainer
