export const Type ={
    change_name :'change-value',
    change_email : 'change-email',
    change_phone : 'chnage-phone',
    change_password : 'change-password'
}


export const SignupReducers = (state,action)=>{
    console.log(action.payload)
    
    switch(action.type){
        case Type.change_name:
            return{
                ...state,
                name:action.payload
            }
        case Type.change_email:
            return{
                ...state,
                email: action.payload
            }
        case Type.change_phone:
            return{
                ...state,
                phone:action.payload
            }
        case Type.change_password:
            return{
                ...state,
                password: action.payload
            }
        default:
            break;
    }
}