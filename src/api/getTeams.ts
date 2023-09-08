import type { Team } from '../types';

export const getTeams = async (clubId: string): Promise<Team[]> =>
	fetch(
		// `https://api.nevobo.nl/v1/competitie/teams?vereniging=${clubId}`,
		`http://localhost:5001/teams/${clubId}`,
	)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error('Network response was not ok.');
			})
			.then((json) => {
				return json._embedded.items;
			})
			.catch((error) => {
				console.error('Error fetching teams', error);
			});


