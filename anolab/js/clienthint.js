var xmlHttp;

function showHint(str, mode, div_id)
{
	if (div_id == "txtHint" && str.length == 0)
	{
		document.getElementById("txtHint").innerHTML = "no suggestion";			
		return;
	}
	
	xmlHttp = GetXmlHttpObject();
	if (xmlHttp == null)
	{
		alert("Browser does not support HTTP Request");
		return;
	}
	
	if (mode == "hint")
	{
		var url = "gethint.php"
		url = url + "?q=" + str;
		url = url + "&sid=" + Math.random();
	}
	else if (mode == "test")
	{
		var url = "translate.php"
		
		var w;
		switch(div_id)
		{
			case "tbl":
			w = "sing";
			break;
			case "frm":
			w = "plur";
			break;
			case "btp":
			w = "btyp";
			break;
		}
		
		url = url + "?q=" + str + "&w=" + w;
		url = url + "&sid=" + Math.random();
	}
	else
	{
		alert("未知Ajax请求模式！");
	}
	
	xmlHttp.onreadystatechange = function()
	{
		stateChanged(xmlHttp, div_id);
	}
	xmlHttp.open("GET", url, true);
	xmlHttp.send(null);
}

function stateChanged(xmlHttp, div_id)
{
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete")
	{
		document.getElementById(div_id).innerHTML = xmlHttp.responseText;
		
		switch(div_id)
		{
			case "tbl":
			showHint(whatyc.innerText.substring(1, whatyc.innerText.length - 1), "test", "frm");
			break;
			case "frm":
			showHint(whatyc.innerText.substring(1, whatyc.innerText.length - 1), "test", "btp");			
		}
	}
}

function GetXmlHttpObject()
{
	var xmlHttp = null;
	try
	{
		// Firefox, Opera 8.0+, Safari
		xmlHttp = new XMLHttpRequest();
	}
	catch (e)
	{
		// Internet Explorer
		try
		{
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}

function fet(para)
{
	//标明位置
	whatyc.innerHTML = "　" + para.innerHTML + "　";
	
	showHint(para.innerHTML, "test", "tbl");
}