import { Platform } from 'react-native'

const createWhiteSpaceProps = whiteSpace => Platform.select({
  web: {
    whiteSpace,
  },
  default: {},
})

module.exports = {
  normal: createWhiteSpaceProps('normal'),
  pre: createWhiteSpaceProps('pre'),
}
