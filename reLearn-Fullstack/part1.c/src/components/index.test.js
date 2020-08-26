 import  React  from "react";
 
 import Enzyme ,{ shallow } from 'enzyme';
 import { Button } from "./Button";
 import Adapter from 'enzyme-adapter-react-16';
 Enzyme.configure({ adapter: new Adapter() })
 test('click the botton then counte add by one',() => {
    const mockCallBack = jest.fn()
    
    const button = shallow((<Button handleClick = {mockCallBack}>push</Button>))
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
 })