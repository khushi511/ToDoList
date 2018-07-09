import React from 'react';
import {connect} from 'react-redux'
import ToDoListItem from '../ToDoListItem/index'
import {toggleCheckBox, deleteToDoItem, addToDoItem, filterList} from '../Action'
import '../../assets/common.less'
import '../../assets/to-do-list.less'
import * as AppConstants from '../../Constants'
import AddList from '../AddList/index';
import Modal from '../Modal/index';
import moment from 'moment';

class ToDoList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			activeTab: AppConstants.Tabs.All,
			editPanelActive: false,
			listItem: {}
		}
		this.runReminder = this.runReminder.bind(this);
		this.onTabChanged = this.onTabChanged.bind(this);
		this.openEditListItem = this.openEditListItem.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	runReminder(id, dateTime){
		let currentDateTime = moment();
		let givenDateTime  = moment(dateTime, "DD/MM/YYYY HH:mm");
		let diff = Math.floor((givenDateTime - currentDateTime)/1000);
		if(diff >= 0){
			this.id = setTimeout(function(){
				alert("pending Reminder at dateTime" + dateTime);
			}, diff*1000);
		}
	}

	openEditListItem(e, listItem){
		let newObj = Object.assign({}, this.state, {editPanelActive: true}, {listItem: listItem});
		this.setState(newObj);
	}

	onTabChanged(e){
		this.setState({
			activeTab: e.target.id
		})
		this.props.filterList && this.props.filterList(e.target.id);
	}

	onClose(){
		this.setState({editPanelActive: false})
	}
	
	render(){
		return(
			<section className="todo-list-section">
				<button className="add-list-button" onClick={this.openEditListItem}>+</button>
				{
					this.state.editPanelActive && 
					<Modal onClose={this.onClose}>
						<AddList onClose={this.onClose} listItem={this.state.listItem} />
					</Modal>
				}
				<a id={AppConstants.Tabs.All} onClick={this.onTabChanged}>All</a>
				<a id={AppConstants.Tabs.Completed} onClick={this.onTabChanged}>completed</a>
				<a id={AppConstants.Tabs.InComplete} onClick={this.onTabChanged}>In complete</a>
				<ul className="todo-list">
				{
					this.props.toDoList && this.props.toDoList.length > 0 && this.props.toDoList.map((listItem, i) => {
						//remove previous settimout function if available 
						typeof(this[listItem.id]) == 'function' && clearTimeout(this[listItem.id]); 
						//setTimer for reminedr
						listItem.reminder && this.runReminder(listItem.id, listItem.reminder);
						return( 
							<ToDoListItem 
								key={"listItem-" + i} 
								listItem={listItem}
								onCheckBoxClick={this.props.toggleCheckBox} 
								openEditListItem={this.openEditListItem}
								onDeleteListItem={this.props.deleteToDoItem} />
							)
					}, this)
				}
				</ul>
			</section>
			)
	}
}

const mapStateToProps = state => ({
	toDoList: state.toDoList.toDoList
})

const mapDispatchToProps = dispatch => ({
	toggleCheckBox: data => dispatch(toggleCheckBox(data)),
	deleteToDoItem: data => dispatch(deleteToDoItem(data)),
	addToDoItem: () => dispatch(addToDoItem),
	filterList: tab => dispatch(filterList(tab))
})

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);