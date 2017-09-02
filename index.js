const PhpParser = require('php-parser')

const parser = new PhpParser({
  parser: {
    extractDoc: true
  }
})

const acceptableFunctions = [
  'gettext',
  '__',
  '_e',
  '_n',
  '_x',
  '_ex',
  '_nx',
  'esc_attr__',
  'esc_attr_e',
  'esc_attr_x',
  'esc_html__',
  'esc_html_e',
  'esc_html_x'
]

module.exports = (code = '') => {
  try {
    const php = parser.parseEval(code)

    if (php.kind !== 'program') {
      return code
    }

    if (php.children.length !== 1) {
      return code
    }

    let statement = php.children[0]

    if (statement.kind === 'assign' &&
      statement.left.kind === 'variable' &&
      statement.right.kind === 'call') {
      statement = statement.right
    }

    if (!acceptableFunctions.includes(statement.what.name)) {
      return code
    }

    switch (statement.what.name) {
      case '_n':
        if (statement.arguments.length >= 3) {
          return {
            single: statement.arguments[0].value,
            plural: statement.arguments[1].value
          }
        }
        break

      case '_nx':
        if (statement.arguments.length >= 4) {
          return {
            single: statement.arguments[0].value,
            plural: statement.arguments[1].value,
            context: statement.arguments[3].value
          }
        }
        break

      case '_x':
      case '_ex':
      case 'esc_attr_x':
      case 'esc_html_x':
        if (statement.arguments.length >= 2) {
          return {
            text: statement.arguments[0].value,
            context: statement.arguments[1].value
          }
        }
        break

      default:
        if (statement.arguments.length > 0) {
          return statement.arguments[0].value
        }
    }
  } catch (err) {
    return err.message
  }

  return code
}
