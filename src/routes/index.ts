import { Router } from 'express'
import tournamentsRouter from './tournament.route'

const router = Router()
router.use('/tournaments', tournamentsRouter)

export default router