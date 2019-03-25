import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import { connect } from 'react-redux';
import { login, register } from 'actions/Member';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import { Link, withRouter } from 'react-router-dom';
import { TextField, Paper } from 'material-ui';
import { TimePicker } from 'material-ui-pickers';
import Divider from 'material-ui/Divider';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneNumber: ''
		};
	}
	componentDidMount() {
	}
	loginCallback(response) {
		if (response.status === 'PARTIALLY_AUTHENTICATED') {
			const facebookId = undefined;
			this.props.onLogin(this.state.phoneNumber, facebookId);
			// Send code to server to exchange for access token
		} else if (response.status === 'NOT_AUTHENTICATED') {
			// handle authentication failure
		} else if (response.status === 'BAD_PARAMS') {
			// handle bad parameters
		}
	}
	login() {
		AccountKit.login(
			'PHONE',
			{
				countryCode: '+48',
				phoneNumber: '732104926'
			}, // will use default values if not specified
			this.loginCallback.bind(this)
		);
	}
	render() {
		return (
			<div className="container">
				<Paper
					className="p-4 text-center"
					style={{
						transform: 'translateY(-100px)',
						width: '400px',
						height: '450px'
					}}
				>
					<Avatar
						src={
							'https://raw.githubusercontent.com/vinhqng1294/EatNGo_Project/dev-tin-fb-account-kit/EatNGo_mobile_app/Assets/eatngo_logo_trans.png'
						}
						style={{
							width: '300px',
							height: '200px',
							margin: 'auto'
						}}
					/>
					<Button
						size="large"
						variant="raised"
						style={{
							marginTop: '120px'
						}}
						className="jr-btn jr-btn-label left bg-success text-white w-100"
						onClick={() => this.login()}
					>
						Sign In
					</Button>
					<Link className="mt-3 d-block" to="/register">
						Don't have an account? Register
					</Link>
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return state.members;
};

const mapDispatchToProps = dispatch => {
	return {
		onLogin: (phoneNumber, facebookId) =>
			dispatch(login(phoneNumber, facebookId))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage);
