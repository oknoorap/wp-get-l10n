# :speech_balloon: wp-get-l10n
> Extract WordPress Localization Text.

## Install

```bash
#Yarn
yarn add wp-get-l1on

#NPM
npm install wp-get-l1on --save
```

## Usage

```javascript
const getL1onText = require('wp-get-l1on')

// Output: My String
console.log(getL1onText('__( "My String", "text-domain" )'))

// Output: { single: '% comment', plural: '% comments' }
console.log(getL1onText('_n( "%s comment", "%s comments", $comments_count, "text-domain" )'))

// Output: { text: 'My String', context: 'context' }
console.log(getL1onText('_x( "My String", "context", "text-domain" )'))
```

## License
MIT (c) [oknoorap](https://github.com/oknoorap)
