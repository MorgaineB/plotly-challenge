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

//Build the charts for each sample
function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var sampleData = samples.filter(sampleobject => sampleobject.id == sample)[0];
        // console.log(sampleData);

        var ids = sampleData.otu_ids;
        var values = sampleData.sample_values;
        var labels = sampleData.otu_labels;

        //Build Bar Chart 

        var barData = [
            {
                x: values.slice(0, 10).reverse(),
                y: ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                text: labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
        };

        Plotly.newPlot("bar", barData, barLayout);

        //Build Bubble chart

        var bubbleData = [
            {
                x: ids,
                y: values,
                text: labels,
                mode: "markers",
                marker: {
                    color: ids,
                    size: values,
                }

            }
        ];

        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            xaxis: { title: "OTU ID"}
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

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
        buildCharts(firstSampleNumber);

    });
}

//Build a function for when there is a change in the dropdown menu
function optionChanged(newSample) {
    buildDemographics(newSample);
    buildCharts(newSample);
}

init();