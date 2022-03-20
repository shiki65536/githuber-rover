const AlertProducer = (state, action) => {
    switch(action.type) {
        default:
            return {
                isError: true,
                showMsgBox: true,
                errMsg: 'Unknown Error',
            };
        case 'ERROR_MSG':
            return {
                isError: true,
                showMsgBox: true,
                errMsg: action.payload,
            };
        case 'CANCEL_MSG':
            return {
                ...state,
                showMsgBox: false,
            };
    }
}

export default AlertProducer;