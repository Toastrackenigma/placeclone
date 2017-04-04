<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="main.css">
		<script src="main.js"></script>
		<title>Place</title>
	</head>
	<body>
		<div class="ui">
			<canvas id="cv"></canvas>
			<?php
			$colours = ["red","tomato","orange","yellow","lightgreen","lime","green","cyan","lightskyblue","blue","purple","magenta","pink","gray","black","white"];
			for ($i=0;$i<count($colours);$i++) {
				?>
				<button style="background-color:<?=$colours[$i]?>" onclick="currentColour=this.style.backgroundColor">&emsp;</button>
				<?php
			}
			?>
		</div>
	</body>
</html>
