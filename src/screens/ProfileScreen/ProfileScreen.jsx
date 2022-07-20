import MainScreen from "./../../components/MainScreen";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import ErrorMessage from "./../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../actions/userActions";
import "./profileScreen.css";

const ProfileScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [img, setImg] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [imgMessage, setImgMessage] = useState("");
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading, success, error } = userUpdate;
	const navigate = useNavigate();
	useEffect(() => {
		if (!userInfo) {
			navigate("/");
		} else {
			setName(userInfo.name);
			setEmail(userInfo.email);
			setImg(userInfo.img);
		}
	}, [navigate, userInfo]);

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			console.log({ name });
			dispatch(updateUser(name, email, password, img));
		}
	};

	return (
		<MainScreen title='Edit Profile'>
			<div>
				<Row className='d-flex m-3 profileContainer'>
					<Col md={6}>
						<Form onSubmit={handleSubmit}>
							{loading && <div>Loading...</div>}
							{success && (
								<ErrorMessage variant='success'>
									Updated Successfully
								</ErrorMessage>
							)}
							{error && <ErrorMessage variant='warning'>{error}</ErrorMessage>}
							<Form.Group className='mb-3' controlId='name'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='text'
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
								<div className='panel-body'>
									<div className='input-group'>
										<input
											id='uploadFile'
											className='form-control'
											placeholder='Choose File'
											disabled='disabled'
										/>
										<div className='input-group-btn'>
											<div className='fileUpload btn btn-primary'>
												<span>
													<i className='glyphicon glyphicon-upload'></i> Upload
												</span>
												<input
													id='uploadBtn'
													type='file'
													className='upload'
													onChange={(e) => postDetails(e.target.files[0])}
												/>
											</div>
										</div>
									</div>
								</div>
							</Form.Group>
							<Button variant='success' className='mt-2' type='submit'>
								Update
							</Button>
						</Form>
					</Col>
					<Col
						style={{}}
						className='d-flex align-items-center justify-content-center'
					>
						<img
							className='w-75 align-self-start mt-2'
							src={userInfo.img}
							alt=''
						/>
					</Col>
				</Row>
			</div>
		</MainScreen>
	);
};

export default ProfileScreen;
