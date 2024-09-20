import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import AddMovie from "./AddMovie";

function AdminDashboard({ movies, fetchMovies }) {

	const [movieList, setMovieList] = useState([]);

	useEffect(() => {

		const moviesArr = movies.map(movie => {
			return (
				<tr key={movie._id}>
					<td>{movie.title}</td>
					<td>{movie.director}</td>
					<td>{movie.year}</td>
					<td>{movie.description}</td>
					<td>{movie.genre}</td>
				</tr>
			)
		})

		setMovieList(moviesArr);
	}, [movies])

	return (
		<div>
			<AddMovie fetchMovies={fetchMovies} />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Title</th>
						<th>Director</th>
						<th>Year</th>
						<th>Description</th>
						<th>Genre</th>
					</tr>
				</thead>
				<tbody>
					{movieList}
				</tbody>
			</Table>
		</div>
	)
}

export default AdminDashboard;