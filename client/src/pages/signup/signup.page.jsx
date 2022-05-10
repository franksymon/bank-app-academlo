import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import { signup } from '../../store/actions/user.actions';

// Component
import Input from '../../components/ui/input/input.component';
import Button from '../../components/ui/button/button.component';
import Form from '../../components/ui/form/form.component';

import classes from './signup.module.css';
import { usersActions } from '../../store/slices/user.slice';



const Signup = () => {
	const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.users);
  const [inputData, setInputData] = useState({
    name: '',
    password: ''
  })
  useEffect(() => {
    if (users.signUp?.newUser) {
      navigate('/login');
      dispatch(usersActions.setSignUp(null));
    }
  }, [dispatch, navigate, users.signUp?.newUser])
  

  const submitHandler = e => {
    e.preventDefault();
    dispatch(signup(inputData))
	};

	const onLogin = () => {
		navigate('/login');
  };
  
  const handleChange = (e) => {
    const {name, value} = e.target
    
    setInputData(prev => ({
      ...prev,
      [name]: value
    }))
  }

	const header = 'To create an account, enter these fields';

	return (
		<div className={classes.container}>
			<Form header={header} submitHandler={submitHandler}>
				<Input
          name='name'
          dataFunction={handleChange}
          inputData={inputData}
          label='Name'
          type={'text'}
				/>
				<Input
          name='password'
          dataFunction={handleChange}
          inputData={inputData}
          label='Password'
          type={'password'}
				/>
        <div>
          <p>
            {users.signUp?.message}
          </p>
        </div>
				<div className={classes.actions}>
					<Button type='submit'>Create account</Button>
					<Button onClick={onLogin} type='button'>
						Have an account? Log in
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default Signup;
