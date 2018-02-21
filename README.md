# rn-markdown

Markdown rendering component, using the parser from [marked](https://github.com/chjj/marked).

[play](https://tradle.github.io/rn-markdown-playground/) with the [react-native-web](https://github.com/necolas/react-native-web) version

## Install

```sh
npm install --save rn-markdown
# or
yarn add rn-markdown
```

## Usage

The example below, and the component styles were adapted from [react-native-simple-markdown](https://github.com/CharlesMangwa/react-native-simple-markdown).

```js
import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight
} from 'react-native'

import createMarkdownRenderer from 'rn-markdown'

// pass in `marked` opts, e.g. gfm: true for Github Flavored Markdown
const Markdown = createMarkdownRenderer({ gfm: false })

// define a custom renderer for links
Markdown.renderer.link = props => {
  const { markdown, passThroughProps } = props
  const { href } = markdown
  return (
    <TouchableHighlight onPress={() => Alert.alert('check out this hot href', href)}>
      <View>
        {props.children}
      </View>
    </TouchableHighlight>
  )
}

// example partially from react-native-simple-markdown
export default class MarkdownExample extends Component {
  render() {
    const text =
`
You can **emphasize**

You can even [**link your website**](http://carlito.ninja) or if you prefer: [email somebody](mailto:email@somebody.com)

Spice it up with some GIFs 💃:

![Some GIF](https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif)

And even add a cool video 😎!

[![A cool video from YT](https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg)](http://www.youtube.com/watch?v=dQw4w9WgXcQ)

[![Another one from Vimeo](https://i.vimeocdn.com/video/399486266_640.jpg)](https://vimeo.com/57580368)

# heading 1

content 1

## heading 2

### heading 3

#### heading 4

uh oh...numbered list coming up

1. a
1. b
  - with an unnumbered list inside
  - blah
    - blah blah

more frakking lists

- blah
- blah1
- blah2
  - blah2.1
  - blah2.2
    - blah2.2.1
    - blah2.2.2
`

    return (
      <Markdown contentContainerStyle={styles.container} markdownStyles={markdownStyles} passThroughProps={{ passMeThrough: 'to the child renderer components' }}>
        {text}
      </Markdown>
    )
  }
}

const markdownStyles = {
  container: {
    paddingLeft: 10
  },
  heading1: {
    fontSize: 24,
    color: 'purple',
  },
  link: {
    color: 'pink',
  },
  mail_to: {
    color: 'orange',
  },
  text: {
    color: '#555555',
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

AppRegistry.registerComponent('MarkdownExample', () => MarkdownExample)
```

## Contributing

This is a work in progress and contributions are welcome!
