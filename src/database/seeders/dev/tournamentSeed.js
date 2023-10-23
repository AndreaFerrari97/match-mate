import { TournamentModel } from '@models/tournament.model';

export const seedTournaments = async () => {
  try {
    // Insert tournament data
    await TournamentModel.bulkCreate([
      {
        title: 'Tournament 1',
        description: 'Description for Tournament 1',
        startDateTime: new Date(),
      },
      {
        title: 'Tournament 2',
        description: 'Description for Tournament 2',
        startDateTime: new Date(),
      },
      {
        title: 'Tournament 3',
        description: 'Description for Tournament 3',
        startDateTime: new Date(),
      },
      {
        title: 'Tournament 4',
        description: 'Description for Tournament 4',
        startDateTime: new Date(),
      },
      // Add more tournament data here as needed
    ]);
    console.log('Tournaments table seeded successfully.');
  } catch (error) {
    console.error('Error seeding the Tournaments table:', error);
  }
}
