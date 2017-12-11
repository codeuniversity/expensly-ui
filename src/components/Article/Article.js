import React from 'react';
import './Article.css';
import Store from '../../services/Store';
import utils from '../../utils'
import Divider from 'material-ui/Divider';
import {Link} from 'react-router-dom'

class Item extends React.Component{
	render(){
		let {item, className} = this.props;
		return(
			<div className={`Item ${className || ''}`}>
				<div className="left light small">{new Date(item.created_at).toLocaleString()}</div>
				<div className="left">
					<Link to='/' className="link-like">
						{item.transaction.name} -
					</Link>
				</div>
				<div className="left">{item.amount} * </div>
				<div className="left">{utils.moneyFormat(item.price)}</div>
			<div className="right">{utils.moneyFormat(item.cost)}</div>
			</div>
		)
	}
}
class Article extends React.Component{
	state={
		article: null,
		items: [],
	}
	getArticle = async ()=>{
		let article = await Store.get(`articles/${this.article_id}`);
		this.setState({article});
	}
	getItems = async ()=>{
		let items = await Store.get(`articles/${this.article_id}/items`);
		this.setState({items});
	}
	componentDidMount(){
		this.article_id = this.props.match.params.article_id;
		this.getArticle();
		this.getItems();
	}
	total = ()=>{
		let items = this.state.items;
		let total = 0;
		items.forEach(item=>{
			total += item.amount * item.price;
		});
		return total;
	}
	render(){
		let {article, items} = this.state;
		let articleItem;
		if (article){
			articleItem = (
				<div>
					<h2>{article.name}</h2>
				</div>
			)
		}
		console.log(items);
		return(
			<div className='Category'>
				{articleItem}
				<div style={{margin:'auto', maxWidth:500}}>
					{items.map(item=>(
						<Item key={item.id} item={item}/>
					))}
					<div className="right" style={{color:'red'}}>{utils.moneyFormat(this.total())}</div>
				</div>
			</div>
		)
	}
}
export default Article;
