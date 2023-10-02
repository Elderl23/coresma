import { Action } from '@ngrx/store';

export const START = '[spinner] Start';
export const CLOSE = '[spinner] Close';

export class StartAction implements Action{
    readonly type = START;
}

export class CloseAction implements Action{
    readonly type = CLOSE;
}