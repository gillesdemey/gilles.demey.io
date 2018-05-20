onReady(() => {
  new Shiny({
    width: 7,
    speed: 50,
    delayInBetween: 2500
  }).animate(document.querySelector("#intro"))
})

/**
 * Makes the text look kinda shiny
 */
function Shiny (options = {}) {
  const defaults = {
    width: 2,
    elemClass: 'text--shiny',
    speed: 50,
    delayInBetween: 2000
  }

  this.options = Object.assign(defaults, options)
  this._cursor = 0
  this._interval = 0
}

Shiny.prototype.animate = function (elem) {
  const text = elem.innerText

  const { delayInBetween, elemClass, speed, width } = this.options

  let { _cursor: cursor, _interval: interval } = this

  // count number of columns to animate, longest line
  const columns = text
    .split('\n')
    .reduce((acc = 0, line) => {
      return line.length > acc ? line.length : acc
    }, 0)

  interval = animateColumns()

  // move cursor n-columns a time and update
  // all characters in that column
  function animateColumns () {
    return setInterval(() => {
      const output = styleColumn(text, cursor, width, { class: elemClass })
      elem.innerHTML = output

      if (cursor >= columns) {
        reset()
      }
      cursor = cursor + width

      function reset () {
        cursor = 0
        clearInterval(interval)

        setTimeout(() => {
          interval = animateColumns()
        }, delayInBetween)
      }

      return
    }, speed)
  }
}


// style a single column of text
function styleColumn (input, cursor, width, props = {}) {
  const propsText = Object.entries(props)
    .map(entry => entry.join('='))
    .join(' ')

  return input
    .split('\n')
    .map(line => {
      return line.split('').map((char, i) => {
        const inColumn = (i >= cursor && i < cursor + width)
        return inColumn
          ? `<span ${propsText}>${char}</span>`
          : char
      })
      .join('')
    })
    .join('\n')
}


function onReady (fn) {
  document.addEventListener('readystatechange', () => {
  if (event.target.readyState === "complete") {
    fn(event)
  }
})
}