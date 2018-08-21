<?php
// Fill up array with names
$connstr="DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=" . realpath("database/comb.mdb"); 
$conn = odbc_connect($connstr,"","",SQL_CUR_USE_ODBC); 
if (!$conn)
{
	die("Connection Failed");
}

$sql = "SELECT realname FROM ACE";
$rs = odbc_exec($conn, $sql);
if (!$rs)
{
	die("Error in SQL");
}

function enc($c){return iconv('utf-8', 'gbk', $c);}
function arcenc($c){return iconv('gbk', 'utf-8', $c);}

while (odbc_fetch_row($rs))
{
	$a[] = arcenc(odbc_result($rs, "realname"));
}

odbc_close($conn);

// get the q parameter from URL
$q = $_GET["q"];

// look up all hints from array if length of q>0
if (strlen($q) > 0)
{
	$hint = "";
	for ($i=0; $i<count($a); $i++)
	{
		if ($q == substr($a[$i], 0, strlen($q)))
		{
			if ($hint == "")
			{
				$hint = "<div onclick='fet(this)'>" . $a[$i] . "</div>";
			}
			else
			{
				$hint = $hint . "<div onclick='fet(this)'>" . $a[$i] . "</div>";
			}
		}
	}
}

// Set output to "no suggestion" if no hint were found
// or to the correct values
if ($hint == "")
{
	$response = "no suggestion";
}
else
{
	$response = $hint;
}

echo $response;
?>