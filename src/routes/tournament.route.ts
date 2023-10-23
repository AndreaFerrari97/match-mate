import { Router } from 'express';
import *  as tournamentController from '@controllers/tournaments.controller';
import { CreateTournamentDto } from '@dtos/tournaments.dto';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

const tournamentsRouter = Router();

tournamentsRouter.get(`/`, tournamentController.getTournaments);
tournamentsRouter.get(`/:id`, tournamentController.getTournamentById);
tournamentsRouter.post(`/`, ValidationMiddleware(CreateTournamentDto), tournamentController.createTournament);
tournamentsRouter.put(`/:id`, ValidationMiddleware(CreateTournamentDto, true), tournamentController.updateTournament);
tournamentsRouter.delete(`/:id`, tournamentController.deleteTournament);

export default tournamentsRouter