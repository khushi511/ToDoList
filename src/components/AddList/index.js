import React from 'react'
import { connect } from 'react-redux'
import { addToDoItem, editToDoItem } from '../Action'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-dates/initialize';
import { updateState, isEmptyOrNull } from '../../infrastructure/utils';
import { SingleDatePicker } from 'react-dates';
import '../../assets/date-picker.less';
import '../../assets/add-list.less';
import TimePicker from 'rc-time-picker';
import '../../assets/time-picker.less';


class AddList extends React.Component{
	constructor(props){
		super(props);
		let reminder = this.props.listItem && this.props.listItem.reminder || null;
		this.state = {
			id: this.props.listItem && this.props.listItem.id || null,
			title: this.props.listItem && this.props.listItem.title ||'',
			description: this.props.listItem && this.props.listItem.description || '',
			completed: this.props.listItem && this.props.listItem.completed || false,
			reminder: reminder,
			date: reminder && moment(reminder, "DD/MM/YYYY HH:mm") || "",
			time: reminder && moment(reminder, "DD/MM/YYYY hh:mm a") || moment()
		}

		this.handleChange = this.handleChange.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.onTimeChange = this.onTimeChange.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.onSave = this.onSave.bind(this);	
	}
	handleChange(e) {		
		updateState(this, {[e.target.id]: e.target.value});
	}

	onDateChange(date){
		updateState(this, {date});
	}

	onTimeChange(time){
		updateState(this, {time})
	}

	validateInput(){
		let error = {};
		isEmptyOrNull(this.state, 'title', error, "Title is Mandatory");
		isEmptyOrNull(this.state, 'description', error, "Title is Mandatory");
		updateState(this, {error});
		return Object.keys(error).length == 0;
	}
	onSave(){
		if(this.validateInput()){
			let reminder = this.state.date && moment(this.state.date).format('DD/MM/YY') + " " + moment(this.state.time).format('HH:mm');
			this.state.reminder = reminder ? reminder : null;
			this.props.listItem && this.props.listItem.id ? this.props.editToDoItem && this.props.editToDoItem(this.state):
			this.props.addToDoItem && this.props.addToDoItem(this.state);
			alert("To do Item Saved Successfully");
			this.props.onClose && this.props.onClose();
		}
	}

	render(){
		return(
				<section className="add-list-section">
					<a title="close" className="close-modal" onClick={this.props.onClose}>X</a>
					<form>
						<div className="form-group">
							<label>Title <i className="required">*</i></label>
							<input placeholder="Enter title.." id="title" value={this.state.title} onChange={this.handleChange} />
							{this.state.error && this.state.error.title ? <label className="error font-size-14">{this.state.error.title}</label>:""}
						</div>
						<div className="form-group">
							<label>Description <i className="required">*</i></label>
							<textarea placeholder="Enter description.." id="description" value={this.state.description} onChange={this.handleChange}></textarea>
							{this.state.error && this.state.error.description ? <label className="error font-size-14">{this.state.error.description}</label>:""}
						</div>
						<div className="form-group">
							<label>Add Reminder</label>
							<span className="flex">
								<div className="half-width margin-right">
								<SingleDatePicker
								  date={this.state.date} // momentPropTypes.momentObj or null
								  onDateChange={date => this.onDateChange(date)} // PropTypes.func.isRequired, date => this.setState({ date })
								  focused={this.state.focused} // PropTypes.bool
								  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
								  id="date_id" 
								  displayFormat="DD/MM/YYYY"
								  numberOfMonths={1}/>
								 </div>
								 <div className="half-width margin-left">
								 <TimePicker 
									onChange={this.onTimeChange} 
									value={this.state.time}
									showSecond={false} 
									format="hh:mm a"
									use12Hours />
								</div>
							</span>
						</div>
					</form>
					<button className="btn-submit" onClick={this.onSave}>Submit</button>
				</section>
			)
	}

}

const mapStateToProps = state => ({
	toDoList: state.toDoList
})

const mapDispatchToProps = dispatch => ({
	addToDoItem: data => dispatch(addToDoItem(data)),
	editToDoItem: data => dispatch(editToDoItem(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddList);