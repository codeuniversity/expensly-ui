import React from 'react';
import './Category.css';
import Store from '../../services/Store';
import utils from '../../utils'
import {Link} from 'react-router-dom'
import Categories from '../Categories/Categories'
class ArticleItem extends React.Component{
	render(){
		let {article, className} = this.props;
		return(
			<div className={`ArticleItem ${className || ''}`} style={{margin:10}}>
				<Link to={`/articles/${article.id}`} className="link-like">
					{article.name} ({article.item_count})
				</Link>
				<span style={{margin:10, color:'red'}}>{utils.moneyFormat(article.cost)}</span>
			</div>

		)
	}
}

class Category extends React.Component{
	state={
		category: null,
		articles: [],
	}
	getCategory = async ()=>{
		let category = await Store.get(`categories/${this.category_id}`);
		this.setState({category});
	}
	getArticles = async ()=>{
		let articles = await Store.get(`categories/${this.category_id}/articles`);
		this.setState({articles});
	}
	componentDidMount(){
		this.category_id = this.props.match.params.category_id;
		this.getCategory();
		this.getArticles();
	}

	render(){
		let {category, articles} = this.state;
		let categoryItem;
		if (category){
			categoryItem = (
				<div>
					<h2>{category.name}</h2>
				</div>
			)
		}
		console.log(articles);
		return(
			<div className='Category'>
				{categoryItem}
				{articles.map(article=>(
					<ArticleItem key={article.id} article={article}/>
				))}
			</div>
		)
	}
}
export default Category
