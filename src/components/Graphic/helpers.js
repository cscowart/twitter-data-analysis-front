
const injectHTML = (props) => {
let item = document.getElementById('graphic')
item.innerHTML = props.data.graph_code_js
};


export default injectHTML
