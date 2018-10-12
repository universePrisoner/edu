import React, { Component } from 'react';
import axios from "axios";
import './index.css';

/**
 * Import components
 */
import { Button } from "../Button";
import Search from "../Search";
import Table from "../Table";
import { withLoading } from '../withLoading';


/**
 * Import variables
 */

import {
    DEFAULT_QUERY,
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,
} from '../../constants';


/**
 * Классовый компонент: имеет свое состояние и свойства, так же доступные методы React Component Lifecycle
 */
class App extends Component {
    _isMounted = false;

    //  1) constructor выполняется до монтирования в DOM
    constructor(props) {
        super(props);

        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
            isLoading: false,
            sortKey: 'AUTHOR',
            isSortReverse: false,
        };
    }

    /**
     * Замена привязки метода к классу в конструкторе
     */
    onDismiss = (id) => {
        const { searchKey, results } = this.state;
        const { hits, page } = results[searchKey];

        const isNotId = item => item.objectID !== id;
        const updateHits = hits.filter(isNotId);

        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updateHits, page }
            }
        });
    }

    onSearchChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        });
    }

    onSearchSubmit = (e) => {
        e.preventDefault();

        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });

        if (this.needToSearchTopStories(searchTerm)) this.fetchSearchTopStories(searchTerm);
    }

    setSearchTopStories = (result) => {
        const { hits, page } = result;
        const { searchKey, results } = this.state;

        const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
        const updateHits = [...oldHits, ...hits];

        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updateHits, page }
            },
            isLoading: false
        });
    }

    fetchSearchTopStories = (searchTerm, page = 0) => {
        this.setState({
            isLoading: true
        });

        axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(result => this._isMounted && this.setSearchTopStories(result.data))
            .catch(error => this._isMounted && this.setState({ error }));
    }

    componentDidMount() {
        this._isMounted = true;

        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });

        this.fetchSearchTopStories(searchTerm);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    needToSearchTopStories = searchTerm => !this.state.results[searchTerm];

    onSort = sortKey => {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;

        this.setState({ sortKey, isSortReverse })
    };

    //2) getDeriveStateFromProps() вызывается до render()

    //3) render() отображение в DOM
    render() {
        const {
            searchTerm,
            results,
            searchKey,
            error,
            isLoading,
            sortKey,
            isSortReverse } = this.state;

        const page = (
            results &&
            results[searchKey] &&
            results[searchKey].page) || 0;

        const list = (
            results &&
            results[searchKey] &&
            results[searchKey].hits) || [];

        const ButtonWithLoading = withLoading(Button);

        return (
            <div className="page">
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit} > Поиск</Search>
                </div>
                {
                    error ?
                        <p>So mething gone wrong.</p>
                        :
                        <Table
                            list={list}
                            onDismiss={this.onDismiss}
                            sortKey={sortKey}
                            onSort={this.onSort}
                            isSortReverse={isSortReverse} />
                }
                <div className="interactions">

                    <ButtonWithLoading isLoading={isLoading} onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>More Stories</ButtonWithLoading>
                </div>
            </div>
        );
    }

    //4) componentDidMount() вызывается после render()



    /**
     * В случае изменения состояния или свойств:
     * 1) getDerivedStateFromProps()
     * 2) shouldComponentUpdate()
     * 3) componentWillUpdate()
     * 4) render()
     * 5) getSnapShotBeforeUpdate()
     * 6) componentDidUpdate()
     */

    /**
     * Жизненный цикл размонтирования компонента
     * 1) componentWillUnmount()
     */
}

export default App;

