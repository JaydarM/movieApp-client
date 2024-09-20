import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function AddMovie({ fetchMovies }) {

	const notyf = new Notyf();

	// Hooks
	const [title, setTitle] = useState("");
	const [director, setDirector] = useState("");
	const [year, setYear] = useState(0);
	const [description, setDescription] = useState("");
	const [genre, setGenre] = useState("");

	// Show Add Movie Modal
	const [showAdd, setShowAdd] = useState(false);

	function openAdd() {
		setShowAdd(true);
	}

	function closeAdd() {
		setShowAdd(false);
		setTitle("");
		setDirector("");
		setYear(0);
		setDescription("");
		setGenre("");
	}

	function createMovie(e) {
		e.preventDefault();

		fetch("https://movieapp-api-lms1.onrender.com/movies/addMovie", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				title: title,
				director: director,
				year: year,
				description: description,
				genre: genre
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data !== undefined) {
				notyf.success("Movie Added!");

				setTitle("");
				setDirector("");
				setYear(0);
				setDescription("");
				setGenre("");

				closeAdd();
				fetchMovies();
			} else {
				notyf.error("Something went wrong");
				closeAdd();
			}
		})
	}

	return (
		<>
		<Button className="my-3" variant="success" size="lg" onClick={() => openAdd()}> Add Movie </Button>

		<Modal show={showAdd} onHide={closeAdd}>
            <Form onSubmit={e => createMovie(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Movie</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)} 
                            required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Director</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={director} 
                            onChange={e => setDirector(e.target.value)} 
                            required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Year</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={year} 
                            onChange={e => setYear(e.target.value)} 
                            required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={description} 
                            onChange={e => setDescription(e.target.value)} 
                            required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Genre</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={genre} 
                            onChange={e => setGenre(e.target.value)} 
                            required/>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeAdd}>Close</Button>
                    <Button variant="success" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
		</>
	)
}

export default AddMovie;