import React from 'react';
import './Item.css';
import utils from '../../utils'
import Divider from 'material-ui/Divider';

class Item extends React.Component{
	render(){
		let {item, className} = this.props;
		return(
			<div className={`Item ${className || ''}`}>
				<div className="left light">{item.category.name}</div>
				<div className="left">{item.amount}</div>
				<div className="left">{item.name}</div>
				<div className="left">({utils.moneyFormat(item.price)})</div>
			<div className="right">{utils.moneyFormat(item.cost)}</div>
			</div>
		)
	}
}
export default Item
