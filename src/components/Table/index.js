import React, { Component } from "react";
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import classNames from 'classnames';
import "./index.css";

/**
 * Import component
 */
import { Button } from '../Button';

const SORT = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse()
}

const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
    const sortClass = classNames(
        'button-inline',
        { 'button-active': sortKey === activeSortKey }
    );

    return (<Button onClick={() => onSort(sortKey)} className={sortClass}>{children}</Button>);
}

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            list,
            sortKey,
            isSortReverse,
            onSort,
            onDismiss
        } = this.props;

        const sortedList = SORT[sortKey](list);
        const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

        return (
            <div className="table">
                <div className="table-header">
                    <span className="large-column">
                        <Sort sortKey={'TITLE'} onSort={onSort} activeSortKey={sortKey}>Title</Sort>
                    </span>
                    <span className="middle-column">
                        <Sort sortKey={'AUTHOR'} onSort={onSort} activeSortKey={sortKey}>Author</Sort>
                    </span>
                    <span className="small-column">
                        <Sort sortKey={'COMMENTS'} onSort={onSort} activeSortKey={sortKey}>Comments</Sort>
                    </span>
                    <span className="small-column">
                        <Sort sortKey={'POINTS'} onSort={onSort} activeSortKey={sortKey}>Points</Sort>
                    </span>
                </div>

                {
                    reverseSortedList.map(item =>
                        <div key={item.objectID} className="table-row">
                            <span className="large-column">
                                <a href={item.url} >{item.title}</a>
                            </span>
                            <span className="middle-column">{item.author}</span>
                            <span className="small-column">{item.num_comments}</span>
                            <span className="small-column">{item.points}</span>
                            <span className="small-column">
                                <Button onClick={() => onDismiss(item.objectID)} className="button-inline">Drop It</Button>
                            </span>
                        </div>
                    )
                }
            </div>);
    }
};

Table.propTypes = {
    list: PropTypes
        .arrayOf(
            PropTypes.shape({
                objectID: PropTypes.string.isRequired,
                author: PropTypes.string,
                url: PropTypes.string,
                num_comments: PropTypes.number,
                points: PropTypes.number,
            })
        )
        .isRequired,
    onDismiss: PropTypes.func.isRequired
}

export default Table;