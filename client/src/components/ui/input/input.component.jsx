import { forwardRef } from 'react';
import classes from './input.module.css';

const Input = ({ name, dataFunction, inputData, label, type }) => {
  
	return (
		<div className={classes.input}>
			<label>{label}</label>
      <input
        type={type}
        name={name}
        onChange={(e) => dataFunction(e)}
        value={inputData[name]}
      />
		</div>
	);
};

export default Input;
