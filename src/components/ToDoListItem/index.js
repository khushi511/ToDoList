import React from 'react';
import moment from 'moment'

const ToDoListItem = ({onCheckBoxClick, onDeleteListItem, openEditListItem, listItem}) => {
	let completed = listItem.completed;
	return(
			<li className="todo-list-card flex">
				<input className="styled-checkbox" type="checkbox" checked={completed} onChange={e => {onCheckBoxClick({e, listItem})}}/> 
				<label className="label" htmlFor="checkbox"></label>
				<div  className="details" onClick={e => openEditListItem(e, listItem)}>
					<div className="flex title-section align-center">
						<h3 style={{textDecoration:completed ? 'line-through': 'none'}} >{listItem.title}</h3>
						{listItem.reminder && <a className="flex align-center"><img className="clock-icon" src="../../../assets/clock.png"/> {moment(listItem.reminder, "DD/MM/YYYY HH:mm").format('DD/MM/YYYY hh:mm A')}</a>}
					</div>
					<p style={{textDecoration: completed ? 'line-through': 'none'}} >{listItem.description}</p>
				</div>
				<a className="delete-item" title="Delete" onClick={e => {onDeleteListItem({e, listItem})}}>X</a>
			</li>
		)
}

export default ToDoListItem;