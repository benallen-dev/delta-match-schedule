import { useEffect, useState } from 'react';

import { getMatchesByClub, getMatchesByTeam, getTeams } from './api';
import type { Match, Team } from './types';

import './App.css';

const clubId = 'ckl9m9q';

const prettyMatch = (match: Match) => ({
	tijd: match.tijd,
	status: match.status,
	team_thuis: match._embedded.pouleindeling_thuis.omschrijving,
	team_uit: match._embedded.pouleindeling_uit.omschrijving,
	sporthal: match._embedded.sporthal
});	

function App() {

	const [teams, setTeams] = useState<Team[]>([]);
	const [selectedTeam, setSelectedTeam] = useState<string | undefined>();
	const [matches, setMatches] = useState<Match[]>([]);

	useEffect(() => {
		getTeams(clubId).then((teams) => setTeams(teams));
	}, []);

	useEffect(() => {
		if (selectedTeam) {
			getMatchesByTeam(selectedTeam).then((matches) => setMatches(matches.map(prettyMatch)));
		} else {
			getMatchesByClub(clubId).then((matches) => setMatches(matches.map(prettyMatch)));
		}
	}, [selectedTeam]);

	return (
		<main>
			<h1>Wedstrijden</h1>
			<h2>Teams</h2>
			<select onChange={(event) => setSelectedTeam(event.target.value)}>
				{teams.map((team) => (
					<option
						key={team.code}
						value={team.code}
					>
						{team?.naam	?? team.code}
					</option>
				))}
			</select>

			<h2>Wedstrijden</h2>
			<table>
			<thead>
			<th>Thuis</th>
			<th>Uit</th>
			<th>Sporthal</th>
			<th>Tijd</th>
			</thead>
			<tbody>
			{matches.map((match) => (
				<tr>
					<td>{match.team_thuis}</td>
					<td>{match.team_uit}</td>
					<td>{match.sporthal?.naam ?? JSON.stringify(match.sporthal)}</td>
					<td>{new Date(match.tijd).toLocaleString()}</td>
				</tr>
			))}
			</tbody>
			</table>
			
		</main>
	);
}

export default App;
