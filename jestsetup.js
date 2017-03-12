// Make Enzyme functions available in all test files without importing
import { shallow, render, mount } from 'enzyme';
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Fail tests on any warning
global.console = {warn: jest.fn(), log: jest.fn(), error: jest.fn()}