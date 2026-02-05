import { Text } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

function getPrettyTimeFromUTCStr(utcStr) {
  const datetime = new Date(utcStr)
  return datetime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
}

function getPrettyDateFromUTCStr(utcStr) {
  const datetime = new Date(utcStr)
  return datetime.toLocaleDateString("en-US", { day: "numeric", month: "short" })
}

export default function Tab() {
  const [games, setGames] = useState<any>([])

  useEffect(() => {
    const fetchCall = async () => {
      const result = await fetch("https://api.sstats.net/Games/list?From=2026-02-05&To=2026-02-07&Limit=15", {
        headers: {
          'Authorization': 'ApiKey ykl77arevkluz8hx',
          'Content-Type': 'application/json'
        }
      })
      const games = await result.json()
      const formattedGames = []
      for (const game of games.data) {
        formattedGames.push({
          date: game.date,
          countryName: game.season.league.country.name,
          roundName: game.season.league.name,
          homeTeam: game.homeTeam.name,
          awayTeam: game.awayTeam.name
        })
        console.log(game)
      }
      setGames(formattedGames)
    }

    console.log("Fetching data from the API...")
    fetchCall()
  }, [])

  return (
    <View style={styles.container}>
      <Text h4>Popular upcoming matches</Text>
      <ScrollView>
      {
        games.map((game, index) => {
          return (
            <View style={styles.cardContainer}>
              <View style={styles.cardHeaderContainer}>
                <Text>{game.countryName}</Text>
                <View style={styles.expander} />
                <Text>{getPrettyDateFromUTCStr(game.date)}</Text>
              </View>

              <View style={styles.cardBodyContainer}>
                <Text>{game.homeTeam}</Text>
                <View style={styles.cardBodyTimeContainer}>
                  <Text>{getPrettyTimeFromUTCStr(game.date)}</Text>
                </View>
                <Text>{game.awayTeam}</Text>
              </View>

              <View style={styles.cardFooterContainer}>
                <Text>{game.roundName}</Text>
              </View>
            </View>
          )
        })
      }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5
  },
  expander: {
    flex: 1
  },
  cardContainer: {
    flex: 1,
    borderRadius: 2,
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    minHeight: 100
  },
  cardHeaderContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  cardBodyContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  cardBodyTimeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardFooterContainer: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    alignItems: 'center'
  }
});
