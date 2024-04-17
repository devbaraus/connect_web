<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	const data = {
		nodes: [
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24514',
				doi: '10.5753/sbbd_estendido.2023.233698',
				titulo: 'Aprendizado Federado Sensível ao Risco em Modelos de Ranqueamento',
				ano: '2023',
				tipo: 'RESUMO',
				tipo_livro: null
			},
			{
				__node__: 'Curriculo',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				siape: '1324561',
				cnpq: '4603724338719739',
				nome: 'Daniel Xavier de Sousa'
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24505',
				doi: '10.1145/3477495.3532056',
				titulo: 'Risk-Sensitive Deep Neural Learning to Rank',
				ano: '2022',
				tipo: 'TRABALHO_EVENTO',
				tipo_livro: null
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24502',
				doi: '10.5753/ctd.2019.6329',
				titulo: 'Evolutionary Risk-Sensitive Feature Selection for Learning to Rank',
				ano: '2019',
				tipo: 'RESUMO',
				tipo_livro: null
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24488',
				doi: '',
				titulo:
					'Impulsionando Árvores Extremamente Aleatórias Ensacadas em Paralelo para Classificação de Textos',
				ano: '2018',
				tipo: 'RESUMO',
				tipo_livro: null
			},
			{
				__node__: 'Curriculo',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:1716',
				siape: '1941486',
				cnpq: '3276712720440197',
				nome: 'Warley da Silva Martins'
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24479',
				doi: '10.5753/wscad.2016.14254',
				titulo:
					'A Fast and Scalable Manycore Implementation for an  On-Demand Learning to Rank Method',
				ano: '2016',
				tipo: 'TRABALHO_EVENTO',
				tipo_livro: null
			},
			{
				__node__: 'Curriculo',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:1978',
				siape: '1854905',
				cnpq: '8013634228709317',
				nome: 'Reigiany Marta da Silva'
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24474',
				doi: '10.1145/2911451.2911540',
				titulo: 'Generalized BROOF-L2R',
				ano: '2016',
				tipo: 'TRABALHO_EVENTO',
				tipo_livro: null
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24467',
				doi: '',
				titulo: 'Aprendendo a Ranquear com Boosting e Florestas Aleatórias: Um Modelo Híbrido',
				ano: '2015',
				tipo: 'TRABALHO_EVENTO',
				tipo_livro: null
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24455',
				doi: '',
				titulo: 'Improving On-Demand Learning to Rank Through Parallelism',
				ano: '2012',
				tipo: 'TRABALHO_EVENTO',
				tipo_livro: null
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24447',
				doi: '',
				titulo:
					'Construção de um pacote Debian para Instalação do Programa balaBLAST em Cluster de Computadores',
				ano: '2011',
				tipo: 'RESUMO',
				tipo_livro: null
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24442',
				doi: '10.1007/978-3-540-92859-1',
				titulo: 'BLAST Distributed Execution on Partitioned Databases with Primary Fragments',
				ano: '2008',
				tipo: 'TRABALHO_EVENTO',
				tipo_livro: null
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24431',
				doi: '',
				titulo: 'Execução paralela da Base de Dados Distribuída da ferramenta BLAST',
				ano: '2006',
				tipo: 'RESUMO',
				tipo_livro: null
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24421',
				doi: '',
				titulo: 'Microsatellite marker development using the Staden Package and a new module',
				ano: '2005',
				tipo: 'TRABALHO_EVENTO',
				tipo_livro: null
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24412',
				doi: '',
				titulo: 'Mineração de dados genômicos na busca por marcadores moleculares',
				ano: '2004',
				tipo: 'RESUMO',
				tipo_livro: null
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24401',
				doi: '',
				titulo: 'Software para detecção de repetições encadeadas (SSR) em seqüências de DNA',
				ano: '2004',
				tipo: 'TRABALHO_EVENTO',
				tipo_livro: null
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24394',
				doi: '',
				titulo:
					'Ferramenta computacional para a detecção de repetições encadeadas (microsatélites) em sequências de DNA',
				ano: '2004',
				tipo: 'RESUMO',
				tipo_livro: null
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:15246',
				doi: '',
				titulo: '2Path: a terpenoid metabolic network modeled as graph database',
				ano: '2016',
				tipo: 'TRABALHO_EVENTO',
				tipo_livro: null
			},
			{
				__node__: 'Curriculo',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:4074',
				siape: '1875902',
				cnpq: '2391349697609978',
				nome: 'Waldeyr Mendes Cordeiro da Silva'
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:9203',
				doi: '10.5753/erigo.2020.13861',
				titulo:
					'Aplicação de Algoritmos Bioinspirados à Otimização da Estimação da Direção de Chegada',
				ano: '2020',
				tipo: 'TRABALHO_EVENTO',
				tipo_livro: null
			},
			{
				__node__: 'Curriculo',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:6497',
				siape: '1497734',
				cnpq: '8575752368239596',
				nome: 'Katia Cilene Costa Fernandes'
			},
			{
				__node__: 'ProducaoBibliografica',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5274',
				doi: '10.1145/2983323.2983792',
				titulo: 'Incorporating Risk-Sensitiveness into Feature Selection for Learning to Rank',
				ano: '2016',
				tipo: 'TRABALHO_EVENTO',
				tipo_livro: null
			},
			{
				__node__: 'Curriculo',
				id: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:2195',
				siape: '2300983',
				cnpq: '5172447060300953',
				nome: 'Sergio Daniel Carvalho Canuto'
			}
		],
		links: [
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24318',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24514'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24314',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24505'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24311',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24502'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24307',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24488'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24302',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:1716',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24488'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24294',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24479'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24291',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:1978',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24479'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24288',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:1716',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24479'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24285',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24474'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24281',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24467'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24277',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24455'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24275',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:1978',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24455'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24273',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:1716',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24455'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24269',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24447'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24263',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24442'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24261',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24431'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24256',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24421'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24258',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:1716',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24421'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24251',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24412'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24253',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:1716',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24412'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24244',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24401'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24247',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:1716',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24401'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24238',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24394'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24241',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:1716',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:24394'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:14358',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:15246'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:14355',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:4074',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:15246'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:8109',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:9203'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:8112',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:6497',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:9203'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:3996',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5276',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5274'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:3992',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:2195',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5274'
			},
			{
				__rel__: 'Publicou',
				id: '5:35daf102-3641-4b71-a3f8-d6ef893f2ab0:3991',
				start_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:1716',
				end_node: '4:35daf102-3641-4b71-a3f8-d6ef893f2ab0:5274'
			}
		]
	};

	function graph(el: HTMLDivElement) {
		// Specify the dimensions of the chart.
		const width = el.clientWidth;
		const height = el.clientHeight;

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
			.force('charge', d3.forceManyBody().strength(-100))
			.force('x', d3.forceX())
			.force('y', d3.forceY());

		// Create the SVG container.
		const svg = d3
			.create('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', [-width / 2, -height / 2, width, height])
			.attr('style', 'max-width: 100%; height: auto;');

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
			.attr('r', 7)
			.attr('fill', (d) => color(d.group))
			.text((d) => d.id) // Add text inside the node
			.on('mouseover', function (event, d) {
				// Add hover effects
				d3.select(this).attr('r', '9');
			})
			.on('mouseout', function (event, d) {
				d3.select(this).attr('r', '7')
			});

		node.append('title').text((d) => {
			let tooltipText = '';
			if (d.__node__ === 'Curriculo') {
				tooltipText += `Nome: ${d.nome}\n`;
				tooltipText += `ID: ${d.id}\n`;
				tooltipText += `Siape: ${d.siape}\n`;
			} else if (d.__node__ === 'ProducaoBibliografica') {
				tooltipText += `Título: ${d.titulo}\n`;
				tooltipText += `Tipo: ${d.tipo}\n`;
				tooltipText += `Ano: ${d.ano}\n`;
			}
			return tooltipText;
		});

		// node.append('title').text((d) => {
		// 	if (d.__node__ === 'Curriculo') {
		// 		return d.nome;
		// 	} else if (d.__node__ === 'ProducaoBibliografica') {
		// 		return d.titulo;
		// 	}

		// });

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

<div use:graph class="h-96" />
