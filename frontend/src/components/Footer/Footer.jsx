import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
	return (
		<footer
			style={{
				width: "100%",
				position: "relative",
				bottom: 0,
				display: "flex",
				justifyContent: "center",
			}}
		>
			<Container>
				<Row>
					{/* <Col>
						<div className='d-flex gap-3 align-items-center justify-content-center'>
							<img src='./favicon.ico' alt='' />
							<h5>t̷w̷o̷N̷o̷t̷e̷</h5>
						</div>
					</Col> */}
					<Col className='text-center py-3'>Copyright &copy; BRAINIAC</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
