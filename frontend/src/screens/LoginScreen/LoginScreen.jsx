import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);

	const { loading, error, userInfo } = userLogin;

	const navigate = useNavigate();

	useEffect(() => {
		if (userInfo) navigate("/mynotes");
	}, [userInfo, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		dispatch(login(email, password));
	};

	return (
		<MainScreen title={"Login"}>
			<div className='d-flex flex-column'>
				{error && <ErrorMessage>{error.response.data.message}</ErrorMessage>}
				{loading && <Loading size={100} />}
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Button variant='success' className='mt-2' type='submit'>
						Submit
					</Button>
				</Form>
				<Row className='mt-3'>
					<Col>
						<span className='text-primary'>Don't have an account?</span>
						<Link to='/register' className='text-info'>
							{" "}
							Register here
						</Link>
					</Col>
				</Row>
			</div>
		</MainScreen>
	);
};

export default LoginScreen;
