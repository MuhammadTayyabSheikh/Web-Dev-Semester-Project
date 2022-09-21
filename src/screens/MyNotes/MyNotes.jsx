import { useEffect } from 'react';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import ReactMarkdown from 'react-markdown';

const MyNotes = ({ search }) => {
	const dispatch = useDispatch();
	const notesList = useSelector((state) => state.notesList);

	const { loading, notes, error } = notesList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const noteCreate = useSelector((state) => state.noteCreate);
	const { success: successCreate } = noteCreate;

	const noteUpdate = useSelector((state) => state.noteUpdate);
	const { success: successUpdate } = noteUpdate;

	const noteDelete = useSelector((state) => state.noteDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = noteDelete;

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure you want to delete this note?')) {
			dispatch(deleteNoteAction(id));
		}
	};

	const navigate = useNavigate();
	useEffect(() => {
		dispatch(listNotes());
		if (!userInfo) navigate('/');
	}, [
		dispatch,
		navigate,
		successCreate,
		userInfo,
		successUpdate,
		successDelete,
	]);
	return (
		<MainScreen title={`Welcome Back ${userInfo.name}`}>
			<Link to='/createNote'>
				<Button variant='success'>Create new Note</Button>
			</Link>
			{loadingDelete && <Loading size={100} />}
			{errorDelete && (
				<ErrorMessage variant='warning'>{errorDelete}</ErrorMessage>
			)}
			{error && <ErrorMessage variant='warning'>{error}</ErrorMessage>}
			{loading && <Loading />}
			{notes
				?.reverse()
				.filter((filteredNote) =>
					filteredNote.title.toLowerCase().includes(search.toLowerCase()),
				)
				.map((note) => (
					<Accordion>
						<Card className='my-3'>
							<Card.Header className='d-flex'>
								<span
									style={{
										color: '#fff',
										textDecoration: 'none',
										flex: 1,
										cursor: 'pointer',
										alignSelf: 'center',
										fontSize: '1.5rem',
									}}>
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
										onClick={() => deleteHandler(note._id)}>
										Delete
									</Button>
								</div>
							</Card.Header>
							<Accordion.Collapse eventKey='0'>
								<Card.Body>
									<Badge className='bg-primary mb-2'>
										Category - {note.category}
									</Badge>
									<blockquote className='blockquote mb-0'>
										<ReactMarkdown className='text-light'>
											{note.content}
										</ReactMarkdown>
										<small>
											<footer className='mt-1 mb-0 blockquote-footer small'>
												Created on{' '}
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
