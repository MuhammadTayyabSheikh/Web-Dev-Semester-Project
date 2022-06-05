import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import bsCustomFileInput from "bs-custom-file-input";
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

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

	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const navigate = useNavigate();

	useEffect(() => {
		if (userInfo) navigate("/mynotes");
	}, [userInfo, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(register(email, name, img, password ));
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
							className='custom-file-input'
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
