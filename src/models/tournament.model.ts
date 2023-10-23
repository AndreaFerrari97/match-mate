import { Sequelize, DataTypes, Model, Optional } from 'sequelize'
import { Tournament } from '../interfaces/tournament.interface';
import sequelizeConnection from '../database/index'
export type TournamenCreateAttributes = Optional<Tournament, 'id'>;

export class TournamentModel extends Model<Tournament, TournamenCreateAttributes> implements Tournament {
    public id!: number;
    public title: string;
    public description!: string;
    public startDateTime: Date;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

TournamentModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    startDateTime: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'Tournaments',
    sequelize: sequelizeConnection,
    paranoid: true
})

export default TournamentModel