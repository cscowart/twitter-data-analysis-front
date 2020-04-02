import * as d3 from 'd3'

const drawWordCountHistogram = (props, className) => {
  // alter the data
  // let data_long = props.map((item) => {
  //   return {name:item[0] ,value:item[1]}
  // })
  // let data = data_long.slice(0,25)
  let data=props
  // d3
  let barHeight = 15
  var margin = {top: 20, right: 20, bottom: 30, left: 80}
  let width = 960 - margin.left - margin.right
  let height = 960 - margin.top - margin.bottom
  // let height = Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom


  let x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([margin.left, width - margin.right])

  let format = x.tickFormat(20)

  let y = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1)

  let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0))

  let xAxis = g => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisTop(x).ticks(width / 80))
    .call(g => g.select(".domain").remove())

  d3.select('.' + className +'> *').remove()
  const svg = d3.select('.'+ className).append("svg")
    .attr("viewBox", [0, 0, width, height]);
  // d3.select('.wordCountHistogram > *').remove()
  // const svg = d3.select('.wordCountHistogram').append("svg")
  //   .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", x(0))
      .attr("y", (d, i) => y(i))
      .attr("width", d => x(d.value) - x(0))
      .attr("height", y.bandwidth());

  svg.append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
    .selectAll("text")
    .data(data)
    .join("text")
      .attr("x", d => x(d.value) - 4)
      .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => format(d.value));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.node()

};


export default drawWordCountHistogram
