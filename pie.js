//margin

var margin = {top: 20, right: 20, bottom: 20, left: 20};
var width = 500 - margin.right - margin.left;
var height = 500 - margin.top - margin.bottom;
var radius = width / 2;

var color = d3.scaleOrdinal()
		.range(["#645050","#546070","#447090","#3480B0","#447090","#546070"]);
// arc generator
var arc = d3.arc()
	.outerRadius(radius - 10)
	.innerRadius(0);

var arc2 = d3.arc()
	.outerRadius(radius - 10)
	.innerRadius(radius - 70);


var labelArc = d3.arc()
	.outerRadius(radius - 50)
	.innerRadius(radius - 50);

// pie generator
var pie = d3.pie()
		.sort(null)
		.value(function(d){
			return d.count;
		});

// define svg
var svg = d3.select("body").append("svg")
				.attr("width", width)
				.attr("height", height)
				.append("g")
				.attr("transform","translate("+width/2+","+height/2+")");

var svg2 = d3.select("body").append("svg")
				.attr("width", width)
				.attr("height", height)
				.append("g")
				.attr("transform","translate("+width/2+","+height/2+")");

// import data
d3.csv("data.csv", function(error, data){
	if (error) throw error;

	data.forEach(function(d){
		d.count = +d.count;
		d.fruit = d.fruit;
	});

	var g = svg.selectAll(".arc")
		.data(pie(data))
		.enter().append("g")
		.attr("class","arc");

	g.append("path")
		.attr("d", arc)
		.style("fill", function(d){ return color(d.data.fruit);});

	g.append("text")
		.attr("transform",function(d) { return "translate("+labelArc.centroid(d)+")"})
		.attr("dy",".35em")
		.text(function(d){return d.data.fruit;});


		var g2 = svg2.selectAll(".arc2")
		.data(pie(data))
		.enter().append("g")
		.attr("class","arc2");

	g2.append("path")
		.attr("d", arc2)
		.style("fill", function(d){ return color(d.data.fruit);});

	g2.append("text")
		.attr("transform",function(d) { return "translate("+labelArc.centroid(d)+")"})
		.attr("dy",".35em")
		.text(function(d){return d.data.fruit;});
})