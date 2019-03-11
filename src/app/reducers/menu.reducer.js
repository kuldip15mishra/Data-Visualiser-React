import * as types from '../actions/index';


export default (state = {
    isShowSignalPropertiesContainer: false,
    isShowSignalFunctionsContainer: false,
    isShowTagBrowserContainer: false,
    isClearContainer: false,
    signalMenuSelectedTagData:emptySignalData(),
    isShowForm :false ,
    isShowConfigureButton :true,
    isEdit :false
}, action) => {

    switch (action.type) {


        case types.SET_SIGNAL_MENU_STATE:

            return {
                ...state,
                isShowSignalPropertiesContainer: action.payload.isShowSignalPropertiesContainer,
                isShowSignalFunctionsContainer: action.payload.isShowSignalFunctionsContainer,
                isShowTagBrowserContainer: action.payload.isShowTagBrowserContainer,
                isClearContainer: false,
                signalMenuSelectedTagData: emptySignalData(),
                isfetching: false,
                isEdit:action.payload.isEdit
            }

        case types.SET_MENU_DATA:
            
            return {
                ...state,
                signalMenuSelectedTagData: action.payload.data,
                isShowForm :action.payload.isShowForm ,
                isShowConfigureButton :action.payload.isShowConfigureButton,
                isfetching: false,
                isEdit:true
            }
            case types.SET_ONLY_MENU_DATA:
            
            return {
                ...state,
                signalMenuSelectedTagData: action.payload.data,
              
            }

            case types.RESET_MENU:
            
            return {
                ...state,
                signalMenuSelectedTagData: emptySignalData(),
                isShowForm :false ,
                isShowConfigureButton :true,
                isfetching: false,
                isEdit:false
            }
        default:
            return state;
    }
}

const emptySignalData =()=>{

    return {
        name :"",
        unit :"",
        description :"",
        isExpression :false,
        
    }
}