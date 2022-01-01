// console.log(trade_data);


function createDataSet(){
  // Get chart data selections from user
  var ctry = document.getElementById("selCountry");
  var yr = document.getElementById("selYear");
  var ind = document.getElementById("selIndicator");
  var cat = document.getElementById("selProdCat");

  // console.log(ctry.value);
  // console.log(yr.value);
  // console.log(ind.value);
  // console.log(cat.value);

  // Use filter statement to filter available data according to user selections.
  //var chart_selection = trade_data.filter(trade_data => trade_data.reporter_name === ctry.value && trade_data.year === yr.value && trade_data.indicator == ind.value);
  var chart_selection = trade_data.filter(trade_data => trade_data.Reporter === ctry.value && trade_data.trade_flow === ind.value);
  

  // console.log(chart_selection);

  // for (var cs = 0; cs < chart_selection.length; cs++){
  //   console.log(chart_selection[cs])
  //   console.log(chart_selection[cs]['product group'])
  //   console.log(chart_selection[cs]['activity'])
  // };

  var keys_dollars_total = []
  var value_dollars_total = []

  var keys_dollars_macro = []
  var keys_dollars_micro = []
  var keys_percent_macro = []
  var keys_percent_micro = []
  
  var value_dollars_macro = []
  var value_dollars_micro = []
  var value_percent_macro = []
  var value_percent_micro = []

  var import_inds = ["Macro Import ($)", "Micro Import ($)", "Macro Import (%)", "Micro Import (%)", "Import Total ($)", "Import Total (%)"]
  var export_inds = ["Macro Export ($)", "Micro Export ($)", "Macro Export (%)", "Micro Export (%)", "Export Total ($)", "Export Total (%)"]

  if (ind.value == "Import"){
    var indicator = import_inds
  }
  else if (ind.value == "Export") {
    var indicator = export_inds
  }

  for (var j = 0; j < chart_selection.length; j++) {
    
    switch (chart_selection[j]['indicator']) {
      case indicator[0]:
        keys_dollars_macro.push(chart_selection[j]['product group'])
        value_dollars_macro.push(chart_selection[j]['activity'][yr.value])
        break;
      case indicator[1]:
        keys_dollars_micro.push(chart_selection[j]['product group'])
        value_dollars_micro.push(chart_selection[j]['activity'][yr.value])
        break;
      case indicator[2]:
        keys_percent_macro.push(chart_selection[j]['product group'])
        value_percent_macro.push(chart_selection[j]['activity'][yr.value])
        break;
      case indicator[3]:
        keys_percent_micro.push(chart_selection[j]['product group'])
        value_percent_micro.push(chart_selection[j]['activity'][yr.value])
        break;
      case indicator[4]:
        keys_dollars_total.push(chart_selection[j]['product group'])
        value_dollars_total.push(chart_selection[j]['activity'][yr.value])
    }

   };

  
  var percent_macro = {};
    var pma;
    for (pma = 0; pma < keys_percent_macro.length; pma++) {
      percent_macro[keys_percent_macro[pma]] = value_percent_macro[pma];
    }; 
  
  var percent_micro = {};
    var pmi;
    for (pmi = 0; pmi < keys_percent_micro.length; pmi++) {
      percent_micro[keys_percent_micro[pmi]] = value_percent_micro[pmi];
    };

  var dollars_macro = {};
    var dma; 
    for (dma = 0; dma < keys_dollars_macro.length; dma++){
      dollars_macro[keys_dollars_macro[dma]] = value_dollars_macro[dma];
    };

  var dollars_micro = {};
    var dmi; 
    for (dmi = 0; dmi < keys_dollars_micro.length; dmi++){
      dollars_micro[keys_dollars_micro[dmi]] = value_dollars_micro[dmi];
    };

  var tradeKeys = ["macro_percentage", "macro_dollars", "micro_percentage", "micro_dollars"]
  var tradeValues = [percent_macro, dollars_macro, percent_micro, dollars_micro]
  var tradeArray = {};
    var a;
    for (a=0; a < tradeKeys.length; a++ ){
      tradeArray[tradeKeys[a]] = tradeValues[a];
    }; 
  
  
 
    
  
  function DataTable(tradeArray){

    console.log(tradeArray);
    console.log(cat.value);
    if (cat.value == "Macro") {

      var table_data = [{
        Indicator: 'Capitol Goods',
        Percent: tradeArray.macro_percentage['Capital goods'],
        Dollars: tradeArray.macro_dollars['Capital goods']
      },
      {
        Indicator: 'Consumer Goods',
        Percent: tradeArray.macro_percentage['Consumer goods'],
        Dollars: tradeArray.macro_dollars['Consumer goods']
      },
      {
        Indicator: 'Intermediate Goods',
        Percent: tradeArray.macro_percentage['Intermediate goods'],
        Dollars: tradeArray.macro_dollars['Intermediate goods']
      },
      {
        Indicator: 'Raw materials',
        Percent: tradeArray.macro_percentage['Raw materials'],
        Dollars: tradeArray.macro_dollars['Raw materials']
      },
      {
        Indicator: "Other",
        Percent: tradeArray.macro_percentage['Other'],
        Dollars: tradeArray.macro_dollars['Other'] 
      }];
    } 
  else {
      var table_data = [{
        Indicator: "Animal",
        Percent: tradeArray.micro_percentage['Animal'],
        Dollars: tradeArray.micro_dollars['Animal']
      },
     {
        Indicator: "Chemicals",
        Percent: tradeArray.micro_percentage['Chemicals'],
        Dollars: tradeArray.micro_dollars['Chemicals']  
      },
      {
        Indicator: "Food Products",
        Percent: tradeArray.micro_percentage['Food Products'],
        Dollars: tradeArray.micro_dollars['Food Products']  
      },
      {
        Indicator: "Footwear",
        Percent: tradeArray.micro_percentage['Footwear'],
        Dollars: tradeArray.micro_dollars['Footwear']  
      },
      {
        Indicator: "Fuels",
        Percent: tradeArray.micro_percentage['Fuels'],
        Dollars: tradeArray.micro_dollars['Fuels']  
      },
      {
        Indicator: "Hides and Skins",
        Percent: tradeArray.micro_percentage['Hides and Skins'],
        Dollars: tradeArray.micro_dollars['Hides and Skins']  
      },
      {
        Indicator: "Mach and Elec",
        Percent: tradeArray.micro_percentage['Mach and Elec'],
        Dollars: tradeArray.micro_dollars['Mach and Elec']  
      },
      {
        Indicator: "Metals",
        Percent: tradeArray.micro_percentage['Metals'],
        Dollars: tradeArray.micro_dollars['Metals']  
      },
      {
        Indicator: "Minerals",
        Percent: tradeArray.micro_percentage['Minerals'],
        Dollars: tradeArray.micro_dollars['Minerals']  
      },
      {
        Indicator: "Miscellaneous",
        Percent: tradeArray.micro_percentage['Miscellaneous'],
        Dollars: tradeArray.micro_dollars['Miscellaneous']  
      },
      {
        Indicator: "Plastic or Rubber",
        Percent: tradeArray.micro_percentage['Plastic or Rubber'],
        Dollars: tradeArray.micro_dollars['Plastic or Rubber']  
      },
      {
        Indicator: "Stone and Glass",
        Percent: tradeArray.micro_percentage['Stone and Glass'],
        Dollars: tradeArray.micro_dollars['Stone and Glass']  
      },
      {
        Indicator: "Textiles and Clothing",
        Percent: tradeArray.micro_percentage['Textiles and Clothing'],
        Dollars: tradeArray.micro_dollars['Textiles and Clothing']  
      },
      {
        Indicator: "Transportation",
        Percent: tradeArray.micro_percentage['Transportation'],
        Dollars: tradeArray.micro_dollars['Transportation']  
      },
      {
        Indicator: "Vegetable",
        Percent: tradeArray.micro_percentage['Vegetable'],
        Dollars: tradeArray.micro_dollars['Vegetable']  
      },
      {
        Indicator: "Wood",
        Percent: tradeArray.micro_percentage['Wood'],
        Dollars: tradeArray.micro_dollars['Wood']  
      }];
    }
    console.log(table_data);

    d3.select("tbody")
    .selectAll("tr")
    .remove()

  d3.select("tbody")
    .selectAll("tr")
    .data(table_data)
    .enter()
    .append("tr")
    .html(function(d) {
      return `<td>${d.Indicator}</td><td>${d.Percent}</td><td>${d.Dollars}</td>`;
    });
  }
  DataTable(tradeArray);


function DonutChart(tradeArray){
  // Reset the graph
d3.select("svg").remove();

// set the dimensions and margins of the graph
var width = 700
    height = 450
    margin = 20
// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select(".chart")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(["Capitol goods", "Consumer goodes", "Intermediate goods", "Raw materials", "Other"])
    .range(d3.schemeDark2);

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .sort(null) // Do not sort group by size
    .value(function(d) {return d.value; })
  var data_ready = pie(d3.entries(tradeArray.macro_percentage))

  // console.log(data_ready);

  // The arc generator
  var arc = d3.arc()
    .innerRadius(radius * 0.5)         // This is the size of the donut hole
    .outerRadius(radius * 0.8)

  // Another arc that won't be drawn. Just for labels positioning
  var outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  var slices = svg
    .selectAll('allSlices')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

  // Add the polylines between chart and labels:
  svg
    .selectAll('allPolylines')
    .data(data_ready)
    .enter()
    .append('polyline')
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr('points', function(d) {
        var posA = arc.centroid(d) // line insertion in the slice
        var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC]
      })

  // Add the polylines between chart and labels:
  svg
    .selectAll('allLabels')
    .data(data_ready)
    .enter()
    .append('text')
      .text( function(d) { console.log(d.data.key) ; return d.data.key } )
      .attr('transform', function(d) {
          var pos = outerArc.centroid(d);
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
          return 'translate(' + pos + ')';
      })
      .style('text-anchor', function(d) {
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          return (midangle < Math.PI ? 'start' : 'end')
      })
  }

  DonutChart(tradeArray);
} 
  

