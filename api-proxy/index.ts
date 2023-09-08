// packages import
import express from "npm:express";
import cors from "npm:cors";
import axios from "npm:axios";

const app = express();

// enable CORS
app.use(cors());
// set the port on which our app wil run
// important to read from environment variable if deploying
const port = 5001;

const targetUrl = "https://api.nevobo.nl/v1/competitie";

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/teams/:clubId", (req, res) => {

	const clubId = req.params.clubId;
	console.log("/teams/:clubId", clubId);

	const url = `${targetUrl}/teams?vereniging=${clubId}`;

	axios.get(url).then(response => res.send(response.data));
});

// I'm aware this isn't at all an elegant API design, but I'm not trying
// to create anything fancy here, just a simple proxy to get around CORS
app.get("/matches/team/:teamId", (req, res) => {

	const teamId = req.params.teamId;
	console.log("/matches/team/:teamId", teamId);

	const url = `${targetUrl}/wedstrijden?team=${teamId}`;

	axios.get(url).then(response => res.send(response.data));
});

app.get("/matches/club/:clubId", (req, res) => {

	const clubId = req.params.clubId;
	console.log("/matches/club/:clubId", clubId);

	const url = `${targetUrl}/wedstrijden?vereniging=${clubId}`;

	axios.get(url).then(response => res.send(response.data));
});

// console text when app is running
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
