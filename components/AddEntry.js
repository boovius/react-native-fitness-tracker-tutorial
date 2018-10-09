import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import getIcon from '../utils/GetIcon'
import FitnessSlider from './FitnessSlider'
import FitnessStepper from './FitnessStepper'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'

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
    const { step } = getMetricMetaInfo(metric)

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

    //update redux

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    })

    submitEntry(key, entry)

    //update notifications to user that no update is needed on this day
  }

  reset = () => {
    const key = timeToString()

    //update redux

    //route to home

    removeEntry(key)
  }

  render() {
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name='ios-happy-outline' size={100} />   
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      )
    }

    return (
      <View>
        <DateHeader date={ new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(( key ) => {
          const { displayName, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key}>
              <Text>{displayName}</Text>
              {getIcon(key)}
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
