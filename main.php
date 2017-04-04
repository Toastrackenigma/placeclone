<?php
$c = mysqli_connect("localhost","root","","place");
if (isset($_GET["fromtime"])) {
	$q = "SELECT x, y, colour FROM px WHERE time >= '".addslashes($_GET["fromtime"])."'";
	$r = mysqli_query($c,$q);
	$pxs = [];
	while ($a=mysqli_fetch_assoc($r)) {
		array_push($pxs,[$a["colour"],intval($a["x"]),intval($a["y"])]);
	}
	echo json_encode($pxs);
}
else if (isset($_GET["x"])) {
	$q = "INSERT INTO px(x,y,colour,time) VALUES('".addslashes($_GET["x"])."','".addslashes($_GET["y"])."','".addslashes($_GET["colour"])."','".addslashes($_GET["time"])."')";
	mysqli_query($c,$q);
}
?>