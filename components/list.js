import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const LOW_DOT = '.'
const BULLET = '•'
const UNORDERED_PREFIX = `${BULLET} `

export default props => {
  const { children, markdown, ...rest } = props
  const renderChild = (child, i) => {
    const prefixText = markdown.ordered ? `${i + 1}${LOW_DOT} ` : UNORDERED_PREFIX
    return (
      <View style={styles.listItem} key={`list-el-${i}`}>
        <Text style={styles.listItemPrefix}>{prefixText}</Text>
        <View style={styles.listItemContent}>
          {child}
        </View>
      </View>
    )
  }

  return (
    <View {...rest}>
      {children.map(renderChild)}
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection:'row',
  },
  listItemPrefix: {
    flex: 0,
    whiteSpace: 'pre',
  },
  listItemContent: {
    flex: 1,
  }
})
