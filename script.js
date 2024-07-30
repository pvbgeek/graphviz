/*document.addEventListener('DOMContentLoaded', function() {
    const graphDataTextarea = document.getElementById('graph-data');
    const nodeCountInput = document.getElementById('node-count');
    const undirectedButton = document.getElementById('undirected');
    const directedButton = document.getElementById('directed');
    const updateGraphButton = document.getElementById('update-graph');
    let isDirected = false;

    undirectedButton.addEventListener('click', function() {
        isDirected = false;
    });

    directedButton.addEventListener('click', function() {
        isDirected = true;
    });

    updateGraphButton.addEventListener('click', function() {
        const graphData = graphDataTextarea.value.trim().split('\n');
        updateGraph(graphData);
    });

    function updateGraph(graphData) {
        const graphSvg = d3.select("#graph-svg");
        graphSvg.selectAll("*").remove(); // Clear existing graph

        const nodes = new Map();
        const links = [];

        graphData.forEach(line => {
            const [node1, node2] = line.split(' ');
            if (node1) nodes.set(node1, { id: node1 });
            if (node2) nodes.set(node2, { id: node2 });
            if (node1 && node2) links.push({ source: node1, target: node2 });
        });

        nodeCountInput.value = nodes.size;

        const width = +graphSvg.attr('width').replace('%', '') / 100 * graphSvg.node().getBoundingClientRect().width;
        const height = +graphSvg.attr('height').replace('%', '') / 100 * graphSvg.node().getBoundingClientRect().height;

        const simulation = d3.forceSimulation(Array.from(nodes.values()))
            .force("link", d3.forceLink(links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collide", d3.forceCollide().radius(30)); // Avoid node overlaps

        const defs = graphSvg.append("defs");
        defs.append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 10)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "black");

        const link = graphSvg.selectAll(".links")
            .data(links, d => `${d.source.id}-${d.target.id}`);

        link.exit().remove();

        const linkEnter = link.enter().append("line")
            .attr("class", "links")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .attr("marker-end", d => {
                return isDirected ? "url(#arrowhead)" : null;
            });

        const linkUpdate = linkEnter.merge(link);

        const node = graphSvg.selectAll(".nodes")
            .data(simulation.nodes(), d => d.id);

        node.exit().remove();

        const nodeEnter = node.enter().append("circle")
            .attr("class", "nodes")
            .attr("r", 15)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", 1.5);

        const nodeUpdate = nodeEnter.merge(node);

        const text = graphSvg.selectAll(".texts")
            .data(simulation.nodes(), d => d.id);

        text.exit().remove();

        const textEnter = text.enter().append("text")
            .attr("class", "texts")
            .attr("dy", 4)
            .attr("text-anchor", "middle") // Center-aligning text
            .text(d => d.id);

        const textUpdate = textEnter.merge(text);

        simulation.on("tick", () => {
            linkUpdate
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => adjustEdgeEnd(d.source.x, d.source.y, d.target.x, d.target.y).x2)
                .attr("y2", d => adjustEdgeEnd(d.source.x, d.source.y, d.target.x, d.target.y).y2);

            nodeUpdate
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            textUpdate
                .attr("x", d => d.x)
                .attr("y", d => d.y);
        });
    }

    function adjustEdgeEnd(x1, y1, x2, y2) {
        const r = 15;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ratio = (dist - r) / dist;
        const adjustedX2 = x1 + dx * ratio;
        const adjustedY2 = y1 + dy * ratio;
        return { x2: adjustedX2, y2: adjustedY2 };
    }

    // Initialize graph with empty data
    updateGraph(graphDataTextarea.value.trim().split('\n'));
});*/

