class Score {
    constructor() {

    }

    //Points
    //arrayOfPlayerMatchResult = [0, 1, 2]
    //0 lose
    //1 drawing
    //2 win
    //3 by
    //4 drop
    computePoints() {
    }

    //OMW%
    // 01: 0, 2, 2 
    // 02: 1, 1, 0
    // 03: 2, 0, 2
    computeOpponentsMatchWinRatePercent() {

        //if < 33.333 return 33.33333
    }

    //GW%
    computeGameWinPercent() {

    }

    //OGW%
    computeOpponentsGameWinPercent() {

    }

    //Player
    //create table player( id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, nickname VARCHAR(50) NOT NULL);

    //Tournament:
    // TournamedID | Name | TotalPlayer
    /*
    create table tournament( id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NOT NULL);
    */

    //Tournament Player:
    //  PlayerID | TournamentID
    //create table tournament_player( id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NOT NULL,);


    //Pairing
    //  PairingID | TournamentID | Round | PlayerID 1 |  PlayerID 2 

    //Match 
    //  MatchID | PairingID | PlayerID | Result | GameWin | GameLoss | Bye

    //Standings
    //  ID | TournamentID | PlayerID | Score | OpponentsMatchWin | PlayerGameWin | OpponentsGameLoss 

    /**
     * Finally, what’s the influence of a bye on the tiebreakers? 
     * It is none. The program, while computing the average of your opponents match-winning percentages, 
     * will have one less value to consider: if you received a bye during the first round of a 6 round tournament, 
     * the program will simply mean over 5 values instead of 6. 
     * However, if you look at the standings after the first round, you’ll see the player with the bye having a tiebreaker of 100% 
     * (you’ll notice it, since all the other players with 3 points will have a tiebreaker of 33%): 
     * this is not his/her real tiebreaker, this is only a default value that is used because the program cannot compute the mean of 0 numbers.
     */
}

enum MatchResult { lose, tie, win };
