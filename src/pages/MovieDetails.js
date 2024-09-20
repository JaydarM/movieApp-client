import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function MovieDetails() {

	const notyf = new Notyf();

	const { movieId } = useParams();

	// Hooks
	const [title, setTitle] = useState("");
	const [director, setDirector] = useState("");
	const [year, setYear] = useState(0);
	const [description, setDescription] = useState("");
	const [genre, setGenre] = useState("");
	const [comments, setComments] = useState([]);

	const [commentsList, setCommentsList] = useState([]);
	const [hasComments, setHasComments] = useState(false);

	useEffect(() => {
		fetchMovieDetails();
		getComments();
	}, [movieId])

	function fetchMovieDetails() {
		fetch(`https://movieapp-api-lms1.onrender.com/movies/getMovie/${movieId}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if (data !== undefined) {
				setTitle(data.title);
				setDirector(data.director);
				setYear(data.year);
				setDescription(data.description);
				setGenre(data.genre);
				setComments(data.comments);
			} else {
				notyf.error("Something went wrong");
			}
		})
	}

	function getComments() {
		if (comments.length > 0) {
			setHasComments(true);

			const commentsArr = comments.map(comment => {
				return (
					<Card key={comment._id} className="my-3">
				      	<Card.Header  className="text-muted">{comment.userId}</Card.Header>
				      	<Card.Body>
					        <Card.Text>{comment.comment}</Card.Text>
				      	</Card.Body>
				    </Card>
				)
			})

			setCommentsList(commentsArr);

		} else {
			setHasComments(false);
		}
	}

	return (
		<>
		<Card className="text-center my-5">
	      	<Card.Header><h1>{title}</h1></Card.Header>
	      	<Card.Body>
	        	<Card.Title>{director}</Card.Title>
	        	<Card.Subtitle>{year}</Card.Subtitle>
	        	<Card.Text>{description}</Card.Text>
	      	</Card.Body>
	      	<Card.Footer className="text-muted">{genre}</Card.Footer>
	    </Card>
	    <h2>Comments</h2>
	    {(hasComments) ?
	    	<>
	    	{commentsList}
	    	</>
	    	:
	    	<h5>No Comments</h5>
	    }
	    </>
	)
}

export default MovieDetails;