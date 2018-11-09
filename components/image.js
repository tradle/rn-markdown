import React from 'react'
import { Image } from 'react-native'

export default ({ markdown, ...props }) => {
  return <Image source={{ uri: markdown.href }} {...props} />
}
