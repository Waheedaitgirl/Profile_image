import { LOCAL_LOGIN, LOGIN, SIGN_OUT} from '../types';
const initialState = {
    user:null,
    token:null,
    is_logged_in:false
};
const LoginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                user:action.payload.data,
                token:action.payload.access_token,
                is_logged_in:true,
            };
            case 'UPDATE':
                return {
                  ...state,
                  user: action.payload,
                };
        case LOCAL_LOGIN:
            return{
                ...state,
                user:action.payload.data,
                token:action.payload.access_token,
                is_logged_in:true,
            }
        case SIGN_OUT:
            return{
                ...state,
                user:null,
                is_logged_in:false
            }
        default:
            return state;
        }
    }
export default LoginReducer;