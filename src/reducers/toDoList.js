//import { VisibilityFilters } from '../actions'
import React from 'react';
import * as ActionType from '../ActionType';
import AddList from '../components/AddList/index';

const initialToDoList = [
			{
				id: 'list-item-1',
				title: 'Learn Html',
				description: 'Learn html and make sample webpage using html5 semantics',
				completed: false,
				reminder: null
			},{
				id: 'list-item-2',
				title: 'Learn Less',
				description: 'Learn Css and then Less, so that it will be easy to understand Css working',
				completed: true,
				reminder: '08-07-2018 19:00'
			},{
				id: 'list-item-3',
				title: 'Learn Javascript',
				description: 'Learn Javascript within 4 days and practice it too. Start with basic and then'+
				'go with advance',
				completed: false,
				reminder: '08-07-2018 19:05'
			},{
				id: 'list-item-4',
				title: 'Make website',
				description: 'Post learning all above 4 , lets make some awesome website using HTML, less'+
				' and javascript',
				completed: false,
				reminder: '08-07-2018 19:05'
			}
		]

const initialState = {
	toDoList: initialToDoList,
	listActive: true
};

export default function toDoList(state = initialState, action) {

switch (action.type) {

    case ActionType.Toggle_Check_Box:
      return ({
		      	toDoList: state.toDoList && state.toDoList.length > 0 ? state.toDoList.map(item => {
				      	if(action.payload.listItem.id == item.id){
				      		item.completed = !item.completed;
				      	}
				      	return item;
		      		})
      				: state
      	})
      break;

     case ActionType.Delete_To_Do_Item:
      	{
      		return ({
      			toDoList: state.toDoList && state.toDoList.length > 0 ? state.toDoList.filter(item => {
		      			return action.payload.listItem.id !== item.id;
		      			})
      					: state
      		})
		}
      break;

      case ActionType.Add_To_Do_Item:
      	{
      		return ({
      			toDoList: state.toDoList && state.toDoList.length > 0 ? [action.payload].concat(state.toDoList)
      			: state.toDoList.push(action.payload)
      		})
      	}
      break;

      case ActionType.Edit_To_Do_Item:
      {
      	return ({
      		toDoList: state.toDoList && state.toDoList.length > 0 ? [action.payload].concat(state.toDoList.filter(item => {
      			return (action.payload.id != item.id)
      		}))
      		: state.toDoList.push(action.payload)
      	})
      }
      break;

   //    case ActionType.Filter_Tab_All:
	  //     {
	  //     	return({

	  //     	})
	  //     }
	  // break;

	     case ActionType.Filter_Tab_Completed:
	      {
	      	return(Object.assign({},{
	      		toDoList: state.toDoList && state.toDoList.length > 0 && state.toDoList.filter(item => {
	      			return item.completed;
	      		})
	      	}))
	      }
	  break;

	     case ActionType.Filter_Tab_InComplete:
	      {
	      	return(Object.assign({},{
	      		toDoList: state.toDoList && state.toDoList.length > 0 && state.toDoList.filter(item => {
		      		return !item.completed;
		      	})
	      	}))
	      }
	  break;
	  case ActionType.Show_AddOrEdit_List_Item:
	  {
	  	return(Object.assign({}, state, {
	  		listActive: false
	  	}))
	  }
	  break;
	  case ActionType.Open_AddOrEdit_List_Item:
	  {
	  	return (<AddList lisItem={action.payload.listItem} />)
	  }
	  break;

    default:
      return state
  }
}
