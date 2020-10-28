import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// connect Enzyme to React
configure({ adapter: new Adapter() });

// shallow - use as often as possible as it renders components with all its content, but not in a deep way, allowing it to isolate the test.

// Jest provides describe, it, expect, toHaveLength
// Enzyme provides shallow, find
describe('NavigationItems', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render 2 navigation items if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render 3 navigation items if authenticated', () => {
    // wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
