import { Spinner } from "react-bootstrap";

const Loading = ({ size = 100 }) => {
	return (
		<div className='d-flex justify-content-center align-items-center w-10 h-10'>
			<Spinner
				style={{
					width: size,
					height: size,
				}}
				animation='border'
				variant='primary'
			></Spinner>
		</div>
	);
};

export default Loading;
