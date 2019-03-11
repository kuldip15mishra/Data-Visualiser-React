export const LOADING = 'LOADING';
export const loading = (status) => ({ type: LOADING,payload :status });


export const SET_SIGNAL_MENU_STATE ='SET_SIGNAL_MENU_STATE';
export const setSignalMenuState =(menuState)=>({
    type :SET_SIGNAL_MENU_STATE,
    payload :menuState
})


export const SET_MENU_DATA ='SET_MENU_DATA';
export const setSignalMenuData =(menuData)=>({
    type :SET_MENU_DATA,
    payload :menuData
})

export const SET_ONLY_MENU_DATA ='SET_ONLY_MENU_DATA';
export const setOnlySignalMenuData =(menuData)=>({
    type :SET_ONLY_MENU_DATA,
    payload :menuData
})


export const RESET_MENU ='RESET_MENU';
export const resetMenu =()=>({
    type :RESET_MENU,
})


export const ISEVENT_RANGESLIDER_TRIGGER = 'ISEVENT_RANGESLIDER_TRIGGER'
export const isEvent_RangeSlider_Trigger =(triggerType)=>({
    type :ISEVENT_RANGESLIDER_TRIGGER,
    payload :triggerType
})