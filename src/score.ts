export interface MatchGamesResult {
    hasPlayerMatchedWithBye: boolean,
    playerGameWin: number,
    opponentGameWin: number
}

enum MatchResult { win, lose, tie };

export const minimumPercentage = 33.333333;
const resultPrecision = 6;

export class Score {
    static computePlayerPoints(matchGamesResult: MatchGamesResult[]): number {
        return matchGamesResult.reduce((partialScore, mR) => {
            const matchResult: MatchResult = this.getMatchResult(mR);
            switch (matchResult) {
                case MatchResult.win: return partialScore + 3;
                case MatchResult.lose: return partialScore;
                case MatchResult.tie: return partialScore + 1;
            }
        }, 0);
    }

    //MW% (Each opponent's match win percentage added together / number of opponents). 
    // - Opponents cannot have a match win percentage lower than 33%. 
    static computePlayerMatchWinRatePercentage(matchGamesResult: MatchGamesResult[]) {
        if (!matchGamesResult.length) return 0;
        const playerTotalMatchWin = matchGamesResult.filter(mR => this.getMatchResult(mR) == MatchResult.win).length;
        const playerTotalMatch = matchGamesResult.filter(mR => mR.hasPlayerMatchedWithBye == false).length;
        if (!playerTotalMatch) return 0;
        if (!playerTotalMatchWin) return minimumPercentage;
        const result = +((playerTotalMatchWin / playerTotalMatch) * 100).toFixed(resultPrecision);
        return result < minimumPercentage ? minimumPercentage : result;
    }

    //GW% (Games won / Games played). 
    //A player in a five-round Swiss tournamentplayerGameWin who went 2-0, 2-1, 1-2, 2-0, 2-1, would have a GW% of 69.23%. 
    static computePlayerGameWinPercentage(matchGamesResult: MatchGamesResult[]) {
        if (!matchGamesResult.length) return 0;

        const totalGameWinByPlayer = matchGamesResult.reduce((sum, matchResult) =>
            sum = matchResult.hasPlayerMatchedWithBye ?
                sum :
                sum + matchResult.playerGameWin, 0);

        const totalGamePlayed = matchGamesResult.reduce((sum, matchResult) =>
            sum = matchResult.hasPlayerMatchedWithBye ?
                sum :
                sum + matchResult.playerGameWin + matchResult.opponentGameWin, 0);

        if (!totalGamePlayed) return 0;
        const result = +(totalGameWinByPlayer / totalGamePlayed).toFixed(resultPrecision);
        return result < minimumPercentage ? minimumPercentage : result;
    }

    private static getMatchResult(matchGamesResult: MatchGamesResult): MatchResult {
        if (matchGamesResult.playerGameWin > matchGamesResult.opponentGameWin || matchGamesResult.hasPlayerMatchedWithBye)
            return MatchResult.win;
        else if (matchGamesResult.playerGameWin < matchGamesResult.opponentGameWin)
            return MatchResult.lose;
        else
            return MatchResult.tie;
    }
}
