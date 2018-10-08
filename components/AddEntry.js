import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { lightPurp } from '../utils/colors'
import FitnessSlider from './FitnessSlider'
import FitnessStepper from './FitnessStepper'
import DateHeader from './DateHeader'


function SubmitBtn ({submit}) {
  return (
    <TouchableOpacity onPress={submit}>
      <Text>Submit</Text>
    </TouchableOpacity>
  )
}

export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
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

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    })

    //update redux

    //update db

    //update notifications to user that no update is needed on this day
  }

  render() {
    const metaInfo = getMetricMetaInfo()

    return (
      <View>
        <DateHeader date={ new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(( key ) => {
          const { displayName, type, getIcon, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key}>
              <Text>{displayName}</Text>
              {this.getIcon(key)}
              { type === 'slider' ?
                <FitnessSlider 
                  value={value}
                  onChange={(value)=>this.slide(key, value)}
                  {...rest}
                /> :
                <FitnessStepper 
                  value={value}
                  onIncrement={()=>this.increment(key)}
                  onDecrement={()=>this.decrement(key)}
                  {...rest}
                />
              }
            </View>
          )
        })}
        <SubmitBtn submit={this.submit} />
      </View>
    )
  }
}
