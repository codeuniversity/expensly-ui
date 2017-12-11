import React from 'react';
import './Item.css';
import utils from '../../utils'
import {Link} from 'react-router-dom'

class Item extends React.Component{
	render(){
		let {item, className} = this.props;
		return(
			<div className={`Item ${className || ''}`}>
				<div className="left light">
					<Link to={`/categories/${item.category.id}`} className="link-like">
						{item.category.name}
					</Link>
				</div>
				<div className="left">{item.amount}</div>
				<div className="left">
					<Link to={`/articles/${item.article.id}`} className="link-like">
						{item.name}
					</Link>
				</div>
				<div className="left">({utils.moneyFormat(item.price)})</div>
			<div className="right">{utils.moneyFormat(item.cost)}</div>
			</div>
		)
	}
}
export default Item
