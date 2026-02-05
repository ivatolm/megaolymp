import GamesList from '@/components/gamesList';
import { fetchRecentGames } from '@/components/utils';
import { Text } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Tab() {
  const [games, setGames] = useState<any>([])

  useEffect(() => {
    const asyncCall = async () => {
      const res = await fetchRecentGames()
      setGames([...res])
    }
    asyncCall()
  }, [])

  return (
    <View style={styles.container}>
      <Text h4>Popular upcoming matches</Text>
      <GamesList games={games} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5
  }
});
