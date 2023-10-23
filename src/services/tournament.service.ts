import { Tournament } from "@interfaces/tournament.interface";
import { TournamentModel } from '@models/tournament.model';
import { HttpException } from '@/exceptions/httpException';
import { CreateTournamentDto } from "@/dtos/tournaments.dto";


export async function findAllTournament(): Promise<Tournament[]> {
    const allTournament: Tournament[] = await TournamentModel.findAll();
    return allTournament;
}

export async function findTournamentById(tournamentId: number): Promise<Tournament> {
    const findTournament: Tournament = await TournamentModel.findByPk(tournamentId);
    if (!findTournament) throw new HttpException(409, "Tournament doesn't exist");
    return findTournament;
}

export async function createTournament(tournamentData: CreateTournamentDto): Promise<Tournament> {
    const createTournamentData: Tournament = await TournamentModel.create({ ...tournamentData });
    return createTournamentData;
}

export async function updateTournament(tournamentId: number, tournamentData: CreateTournamentDto): Promise<Tournament> {
    const findTournament: Tournament = await TournamentModel.findByPk(tournamentId);
    if (!findTournament) throw new HttpException(409, "Tournament doesn't exist");

    await TournamentModel.update({ ...tournamentData }, { where: { id: tournamentId } });

    const updateTournament: Tournament = await TournamentModel.findByPk(tournamentId);
    return updateTournament;
}

export async function deleteTournament(tournamentId: number): Promise<Tournament> {
    const findTournament: Tournament = await TournamentModel.findByPk(tournamentId);
    if (!findTournament) throw new HttpException(409, "Tournament doesn't exist");

    await TournamentModel.destroy({ where: { id: tournamentId } });

    return findTournament;
}
