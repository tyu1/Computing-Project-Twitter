var natural = require('natural'),
    classifier = new natural.BayesClassifier();

var reader = require("buffered-reader");
var DataReader = reader.DataReader;
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
new DataReader("train.csv", {
    encoding: "utf8"
})
    .on("error", function(error) {
        console.log(error);
    })
    .on("line", function(line, nextByteOffset) {
        var values = line.split(',').replace(/\"/g, '');
        console.log(values[5] + " class=" + values[0].trim());
        classifier.addDocument(values[5], values[0].trim());

    })
    .on("end", function() {
        console.log('end');
        classifier.train();
        classifier.save('classifier1.json', function(err, classifier) {
            // the classifier is saved to the classifier.json file!
        });
    })
    .read();
