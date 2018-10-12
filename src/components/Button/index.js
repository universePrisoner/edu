import React from 'react'
import PropTypes from 'prop-types';
import './index.css';

/**
 * Функциональный компонент: не имеет своего состояния. Можем применить декомпозицию.
 */
export const Button = ({ onClick, className = '', children, }) =>
    <button onClick={onClick} className={className} type="button">{children}</button>;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
}

Button.defaultProps = {
    className: '',
}