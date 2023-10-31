import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../(auth)/login/page';

describe('Login Page', () => {
  test('it renders the login form', () => {
    const component = renderer.create(<Login />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it handles input changes', () => {
    const component = renderer.create(<Login />);
    const instance = component.root;


    const usernameInput = instance.findByProps({ name: 'username' });
    const passwordInput = instance.findByProps({ name: 'password' });

    
    usernameInput.props.onChange({ target: { name: 'username', value: 'testuser' } });
    passwordInput.props.onChange({ target: { name: 'password', value: 'testpassword' } });

    
    expect(usernameInput.props.value).toBe('testuser');
    expect(passwordInput.props.value).toBe('testpassword');
  });

  
});
