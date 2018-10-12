import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Search extends Component {

    componentDidMount() {
        if (this.input) this.input.focus();
    }

    render() {
        const {
            value,
            onChange,
            onSubmit,
            children
        } = this.props;

        const search = (
            <form className="form" onSubmit={onSubmit}>
                {children} <input ref={(node) => { this.input = node; }} value={value} type="text" className="form__search" onChange={onChange} />
                <button type="submit">{children}</button>
            </form>
        );

        return (search);
    }
}

Search.propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default Search;