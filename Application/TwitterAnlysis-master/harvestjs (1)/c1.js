var natural = require('natural'),
    classifier = new natural.BayesClassifier();

var reader = require("buffered-reader");
var DataReader = reader.DataReader;
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
new DataReader("test.csv", {
    encoding: "utf8"
})
    .on("error", function(error) {
        console.log(error);
    })
    .on("line", function(line, nextByteOffset) {
        var values = line.split(',');
        console.log(values[3] + " class=" + values[1].trim());
        classifier.addDocument(values[3], values[1].trim());

    })
    .on("end", function() {
        console.log('end');
        classifier.train();
        classifier.save('classifier1.json', function(err, classifier) {
            // the classifier is saved to the classifier.json file!
        });
    })
    .read();
