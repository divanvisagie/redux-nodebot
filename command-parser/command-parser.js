'use strict'

import Fuse from 'fuse.js'
import nlp from 'nlp_compromise'
import limdu from 'limdu'


function createTextClassifier() {
  var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
    binaryClassifierType: limdu.classifiers.Winnow.bind(0, {retrain_count: 10})
  });

  const WordExtractor = function(input, features) {
		input.split(" ").forEach(function(word) {
			features[word]=1;
		});
	};
	
  return new limdu.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,  // same as in previous example
    normalizer: limdu.features.LowerCaseNormalizer,
    featureExtractor: WordExtractor  // same as in previous example
  });

}

const messageClassifier = createTextClassifier();
function trainingObject(input, output){
  return {
    input,
    output
  }
}
messageClassifier.trainBatch([
  trainingObject('turn the oven on', 'COMMAND'),
  trainingObject('set the speed to 50', 'SETTING'),
]);

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



function processSentenceToObject(textMessage) {
  var sentence = nlp.sentence(textMessage)

  var nouns = nlp.noun(textMessage)
  var verbs = nlp.sentence(textMessage)
  var value = nlp.value(textMessage).number
  var tags = nlp.sentence(textMessage).tags()

  console.log('------------')
  console.log('original-sentence:', textMessage)
  console.log('tags:', tags)
  console.log('verbs:', verbs)
  console.log('values:', values)
  console.log('nouns:',nouns)

  return {
    nouns,
    verbs,
    values
  }
}

const actionClassifier = createTextClassifier();
actionClassifier.trainBatch([
  trainingObject('call off', 'OFF'),
  trainingObject('call on','ON'),
  trainingObject('call toggle','TOGGLE')
])

function getCommandForText(textMessage) {

  // const sentenceObject = processSentenceToObject(textMessage)
  
 
  var tags =  messageClassifier.classify(textMessage)
  
  // return { command: 'ON' }
  if (tags[0] == 'SETTING') {
    // console.log(tags,'--->>>>')
    const nouns = nlp.sentence(textMessage).nouns()
    const key = nouns[0].normal.toLowerCase()
    const returnObject = {
      command: nouns[0].normal.toUpperCase()
    }
    returnObject[key] = nlp.value(textMessage).number
    // console.log('>>',returnObject)
    return returnObject
  } else {
    const verb = nlp.verb(textMessage)
    const actionTags = actionClassifier.classify(textMessage)
    if (actionTags[0]){
      return { command: actionTags[0] }
    }
  }

  return { command: 'UNRECOGNISED' }
  
}


export default {
  getCommandForText
}