// Create and load an HTML drop down manu with the available years. 
function loadYears(){
  var year = ["2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"]
  var sel = document.getElementById("selYear");
  for (var i=0; i<year.length; i++){
    var opt = document.createElement('option');
    opt.innerHTML = year[i];
    opt.value = year[i];
    sel.appendChild(opt);
  };
}

function loadCountry(){
  var country = ["Australia", "Brazil", "Canada", "China", "France","Germany", "United States"]
  var sel = document.getElementById("selCountry");
  for (var i=0; i<country.length; i++){
    var opt = document.createElement('option');
    opt.innerHTML = country[i];
    opt.value = country[i];
    sel.appendChild(opt);
  };
}

function loadIndicator(){
  var trade_indicator = ["Import", "Export"]
  var sel = document.getElementById("selIndicator");
  for (var i=0; i<trade_indicator.length; i++){
    var opt = document.createElement('option');
    opt.innerHTML = trade_indicator[i];
    opt.value = trade_indicator[i];
    sel.appendChild(opt);
  };
}

function loadProdCat(){
  var trade_indicator = ["Macro", "Micro"]
  var sel = document.getElementById("selProdCat");
  for (var i=0; i<trade_indicator.length; i++){
    var opt = document.createElement('option');
    opt.innerHTML = trade_indicator[i];
    opt.value = trade_indicator[i];
    sel.appendChild(opt);
  };
}

loadCountry();
loadYears();
loadIndicator();
loadProdCat();
createDataSet();

