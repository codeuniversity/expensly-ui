import React from 'react';
import './GoogleLink.css';
import RaisedButton from 'material-ui/RaisedButton';
class GoogleLink extends React.Component{
	render(){
		return(
			<div className="GoogleLink-container">
				<div className='GoogleLink'>
					<h1>Expensly</h1>
					<a className="GoogleLink-link" href={`${process.env.REACT_APP_API_URL}/auth/google_oauth2?auth_origin_url=${process.env.REACT_APP_ORIGIN_URL}`}>
						<RaisedButton label='Sign in with Google' style={{padding:10}} labelStyle={{fontSize:20}}/>
					</a>
				</div>
			</div>
		)
	}
}
export default GoogleLink;


