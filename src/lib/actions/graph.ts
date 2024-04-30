import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3';
import * as d3 from 'd3';

export interface NodeGraph extends SimulationNodeDatum {
	id: string;
	node: string;
	group: number;
	color: string;
	class: string;
}

export interface LinkGraph extends SimulationLinkDatum<NodeGraph> {
	id: string;
	source: string;
	target: string;
}

export type GraphParams = {
	data: {
		nodes: NodeGraph[];
		links: LinkGraph[];
	};
	tooltip?: string;
	actions?: {
		click?: (d: NodeGraph) => void;
		mouseover?: (d: NodeGraph) => void;
	};
};

export function graph(el: HTMLDivElement, { data, tooltip, actions }: GraphParams) {
	// Specify the dimensions of the chart.
	const width = el.clientWidth;
	const height = el.clientHeight;

	const nodeSize = 9;

	// The force simulation mutates links and nodes, so create a copy
	// so that re-evaluating this cell produces the same result.
	const links = data.links;
	const nodes = data.nodes;

	// Create a simulation with several forces.
	const simulation = d3
		.forceSimulation(nodes)
		.force(
			'link',
			d3.forceLink(links).id((d) => d.id)
		)
		.force('charge', d3.forceManyBody().strength(-120))
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

	const zoom = d3.zoom().on('zoom', (event) => {
		const { transform } = event;
		node.attr('transform', transform);
		link.attr('transform', transform);
	});

	const minusZoom = d3
		.create('button')
		.attr('class', 'px-1 hover:bg-accent')
		.text('-')
		.on('click', () => {
			zoom.scaleBy(svg.transition().duration(150), 0.8);
		});

	const plusZoom = d3
		.create('button')
		.attr('class', 'px-1 hover:bg-accent')
		.text('+')
		.on('click', () => {
			zoom.scaleBy(svg.transition().duration(150), 1.2);
		});

	const zoomBtn = d3
		.create('div')
		.attr('class', 'absolute bottom-2 right-2 border rounded-md space-x-1');

	zoomBtn.node().appendChild(minusZoom.node());
	zoomBtn.node().appendChild(plusZoom.node());

	const uuid = () =>
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

	const tooltipEl = d3
		.create('div')
		.append('div')
		.attr('id', uuid)
		.attr(
			'style',
			'position: fixed; border-style: solid; white-space: nowrap; z-index: 9999999; box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 10px; transition: opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgb(255, 255, 255); border-width: 1px; border-radius: 4px; color: rgb(102, 102, 102); font: 14px / 21px sans-serif; padding: 10px; border-color: rgb(255, 255, 255); pointer-events: none; user-select: none;'
		)
		.attr('class', 'hidden md:block')
		.style('top', 0)
		.style('left', 0)
		.style('opacity', 0)
		.style('visibility', 'hidden');

	const tooltipContent = document.querySelector(`#${tooltip}`);
	if (tooltipContent) {
		tooltipEl.node().innerHTML = '';
		tooltipEl.node().appendChild(tooltipContent);
	}

	// Add a line for each link, and a circle for each node.
	const link = svg
		.append('g')
		.attr('stroke', '#999')
		.attr('stroke-opacity', 0.6)
		.selectAll('line')
		.data(links)
		.join('line');

	const node = svg
		.append('g')
		.attr('stroke', '#fff')
		.attr('stroke-width', 1.5)
		.selectAll('circle')
		.data(nodes)
		.join('circle')
		.attr('r', nodeSize)
		.attr('fill', (d) => {
			return d.color ?? '#000';
		})
		.attr('class', (d) => d.class ?? '')
		.text((d) => d.id); // Add text inside the node

	function getRelativeMousePosition(event: MouseEvent) {
		const tip = tooltipEl.node().getBoundingClientRect();

		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		const availableSpaceRight = windowWidth - event.clientX;
		const availableSpaceBottom = windowHeight - event.clientY;

		let tooltipLeft;
		let tooltipTop;

		if (availableSpaceRight < tip.width) {
			// If tooltip overflows to the right
			tooltipLeft = event.clientX - tip.width; // Position to the left
		} else {
			tooltipLeft = event.clientX;
		}

		if (availableSpaceBottom < tip.height) {
			// If tooltip overflows below
			tooltipTop = event.clientY - tip.height; // Position above
		} else {
			tooltipTop = event.clientY;
		}

		return {
			x: tooltipLeft,
			y: tooltipTop
		};
	}

	node
		.on('click', function (event, d) {
			actions?.click?.(d);
		})
		.on('mouseover', function (event, d) {
			actions?.mouseover?.(d);
			const { x, y } = getRelativeMousePosition(event);

			tooltipEl.style('top', `${y + nodeSize}px`).style('left', `${x + nodeSize}px`);
			tooltipEl.style('opacity', 1).style('visibility', 'visible');
		})
		.on('mousemove', function (event, d) {
			const { x, y } = getRelativeMousePosition(event);

			tooltipEl.style('top', `${y + nodeSize}px`).style('left', `${x + nodeSize}px`);
			tooltipEl.style('opacity', 1).style('visibility', 'visible');
		})
		.on('mouseout', function (event, d) {
			tooltipEl.style('opacity', 0).style('visibility', 'hidden');
		});

	// Add a drag behavior.
	// node.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));

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
	el.style.position = 'relative';
	el.appendChild(svg.node());
	el.appendChild(tooltipEl.node());
	el.appendChild(zoomBtn.node());

	return {
		destroy() {
			simulation.stop();
		}
	};
}
