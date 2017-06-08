# rn-markdown

Markdown rendering component, using the parser from [marked](https://github.com/chjj/marked).

The example below, and the component styles were adapted from [react-native-simple-markdown](https://github.com/CharlesMangwa/react-native-simple-markdown).

## Usage

```js
import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

import createMarkdownRenderer from 'rn-markdown'

const Markdown = createMarkdownRenderer()
// override individual renderers with:
// Markdown.renderer.text = MyTextComponent
// Markdown.renderer.image = MyImageComponent
// etc.

export default class MarkdownExample extends Component {
  render() {
    const text = 
`
You can **emphasize**

You can write code:

    var blah = 1;
    var haha = 2;

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
  - more frakking lists
  - blah
    - blah blah, damn it!
`

    // the default Markdown container is scrollview
    // override with Markdown.renderer.container = MyMarkdownContainerComponent
    return (
      <Markdown contentContainerStyle={styles.container} markdownStyles={markdownStyles}>
        {text}
      </Markdown>
    )
  }
}
```
