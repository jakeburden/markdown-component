var nanocomponent = require('nanocomponent')
var html = require('nanohtml')
var raw = require('nanohtml/raw')
var marked = require('marked')
var drop = require('drag-and-drop-files')

function MarkdownComponent () {
  if (!(this instanceof MarkdownComponent)) return new MarkdownComponent()
  nanocomponent.call(this)
  this.handleChange = this.handleChange.bind(this)
}

MarkdownComponent.prototype = Object.create(nanocomponent.prototype)

MarkdownComponent.prototype.createElement = function (text, opts) {
  if (!opts) opts = {}
  if (typeof text === 'object') {
    opts = text
    text = null
  }
  if (!opts.component) opts.component = {}
  if (!opts.textarea) opts.textarea = {}
  if (!opts.div) opts.div = {}

  this.onDrop = opts.onDrop

  var placeholder = opts.placeholder || 'gather your thoughts here...'

  return html`
    <div class=${opts.component.classes || ''}>
      <textarea class=${opts.textarea.classes || ''} oninput=${this.handleChange} placeholder='${placeholder}' value=${text || ''}>${text}</textarea>
      <div class=${opts.div.classes || ''}>${text ? raw(marked(text)) : ''}</div>
    </div>
  `
}

MarkdownComponent.prototype.handleChange = function handleChange (e) {
  this.element.querySelector('div').innerHTML = marked(e.target.value)
}

MarkdownComponent.prototype.load = function load () {
  if (this.onDrop === false) return
  drop(this.element, function (files) {
    if (typeof this.onDrop === 'function') return this.onDrop(files)
    var mdImd = ''
    var textarea = this.element.querySelector('textarea')
    for (var i = 0; i < files.length; i++) {
      var file = files[i]
      var url = window.URL.createObjectURL(file)
      mdImd += `\n![](${url})`
    }
    textarea.value += mdImd
    textarea.dispatchEvent(new Event('input')) 
  }.bind(this))
}

module.exports = MarkdownComponent
