//Select all the relevant html elements
var selector = d3.select("#selDataset");
var demographics = d3.select("#sample-metadata");
var barChart = d3.select("#bar");
var bubbleChart = d3.select("#bubble");

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
        console.log(firstSampleNumber);

    });
}

init();