import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {AppReducerState} from "./store/reducers/appReducer";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private store: Store<AppReducerState>) { }

  getAllState() {
    return this.store.select('appReducer');
  }
  updateState(obj) {
    this.store.dispatch({
      type: obj.action,
      payload: obj.payload
    });
  }
}
