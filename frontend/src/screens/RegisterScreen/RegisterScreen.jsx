import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import bsCustomFileInput from "bs-custom-file-input";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";
import Loading from "../../components/Loading";

const RegisterScreen = () => {
	bsCustomFileInput.init();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [img, setImg] = useState(
		"https://icon-library.com/images/2018/3209069_happy-meme-pepe-the-frog-drinking-coffee-transparent.png"
	);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);
	const [imgMessage, setImgMessage] = useState(null);

	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Password does not match");
		} else {
			setMessage(null);
			// console.log(email, name, img, password, confirmPassword);
			try {
				const config = {
					headers: {
						"Content-Type": "application/json",
					},
				};
				setLoading(true);
				const { data } = await axios.post(
					"http://localhost:5000/api/users",
					{
						email,
						name,
						img,
						password,
					},
					config
				);
				console.log(data);
				setLoading(false);
				localStorage.setItem("userInfo", JSON.stringify(data));
			} catch (error) {
				setError(error.response.data.message);
				setLoading(false);
			}
		}
	};

	const postDetails = (imgs) => {
		if (!imgs) {
			return setImgMessage("Please upload an image");
		}

		setImgMessage(null);

		if (img.type === "image/png" || imgs.type === "image/jpeg") {
			const data = new FormData();
			data.append("file", imgs);
			data.append("upload_preset", "twoNote");
			data.append("cloud_name", "mainiac");
			fetch("https://api.cloudinary.com/v1_1/mainiac/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setImg(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return setImgMessage("Please upload an image");
		}
	};

	return (
		<MainScreen title={"Create New Account"}>
			<div className='d-flex flex-column'>
				{error && <ErrorMessage>{error}</ErrorMessage>}
				{message && <ErrorMessage variant='warning'>{message}</ErrorMessage>}
				{loading && <Loading size={100} />}
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mb-3' controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter your name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>

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
					<Form.Group className='mb-3' controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm Password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>

					{imgMessage && (
						<ErrorMessage variant='warning'>{imgMessage}</ErrorMessage>
					)}
					<Form.Group className='mb-3' controlId='img'>
						<Form.Label size='lg'>Profile Picture</Form.Label>
						<Form.File
							onChange={(e) => postDetails(e.target.files[0])}
							calssName='custom-file-input'
							id='custom-file'
							type='file'
							label='Upload Profile Picture'
							custom
							size='lg'
						/>
					</Form.Group>
					<Button variant='success' className='mt-2' type='submit'>
						Register
					</Button>
				</Form>
				<Row className='mt-3'>
					<Col>
						<span className='text-primary'>Already have an account?</span>
						<Link to='/login' className='text-info'>
							{" "}
							Login
						</Link>
					</Col>
				</Row>
			</div>
		</MainScreen>
	);
};

export default RegisterScreen;
