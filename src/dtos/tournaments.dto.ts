import { IsString, IsNotEmpty, MinLength, MaxLength, IsDate } from 'class-validator';

export class CreateTournamentDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(64)
    public title: string;

    @IsString()
    @MaxLength(256)
    public description: string;

    @IsDate()
    @IsNotEmpty()
    public startDateTime: Date;


}

export class UpdateTournamentDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(64)
    public title: string;

    @IsString()
    @MaxLength(256)
    public description: string;

    @IsDate()
    @IsNotEmpty()
    public startDateTime: Date;
}
