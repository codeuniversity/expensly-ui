import React from 'react';
import './Categories.css';
import Store from '../../services/Store'
import {Link} from 'react-router-dom';
import utils from '../../utils'
import Category from '../Category/Category'
class CategoryItem extends React.Component{
	render(){
		let {category, className} = this.props;
		return(
				<div className={`CategoryItem ${className || ''}`} style={{margin:10}}>
					<Link to={`categories/${category.id}`} className="link-like">
						{category.name} ({category.article_count})
					</Link>
					<span style={{margin:10, color: 'red'}}>{utils.moneyFormat(category.cost)}</span>
				</div>
		)
	}
}
class Categories extends React.Component{
	state = {
		categories:[],
	}
	getCategories = async ()=>{
		let categories = await Store.get('categories');
		this.setState({categories});
	}
	componentDidMount(){
		this.getCategories();
	}
	render(){
		let {categories} = this.state;
		return(
			<div className='Categories'>
				<h2>Categories</h2>
				{categories.map(category=>{
					return <CategoryItem category={category} key={category.id}/>
				})}
			</div>
		)
	}
}
export default Categories
