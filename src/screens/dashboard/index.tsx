import {View} from 'react-native'

import {Puzzle} from '../../components/puzzle'

export default function Dashboard() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>
      <Puzzle />
    </View>
  )
}
