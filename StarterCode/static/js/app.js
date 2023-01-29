function init() {
  getData(1)
}

function getData(num) {
  let bblint = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
  // console.log("This2")

    d3.json(bblint).then(dataSeparated)

};

function getData2() {
  let lintlink = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
  d3.json(lintlink).then(refreshData)
};

d3.selectAll("#selDataset").on("change", getData2);

function dataSeparated(data){

    let dropdownMenu = d3.select("#selDataset");
    
    let dataset = dropdownMenu.property("value");
    console.log(dataset);
    // get data names
    let nameID = Object.values(data.names);
    createOptions(nameID);

    let samples = Object.values(data.samples);
    createBarGraph(940,samples);


};

function refreshData(data) {
  let dropdownMenu = d3.select("#selDataset")
  let dataset = dropdownMenu.property("value")
  console.log(dataset)
  let samples = Object.values(data.samples)
  createBarGraph(dataset,samples)
};

function createOptions(namesList){
    let optionslist = ""
    for (let i = 0; i<namesList.length; i++) {
      optionslist = optionslist + `<option value="${namesList[i]}">${namesList[i]}</option>`
    }
    
    d3.select("#selDataset").html(optionslist)
};

function createBarGraph(nameArg, objectArray) {
    let dropdownMenu = d3.select("#selDataset");
    let dataset = dropdownMenu.property("value");
    console.log(dataset);
    if (dataset != 'undefined') {
      nameArg = dataset.toString();
    }
    
    let objectItem = objectArray.filter(x => x.id == nameArg);
    console.log(objectItem);
    let sample_values = objectItem[0].sample_values
    let sample_values10 = sample_values.slice(0,10).reverse();
    console.log(sample_values);
    let otu_ids = objectItem[0].otu_ids
    let otu_ids10 = otu_ids.slice(0,10).map(item => { return 'OTU '+ item}).reverse();
    console.log(otu_ids);
    let otu_labels = objectItem[0].otu_labels
    let otu_labels10 = otu_labels.slice(0,10).reverse();
    console.log(otu_labels);

    let data = [{
      type: 'bar',
      text: otu_labels10,
      x: sample_values10,
      y: otu_ids10,
      orientation: 'h'
    }]

    Plotly.newPlot('bar', data);
}

function optionChanged(value) {
  // console.log(value);
};
// for future reference: let olderSimpsons = simpsons.filter(simp => simp.age >30)
// let nameID = Object.values(data);
// let sample_values = d3.json("samples.json")
// let otu_ids  = 
// let otu_labels =

// const dataPromise = d3.json(url);
// console.log(samples);
init();