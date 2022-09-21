import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ variant = 'warning', children }) => {
	return (
		<Alert className='mt-3' variant={variant} style={{ fontSize: 20 }}>
			<strong>Error Occurred: {children}</strong>
		</Alert>
	);
};

export default ErrorMessage;
