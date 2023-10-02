import { Action } from '@ngrx/store';

export function spinnersReducer(state:string = 'close', action:Action){

    switch(action.type){
        
        case 'start':
            return 'start';
        
        case 'close':
            return 'close';
    }

}