import React from "react";
import ReactDOM from "react-dom";
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Button } from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
    let onClick = () => console.log(1);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button onClick={() => onClick('3')}>Give me more</Button>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('here is short snapshot', () => {
        const component = renderer.create(<Button onClick={() => onClick('3')}>Give me more</Button>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('show one button', () => {
        const element = shallow(<Button onClick={() => onClick('3')}>Give me more</Button>)

        expect(element.find('button[type="button"]').length).toBe(1);
    });
});