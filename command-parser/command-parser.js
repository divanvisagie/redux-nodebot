'use strict'

import Fuse from 'fuse.js'


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

  const sampleList = [
    { name: 'ON' },
    { name: 'OFF' }
  ]

  const match = getMatchingItemFor(textMessage, sampleList)
  console.log(match)

  return match[0].name
}


export default {
  getCommandForText
}
