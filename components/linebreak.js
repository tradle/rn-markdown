import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

export default () => (
  <View style={styles.break} />
)

// style is here because on web we use <br /> directly
const styles = StyleSheet.create({
  break: {
    padding: 0,
    margin: 0,
    // not sure how to avoid hardcoding this
    height: 15,
  }
})
