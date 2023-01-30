function init() {
  getData();
}


// Get data for initial creation of the page
function getData() {
  let bblint = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    d3.json(bblint).then(dataSeparated)

};

// Get data for when the on change event occurs.  Unsure why the script wouldn't let me establish both getDatas into one, but it didn't seem to work, so I split it up.  Rework later.
function getData2() {
  let lintlink = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
  d3.json(lintlink).then(refreshData)
};


// on change listener
d3.selectAll("#selDataset").on("change", getData2);


// populates data and dropdown menu on initial page load
function dataSeparated(data){

    console.log(data)
    let nameID = Object.values(data.names);
    createOptions(nameID);

    let samples = Object.values(data.samples);
    createGraphs(940,samples);

    let metaData = Object.values(data.metadata);
    cardData(940,metaData);


};

// repopuates data upon change selection
function refreshData(data) {
  let dropdownMenu = d3.select("#selDataset")
  let dataset = dropdownMenu.property("value")
  console.log(dataset)
  let samples = Object.values(data.samples)
  createGraphs(dataset,samples)

  let metaData = Object.values(data.metadata);
  cardData(dataset,metaData);
};

// populates drop down menu
function createOptions(namesList){
  let optionslist = ""
  for (let i = 0; i<namesList.length; i++) {
    optionslist = optionslist + `<option value="${namesList[i]}">${namesList[i]}</option>`
  }
  
  d3.select("#selDataset").html(optionslist)
};

// changes card data
function cardData(metaArg,objectArray) {
  let cardBody = ""
  let objectItem = objectArray.filter(x => x.id == metaArg);
  let itemKeys = Object.keys(objectItem[0])
  let itemValues = Object.values(objectItem[0])
  for (let i = 0; i < itemKeys.length; i++) {
    cardBody = cardBody + `<div>${itemKeys[i]} : ${itemValues[i]}</div>`
  }

  d3.select(".panel-body").html(cardBody)
};

// populates bar and bubble graphs
function createGraphs(nameArg, objectArray) {
   
    let objectItem = objectArray.filter(x => x.id == nameArg);
    console.log(objectItem);
    let sample_values = objectItem[0].sample_values
    let sample_values10 = sample_values.slice(0,10).reverse();
    // console.log(sample_values);
    let otu_ids = objectItem[0].otu_ids
    let otu_ids10 = otu_ids.slice(0,10).map(item => { return 'OTU '+ item}).reverse();
    // console.log(otu_ids);
    let otu_labels = objectItem[0].otu_labels
    let otu_labels10 = otu_labels.slice(0,10).reverse();
    // console.log(otu_labels);

    let data = [{
      type: 'bar',
      text: otu_labels10,
      x: sample_values10,
      y: otu_ids10,
      orientation: 'h'
    }]

    Plotly.newPlot('bar', data);
      
    let data2 = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    }];

    Plotly.newPlot('bubble', data2);

}

// define optionChanged inline function
function optionChanged() {
};

// invoke init function
init();