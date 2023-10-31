export const Type = {
    change_name: 'change-name',
    chanage_category: 'chanage-category',
    change_price: 'change-price',
    change_image : 'change-images'
}

export const createReducer = (state,action) =>{
    switch(action.type){
        case Type.change_name:
            return{
                ...state,
                name:action.payload
            }
        case Type.chanage_category:
            return{
                ...state,
                category:action.payload
            }
        case Type.change_price:
            return{
                ...state,
                price:action.payload
            }
        case Type.change_image:
            return{
                ...state,
                image:action.payload
            }
        default:
            break;
    }
}