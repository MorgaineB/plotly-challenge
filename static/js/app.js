//Select all the html elements
var selector = d3.select("#selDataset");
var demographics = d3.select("#sample-metadata");
var barChart = d3.select("#bar");
var bubbleChart = d3.select("#bubble");

// Use the D3 library to read in samples.json
d3.json("samples.json").then(function(data) {
    console.log(data);
});
