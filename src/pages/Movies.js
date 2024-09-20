import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";

import UserView from "../components/UserView";
import AdminDashboard from "../components/AdminDashboard";

function Movies() {

	const { user } = useContext(UserContext);

	const [movies, setMovies] = useState([]);
	const [hasMovies, setHasMovies] = useState(false);

	useEffect(() => {
		fetchMovies();
	}, [user.id])

	function fetchMovies() {
		fetch("https://movieapp-api-lms1.onrender.com/movies/getMovies")
		.then(res => res.json())
		.then(data => {
			if (data.movies && data.movies.length > 0) {
				setMovies(data.movies);
				setHasMovies(true);
			} else {
				setHasMovies(false);
			}
		})
	}

	return (
		<>
		<h1 className="my-5">Movies</h1>

		{(hasMovies) ?
			(user.isAdmin) ?
				<AdminDashboard movies={movies} fetchMovies={fetchMovies} />
				:
				<UserView movies={movies} />
			
			:
			<h3 className="my-5 text-center">No Movies Found</h3>
		}
		</>
	)
}

export default Movies;