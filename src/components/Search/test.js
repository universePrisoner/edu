import React from "react";
import ReactDOM from "react-dom";
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Search from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Search', () => {
    let properties = {
        className: 'str',
        onSubmit: () => console.log(1),
        value: 'str',
        onChange: () => console.log(2),
    }

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search  {...properties}>Search</Search>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('here is short snapshot', () => {
        const component = renderer.create(<Search {...properties}>Search</Search>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('show search input', () => {
        let element = shallow(<Search  {...properties}></Search>);

        expect(element.find('.form').length).toBe(1);
    });

});
