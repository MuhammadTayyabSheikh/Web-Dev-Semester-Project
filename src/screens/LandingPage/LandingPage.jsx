import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import './LandingPage.css';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const userInfo = localStorage.getItem('userInfo');
		if (userInfo) {
			navigate('/mynotes');
		}
	}, [navigate]);

	return (
		<div className='main'>
			<Container>
				<Row>
					<div className='intro-text'>
						<div>
							<h1 className='title'>Welcome to twoNote</h1>
							<p className='subtitle'>One Safe Place for all your notes.</p>
						</div>
						<div className='buttonContainer'>
							<a href='/login'>
								<Link to='/login'>
									<Button size='lg' variant='dark' className='landingButton'>
										Login
									</Button>
								</Link>
							</a>
							<a href='/register'>
								<Link to='/register'>
									<Button
										size='lg'
										variant='outline-dark'
										className='landingButton'>
										Sign Up
									</Button>
								</Link>
							</a>
						</div>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default LandingPage;
