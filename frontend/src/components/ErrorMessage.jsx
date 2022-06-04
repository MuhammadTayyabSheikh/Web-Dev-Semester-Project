import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "warning", children }) => {
	return (
		<Alert variant={variant} style={{ fontSize: 20 }}>
			<strong>Error Occurred: {children}</strong>
		</Alert>
	);
};

export default ErrorMessage;
