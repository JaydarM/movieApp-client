import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

function UserView({ movies }) {

	const { user } = useContext(UserContext);

	const [movieList, setMovieList] = useState([]);

	useEffect(() => {

		const moviesArr = movies.map(movie => {
			return (
				<Card key={movie._id} style={{ width: '18rem' }}>
					<Card.Header><h3>{movie.title}</h3></Card.Header>
			      	<Card.Body>
			        	<Card.Title>{movie.genre}</Card.Title>
			        	<Card.Subtitle>{movie.year}</Card.Subtitle>
			        	<Card.Text>{movie.description}</Card.Text>
			      	</Card.Body>
			      	<Card.Footer>
			      		{(user.id !== null) ?
			      			<Link className="btn btn-primary" to={`/movies/${movie._id}`} style={{ width: '100%' }}>Details</Link>
			      			:
			      			<></>
			      		}
			      	</Card.Footer>
			    </Card>
			)
		})

		setMovieList(moviesArr);
	}, [movies])

	return (
		<>
		{movieList}
		</>
	)
}

export default UserView;