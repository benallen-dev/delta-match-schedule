import { Match } from '../types';

			export const getMatchesByClub = async (clubId: string): Promise<Match[]> => fetch(
				// `https://api.nevobo.nl/v1/competitie/wedstrijden?vereniging=${clubId}`,
				`http://localhost:5001/matches/club/${clubId}`,
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
					console.error('Error fetching matches', error);
				});
