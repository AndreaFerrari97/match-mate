import { Score, MatchGamesResult, minimumPercentage } from '../src/score'
const playerWin = {
    hasPlayerMatchedWithBye: false,
    playerGameWin: 2,
    opponentGameWin: 0
}
const opponentWin = {
    hasPlayerMatchedWithBye: false,
    playerGameWin: 0,
    opponentGameWin: 2
}
const tieMatch = {
    hasPlayerMatchedWithBye: false,
    playerGameWin: 1,
    opponentGameWin: 1
}
const playerMatchedBye = {
    hasPlayerMatchedWithBye: true,
    playerGameWin: 2,
    opponentGameWin: 0
}
const playerWinAndLoseOneGame = {
    hasPlayerMatchedWithBye: false,
    playerGameWin: 2,
    opponentGameWin: 1
}
const opponentWinAndLoseOneGame = {
    hasPlayerMatchedWithBye: false,
    playerGameWin: 1,
    opponentGameWin: 2
}


describe('Compute player points', () => {

    // playerWinMatch 
    // opponentWinMatch 
    // tieMatch 
    // playerMatchedBye
    // playerWinMatchAndLoseOneGame
    // opponentWinMatchAndLoseOneGame 
    describe('Zero round', () => {
        it('Result of match = []', async () => {
            const matchResult: MatchGamesResult[] = []
            expect(Score.computePlayerPoints(matchResult)).toBe(0);
        })
    })

    describe('First round', () => {
        it('Result of match = win', async () => {
            const matchResult: MatchGamesResult[] = [playerWin]
            expect(Score.computePlayerPoints(matchResult)).toBe(3);
        })
        it('Result of match = lose', async () => {
            const matchResult: MatchGamesResult[] = [opponentWin]
            expect(Score.computePlayerPoints(matchResult)).toBe(0);
        })
        it('Result of match = tie', async () => {
            const matchResult: MatchGamesResult[] = [tieMatch]
            expect(Score.computePlayerPoints(matchResult)).toBe(1);
        })
    })

    describe('Second round', () => {
        it('Result of match = [win, lose]', async () => {
            const matchResult: MatchGamesResult[] = [playerWinAndLoseOneGame, opponentWinAndLoseOneGame]
            expect(Score.computePlayerPoints(matchResult)).toBe(3);
        })
        it('Result of match = [tie, tie]', async () => {
            const matchResult: MatchGamesResult[] = [tieMatch, tieMatch]
            expect(Score.computePlayerPoints(matchResult)).toBe(2);
        })
        it('Result of match = [lose, tie]', async () => {
            const matchResult: MatchGamesResult[] = [opponentWinAndLoseOneGame, tieMatch]
            expect(Score.computePlayerPoints(matchResult)).toBe(1);
        })
    })

    describe('Fifth round', () => {
        it('Result of match = [win, lose, win, lose, tie]', async () => {
            const matchResult: MatchGamesResult[] =
                [playerWinAndLoseOneGame, opponentWinAndLoseOneGame, playerWinAndLoseOneGame, opponentWinAndLoseOneGame, tieMatch]
            expect(Score.computePlayerPoints(matchResult)).toBe(7);
        })
        it('Result of match = [tie, tie, tie, lose, lose]', async () => {
            const matchResult: MatchGamesResult[] =
                [tieMatch, tieMatch, tieMatch, opponentWinAndLoseOneGame, opponentWinAndLoseOneGame]
            expect(Score.computePlayerPoints(matchResult)).toBe(3);
        })
        it('Result of match = [lose, tie, win, lose, lose]', async () => {
            const matchResult: MatchGamesResult[] = [opponentWin, tieMatch, playerWinAndLoseOneGame, opponentWin, opponentWin]
            expect(Score.computePlayerPoints(matchResult)).toBe(4);
        })
    })
})

