import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import { connect } from 'react-redux';
import { updateStore, deleteStore } from 'actions/Brand';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import { Link, withRouter } from 'react-router-dom';
import { TextField } from 'material-ui';
import { TimePicker } from 'material-ui-pickers';
import Divider from 'material-ui/Divider';

class FoodItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		const {
			id,
			name,
			price,
			description,
			ingredient,
			images = [],
			type = {}
		} = this.props.data;
		return (
			<div className="card product-item-vertical hoverable animation flipInX">
				<div className="row d-flex align-items-sm-center">
					<div className="col-xl-3 col-lg-4 col-md-3 col-12">
						<div className="card-header border-0 p-0">
							<div className="card-image">
								<div className="grid-thumb-equal">
									<a className="grid-thumb-cover" href="javascript:void(0)">
										<img
											className="img-fluid"
											src={images[0] && images[0].image}
											alt="..."
										/>
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-6 col-lg-5 col-md-6 col-12">
						<div className="card-body">
							<div className="product-details">
								<h3 className="card-title fw-regular">
									{name}
									<small className="text-grey text-darken-2 ml-2">
										{type.name}
									</small>
								</h3>
								<div className="d-flex ">
									<h3 className="card-title text-primary">{price} </h3>
									{/* <h5 className="text-muted px-2">
										<del>{price}</del>
									</h5> */}
									{/* <h5 className="text-success">{offer} off</h5> */}
								</div>
								<p>{description}</p>
							</div>
						</div>
					</div>

					<div className="col-xl-3 col-lg-3 col-md-3 col-12">
						<div className="card-footer border-0 text-center bg-white">
							<div className="cart-btn mb-2">
								<Button variant="raised" className="bg-primary text-white">
									<Link
										style={{ textDecoration: 'none', color: 'white' }}
										to={`/dashboard/food/${id}`}
									>
										Edit
									</Link>
								</Button>
							</div>

							<Button
								color="primary"
								onClick={() => {
									this.props.openDeleteModal(id);
								}}
							>
								Delete
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(
	null,
	mapDispatchToProps
)(FoodItem);
