import { NextFunction, Request, Response } from 'express';
import { CreateTournamentDto } from '@dtos/tournaments.dto';
import { Tournament } from '@interfaces/tournament.interface';
import * as tournamentService from '@services/tournament.service';

export const getTournaments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const findAllTournamentsData: Tournament[] = await tournamentService.findAllTournament();

        res.status(200).json({ data: findAllTournamentsData, message: 'findAll' });
    } catch (error) {
        next(error);
    }
};

export const getTournamentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tournamentId = Number(req.params.id);
        const findOneTournamentData: Tournament = await tournamentService.findTournamentById(tournamentId);

        res.status(200).json({ data: findOneTournamentData, message: 'findOne' });
    } catch (error) {
        next(error);
    }
};

export const createTournament = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tournamentData: CreateTournamentDto = req.body;
        const createTournamentData: Tournament = await tournamentService.createTournament(tournamentData);

        res.status(201).json({ data: createTournamentData, message: 'created' });
    } catch (error) {
        next(error);
    }
};

export const updateTournament = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tournamentId = Number(req.params.id);
        const tournamentData: CreateTournamentDto = req.body;
        const updateTournamentData: Tournament = await tournamentService.updateTournament(tournamentId, tournamentData);

        res.status(200).json({ data: updateTournamentData, message: 'updated' });
    } catch (error) {
        next(error);
    }
};

export const deleteTournament = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tournamentId = Number(req.params.id);
        const deleteTournamentData: Tournament = await tournamentService.deleteTournament(tournamentId);

        res.status(200).json({ data: deleteTournamentData, message: 'deleted' });
    } catch (error) {
        next(error);
    }
};