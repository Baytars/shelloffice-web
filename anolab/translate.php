<?php
// Fill up array with names
$connstr="DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=" . realpath("database/comb.mdb"); 
$conn = odbc_connect($connstr,"","",SQL_CUR_USE_ODBC); 
if (!$conn)
{
	die("Connection Failed");
}

function enc($c){return iconv('utf-8', 'gbk', $c);}
function arcenc($c){return iconv('gbk', 'utf-8', $c);}

// get the q parameter from URL
$q = $_GET["q"];
$q = enc($q);

$sql = "SELECT * FROM ACE WHERE realname='$q'";
$rs = odbc_exec($conn, $sql);
if (!$rs)
{
	die("Failed to translate");
}

while (odbc_fetch_row($rs))
{
	$sqln = odbc_result($rs, "sqlname");
}

// get the w parameter from URL
$w = $_GET["w"];

if ($w == "btyp")
{
	$sql = "SELECT * FROM $w WHERE belong2 = '$sqln'";
}
else
{
	$sqln = $sqln . $w;
	$sql = "SELECT * FROM $sqln";
}

$reflex = odbc_exec($conn, $sql);
if (!$reflex)
{
	die("Error in SQL");
}

$hint = "<table>";

if ($w == "btyp")
{
	while (odbc_fetch_row($reflex))
	{
		$op1 = enc("选项A");
		$op2 = enc("选项B");
		$op3 = enc("选项C");
		$op4 = enc("选项D");
		$op5 = enc("选项E");
		$qu1 = enc("问题1");
		$an1 = enc("Q1答案");
		$qu2 = enc("问题2");
		$an2 = enc("Q2答案");
		$qu3 = enc("问题3");
		$an3 = enc("Q3答案");
		$qu4 = enc("问题4");
		$an4 = enc("Q4答案");
		$qu5 = enc("问题5");
		$an5 = enc("Q5答案");
		$qu6 = enc("问题6");
		$an6 = enc("Q6答案");
		
		$op1 = arcenc(odbc_result($reflex, $op1));
		$op2 = arcenc(odbc_result($reflex, $op2));
		$op3 = arcenc(odbc_result($reflex, $op3));
		$op4 = arcenc(odbc_result($reflex, $op4));
		$op5 = arcenc(odbc_result($reflex, $op5));
		$qu1 = arcenc(odbc_result($reflex, $qu1));
		$an1 = arcenc(odbc_result($reflex, $an1));
		$qu2 = arcenc(odbc_result($reflex, $qu2));
		$an2 = arcenc(odbc_result($reflex, $an2));
		$qu3 = arcenc(odbc_result($reflex, $qu3));
		$an3 = arcenc(odbc_result($reflex, $an3));
		$qu4 = arcenc(odbc_result($reflex, $qu4));
		$an4 = arcenc(odbc_result($reflex, $an4));
		$qu5 = arcenc(odbc_result($reflex, $qu5));
		$an5 = arcenc(odbc_result($reflex, $an5));
		$qu6 = arcenc(odbc_result($reflex, $qu6));
		$an6 = arcenc(odbc_result($reflex, $an6));
		
		$hint = $hint . "<tr><td>$op1</td><td>$op2</td><td>$op3</td><td>$op4</td><td>$op5</td><td>$qu1</td><td>$an1</td><td>$qu2</td><td>$an2</td><td>$qu3</td><td>$an3</td><td>$qu4</td><td>$an4</td><td>$qu5</td><td>$an5</td><td>$qu6</td><td>$an6</td></tr>";
	}
}
else
{
	while (odbc_fetch_row($reflex))
	{
		$ques = enc("问题");
		$op1 = enc("选项A");
		$op2 = enc("选项B");
		$op3 = enc("选项C");
		$op4 = enc("选项D");
		$op5 = enc("选项E");
		
		$ques = arcenc(odbc_result($reflex, $ques));
		$op1 = arcenc(odbc_result($reflex, $op1));
		$op2 = arcenc(odbc_result($reflex, $op2));
		$op3 = arcenc(odbc_result($reflex, $op3));
		$op4 = arcenc(odbc_result($reflex, $op4));
		$op5 = arcenc(odbc_result($reflex, $op5));
		
		$hint = $hint . "<tr><td>$ques</td><td>$op1</td><td>$op2</td><td>$op3</td><td>$op4</td><td>$op5</td></tr>";
	}
}

odbc_close($conn);
$response = $hint . "</table>";

echo $response;
?>