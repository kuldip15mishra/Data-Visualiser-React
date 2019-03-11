import React, {
    Component,
    Fragment
} from "react";
import {
    connect
} from 'react-redux'
import {
    SignalFunctions
} from './SignalFunctions';
import {
    RetrivalMode,
    LineWidth,
    LineSymbol
} from "../constants/Constants"
import * as MenuActions from '../actions/index';
import NotificationContainer from "../pluginComponents/ui/notification/NotificationContainer";
import * as shortid from 'shortid';
import * as addSeriesActions from '../addSeries/addSeriesActions';
import CommonUtils from '../commonutils/CommonUtils'

class SignalFunctionsContainer extends Component {

    expression;
    state = {
        expressionValue: "",
        name: "",
        description: "",
        unit: "",
        tagPath:"",
        isShowForm: false,
        isShowConfigureButton: true,
        isValidated: false,
        isFormReset: false,
        buttonCaption: "Add to Trend",
        isupdated:false,
        currentSeriesToAdd :{}
    }


    onBackClick = (e) => {
        this.props.setMenuStore({
            isShowSignalPropertiesContainer: false,
            isShowSignalFunctionsContainer: false,
            isShowTagBrowserContainer: false,
            isClearContainer: true
        });
        //this.props.resetMenu();
      
        this.reset();
        
    }

    reset() {
        this.expression = "";
        this.setState({

            expressionValue: this.expression,
            name: "",
            description: "",
            unit: "",
            tagPath:"",
            isShowForm: false,
            isShowConfigureButton: true,
            isValidated: false,
            buttonCaption: "Add to Trend",
            isupdated:true
        });
    }


    OnConfigureClick = () => {
        this.setState({
            isShowForm: true,
            isShowConfigureButton: false
        });
    }

    onUpdateTrend =() =>{
        this.setState({
            isShowForm: false,
            isShowConfigureButton: true,
            isFormReset: true
        }, () => {
            
            let id =this.props.signalMenuSelectedTagData.id
            let series =this.mapToDefaultSeriesValues(this.expression);
            series.expressionValue= this.expression;
           
            let index = this.arrayObjectIndexOf(this.props.seriesListData,id,'id');
            
            if (index != -1) {
              
               this.setState({currentSeriesToAdd :series},()=>{
                this.props.deleteSeries(index,true);
               })
            }
          
            //
            this.props.setOnlyMenuSelectedTagData({
                data: series,
            
              });
            this.reset();
        });
    }

