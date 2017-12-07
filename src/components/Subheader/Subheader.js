import React from 'react';
import './Subheader.css';

class Subheader extends React.Component{
	render(){
		return(
			<div className='Subheader'>
				{this.props.children}
			</div>
		)
	}
}
export default Subheader
