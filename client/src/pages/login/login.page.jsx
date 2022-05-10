import { useRef, Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import { login } from '../../store/actions/user.actions';

// Component
import Input from '../../components/ui/input/input.component';
import Button from '../../components/ui/button/button.component';
import Form from '../../components/ui/form/form.component';

import classes from './login.module.css';

const Login = () => {
	const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.users);

  const [input, setInput] = useState({
    accountNumber: '',
    password: ''
  })
  
  const handleChange = (e) => {
    
    const {name, value} = e.target
    
    setInput(prev => ({
      ...prev,
      [name]: value
    }))
  }
  useEffect(() => {
    if (users.isAuth) {
      navigate('/');
    }
  }, [users.isAuth, navigate])
  

	const submitHandler = e => {
		e.preventDefault();
    dispatch(login(input))
	};

	const onSignup = () => {
		navigate('/signup');
	};

	const header = 'To enter our app, please fill these fields';

	return (
		<div className={classes.container}>
			<Form header={header} submitHandler={submitHandler}>
				<Input
          name='accountNumber'
          dataFunction={handleChange}
          inputData={input}
          label='Account number'
          type={'number'}
          
				/>
				<Input
          name='password'
          dataFunction={handleChange}
          inputData={input}
          label='Password'
          type={'password'}
        />
        <div>
          <p>
            {users.error}
          </p>
        </div>
        <div className={classes.actions}>
          
					<Button type='submit'>Log in</Button>
					<Button onClick={onSignup} type='button'>
						Create account
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default Login;
