import React from 'react';
import '../../assets/modal.less';

export default class Modal extends React.Component{
	render(){
		return(
				<div className="modal" id="modal">
					<div className="modal-content">
						{this.props.children}
					</div>
				</div>
			)
	}
}