describe('Compute player match win rate percentage', () => {

    describe('Zero round', () => {
        it('Result of match = []', async () => {
            const matchResult: MatchGamesResult[] = []
            expect(Score.computePlayerMatchWinRatePercentage(matchResult)).toBe(0);
        })
    })

    describe('First round', () => {
        it('Result of match = win', async () => {
            const matchResult: MatchGamesResult[] = [playerWin]
            expect(Score.computePlayerMatchWinRatePercentage(matchResult)).toBe(100);
        })
        it('Result of match = lose', async () => {
            const matchResult: MatchGamesResult[] = [opponentWin]
            expect(Score.computePlayerMatchWinRatePercentage(matchResult)).toBe(minimumPercentage);
        })
        it('Result of match = tie', async () => {
            const matchResult: MatchGamesResult[] = [tieMatch]
            expect(Score.computePlayerMatchWinRatePercentage(matchResult)).toBe(minimumPercentage);
        })
    })

    describe('Second round', () => {
        it('Result of match = [win, lose]', async () => {
            const matchResult: MatchGamesResult[] = [playerWinAndLoseOneGame, opponentWin]
            expect(Score.computePlayerMatchWinRatePercentage(matchResult)).toBe(50);
        })
        it('Result of match = [tie, tie]', async () => {
            const matchResult: MatchGamesResult[] = [tieMatch, tieMatch]
            expect(Score.computePlayerMatchWinRatePercentage(matchResult)).toBe(minimumPercentage);
        })
        it('Result of match = [lose, tie]', async () => {
            const matchResult: MatchGamesResult[] = [opponentWin, tieMatch]
            expect(Score.computePlayerMatchWinRatePercentage(matchResult)).toBe(minimumPercentage);
        })
    })

    describe('Sixth round', () => {
        const computeResult = (win: number, total: number) => (win / total) * 100 > minimumPercentage ?
            +((win / total) * 100).toFixed(6) : minimumPercentage;
        it('Result of match = [tie, tie, win, win, lose]', async () => {
            const matchResult: MatchGamesResult[] = [tieMatch, tieMatch, playerWin, playerWin, opponentWin, opponentWin]
            expect(Score.computePlayerMatchWinRatePercentage(matchResult)).toBe(computeResult(2, 6));
        })
        it('Result of match = [win, lose, win, lose, tie]', async () => {
            const matchResult: MatchGamesResult[] = [playerWin, opponentWin, playerWin, opponentWin, tieMatch, opponentWin]
            expect(Score.computePlayerMatchWinRatePercentage(matchResult)).toBe(computeResult(2, 6));
        })
        it('Result of match = [tie, tie, tie, lose, lose]', async () => {
            const matchResult: MatchGamesResult[] = [tieMatch, tieMatch, tieMatch, opponentWin, opponentWin, opponentWin]
            expect(Score.computePlayerMatchWinRatePercentage(matchResult)).toBe(computeResult(0, 6));
        })
        it('Result of match = [lose, tie, win, lose, lose]', async () => {
            const matchResult: MatchGamesResult[] = [opponentWin, tieMatch, playerWin, opponentWin, opponentWin, opponentWin]
            expect(Score.computePlayerMatchWinRatePercentage(matchResult)).toBe(computeResult(1, 6));
        })
        it('Result of match = [win, win, win, win, win, win]', async () => {
            const matchResult: MatchGamesResult[] = [playerWin, playerWin, playerWin, playerWin, playerWin, playerWin]
            expect(Score.computePlayerMatchWinRatePercentage(matchResult)).toBe(computeResult(6, 6));
        })
    })
})

// describe('Compute player game win rate percentage', () => {
//     describe('Zero round', () => {
//         it('Result of match = []', async () => {
//             const matchResult: MatchGamesResult[] = []
//             expect(Score.computePlayerGameWinPercentage([])).toBe(0);
//         })
//     })

//     describe('First round', () => {
//         it('Player game win = 2, opponent game win = 0', async () => {
//             expect(Score.computePlayerGameWinPercentage([])).toBe(100);
//         })
//         it('Player game win = 0, opponent game win = 0', async () => {
//             expect(Score.computePlayerGameWinPercentage([])).toBe(minimumPercentage);
//         })
//         it('Player game win = 0, opponent game win = 0', async () => {
//             expect(Score.computePlayerGameWinPercentage([])).toBe(minimumPercentage);
//         })
//     })

//     describe('Second round', () => {

//     })

//     describe('Sixth round', () => {

//     })
// })

