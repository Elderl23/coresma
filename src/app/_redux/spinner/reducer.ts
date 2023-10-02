import { Action } from '@ngrx/store';
import { START, CLOSE } from '../spinner/actions'

export function spinnersReducer(state:Boolean=false, action:Action){
    switch(action.type){ 
        case START:
            return true;
        
        case CLOSE:
            return false;

        default:
            return false;
    }
}