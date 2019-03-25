import React from 'react';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import { deleteBrands } from '../../../../actions/Brand';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

function ListItem({ styleName, data, onDeleteBrand }) {
	const {
		avatar,
		name,
		designation = 'Restaurant',
		description = data.name,
		id
	} = data;
	return (
		<div className={`user-list d-flex flex-row ${styleName}`}>
			<Avatar alt="..." src={avatar} className="user-avatar avatar-shadow" />
			<div className="description">
				<h5>{name}</h5>
				<h6>{designation}</h6>
				<p className="text-muted">{description}</p>
				<ul className="list-inline d-sm-flex flex-sm-row jr-mbtn-list">
					<li>
						<Button color="primary">
							<Link to={`/dashboard/brand/${id}`}>Edit</Link>
						</Button>
					</li>
					<li>
						<Button onClick={() => onDeleteBrand(id)} color="secondary">
							Delete
						</Button>
					</li>
				</ul>
			</div>
		</div>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		onDeleteBrand: id => {
			dispatch(deleteBrands(id));
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(ListItem);
