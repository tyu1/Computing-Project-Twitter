var natural = require('natural');
    //classifier = new natural.BayesClassifier();


natural.BayesClassifier.load('classifier1.json', null, function(err, classifier) {
    console.log(classifier.classify('During Europe cold snap, nuclear powered France ran out of own electricity. Had to buy from Germany where renewables = 20% of energy supply.'));
    console.log(classifier.classify("@XavierHatch Yep, it's a bad move"));
    console.log(classifier.classify("@rodneycruise Great to meet you - thanks for saying hi! Adam"));
    
});    