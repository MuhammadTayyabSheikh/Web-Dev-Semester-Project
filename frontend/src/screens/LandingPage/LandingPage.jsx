import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {
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
								<Button size='lg' variant='dark' className='landingButton'>
									Login
								</Button>
							</a>
							<a href='/login'>
								<Button
									size='lg'
									variant='outline-dark'
									className='landingButton'
								>
									Sign Up
								</Button>
							</a>
						</div>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default LandingPage;
