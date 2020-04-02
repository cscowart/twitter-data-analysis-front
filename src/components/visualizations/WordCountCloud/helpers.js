import * as d3 from 'd3'
import cloud from 'd3-cloud'


const drawWordCountCloud = (props) => {
  // alter the data
  // let data_long = props.map((item) => {
  //   return {text:item[0] ,value:item[1]}
  // })
  // let data = data_long.slice(0,250)
  let data = props
  // d3
  let fontFamily = 'sans-serif'
  let fontScale = 15
  let padding = 0
  let height = 500
  let width = 500
  const rotate = () => 0

  d3.select('.wordCountCloud > *').remove()
  const svg = d3.select('.wordCountCloud').append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("font-family", fontFamily)
    .attr("text-anchor", "middle");

 const cld = cloud()
      .size([width, height])
      .words(data.map(d => Object.create(d)))
      .padding(padding)
      .rotate(rotate)
      .font(fontFamily)
      .fontSize(d => Math.sqrt(d.value) * fontScale)
      .on("word", ({size, x, y, rotate, text}) => {
        svg.append("text")
            .attr("font-size", size)
            .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
            .text(text);
      });

  cld.start();
  // invalidation.then(() => cloud.stop());
  svg.node();

};


export default drawWordCountCloud
