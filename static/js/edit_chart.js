


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
  var data_ready = pie(d3.entries(tradeArray.macro_dollars))

  console.log(data_ready);

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


  // var ProductPerc = {};
  //   var p;
  //   for (p=0; p < keys_percent.length; p++) {
  //     ProductPerc[keys_percent[p]] = value_percent[p];
  //   };

  // var ProductDollar = {};
  //   var d;
  //   for (d=0; d < keys_dollars.length; d++) {
  //       ProductDollar[keys_dollars[d]] = value_dollars[d];
  //   };

  // console.log(ProductPerc);
  // console.log(ProductDollar);

  var table_data = [{
    Indicator: "Animal",
    Precent: tradeArray.micro_percentage['Animal'],
    Dollars: tradeArray.micro_dollars['Animal']
  },
 {
    Indicator: "Chemicals",
    Precent: tradeArray.micro_percentage['Chemicals'],
    Dollars: tradeArray.micro_dollars['Chemicals']  
  },
  {
    Indicator: "Food Products",
    Precent: tradeArray.micro_percentage['Food Products'],
    Dollars: tradeArray.micro_dollars['Food Products']  
  },
  {
    Indicator: "Footwear",
    Precent: tradeArray.micro_percentage['Footwear'],
    Dollars: tradeArray.micro_dollars['Footwear']  
  },
  {
    Indicator: "Fuels",
    Precent: tradeArray.micro_percentage['Fuels'],
    Dollars: tradeArray.micro_dollars['Fuels']  
  },
  {
    Indicator: "Hides and Skins",
    Precent: tradeArray.micro_percentage['Hides and Skins'],
    Dollars: tradeArray.micro_dollars['Hides and Skins']  
  },
  {
    Indicator: "Mach and Elec",
    Precent: tradeArray.micro_percentage['Mach and Elec'],
    Dollars: tradeArray.micro_dollars['Mach and Elec']  
  },
  {
    Indicator: "Metals",
    Precent: tradeArray.micro_percentage['Metals'],
    Dollars: tradeArray.micro_dollars['Metals']  
  },
  {
    Indicator: "Minerals",
    Precent: tradeArray.micro_percentage['Minerals'],
    Dollars: tradeArray.micro_dollars['Minerals']  
  },
  {
    Indicator: "Miscellaneous",
    Precent: tradeArray.micro_percentage['Miscellaneous'],
    Dollars: tradeArray.micro_dollars['Miscellaneous']  
  },
  {
    Indicator: "Plastic or Rubber",
    Precent: tradeArray.micro_percentage['Plastic or Rubber'],
    Dollars: tradeArray.micro_dollars['Plastic or Rubber']  
  },
  {
    Indicator: "Stone and Glass",
    Precent: tradeArray.micro_percentage['Stone and Glass'],
    Dollars: tradeArray.micro_dollars['Stone and Glass']  
  },
  {
    Indicator: "Textiles and Clothing",
    Precent: tradeArray.micro_percentage['Textiles and Clothing'],
    Dollars: tradeArray.micro_dollars['Textiles and Clothing']  
  },
  {
    Indicator: "Transportation",
    Precent: tradeArray.micro_percentage['Transportation'],
    Dollars: tradeArray.micro_dollars['Transportation']  
  },
  {
    Indicator: "Vegetable",
    Precent: tradeArray.micro_percentage['Vegetable'],
    Dollars: tradeArray.micro_dollars['Vegetable']  
  },
  {
    Indicator: "Wood",
    Precent: tradeArray.micro_percentage['Wood'],
    Dollars: tradeArray.micro_dollars['Wood']  
  }];