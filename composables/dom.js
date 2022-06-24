// const INLINE_TAGS = ['a', 'b', 'i', 'em', 'strong']
// const HEADER_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5']
const EMBED_TAGS = ['iframe', 'embed', 'video',
  'twitter-widget', 'center', 'div']
const TEXT_CLASS = 'o-rte-text'
// a `div` tag in MT article markup is probably from an embed
const EMBED_WEIGHT = 50

// Returns whether a node only contains whitespace or not
function _isNotWhitespaceOnly (node) {
  return !(['#text', 'P'].includes(node.nodeName) &&
  node.textContent.replace(/\s/g, '').length === 0)
}
function _isNotComment (node) {
    return (node.nodeName !== "#comment")
}

// Counts the words in a DOM nodes text content
function _countWords (node) {
  const text = node.textContent
  return text.replace(/[^\w ]/g, '').split(/\s+/).length
}

// Gets the word count of an element, setting a minimum value
// for embeds.
// We're really only using word count as a proxy for
// vertical height i.e. line count so we want to account
// for the height of images, embeds etc.
function _getWordWeight (node) {
  const tagType = node.nodeName.toLowerCase()
  let wordWeight = _countWords(node)
  if (EMBED_TAGS.includes(tagType)) {
    wordWeight = Math.max(wordWeight, EMBED_WEIGHT)
  }
  return wordWeight
}

// Gets the sub-landmarks in rich text blocks so we can insert between paragraphs
const _getTextFieldLandmarks = function (rootElement, startingWordWeight) {
  const landmarks = []
  let wordWeight = startingWordWeight || 0
  const nodes = [...rootElement.childNodes].filter(_isNotWhitespaceOnly).filter(_isNotComment)
  for (const node of nodes) {
    if (node.nextSibling) {
      wordWeight += _getWordWeight(node)
      landmarks.push({
        node,
        wordWeight,
        type: node.nodeName.toLowerCase(),
        nextType: node.nextSibling?.nodeName.toLowerCase()
      })
    } else {
      wordWeight += _getWordWeight(node)
      landmarks.push({
        node: rootElement,
        wordWeight,
        type: rootElement.nodeName.toLowerCase(),
        nextType: rootElement.nextSibling?.nodeName.toLowerCase()
      })
    }
  }
  return landmarks
}

// Insert next to insertLocation, or append the end.
const useInsertAfterElement = function (element, target) {
  const parent = target.parentNode
  if (target && target.nextSibling) {
    parent.insertBefore(element, target.nextSibling)
  } else {
    parent.appendChild(element)
  }
}

// Gets a list of dom nodes in the streamfield, where
// we can insert something (ads, inline information modules, etc.)
// after them. Also includes some information about the elements
// that can be used to help decide where to insert things.
// Example output:
// [
//   {node: Node, wordWeight: 23, type: 'p', nextType: 'p' }
//   {node: Node, wordWeight: 76, type: 'p', nextType: null }
// ]
const useStreamfieldLandmarks = function (rootElement) {
  let wordWeight = 0
  const landmarks = []
  const nodes = [...rootElement.childNodes].filter(_isNotWhitespaceOnly).filter(_isNotComment)
  for (const node of nodes) {
    if ([...node.classList].includes(TEXT_CLASS)) {
      const childLandmarks = _getTextFieldLandmarks(node, wordWeight)
      landmarks.push(...childLandmarks);
      ({ wordWeight } = landmarks.at(-1))
    } else {
      wordWeight += _getWordWeight(node)
      landmarks.push({
        node,
        wordWeight,
        type: node.nodeName.toLowerCase(),
        nextType: node.nextSibling?.nodeName.toLowerCase()
      })
    }
  }
  return landmarks
}

export {
  useStreamfieldLandmarks,
  useInsertAfterElement
}
