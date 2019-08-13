const extend = require('xtend')
const marked = require('marked')
const inline = marked.InlineLexer.rules

function groupTokens (tokens) {
  // defensive copy as we're going to mutate the shit out of this
  tokens = tokens.slice()

  const children = []
  const container = {
    type: 'container',
    children
  }

  while (tokens.length) {
    let group = readNextGroup(tokens)
    if (!group) break

    children.push(group)
  }

  return container
}

function readNextGroup (tokens) {
  const first = tokens.shift()
  if (first.type.endsWith('_end')) return

  if (!first.type.endsWith('_start')) {
    return first
  }

  // slice off '_start' suffix
  const type = first.type.slice(0, first.type.length - 6)
  const children = []
  const parent = extend(first, {
    type,
    children
  })

  while (true) {
    let group = readNextGroup(tokens)
    if (!group) break

    group.parent = parent
    children.push(group)
    if (!tokens.length) break
  }

  return parent
}

function ensureParents (token) {
  token.children.forEach(child => child.parent = token)
  return token
}

function Parser (text, opts) {
  this.text = text
  this.options = opts
}

Parser.prototype.lex = function lex (src) {
  var tokens = []
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = inline.escape.exec(src)) {
      src = src.substring(cap[0].length);
      // tokens.push(this.renderer.text(cap[1]));
      tokens.push({
        type: 'text',
        text: cap[1]
      });

      continue;
    }

    // autolink
    if (cap = inline.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = cap[1];
        href = text;
      }

      tokens.push({
        type: 'link',
        href: href,
        text: text
      });

      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = inline.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = cap[1];
      href = text;
      tokens.push({
        type: 'link',
        href: href,
        text: text
      });

      continue;
    }

    // tag
    // if (cap = inline.tag.exec(src)) {
    //   if (!this.inLink && /^<a /i.test(cap[0])) {
    //     this.inLink = true;
    //   } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
    //     this.inLink = false;
    //   }
    //   src = src.substring(cap[0].length);
    //   out += this.options.sanitize
    //     ? this.options.sanitizer
    //       ? this.options.sanitizer(cap[0])
    //       : escape(cap[0])
    //     : cap[0]
    //   continue;
    // }

    // link
    if (cap = inline.link.exec(src)) {
      src = src.substring(cap[0].length);
      var result = this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });

      tokens.push(result)
      continue;
    }

    // reflink, nolink
    if ((cap = inline.reflink.exec(src))
        || (cap = inline.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        tokens.push({
          type: 'text',
          text: cap[0].charAt(0)
        })

        src = cap[0].substring(1) + src;
        continue;
      }

      tokens.push(this.outputLink(cap, link));
      continue;
    }

    // strong
    if (cap = inline.strong.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push(ensureParents({
        type: 'strong',
        children: this.lex(cap[2] || cap[1])
      }));


      continue;
    }

    // em
    if (cap = inline.em.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push(ensureParents({
        type: 'em',
        children: this.lex(cap[2] || cap[1])
      }))

      continue;
    }

    // code
    if (cap = inline.code.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push({
        type: 'code',
        text: cap[2]
      });

      continue;
    }

    // br
    if (cap = inline.br.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push({
        type: 'br'
      });

      continue;
    }

    // del (gfm)
    if (cap = inline.del.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push(ensureParents({
        type: 'del',
        children: this.lex(cap[1])
      }));

      continue;
    }

    // text
    if (cap = inline.text.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push({
        type: 'text',
        text: cap[0]
      });

      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return tokens
}

// originally InlineLexer.prototype.outputLink
Parser.prototype.outputLink = function (cap, link) {
  var href = link.href
    , title = link.title ? link.title : null;

  if (cap[0].charAt(0) !== '!') {
    this.inLink = true
    return ensureParents({
      type: 'link',
      href: href,
      title: title,
      children: this.lex(cap[1])
    })
  }

  return {
    type: 'image',
    href: href,
    title: title,
    text: cap[1]
  };
}

Parser.prototype.mangle = function mangle (text) {
  if (!this.options.mangle) return text

  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
}

const shallowFlatten = (arr, el) => arr.concat(el)
const splitParagraphs = tokens => tokens.map(token => {
  if (token.type === 'paragraph') {
    return token.text.split('\n').map(text => ({ type: text, text }))
  }

  return token
})
.reduce(shallowFlatten, [])

const normalizeLineBreaks = tokens => tokens.map((token, i) => {
  if (token.type === 'space') {
    return { type: 'br' }
  }

  if (token.type === 'text') {
    const next = tokens[i + 1]
    if (next && next.type === 'text') {
      return [token, { type: 'br' }]
    }
  }

  return token
})
.reduce(shallowFlatten, [])

Parser.prototype.parse = function parse () {
  let tokens = marked.lexer(this.text, this.options)
  this.links = tokens.links
  tokens = normalizeLineBreaks(splitParagraphs(tokens))

  const expanded = tokens.map(token => {
    if (token.text) {
      const children = this.lex(token.text)
      if (children.length === 1 && token.type === 'text') {
        // same as input
      } else {
        delete token.text
        token.children = children
        ensureParents(token)
      }
    }

    return token
  })

  return groupTokens(expanded)
}

Parser.parse = function (text, opts) {
  return new Parser(text, opts).parse()
}

module.exports = {
  parse: Parser.parse
}