/*document.addEventListener('DOMContentLoaded', function() {
    const graphDataTextarea = document.getElementById('graph-data');
    const nodeCountInput = document.getElementById('node-count');
    const undirectedButton = document.getElementById('undirected');
    const directedButton = document.getElementById('directed');
    const updateGraphButton = document.getElementById('update-graph');
    let isDirected = false;

    undirectedButton.addEventListener('click', function() {
        isDirected = false;
    });

    directedButton.addEventListener('click', function() {
        isDirected = true;
    });

    updateGraphButton.addEventListener('click', function() {
        updateGraph();
    });

    function updateGraph() {
        const graphData = graphDataTextarea.value.trim().split('\n');
        const graphSvg = d3.select("#graph-svg");
        graphSvg.selectAll("*").remove(); // Clear existing graph

        const nodes = new Map();
        const links = [];

        graphData.forEach(line => {
            const [node1, node2] = line.split(' ');
            if (node1) nodes.set(node1, { id: node1 });
            if (node2) nodes.set(node2, { id: node2 });
            if (node1 && node2) links.push({ source: node1, target: node2 });
        });

        nodeCountInput.value = nodes.size;

        const width = 1200;
        const height = 800;

        const simulation = d3.forceSimulation(Array.from(nodes.values()))
            .force("link", d3.forceLink(links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collide", d3.forceCollide().radius(30)) // Avoid node overlaps
            .on("tick", ticked);

        const defs = graphSvg.append("defs");
        defs.append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 10)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "black");

        const link = graphSvg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .attr("marker-end", d => {
                return isDirected ? "url(#arrowhead)" : null;
            });

        const node = graphSvg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(simulation.nodes())
            .enter().append("circle")
            .attr("r", 15)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", 1.5)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        const text = graphSvg.append("g")
            .attr("class", "texts")
            .selectAll("text")
            .data(simulation.nodes())
            .enter().append("text")
            .attr("dy", 4)
            .attr("text-anchor", "middle") // Center-aligning text
            .text(d => d.id);

        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => adjustEdgeEnd(d.source.x, d.source.y, d.target.x, d.target.y).x2)
                .attr("y2", d => adjustEdgeEnd(d.source.x, d.source.y, d.target.x, d.target.y).y2);

            node
                .attr("cx", d => Math.max(15, Math.min(width - 15, d.x)))
                .attr("cy", d => Math.max(15, Math.min(height - 15, d.y)));

            text
                .attr("x", d => Math.max(15, Math.min(width - 15, d.x)))
                .attr("y", d => Math.max(15, Math.min(height - 15, d.y)));
        }

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        function adjustEdgeEnd(x1, y1, x2, y2) {
            const r = 15;
            const dx = x2 - x1;
            const dy = y2 - y1;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ratio = (dist - r) / dist;
            const adjustedX2 = x1 + dx * ratio;
            const adjustedY2 = y1 + dy * ratio;
            return { x2: adjustedX2, y2: adjustedY2 };
        }
    }

    // Initialize graph with empty data
    updateGraph();
});*/

document.addEventListener('DOMContentLoaded', function() {
    const graphDataTextarea = document.getElementById('graph-data');
    const nodeCountInput = document.getElementById('node-count');
    const undirectedButton = document.getElementById('undirected');
    const directedButton = document.getElementById('directed');
    const updateGraphButton = document.getElementById('update-graph');
    let isDirected = false;

    undirectedButton.addEventListener('click', function() {
        isDirected = false;
    });

    directedButton.addEventListener('click', function() {
        isDirected = true;
    });

    updateGraphButton.addEventListener('click', function() {
        updateGraph();
    });

    function updateGraph() {
        const graphData = graphDataTextarea.value.trim().split('\n');
        const graphSvg = d3.select("#graph-svg");
        graphSvg.selectAll("*").remove(); // Clear existing graph

        const nodes = new Map();
        const links = [];

        graphData.forEach(line => {
            const [node1, node2] = line.split(' ');
            if (node1) nodes.set(node1, { id: node1 });
            if (node2) nodes.set(node2, { id: node2 });
            if (node1 && node2) links.push({ source: node1, target: node2 });
        });

        nodeCountInput.value = nodes.size;

        const width = 1200;
        const height = 800;

        const simulation = d3.forceSimulation(Array.from(nodes.values()))
            .force("link", d3.forceLink(links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collide", d3.forceCollide().radius(30)) // Avoid node overlaps
            .on("tick", ticked);

        const defs = graphSvg.append("defs");
        defs.append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 10)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "black");

        const link = graphSvg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .attr("marker-end", d => {
                return isDirected ? "url(#arrowhead)" : null;
            });

        const node = graphSvg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(simulation.nodes())
            .enter().append("circle")
            .attr("r", 15)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", 1.5)
            .attr("class", "draggable-node") // Add this line
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        const text = graphSvg.append("g")
            .attr("class", "texts")
            .selectAll("text")
            .data(simulation.nodes())
            .enter().append("text")
            .attr("dy", 4)
            .attr("text-anchor", "middle") // Center-aligning text
            .text(d => d.id);

        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => adjustEdgeEnd(d.source.x, d.source.y, d.target.x, d.target.y).x2)
                .attr("y2", d => adjustEdgeEnd(d.source.x, d.source.y, d.target.x, d.target.y).y2);

            node
                .attr("cx", d => Math.max(15, Math.min(width - 15, d.x)))
                .attr("cy", d => Math.max(15, Math.min(height - 15, d.y)));

            text
                .attr("x", d => Math.max(15, Math.min(width - 15, d.x)))
                .attr("y", d => Math.max(15, Math.min(height - 15, d.y)));
        }

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        function adjustEdgeEnd(x1, y1, x2, y2) {
            const r = 15;
            const dx = x2 - x1;
            const dy = y2 - y1;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ratio = (dist - r) / dist;
            const adjustedX2 = x1 + dx * ratio;
            const adjustedY2 = y1 + dy * ratio;
            return { x2: adjustedX2, y2: adjustedY2 };
        }
    }

    // Initialize graph with empty data
    updateGraph();
});