import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { lightPurp } from '../utils/colors'
import Slider from './Slider'
import Stepper from './Stepper'

export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState((state)=>{
      const count = state[metric] + step

      return {
        ... state,
        [metric]: count > max ? max : count
      }
    })
  }

  decrement = (metric) => {
    this.setState((state)=>{
      const count = state[metric] - step

      return {
        ... state,
        [metric]: count < 0 ? 0 : count
      }
    })
  }

  slide = (metric, value) => {
    this.setState(()=>({
      [metric]: value
    }))
  }

  getIcon = (key) => {
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

  render() {
    const metaInfo = getMetricMetaInfo()

    return (
      <View>
        {Object.keys(metaInfo).map(( key ) => {
          const { displayName, type, getIcon, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key}>
              {this.getIcon(key)}
              <Text>{displayName}</Text>
              { type === 'slider' ?
                <Slider 
                  value={value}
                  onChange={(value)=>this.slide(metric, value)}
                  {...rest}
                /> :
                <Stepper 
                  value={value}
                  onIncrement={()=>this.increment(key)}
                  onDecrement={()=>this.decrement(key)}
                  {...rest}
                />
              }
            </View>
          )
        })}
      </View>
    )
  }
}
