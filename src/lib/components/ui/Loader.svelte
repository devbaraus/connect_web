<div class="artboard">
	<div class="domino">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</div>

<style>
	.artboard {
		width: 100%;
		height: 100%;
		display: -webkit-box;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;
		flex-wrap: wrap;
		position: absolute;
	}

	.domino > div {
		border-radius: 8px;
		display: -webkit-inline-box;
		display: inline-flex;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
		width: 50px;
		height: 50px;
		-webkit-animation: domino-effect 2.4s infinite ease-in-out;
		animation: domino-effect 2.4s infinite ease-in-out;
	}

	.domino > div:nth-child(1) {
		background: rgb(0, 143, 251);
	}

	.domino > div:nth-child(1):after {
		background: rgb(0, 143, 251);
		-webkit-animation-delay: 0.6s;
		animation-delay: 0.6s;
	}

	.domino > div:nth-child(2) {
		background: rgb(0, 227, 150);
	}

	.domino > div:nth-child(2):after {
		background: rgb(0, 227, 150);
		-webkit-animation-delay: 1.2s;
		animation-delay: 1.2s;
	}

	.domino > div:nth-child(3) {
		background: rgb(254, 176, 25);
	}

	.domino > div:nth-child(3):after {
		background: rgb(254, 176, 25);
		-webkit-animation-delay: 1.8s;
		animation-delay: 1.8s;
	}

	.domino > div:nth-child(4) {
		background: rgb(255, 69, 96);
	}

	.domino > div:nth-child(4):after {
		background: rgb(255, 69, 96);
		-webkit-animation-delay: 2.4s;
		animation-delay: 2.4s;
	}

	.domino > div:nth-child(5) {
		background: rgb(119, 93, 208);
	}

	.domino > div:nth-child(5):after {
		background: rgb(119, 93, 208);
		-webkit-animation-delay: 3s;
		animation-delay: 3s;
	}

	.domino > div:nth-child(1) {
		margin: 23px;
		-webkit-animation-delay: 0.6s;
		animation-delay: 0.6s;
	}

	.domino > div:nth-child(2) {
		margin: 23px;
		-webkit-animation-delay: 1.2s;
		animation-delay: 1.2s;
	}

	.domino > div:nth-child(3) {
		margin: 23px;
		-webkit-animation-delay: 1.8s;
		animation-delay: 1.8s;
	}

	.domino > div:nth-child(4) {
		margin: 23px;
		-webkit-animation-delay: 2.4s;
		animation-delay: 2.4s;
	}

	.domino > div:nth-child(5) {
		margin: 23px;
		-webkit-animation-delay: 3s;
		animation-delay: 3s;
	}

	.domino > div:after {
		content: '';
		position: relative;
		top: 0px;
		left: -70px;
		opacity: 0;
		border-radius: 8px;
		width: 50px;
		height: 50px;
		-webkit-animation: illusion 2.4s infinite ease-in-out;
		animation: illusion 2.4s infinite ease-in-out;
	}

	@-webkit-keyframes beat {
		to {
			-webkit-transform: scale(1.4);
			transform: scale(1.4);
		}
	}

	@keyframes beat {
		to {
			-webkit-transform: scale(1.4);
			transform: scale(1.4);
		}
	}

	@-webkit-keyframes spin {
		to {
			-webkit-transform: rotate(140deg);
			transform: rotate(140deg);
		}
	}

	@keyframes spin {
		to {
			-webkit-transform: rotate(140deg);
			transform: rotate(140deg);
		}
	}

	@-webkit-keyframes domino-effect {
		20%,
		100% {
			-webkit-transform: rotate(135deg);
			transform: rotate(135deg);
		}
	}

	@keyframes domino-effect {
		20%,
		100% {
			-webkit-transform: rotate(135deg);
			transform: rotate(135deg);
		}
	}

	@-webkit-keyframes illusion {
		0%,
		25% {
			opacity: 1;
		}
		26.10%,
		33.33%,
		100% {
			opacity: 0;
		}
	}

	@keyframes illusion {
		0%,
		25% {
			opacity: 1;
		}
		26.10%,
		33.33%,
		100% {
			opacity: 0;
		}
	}
</style>
