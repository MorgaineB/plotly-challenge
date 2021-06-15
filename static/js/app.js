//Select all the relevant html elements
var selector = d3.select("#selDataset");
var demographics = d3.select("#sample-metadata");
var barChart = d3.select("#bar");
var bubbleChart = d3.select("#bubble");

//Pull info for each sample & add to demographics panel
function buildDemographics(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var participantMetadata = metadata.filter(sampleobject => sampleobject.id == sample)[0];
        //console.log(participantMetadata);
        demographics.html("");
        Object.entries(participantMetadata).forEach(([key, value]) => {
            demographics.append("h6").text(`${key}: ${value}`);
        });
    });
}



//Create an init function to populate the page on load & the drop down menu.
function init() {
    d3.json("samples.json").then(function(data) {
        // console.log(data);
        // Get the IDs for the samples for the drop down menu
        var numbers = data.names;
        // console.log(names);
        numbers.forEach((number) => {
            selector
                .append("option")
                .text(number)
                .property("value", number);
        });

        //get the first sample number in the list and build charts for that sample
        const firstSampleNumber = numbers[0];
        // console.log(firstSampleNumber);
        //pull info & build plots for the first sample using functions from above.
        buildDemographics(firstSampleNumber);

    });
}

init();