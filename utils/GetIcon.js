import React from 'react'
import { View } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { lightPurp } from './colors'

export default function getIcon (key) {
  return {
    run: (
      <View>
        <MaterialIcons
          name='directions-run'
          color={lightPurp}
          size={35}
        />
      </View>
    ),
    bike: (
      <View>
        <MaterialCommunityIcons
          name='bike'
          color={lightPurp}
          size={32}
        />
      </View>
    ),
    swim: (
      <View>
        <MaterialCommunityIcons
          name='swim'
          color={lightPurp}
          size={35}
        />
      </View>
    ),
    sleep: (
      <View>
        <FontAwesome
          name='bed'
          color={lightPurp}
          size={30}
        />
      </View>
    ),
    eat: (
      <View>
        <MaterialCommunityIcons
          name='food'
          color={lightPurp}
          size={35}
        />
      </View>
    )
  }[key]
}