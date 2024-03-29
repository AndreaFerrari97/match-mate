require('dotenv').config()

import { TournamentModel } from './tournament.model'

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () => Promise.all([
    TournamentModel.sync({ alter: isDev || isTest })
])

export default dbInit 