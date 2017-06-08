
import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image
} from 'react-native'

import { parse } from './parser'
import DEFAULT_STYLES from './styles'
import pick from 'object.pick'
import omit from 'object.omit'
import TextStylePropTypes from 'react-native/Libraries/Text/TextStylePropTypes'
import ViewStylePropTypes from 'react-native/Libraries/Components/View/ViewStylePropTypes'

const packageName = require('./package').name
const log = (...args) => {
  args.unshift(packageName)
  return console.log(...args)
}

const TextStyleProps = Object.keys(TextStylePropTypes)
const TextOnlyStyleProps = (function () {
  const props = {}
  for (let p in TextStylePropTypes) {
    if (!(p in ViewStylePropTypes)) {
      props[p] = true
    }
  }

  return Object.keys(props)
}())

const DEFAULT_PADDING = 10

const List = props => {
  const { children, markdown, ...rest } = props
  return (
    <View {...rest}>
      {children.map(renderChild)}
    </View>
  )

  function renderChild (child, i) {
    const prefixText = markdown.ordered ? `${i + 1}. ` : '\u2022 '
    return (
      <View style={{flexDirection:'row', flex: 1}} key={`list-el-${i}`}>
        <Text>{prefixText}</Text>
        {child}
      </View>
    )
  }
}

// const WrappedText = ({ ...props })  => {
//   return (
//     <View>
//       <Text {...props}></Text>
//     </View>
//   )
// }

const DEFAULT_RENDERERS = {
  container: ScrollView,
  text: Text
}

const DEFAULT_CUSTOM_RENDERERS = {
  image: ({ ...props, markdown }) => {
    return <Image source={{ uri: markdown.href }} {...props} />
  },
  list: List
}

export default function createMarkdownRenderer (markedOpts) {
  const typeToRenderer = {
    ...DEFAULT_RENDERERS,
    ...DEFAULT_CUSTOM_RENDERERS
  }

  function renderGroup ({ markdown, markdownStyles={}, style, key }) {
    const { type, children, ordered, depth, text } = markdown

    let El = typeToRenderer[type]
    if (!El) {
      El = View
    }

    const isText = type === 'text'
    let elStyles = getStyles({ markdown, markdownStyles, textOnly: isText })
    // only for the container
    if (isText) {
      const ancestorStyles = getAncestorTextStyles({ markdown, markdownStyles })
      // counterintuitive, but works better
      elStyles = elStyles.concat(ancestorStyles)
    }

    if (style) elStyles.push(style)

    let contents
    if (isText) {
      contents = text
    } else if (children) {
      contents = children.map((group, i) => {
        return renderGroup({
          markdown: group,
          markdownStyles,
          key: `child-${i}`
        })
      })
    }

    const elProps = {
      style: flatten(elStyles),
      // styles,
      // markdown,
      key
    }

    if (El !== DEFAULT_RENDERERS[type]) {
      elProps.markdown = markdown
    }

    return (
      <El {...elProps}>
        {contents}
      </El>
    )
  }

  const Markdown = ({ children, ...rest }) => {
    const parsed = parse(children, markedOpts)
    return renderGroup({ markdown: parsed, ...rest })
  }

  // allow override renderers and textContainers for this markdown instance
  Markdown.renderer = typeToRenderer
  return Markdown
}

function getStyles ({ markdown, markdownStyles, textOnly }) {
  const { type, depth } = markdown
  const styleNames = [type]
  if (type === 'heading') styleNames.push(type + depth)

  return styleNames
    .map(styleName => {
      const defaultStyle = DEFAULT_STYLES[styleName]
      if (!defaultStyle) {
        log(`don't have style mapping for "${styleName}"`)
      }

      return defaultStyle
    })
    .concat(styleNames.map(styleName => markdownStyles[styleName]))
    .filter(style => style != null)
    .map(style => {
      if (typeof style !== 'object') return style

      if (textOnly) {
        return pick(style, TextOnlyStyleProps)
      }

      return omit(style, TextOnlyStyleProps)
    })
}

function getAncestorTextStyles ({ markdown, markdownStyles }) {
  let textStyles = []
  let current = markdown
  while (current = current.parent) {
    textStyles = getStyles({
      markdown: current,
      markdownStyles,
      textOnly: true
    }).concat(textStyles)
  }

  return textStyles
}

function flatten (styleArray) {
  return styleArray.reduce((flat, next) => {
    return { ...flat, ...next }
  }, {})
}

// allow override defaults
export const renderer = DEFAULT_RENDERERS
