import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			setLoading(true);
			const { data } = await axios.post(
				"http://localhost:5000/api/users/login",
				{
					email,
					password,
				},
				config
			);

			console.log(data);
			localStorage.setItem("userInfo", JSON.stringify(data));
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
			console.log(error);
		}
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
