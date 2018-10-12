import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Table from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Table', () => {
    const onDismiss = () => console.log(1);

    const props = {
        list: [
            { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
            { title: '2', author: '2', num_comments: 2, points: 4, objectID: 'x' },
        ],
        sortKey: 'AUTHOR',
        onSort: () => console.log(1),
        onDismiss: () => console.log(1),
        isSortReverse: false
    }

    it('renders without crashing ', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Table {...props} onDismiss={onDismiss} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('table short snapshot', () => {
        const component = renderer.create(<Table {...props} onDismiss={onDismiss} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('shows two items in list', () => {
        const element = shallow(<Table {...props} onDismiss={onDismiss} />)

        expect(element.find('.table-row').length).toBe(2);
    });
});