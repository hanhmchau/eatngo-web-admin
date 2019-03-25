import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import { connect } from 'react-redux';
import { login, register } from 'actions/Member';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { TextField, Paper } from 'material-ui';
import { Alert } from 'reactstrap';

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneNumber: '732104926',
			email: '',
			name: ''
		};
	}
	componentDidMount() {}
	loginCallback(response) {
		if (response.status === 'PARTIALLY_AUTHENTICATED') {
			const facebookId = undefined;
			this.props.onRegister(
				this.state.email,
				this.state.name,
				this.state.phoneNumber,
				facebookId
			);
			// Send code to server to exchange for access token
		} else if (response.status === 'NOT_AUTHENTICATED') {
			// handle authentication failure
		} else if (response.status === 'BAD_PARAMS') {
			// handle bad parameters
		}
	}
	register() {
		AccountKit.login(
			'PHONE',
			{
				countryCode: '+48',
				phoneNumber: this.state.phoneNumber || '732104926'
			}, // will use default values if not specified
			this.loginCallback.bind(this)
		);
	}
	render() {
		if (this.props.currentUser) {
			return <Redirect to={'/dashboard/my-brands'} />;
		}
		return (
			<div className="container">
				<Paper
					className="p-4 text-center"
					style={{
						// transform: 'translateY(-100px)',
						width: '400px',
						height: '550px'
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
					{/* <Alert
						className={this.props.error ? 'visible' : 'visible'}
						color="danger"
					>
						No account with this information exists
					</Alert> */}
					<TextField
						value={this.state.email}
						label="Email"
						className="mt-2"
						onChange={e =>
							this.setState({
								email: e.target.value
							})
						}
						fullWidth
					/>
					<TextField
						className="mt-2"
						value={this.state.name}
						label="Name"
						onChange={e =>
							this.setState({
								name: e.target.value
							})
						}
						fullWidth
					/>
					<TextField
						className="mt-2"
						value={this.state.phoneNumber}
						label="Phone number"
						onChange={e =>
							this.setState({
								phoneNumber: e.target.value
							})
						}
						fullWidth
					/>
					<Button
						size="large"
						variant="raised"
						className="jr-btn jr-btn-label left bg-success mt-4 text-white w-100"
						onClick={() => this.register()}
					>
						Register
					</Button>
					<Link className="mt-3 d-block" to="/login">
						Already had an account? Sign In
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
		onRegister: (email, name, phoneNumber, facebookId) =>
			dispatch(register(email, name, phoneNumber, facebookId))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterPage);
