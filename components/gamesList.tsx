import { ScrollView, StyleSheet, Text, View } from "react-native";

function getPrettyTimeFromUTCStr(utcStr) {
  const datetime = new Date(utcStr)
  return datetime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
}

function getPrettyDateFromUTCStr(utcStr) {
  const datetime = new Date(utcStr)
  return datetime.toLocaleDateString("en-US", { day: "numeric", month: "short" })
}

export default function GamesList({ games }) {
    return <ScrollView>
    {
        games.map((game, index) => {
        return (
            <View key={index} style={styles.cardContainer}>
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
        )})
    }
    </ScrollView>
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