 arrayObjectIndexOf=(myArray, searchTerm, property)=> {
        for(var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }
    OnAddToTrend = () => {

        this.setState({
            isShowForm: false,
            isShowConfigureButton: true,
            isFormReset: true
        }, () => {

            this.props.addSeries(this.mapToDefaultSeriesValues(this.expression,null))
            
            this.reset();
        });
    }

    onTagNameChange = (e) => {

        this.setState({
            name: e.target.value
        })
    }
    onDescriptionChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    onUOMChange = (e) => {
        this.setState({
            unit: e.target.value
        })
    }

    onChangeHandle = (val) => {

        this.expression = val;
        this.setState({

            expressionValue: this.expression
        });
    }


    componentDidUpdate(prevProps, prevState) {

        if(prevProps.isExpressionRemoved !== this.props.isExpressionRemoved &&  this.props.isExpressionRemoved){
            if(this.state.currentSeriesToAdd && this.state.currentSeriesToAdd.name )
            {
                this.props.addSeries(this.state.currentSeriesToAdd);
                this.setState({currentSeriesToAdd :{}})
            }
        }
        if (prevProps.isShowFormStore !== this.props.isShowFormStore) {

            this.setState({
                isShowForm: this.props.isShowFormStore,
                isShowConfigureButton: this.props.isShowisShowConfigureButtonStore,
                buttonCaption: this.props.isShowFormStore ? "Update to Trend" : "Add to Trend"
            });

        }  //signalMenuSelectedTagData
        if (prevProps.signalMenuSelectedTagData !== this.props.signalMenuSelectedTagData) {

            if (!CommonUtils.isEmpty(this.props.signalMenuSelectedTagData)) {
                //this.expression =  this.props.signalMenuSelectedTagData.expressionValue;
                if (this.props.signalMenuSelectedTagData.expressionValue != undefined)
                  //  this.expression = this.expression + "" + this.props.signalMenuSelectedTagData.expressionValue
                    if(!this.state.isupdated)
                  {this.expression =this.props.signalMenuSelectedTagData.expressionValue ?this.props.signalMenuSelectedTagData.expressionValue  :this.expression;
                  }
                
                    this.setState({
                    expressionValue: this.expression == undefined ? "" : this.expression,
                    name: this.state.isupdated ? "": this.props.signalMenuSelectedTagData.name,
                    description: this.props.signalMenuSelectedTagData.description,
                    tagPath: this.props.signalMenuSelectedTagData.tagPath,
                    unit: this.props.signalMenuSelectedTagData.unit,
                    isupdated :false
                });
            }

        }

    }
    mapToDefaultSeriesValues(exp ,ID,color) {
        
        let _id;
        if(ID === null || ID === undefined)
        {_id = shortid.generate();}else{
            _id=ID;
        }
        return {
            isExpression: true,
            name: this.state.name,
            expressionValue: this.expression,
            description: this.state.description,
            unit: this.state.unit,
            tagPath:this.state.tagPath,
            colorCode: color ?color :CommonUtils.suggestColorHex(this.props.seriesListData),
            lineWidth: LineWidth["LineBig"],
            lineSymbol: LineSymbol["LineCircle"],
            retrivalMode: RetrivalMode["RAW"],
            enableSubmit: "",
            visible: true,
            id: _id
        }
    }
    render() {

        var { name } = this.state;
        var enabled =
            (name && name.length > 0 && this.expression &&
                this.expression.length > 0)
        return <Fragment>
            <SignalFunctions {...this.state}
                OnConfigureClick={this.OnConfigureClick}
                isShowForm={this.state.isShowForm}
                isShowConfigureButton={this.state.isShowConfigureButton}
                onBackClick={this.onBackClick}
                expression={this.expression}
                onTagNameChange={this.onTagNameChange}
                onDescriptionChange={this.onDescriptionChange}
                onUOMChange={this.onUOMChange}
                OnConfigureHandle={this.OnConfigureHandle}
                OnAddToTrend={this.OnAddToTrend}
                onChangeHandle={this.onChangeHandle}
                isEditing ={this.props.isEditing}
                isValidated={enabled}
                onUpdateTrend ={this.onUpdateTrend}
            />
            <NotificationContainer width={1000}
                height={50}
                position={{ top: 0, left: 500 }}
                stacking={'down'}
                ref={a => this.notification = a} />
        </Fragment>
    }
}
function mapStateToProps(state) {
    return {
        isEditing :state.menu.isEdit,
        seriesListData: Object.assign([], state.addSeriesReducer.ChartConfig),
        signalMenuSelectedTagData: Object.assign({}, state.menu.signalMenuSelectedTagData),
        isShowFormStore: state.menu.isShowForm,
        isShowisShowConfigureButtonStore: state.menu.isShowConfigureButton,
        isExpressionRemoved :state.addSeriesReducer.isExpressionRemoved
    };
}


const mapDispatchToProps = dispatch => {
    return {
        setMenuStore: menuState => dispatch(MenuActions.setSignalMenuState(menuState)),
        addSeries: series => dispatch(addSeriesActions.addSeries(series)),
        resetMenu: () => dispatch(MenuActions.resetMenu()),
        updateSeries: (series) => dispatch(addSeriesActions.updateSeries(series)),
        setOnlyMenuSelectedTagData: menuData => dispatch(MenuActions.setOnlySignalMenuData(menuData)),
        deleteSeries: (series,isexpressiondeleted) => dispatch(addSeriesActions.deleteSeries(series,isexpressiondeleted))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignalFunctionsContainer)