const API_KEY = "ykl77arevkluz8hx"

function parseGameIntoRelevant(raw) {
    return {
        date: raw.date,
        countryName: raw.season.league.country.name,
        roundName: raw.season.league.name,
        homeTeam: raw.homeTeam.name,
        awayTeam: raw.awayTeam.name
    }
}

export const fetchRecentGames = async () => {
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    const twoDaysAhead = new Date(now)
    twoDaysAhead.setDate(now.getDate() + 2)

    const fromFormatted = now.toLocaleDateString("en-ca")
    const toFormatted = twoDaysAhead.toLocaleDateString("en-ca")

    const result = await fetch(`https://api.sstats.net/Games/list?From=${fromFormatted}&To=${toFormatted}`, {
    headers: {
        'Authorization': `ApiKey ${API_KEY}`,
        'Content-Type': 'application/json'
    }
    })
    const games = await result.json()
    const formattedGames = []
    for (const game of games.data) {
    formattedGames.push(parseGameIntoRelevant(game))
    }
    return formattedGames
}

export const fetchLeagues = async () => {
    const response = await fetch(`https://api.sstats.net/Leagues`, {
        headers: {
            'Authorization': `ApiKey ${API_KEY}`,
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()

    const leagues = []

    for (const item of result.data) {
        leagues.push({
            id: item.id,
            name: item.name
        })
    }
    
    return leagues
}

export const fetchLeagueGames = async (leagueId, from, to) => {
    const fromFormatted = from.toLocaleDateString("en-ca")
    const toFormatted = to.toLocaleDateString("en-ca")
    
    const response = await fetch(`https://api.sstats.net/Games/list?leagueid=${leagueId}&from=${fromFormatted}&to=${toFormatted}`, {
        headers: {
            'Authorization': `ApiKey ${API_KEY}`,
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()

    const games = []

    console.log(result.data)
    try {
        for (const item of result.data) {
            games.push(parseGameIntoRelevant(item))
        }
    } catch {
        // ignore
    }
    
    return games
}
