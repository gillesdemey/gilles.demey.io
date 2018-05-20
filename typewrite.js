const defaults = {
  blinkInterval : 600,
  typeInterval : 65,
  caret : '|'
}

function Typewriter (elem, options = defaults) {
  this.element = elem
  this.buffer = ''
  this.options = options

  this._index = 0
  this._typing = false
}

Typewriter.prototype.write = function (text) {
  this._typing = true

}

Typewriter.prototype.addCursor = function () {
  const timer = setInterval(() => blink(), this.options.blinkInterval)

  function blink () {
    if (this._typing) return

    this._removeCursor()
    setTimeout(() => {
      this._addCursor()
    }, this.options.blinkInterval / 2)
  }
}

Typewriter.prototype._addCursor = function () {
  const { caret } = this.options
  const elem = this.element  
  elem.innerHTML += caret
}

Typewriter.prototype._removeCursor = function () {
  const { caret } = this.options
  const elem = this.element
  const regex = new RegExp(`${caret}$`)

  elem.innerHTML = elem.innerHTML.replace(regex, '')
}

module.exports = {
  write
}