import { Platform } from 'react-native'

module.exports = {
  container: Platform.web ? { whiteSpace: 'pre-wrap' } : {},
  view: {},
  blockquote_section: {
    flexDirection: "row"
  },
  blockquote_section_bar: {
    width: 3,
    height: null,
    backgroundColor: "#DDDDDD",
    marginRight: 15
  },
  code: {
    borderWidth: 1,
    padding: 3,
    borderColor: '#dddddd',
    backgroundColor: '#eeeeee',
    fontFamily: "Courier",
    fontWeight: "500"
  },
  del: {
    containerBackgroundColor: "#222222"
  },
  em: {
    fontStyle: "italic"
  },
  heading: {
    fontWeight: "200"
  },
  heading1: {
    fontSize: 32
  },
  heading2: {
    fontSize: 24
  },
  heading3: {
    fontSize: 18
  },
  heading4: {
    fontSize: 16
  },
  heading5: {
    fontSize: 13
  },
  heading6: {
    fontSize: 11
  },
  hr: {
    backgroundColor: "#cccccc",
    height: 1
  },
  image: {
    width: 320,
    height: 320
  },
  inline_code: {
    backgroundColor: "#eeeeee",
    borderColor: "#dddddd",
    borderRadius: 3,
    borderWidth: 1,
    fontFamily: "Courier",
    fontWeight: "bold"
  },
  link: {
    textDecorationLine: "underline"
  },
  list: {
  },
  list_item: {
    flexDirection: "column"
  },
  list_item_bullet: {
    fontSize: 20,
    lineHeight: 20,
    marginTop: 6
  },
  list_item_number: {
    fontWeight: "bold"
  },
  mail_to: {
    textDecorationLine: "underline"
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  list_item_text: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    color: "#222222"
  },
  strong: {
    fontWeight: "bold"
  },
  table: {
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 3
  },
  tableheader: {
    backgroundColor: "#222222",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  tableheader_cell: {
    color: "#ffffff",
    fontWeight: "bold",
    padding: 5
  },
  tablerow: {
    borderBottomWidth: 1,
    borderColor: "#222222",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  tablecell: {
    padding: 5
  },
  text: {
    color: "#222222",
    whiteSpace: 'normal',
  },
  u: {
    borderColor: "#222222",
    borderBottomWidth: 1
  },
  video: {
    width: 300,
    height: 300
  },
}
