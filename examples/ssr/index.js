const React = require('react')
const express = require('express')
const ReactDOM = require('react-dom')
const { Ripple } = require('react-css-spinners')
const { Ellipsis } = require('react-css-spinners')
const { Ring } = require('react-css-spinners')

const port = 3000
const app = express()

app.get('*', (req, res) => {
    const html = ReactDOM.renderToString(React.createElement(Ripple))

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Document</title>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `)
})

app.listen(port, () => consol.log(`http://localhost:${port}`))