import test from 'ava'
import getL1onText from './index'

const text = 'Powerful Message'
const context = 'unit test'

test('extract invalid function should be return original function', t => {
  t.is(getL1onText(`my_func( '${text}' )`), `my_func( '${text}' )`)
})

test('extract text from `gettext` function should be valid', t => {
  t.is(getL1onText(`gettext( '${text}', 'text-domain' )`), text)
})

test('extract text from `__` function should be valid', t => {
  t.is(getL1onText(`__( '${text}', 'text-domain' )`), text)
})

test('extract text from `__` function from assignment should be valid', t => {
  t.is(getL1onText(`$text = __( '${text}', 'text-domain' )`), text)
})

test('extract text from `_e` function should be valid', t => {
  t.is(getL1onText(`_e( '${text}', 'text-domain' )`), text)
})

test('extract data from `_n` function should be valid', t => {
  t.deepEqual(getL1onText(`_n( '%s ${text}', '%s ${text}s', $number, 'text-domain' )`), {
    single: `%s ${text}`,
    plural: `%s ${text}s`
  })
})

test('extract data from `_x` function should be valid', t => {
  t.deepEqual(getL1onText(`_x( '${text}', '${context}', 'text-domain' )`), {
    text,
    context
  })
})

test('extract data from `_ex` function should be valid', t => {
  t.deepEqual(getL1onText(`_ex( '${text}', '${context}', 'text-domain' )`), {
    text,
    context
  })
})

test('extract data from `_nx` function should be valid', t => {
  t.deepEqual(getL1onText(`_nx( '%s ${text}', '%s ${text}s', $number, '${context}', 'text-domain' )`), {
    single: `%s ${text}`,
    plural: `%s ${text}s`,
    context
  })
})

test('extract text from `esc_attr__` function should be valid', t => {
  t.is(getL1onText(`$text = esc_attr__( '${text}', 'text-domain' )`), text)
})

test('extract text from `esc_attr_e` function should be valid', t => {
  t.is(getL1onText(`esc_attr_e( '${text}', 'text-domain' )`), text)
})

test('extract data from `esc_attr_x` function should be valid', t => {
  t.deepEqual(getL1onText(`$text = esc_attr_x( '${text}', '${context}', 'text-domain' )`), {
    text,
    context
  })
})

test('extract text from `esc_html__` function should be valid', t => {
  t.is(getL1onText(`$text = esc_html__( '<strong>${text}</strong>', 'text-domain' )`), `<strong>${text}</strong>`)
})

test('extract text from `esc_html_e` function should be valid', t => {
  t.is(getL1onText(`esc_html_e( '<strong>${text}</strong>', 'text-domain' )`), `<strong>${text}</strong>`)
})

test('extract data from `esc_html_x` function should be valid', t => {
  t.deepEqual(getL1onText(`esc_html_x( '<strong>${text}</strong>', '${context}', 'text-domain' )`), {
    text: `<strong>${text}</strong>`,
    context
  })
})
