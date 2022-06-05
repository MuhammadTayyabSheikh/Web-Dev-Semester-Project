import { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = () => {
	const dispatch = useDispatch();
	const notesList = useSelector((state) => state.notesList);

	const { loading, notes, error } = notesList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		dispatch(listNotes());
	}, [dispatch]);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
		}
	};
	return (
		<MainScreen title={`Welcome Back ${userInfo.name}...`}>
			<Link to='createnote'>
				<Button variant='success'>Create new Note</Button>
			</Link>
			{error && <ErrorMessage variant='warning'>{error}</ErrorMessage>}
			{loading && <Loading />}
			{notes?.map((note) => (
				<Accordion>
					<Card className='my-3'>
						<Card.Header className='d-flex'>
							<span
								style={{
									color: "#fff",
									textDecoration: "none",
									flex: 1,
									cursor: "pointer",
									alignSelf: "center",
									fontSize: "1.5rem",
								}}
							>
								<Accordion.Toggle as={Card.Title} variant='link' eventKey='0'>
									{note.title}
								</Accordion.Toggle>
							</span>
							<div>
								<Button href={`/note/${note._id}`} variant='info'>
									Edit
								</Button>
								<Button
									variant='warning'
									className='mx-2'
									onClick={() => deleteHandler(note._id)}
								>
									Delete
								</Button>
							</div>
						</Card.Header>
						<Accordion.Collapse eventKey='0'>
							<Card.Body>
								<Badge className='mb-2' bg='primary'>
									Category - {note.category}
								</Badge>
								<blockquote className='blockquote mb-0'>
									<p className='text-light'>{note.content}</p>
									<small>
										<footer className='mt-1 blockquote-footer small'>
											Created on{" "}
											<cite title='Source Title'>
												{note.createdAt.substring(0, 10)}
											</cite>
										</footer>
									</small>
								</blockquote>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			))}
		</MainScreen>
	);
};

export default MyNotes;
