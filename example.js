import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

import createMarkdownRenderer from './markdown'

// pass in `marked` opts, e.g. gfm: true for Github Flavored Markdown
const Markdown = createMarkdownRenderer({ gfm: false })

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
      <Markdown contentContainerStyle={styles.container} markdownStyles={markdownStyles}>
        {text}
      </Markdown>
    )
  }
}

// const headingStyles = {
//   '1': {
//     fontSize: 24
//   },
//   '2': {
//     fontSize: 20
//   },
// }

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
