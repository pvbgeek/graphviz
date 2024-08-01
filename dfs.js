// document.addEventListener('DOMContentLoaded', function() {
//     const dfsButton = document.getElementById('dfs');
//     const bfsButton = document.getElementById('bfs');
//     const connectedComponentsButton = document.getElementById('regions');
//     const undirectedButton = document.getElementById('undirected');
//     const directedButton = document.getElementById('directed');
//     const updateGraphButton = document.getElementById('update-graph');

//     let dfsTimeouts = [];

//     dfsButton.addEventListener('click', function() {
//         if (dfsTimeouts.length) {
//             dfsTimeouts.forEach(timeout => clearTimeout(timeout));
//             dfsTimeouts = [];
//             resetHighlighting();
//         }

//         disableButtons();

//         const graphData = document.getElementById('graph-data').value.trim().split('\n');
//         const isDirected = document.getElementById('directed').checked;
//         const graph = buildGraph(graphData, isDirected);
//         const startNode = graphData[0].split(' ')[0];
//         dfsTraversal(graph, startNode);
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

//     function dfsTraversal(graph, startNode) {
//         const visited = new Set();
//         const stack = [startNode];
//         const order = [];

//         const visitNode = (node) => {
//             if (!visited.has(node)) {
//                 visited.add(node);
//                 order.push(node);
//                 graph[node].forEach(neighbor => {
//                     if (!visited.has(neighbor)) {
//                         stack.push(neighbor);
//                     }
//                 });
//             }
//         };

//         const highlightNode = (node, index, totalLength) => {
//             const timeout = setTimeout(() => {
//                 d3.select(`circle[data-id='${node}']`).classed('highlight', true);
//                 setTimeout(() => {
//                     d3.select(`circle[data-id='${node}']`).classed('highlight', false);
//                     if (index === totalLength - 1) {
//                         enableButtons();
//                     }
//                 }, 900);
//             }, index * 900);
//             dfsTimeouts.push(timeout);
//         };

//         while (stack.length > 0) {
//             const node = stack.pop();
//             visitNode(node);
//         }

//         order.forEach((node, index) => highlightNode(node, index, order.length));
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
    const dfsButton = document.getElementById('dfs');
    const bfsButton = document.getElementById('bfs');
    const connectedComponentsButton = document.getElementById('regions');
    const directedCheckbox = document.getElementById('directed');
    const updateGraphButton = document.getElementById('update-graph');

    let dfsTimeouts = [];

    dfsButton.addEventListener('click', function() {
        if (dfsTimeouts.length) {
            dfsTimeouts.forEach(timeout => clearTimeout(timeout));
            dfsTimeouts = [];
            resetHighlighting();
        }

        disableButtons();

        const graphData = document.getElementById('graph-data').value.trim().split('\n');
        const isDirected = directedCheckbox.checked;
        const graph = buildGraph(graphData, isDirected);
        const startNode = graphData[0].split(' ')[0];
        dfsTraversal(graph, startNode);
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

    function dfsTraversal(graph, startNode) {
        const visited = new Set();
        const stack = [startNode];
        const order = [];

        const visitNode = (node) => {
            if (!visited.has(node)) {
                visited.add(node);
                order.push(node);
                graph[node].forEach(neighbor => {
                    if (!visited.has(neighbor)) {
                        stack.push(neighbor);
                    }
                });
            }
        };

        const highlightNode = (node, index, totalLength) => {
            const timeout = setTimeout(() => {
                d3.select(`circle[data-id='${node}']`).classed('highlight', true);
                setTimeout(() => {
                    d3.select(`circle[data-id='${node}']`).classed('highlight', false);
                    if (index === totalLength - 1) {
                        enableButtons();
                    }
                }, 900);
            }, index * 900);
            dfsTimeouts.push(timeout);
        };

        while (stack.length > 0) {
            const node = stack.pop();
            visitNode(node);
        }

        order.forEach((node, index) => highlightNode(node, index, order.length));
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
