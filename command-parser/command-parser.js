'use strict'

import Fuse from 'fuse.js'
import nlp from 'nlp_compromise'

function getMatchingItemFor(searchTerm, sampleList) {
  var fuse = new Fuse(sampleList, {
     shouldSort: true,
     tokenize: true,
     threshold: 0.6,
     maxPatternLength: 32,
     keys: [
       'name',
     ]
  });

  return fuse.search(searchTerm);
}

function getCommandForText(textMessage) {

  var nouns = nlp.sentence(textMessage).nouns()

  console.log(textMessage,nouns)
  if (nouns.length === 0) {
    console.log('the old ways')
    const sampleList = [
      { name: 'ON' },
      { name: 'OFF' }
    ]
    const match = getMatchingItemFor(textMessage, sampleList)
    return match[0].name
  }

  return {
    command: nouns[0].normal.toUpperCase(),
    value: nlp.value(textMessage).number
  }
  return 'ON'
}


export default {
  getCommandForText
}
