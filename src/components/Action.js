import * as ActionType from '../ActionType';
import {Toaster} from './Toaster/index';
import React from 'react';

let newIdDigit = 0;

export const toggleCheckBox = data => {
	return({
			type: ActionType.Toggle_Check_Box,
			payload: data
		})
}

export const addToDoItem = data => {
	//Api call will go here and method can be call accordingly, 
	//like onRequestAddToDoUtem, onSuccessAddToDoItem, OnFailureAddToDoItem
	data ? data.id = 'new-list-item-'+ newIdDigit : '';
	newIdDigit++;
	<Toaster message="Item Added SuccessFully"/>
	return ({
			type: ActionType.Add_To_Do_Item,
			payload: data
		})
}

export const deleteToDoItem = data => {
	<Toaster message="Item deleted SuccessFully"/>
	//Api call will go here and method can be call accordingly, 
	//like onRequestDeleteToDoItem, onSuccessDeleteToDoItem, OnFailureDeleteToDoItem
	return({
			type: ActionType.Delete_To_Do_Item,
			payload: data
		})
}

export const filterList = tab => {
	return({
		type: ActionType['Filter_Tab_'+ tab]
	})
}

export const editToDoItem = listItem => {
	return({
		type: ActionType.Edit_To_Do_Item,
		payload: listItem
	})
}