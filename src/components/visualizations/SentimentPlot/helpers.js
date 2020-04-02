import * as d3 from 'd3'

const drawSentimentPlot = (props) => {
  // alter the data
  // let data_long = props.map((item) => {
  //   return {name:item[0] ,value:item[1]}
  // })
  // let data = data_long.slice(0,25)
  let data = props
  // d3
  const height = 600
  const width = 600
  const padding = 50
  const margin = ({top: 50, right: 50, bottom: 50, left: 50})
  let x = d3.scaleLinear()
    // .domain(d3.extent(data, d => d.x)).nice()
    .domain([-1,1]).nice()
    .range([margin.left+padding, width - margin.right])

  let y = d3.scaleLinear()
    // .domain(d3.extent(data, d => d.y)).nice()
    .domain([0,1]).nice()
    .range([height - margin.bottom-padding, margin.top])
  
  let xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom - padding})`)
    .call(d3.axisBottom(x).ticks(width / 80))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", width)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text(data.x))

  let yAxis = g => g
    .attr("transform", `translate(${margin.left +padding},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(data.y))
  
  let grid = g => g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g.append("g")
      .selectAll("line")
      .data(x.ticks())
      .join("line")
        .attr("x1", d => 0.5 + x(d))
        .attr("x2", d => 0.5 + x(d))
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom - padding))
    .call(g => g.append("g")
      .selectAll("line")
      .data(y.ticks())
      .join("line")
        .attr("y1", d => 0.5 + y(d))
        .attr("y2", d => 0.5 + y(d))
        .attr("x1", margin.left+padding)
        .attr("x2", width - margin.right));

  d3.select('.SentimentPlot> *').remove()
  const svg = d3.select(".SentimentPlot").append('svg')
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("text")
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate("+ (padding/2) +","+((height-padding)/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
      .text("Subjectivity");

  svg.append("text")
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate("+ ((width+padding)/2) +","+(height-(padding/3))+")")  // centre below axis
      .text("Polarity");

  svg.append("g")
      .call(grid);


  svg.append("g")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("fill", "none")
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("cx", d => x(d.polarity))
      .attr("cy", d => y(d.subjectivity))
      .attr("r", 3);
  

  svg.node();

};


export default drawSentimentPlot
