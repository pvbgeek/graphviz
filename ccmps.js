// document.addEventListener('DOMContentLoaded', function() {
//     const connectedComponentsButton = document.getElementById('regions');
//     const bfsButton = document.getElementById('bfs');
//     const dfsButton = document.getElementById('dfs');
//     const undirectedButton = document.getElementById('undirected');
//     const directedButton = document.getElementById('directed');
//     const updateGraphButton = document.getElementById('update-graph');

//     connectedComponentsButton.addEventListener('click', function() {
//         disableButtons();

//         const graphData = document.getElementById('graph-data').value.trim().split('\n');
//         const isDirected = document.getElementById('directed').checked;
//         const graph = buildGraph(graphData, isDirected);
//         const components = findConnectedComponents(graph);

//         highlightStartingNodes(components);
//     });

//     function buildGraph(graphData, isDirected) {
//         const graph = {};
//         graphData.forEach(line => {
//             const [node1, node2] = line.split(' ');
//             if (!graph[node1]) graph[node1] = [];
//             if (!graph[node2]) graph[node2] = [];
//             graph[node1].push(node2);
//             if (!isDirected) {
//                 graph[node2].push(node1);
//             }
//         });
//         return graph;
//     }

//     function findConnectedComponents(graph) {
//         const visited = new Set();
//         const components = [];

//         for (let node in graph) {
//             if (!visited.has(node)) {
//                 const component = [];
//                 const stack = [node];

//                 while (stack.length > 0) {
//                     const current = stack.pop();
//                     if (!visited.has(current)) {
//                         visited.add(current);
//                         component.push(current);
//                         stack.push(...graph[current].filter(neighbor => !visited.has(neighbor)));
//                     }
//                 }

//                 components.push(component);
//             }
//         }

//         return components;
//     }

//     function highlightStartingNodes(components) {
//         components.forEach(component => {
//             const startNode = component[0];
//             d3.select(`circle[data-id='${startNode}']`).classed('highlight', true);
//             setTimeout(() => {
//                 d3.select(`circle[data-id='${startNode}']`).classed('highlight', false);
//             }, 5000);
//         });

//         setTimeout(() => {
//             enableButtons();
//         }, 5000);
//     }

//     function disableButtons() {
//         bfsButton.disabled = true;
//         dfsButton.disabled = true;
//         connectedComponentsButton.disabled = true;
//         undirectedButton.disabled = true;
//         directedButton.disabled = true;
//         updateGraphButton.disabled = true;
//         bfsButton.style.backgroundColor = 'grey';
//         dfsButton.style.backgroundColor = 'grey';
//         connectedComponentsButton.style.backgroundColor = 'grey';
//         undirectedButton.style.backgroundColor = 'grey';
//         directedButton.style.backgroundColor = 'grey';
//         updateGraphButton.style.backgroundColor = 'grey';
//     }

//     function enableButtons() {
//         bfsButton.disabled = false;
//         dfsButton.disabled = false;
//         connectedComponentsButton.disabled = false;
//         undirectedButton.disabled = false;
//         directedButton.disabled = false;
//         updateGraphButton.disabled = false;
//         bfsButton.style.backgroundColor = '';
//         dfsButton.style.backgroundColor = '';
//         connectedComponentsButton.style.backgroundColor = '';
//         undirectedButton.style.backgroundColor = '';
//         directedButton.style.backgroundColor = '';
//         updateGraphButton.style.backgroundColor = '';
//     }

//     function resetHighlighting() {
//         d3.selectAll('circle').classed('highlight', false);
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    const connectedComponentsButton = document.getElementById('regions');
    const bfsButton = document.getElementById('bfs');
    const dfsButton = document.getElementById('dfs');
    const directedCheckbox = document.getElementById('directed');
    const updateGraphButton = document.getElementById('update-graph');

    connectedComponentsButton.addEventListener('click', function() {
        disableButtons();

        const graphData = document.getElementById('graph-data').value.trim().split('\n');
        const isDirected = directedCheckbox.checked;
        const graph = buildGraph(graphData, isDirected);
        const components = findConnectedComponents(graph);

        highlightStartingNodes(components);
    });

    function buildGraph(graphData, isDirected) {
        const graph = {};
        graphData.forEach(line => {
            const [node1, node2] = line.split(' ');
            if (!graph[node1]) graph[node1] = [];
            if (!graph[node2]) graph[node2] = [];
            graph[node1].push(node2);
            if (!isDirected) {
                graph[node2].push(node1);
            }
        });
        return graph;
    }

    function findConnectedComponents(graph) {
        const visited = new Set();
        const components = [];

        for (let node in graph) {
            if (!visited.has(node)) {
                const component = [];
                const stack = [node];

                while (stack.length > 0) {
                    const current = stack.pop();
                    if (!visited.has(current)) {
                        visited.add(current);
                        component.push(current);
                        stack.push(...graph[current].filter(neighbor => !visited.has(neighbor)));
                    }
                }

                components.push(component);
            }
        }

        return components;
    }

    function highlightStartingNodes(components) {
        components.forEach(component => {
            const startNode = component[0];
            d3.select(`circle[data-id='${startNode}']`).classed('highlight', true);
            setTimeout(() => {
                d3.select(`circle[data-id='${startNode}']`).classed('highlight', false);
            }, 5000);
        });

        setTimeout(() => {
            enableButtons();
        }, 5000);
    }

    function disableButtons() {
        bfsButton.disabled = true;
        dfsButton.disabled = true;
        connectedComponentsButton.disabled = true;
        directedCheckbox.disabled = true;
        updateGraphButton.disabled = true;
        bfsButton.style.backgroundColor = 'grey';
        dfsButton.style.backgroundColor = 'grey';
        connectedComponentsButton.style.backgroundColor = 'grey';
        directedCheckbox.style.backgroundColor = 'grey';
        updateGraphButton.style.backgroundColor = 'grey';
    }

    function enableButtons() {
        bfsButton.disabled = false;
        dfsButton.disabled = false;
        connectedComponentsButton.disabled = false;
        directedCheckbox.disabled = false;
        updateGraphButton.disabled = false;
        bfsButton.style.backgroundColor = '';
        dfsButton.style.backgroundColor = '';
        connectedComponentsButton.style.backgroundColor = '';
        directedCheckbox.style.backgroundColor = '';
        updateGraphButton.style.backgroundColor = '';
    }

    function resetHighlighting() {
        d3.selectAll('circle').classed('highlight', false);
    }
});