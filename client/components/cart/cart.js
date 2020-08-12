import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Cart extends React.Component {
    render() {
        const count = this.props.items.length;
        return (
            <div className="cart">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
                {count ? <span className="badge badge-pill badge-danger">{count}</span> : <></>}
            </div>
        )
    }
}

Cart.propTypes = {
    items: PropTypes.array.isRequired
}

function mapStateToProps(state) {
    return {
        items: state.cart
    }
}

export default connect(mapStateToProps, {})(Cart);