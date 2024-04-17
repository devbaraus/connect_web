<script lang="ts">
	import type { Link, NodeCurriculo, NodeProducaoBibliografica } from '$lib/types';
	import * as d3 from 'd3';

	export let data: { nodes: Node[]; links: Link[] };

	type Node = NodeProducaoBibliografica | NodeCurriculo;

	function graph(
		el: HTMLDivElement,
		data: {
			nodes: Node[];
			links: Link[];
		}
	) {
		// Specify the dimensions of the chart.
		const width = el.clientWidth;
		const height = el.clientHeight;

		const nodeSize = 12;

		// Specify the color scale.
		const color = d3.scaleOrdinal(d3.schemeCategory10);

		// The force simulation mutates links and nodes, so create a copy
		// so that re-evaluating this cell produces the same result.
		const links = data.links.map((d) => ({ ...d, source: d.start_node, target: d.end_node }));
		const nodes = data.nodes.map((d) => ({ ...d, group: d.__node__ }));

		// Create a simulation with several forces.
		const simulation = d3
			.forceSimulation(nodes as d3.SimulationNodeDatum[])
			.force(
				'link',
				d3.forceLink(links).id((d) => d.id)
			)
			.force('charge', d3.forceManyBody().strength(-200))
			.force('center', d3.forceCenter())
			.force('x', d3.forceX())
			.force('y', d3.forceY());

		// Create the SVG container.
		const svg = d3
			.create('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', [-width / 2, -height / 2, width, height])
			.attr('style', 'max-width: 100%; height: auto; position: relative;');

		function zoomed(event) {
			const { transform } = event;
			node.attr('transform', transform);
			link.attr('transform', transform);
		}

		const zoom = d3.zoom().scaleExtent([0.5, 5]).on('zoom', zoomed);

		svg.call(zoom);

		// Add a line for each link, and a circle for each node.
		const link = svg
			.append('g')
			.attr('stroke', '#999')
			.attr('stroke-opacity', 0.6)
			.selectAll('line')
			.data(links)
			.join('line')
			.attr('stroke-width', (d) => Math.sqrt(d.value));

		const node = svg
			.append('g')
			.attr('stroke', '#fff')
			.attr('stroke-width', 1.5)
			.selectAll('circle')
			.data(nodes)
			.join('circle')
			.attr('r', nodeSize)
			.attr('fill', (d) => color(d.group))
			.text((d) => d.id); // Add text inside the node

		const foreignObject = svg
			.append('foreignObject')
			.attr('width', 320)
			.attr('height', 120)
			.attr('x', 0)
			.attr('y', 0)
			.style('visibility', 'hidden')
			.attr('class', 'bg-white p-2 rounded-md shadow-md overflow-visible');

		const div = foreignObject.append('xhtml:div').attr('class', 'w-full');

		node
			.on('mouseover', function (event, d) {
				// Add hover effects
				const nX = d3.select(this).attr('cx');
				const nY = d3.select(this).attr('cy');
				foreignObject.attr('x', +nX + nodeSize).attr('y', +nY);

				const list = document.createElement('ul');

				if (d.__node__ === 'Curriculo')
					['nome', 'campus', 'categoria'].forEach((key) => {
						const item = document.createElement('li');
						item.classList.add('text-sm');
						item.textContent = `${key.toLocaleUpperCase()}: ${d[key].replaceAll('_', ' ').toUpperCase()}`;
						list.appendChild(item);
					});

				if (d.__node__ === 'ProducaoBibliografica')
					['titulo', 'ano', 'tipo'].forEach((key) => {
						const item = document.createElement('li');
						item.classList.add('text-sm');
						item.textContent = `${key.toLocaleUpperCase()}: ${d[key].replaceAll('_', ' ').toUpperCase()}`;
						list.appendChild(item);
					});

				div.html(list.outerHTML);

				foreignObject.style('visibility', 'visible');
			})
			.on('mousemove', function (event, d) {
				const nX = d3.select(this).attr('cx');
				const nY = d3.select(this).attr('cy');
				foreignObject.attr('x', +nX + nodeSize).attr('y', +nY);
			})
			.on('mouseout', function (event, d) {
				foreignObject.style('visibility', 'hidden');
			});

		// Add a drag behavior.
		node.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));

		// Set the position attributes of links and nodes each time the simulation ticks.
		simulation.on('tick', () => {
			link
				.attr('x1', (d) => d.source.x)
				.attr('y1', (d) => d.source.y)
				.attr('x2', (d) => d.target.x)
				.attr('y2', (d) => d.target.y);

			node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
		});

		// Reheat the simulation when drag starts, and fix the subject position.
		function dragstarted(event: d3.D3DragEvent<SVGCircleElement, any, any>) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		}

		// Update the subject (dragged node) position during drag.
		function dragged(event: d3.D3DragEvent<SVGCircleElement, any, any>) {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
		}

		// Restore the target alpha so the simulation cools after dragging ends.
		// Unfix the subject position now that it’s no longer being dragged.
		function dragended(event: d3.D3DragEvent<SVGCircleElement, any, any>) {
			if (!event.active) simulation.alphaTarget(0);
			event.subject.fx = null;
			event.subject.fy = null;
		}

		// When this cell is re-run, stop the previous simulation. (This doesn’t
		// really matter since the target alpha is zero and the simulation will
		// stop naturally, but it’s a good practice.)
		// invalidation.then(() => simulation.stop());

		el.appendChild(svg.node());

		return {
			destroy() {
				simulation.stop();
			}
		};
	}
</script>

<!-- <svg class="relative" width="1159" height="384" viewBox="-579.5,-192,1159,384">
	<foreignObject width="200" height="200" x="10" y="10" class="">
		<div>
			<p>I'm a tooltip written in HTML</p>
			<img
				src="https://github.com/holtzy/D3-graph-gallery/blob/master/img/section/ArcSmal.png?raw=true"
			/><br />Fancy<br /><span style="font-size: 40px;">Isn't it?</span>
		</div>
	</foreignObject>
</svg> -->

<div use:graph={data} class="h-[420px]" />
