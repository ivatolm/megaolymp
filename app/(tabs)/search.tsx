import GamesList from '@/components/gamesList';
import { fetchLeagueGames, fetchLeagues } from '@/components/utils';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

function getLeagueIdByName(leagues, name) {
  // TODO: Implement better search
  for (const league of leagues) {
    if (name == league.name) {
      return league.id
    }
  }
  return null
}

export default function Tab() {
  const [leagues, setLeagues] = useState<any>([])
  const [games, setGames] = useState<any>([])
  
  const [leagueId, setLeagueId] = useState(39)
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())

  useEffect(() => {
    const asyncCall = async () => {
      const res = await fetchLeagues()
      setLeagues([...res])
    }
    asyncCall()
  }, [])

  useEffect(() => {
    const asyncCall = async () => {
      fromDate.setHours(0)
      fromDate.setMinutes(0)
      fromDate.setSeconds(0)
      fromDate.setMilliseconds(0)

      toDate.setHours(0)
      toDate.setMinutes(0)
      toDate.setSeconds(0)
      toDate.setMilliseconds(0)

      const leagueGames = await fetchLeagueGames(leagueId, fromDate, toDate)
      setGames([...leagueGames])
    }
    asyncCall()
  }, [leagueId, fromDate, toDate])

  async function onSearchInput(input) {
    const id = getLeagueIdByName(leagues, input)
    if (id == null) {
      return
    }
    setLeagueId(id)
  }

  async function onChangeFromDate(event, selectedDate) {
    setFromDate(new Date(selectedDate))
  }
  async function onChangeToDate(event, selectedDate) {
    setToDate(new Date(selectedDate))
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder='Search teams, leagues...'
        onChangeText={onSearchInput}
      />

      <View style={styles.main}>
        <View style={styles.pickerContainer}>
          <DateTimePicker value={fromDate} onChange={onChangeFromDate} />
          <DateTimePicker value={toDate} onChange={onChangeToDate} />
        </View>
      </View>

      <GamesList games={games} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  main: {
    minHeight: 100
  }
});
