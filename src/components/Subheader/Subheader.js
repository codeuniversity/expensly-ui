import React from 'react';
import './Subheader.css';

class Subheader extends React.Component{
	render(){
		let {children, ...rest} = this.props;
		return(
			<div className='Subheader' {...rest} >
				{this.props.children}
			</div>
		)
	}
}
export default Subheader
