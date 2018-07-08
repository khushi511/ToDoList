import React from 'react';

export const Toaster = (message) => {
		return(
				<div className="toaster" id="toaster">
					<p>{message}</p>
				</div>
			)
}
