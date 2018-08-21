function ultraini(){
	document.getElementsByClassName("sum")[0].placeholder = "";
	document.getElementsByClassName("sum")[0].value = "";
	document.getElementsByClassName("sum")[1].placeholder = "";
	document.getElementsByClassName("sum")[1].value = "";
	document.getElementsByClassName("sum")[2].placeholder = "";
	document.getElementsByClassName("sum")[2].value = "";
	
	//初始化分数和正确率
	score.value = 0;
	rate.value = "";
	key.value="";
}

function init(){
	//显示单选题题目库存
	window.orin = tbl.getElementsByTagName("tr").length;
	document.getElementsByClassName("sum")[0].placeholder = orin;
	
	if(orin>20){
		document.getElementsByClassName("sum")[0].value = 20;
	}else{
		document.getElementsByClassName("sum")[0].value = orin;
	}
	
	//显示多选题题目库存
	window.orgl = frm.getElementsByTagName("tr").length;
	document.getElementsByClassName("sum")[1].placeholder = orgl;
	
	if(orgl>20){
		document.getElementsByClassName("sum")[1].value = 20;
	}else{
		document.getElementsByClassName("sum")[1].value = orgl;
	}
	
	//显示Ｂ型题题目库存
	window.srce = btp.getElementsByTagName("tr").length;
	document.getElementsByClassName("sum")[2].placeholder = srce;
	document.getElementsByClassName("sum")[2].value = 1;
	
	//初始化分数和正确率
	score.value = 0;
	rate.value = "";
	
	want = document.getElementsByClassName("sum")[0].value;
	
	//写入
	pre.innerHTML = tbl.innerHTML;
	//试卷初始化
	sing.innerHTML = "<h2>单选题</h2>";
	plur.innerHTML = "<h2>多选题</h2>";
	
	//初始化分数和正确率
	score.value = 0;
	rate.value = "";
	
	function chain(type,sttc,spe,opt){
		for(x=0;x<want;x++){
			if(want>sttc){
				alert("呃，贝壳君没准备这么多" + spe + "选题哦");
				break;
			}
			
			//再提取并获取参数
			trassm = pre.getElementsByTagName("tr");
			
			//题目数量
			var tot = trassm.length;
			
			//取题，产生在[1,tot]的随机数
			var select = Math.floor ( Math.random() * tot + 1 );
			var transval = select - 1 ;
			var tdassm = trassm[transval].getElementsByTagName("td");
			var ans = new Array();
			for(u=0,v=1;u<tdassm.length -1;u++,v++){
				ans[u] = tdassm[v].innerText;
			}
			
			//对答案进行洗牌
			function shuffle(){
				for (var i = ans.length-1; i >=0; i--) {
					var randomIndex = Math.floor(Math.random()*(i+1)); 
					var itemAtIndex = ans[randomIndex]; 
					ans[randomIndex] = ans[i]; 
					ans[i] = itemAtIndex;
				}
				return ans;
			}
			
			//if(enbran.checked){}
				shuffle();
			
			//显示问题
			var sec = x + 1 ;
			list.getElementsByClassName("q")[0].innerHTML = sec + "." + tdassm[0].innerHTML;
			
			//处理答案
			function proc(str,y){
				str = str.trim();
				var tag = str.substring(str.length-1);
				var prod = str.substring(0,str.length-1);
				
				switch(tag)
				{
					case "+":
					ans[y] = prod + "<span class='note'>T</span>";
					break;
					case "-":
					ans[y] = prod + "<span class='note'>F</span>";
					break;
					case "T":
					ans[y] = prod + "<span class='note'>T</span>";
					break;
					default:
					ans[y] = prod + tag + "<span class='note'>F</span>";
					break;
				}			
			}
			
			for(y=0;y<ans.length;y++){
				proc(ans[y],y);
			}
			
			//显示答案
			for(z=0,w=65;z<ans.length;z++,w++){
				s = String.fromCharCode(w);
				prod = list.getElementsByClassName("aframe")[0].innerHTML;
				list.getElementsByClassName("aframe")[0].innerHTML = prod + "<div onclick='judge(this)'><input type='" + opt + "' name='" + type + x + "'/>" + "<label>" + s + "</label>" + "." + ans[z] + "</div>";
			}
			
			//出题完毕，删除题库中对应题目
			var _element = trassm[transval];
			var _parentNode = _element.parentNode;
			_parentNode.removeChild(_element);
			
			//获取题目框架
			var frame = list.innerHTML;
			eval("var " + type + "paper = " + type + ".innerHTML");
			
			//试卷扩增
			if(type == "sing"){
				document.getElementById("sing").innerHTML = singpaper + "<div class='session'>" + frame + "</div>";
			}else if(type == "plur"){
				document.getElementById("plur").innerHTML = plurpaper + "<div class='session'>" + frame + "</div>";
			}
			
			//扩增完成，清空aframe
			list.getElementsByClassName("aframe")[0].innerHTML = "";
		}
	}
	chain("sing",orin,"单","radio");
	
	want = document.getElementsByClassName("sum")[1].value;
	
	//写入
	pre.innerHTML = frm.innerHTML;
	chain("plur",orgl,"多","checkbox");
	
	want = document.getElementsByClassName("sum")[2].value;
	//Ｂ型题写入
	pre.innerHTML = btp.innerHTML;
	
		for(x=0;x<want;x++){
			if(want>srce){
				alert("呃，贝壳君没准备这么多Ｂ型题哦");
				break;
			}
			
			//再提取并获取参数
			trassm = pre.getElementsByTagName("tr");
			
			//题目数量
			var tot = trassm.length;
			
			//取题，产生在[1,tot]的随机数
			var select = Math.floor ( Math.random() * tot + 1 );
			var transval = select - 1 ;
			var tdassm = trassm[transval].getElementsByTagName("td");
			
			//撷取备选项
			var ans = new Array();
			for(u=0;u<5;u++){
				//筛选出非空备选项
				if(tdassm[u].innerText.trim() != "")
				{
					ans[ans.length] = tdassm[u].innerText;
				}
			}
			
			//对备选项进行洗牌
			function shuffle(arr){
				for (var i = arr.length-1; i >=0; i--) {
					var randomIndex = Math.floor(Math.random()*(i+1)); 
					var itemAtIndex = arr[randomIndex]; 
					arr[randomIndex] = arr[i]; 
					arr[i] = itemAtIndex;
				}
				return arr;
			}
			
			ans = shuffle(ans);
			
			//撷取问题
			var que = new Array();
			for(v=5 ; v < tdassm.length; v += 2)
			{
				//筛选出非空问题
				if(tdassm[v].innerText.trim() != "")
				{
					que[que.length] = tdassm[v].innerText;
				}
			}
			
			//对问题进行洗牌
				//需要标记备选项的原始标记
				//问题需要带上原始标记
				//由问题处的label选项导航到备选项，然后开始比对问题和备选项两者的原始标记，如果匹配，则选择正确
			
			//显示问题
			//题号
			var sec = x + 1 ;
			
			biao.getElementsByClassName("q")[0].innerHTML = sec + "." + tdassm[0].innerHTML;
			
			//处理答案
			function proc(str,y){
				str = str.trim();
				var tag = str.substring(str.length-1);
				var prod = str.substring(0,str.length-1);
				
				switch(tag)
				{
					case "+":
					ans[y] = prod + "<span class='note'>T</span>";
					break;
					case "-":
					ans[y] = prod + "<span class='note'>F</span>";
					break;
					case "T":
					ans[y] = prod + "<span class='note'>T</span>";
					break;
					default:
					ans[y] = prod + tag + "<span class='note'>F</span>";
					break;
				}			
			}
			
			for(y=0;y<ans.length;y++){
				proc(ans[y],y);
			}
			
			//显示答案
			for(z=0,w=65;z<ans.length;z++,w++){
				s = String.fromCharCode(w);
				prod = list.getElementsByClassName("aframe")[0].innerHTML;
				list.getElementsByClassName("aframe")[0].innerHTML = prod + "<div onclick='judge(this)'><input type='" + opt + "' name='" + type + x + "'/>" + "<label>" + s + "</label>" + "." + ans[z] + "</div>";
			}
			
			//出题完毕，删除题库中对应题目
			var _element = trassm[transval];
			var _parentNode = _element.parentNode;
			_parentNode.removeChild(_element);
			
			//获取题目框架
			var frame = list.innerHTML;
			eval("var " + type + "paper = " + type + ".innerHTML");
			
			//试卷扩增
			if(type == "sing"){
				document.getElementById("sing").innerHTML = singpaper + "<div class='session'>" + frame + "</div>";
			}else if(type == "plur"){
				document.getElementById("plur").innerHTML = plurpaper + "<div class='session'>" + frame + "</div>";
			}
			
			//扩增完成，清空aframe
			list.getElementsByClassName("aframe")[0].innerHTML = "";
		}
}

function judge(an){
	an.getElementsByTagName("input")[0].checked = true;
	
	//多选题长条选定染色风格
	if(an.parentNode.parentNode.parentNode.id != "sing"){
		if(an.style.background == ""){
			an.style.background = "blue";
			an.style.color = "white";
		}else{
			an.style.background = "";
			an.style.color = "";
			an.getElementsByTagName("input")[0].checked =false;
		}
	}else{
		superior = an.parentNode.getElementsByTagName("div");
		for(o=0;o<superior.length;o++){
			superior[o].style.background = "";
			superior[o].style.color = "";
		}
		an.style.background = "blue";
		an.style.color = "white";
	}
}

function gai(){
	//初始化分数与正确率
	score.value = 0;
	rate.value = "";
	//初始化星探
	corlection = new Array();
	shington = new Array();
	inferior = new Array();

	//所有单选题选项
	corlection = sing.getElementsByTagName("span");
	inferior = sing.getElementsByTagName("input");

	for(z=0;z<corlection.length;z++){
		if(corlection[z].innerHTML == "T"){
			if(inferior[z].checked == true){
				score.value = Number(score.value) + 5 ;
			}else{
				corlection[z].parentNode.style.background = "green";
				corlection[z].parentNode.style.color = "white";
			}
		}else if(inferior[z].checked == true){
			corlection[z].parentNode.style.background = "red";
			corlection[z].parentNode.style.color = "white";
		}
	}

	shington = plur.getElementsByClassName("session");
	for(m=0;m<shington.length;m++){
		var forcount = shington[m].getElementsByTagName("span");
		//本题有多少正确答案？
		var howmanyr = 0;

		//有多少正确答案和错误答案被选中？
		var whichr = 0;
		var whichw = 0;
		for(n=0;n<forcount.length;n++){
			if(forcount[n].innerHTML == "T"){
				if(forcount[n].parentNode.getElementsByTagName("input")[0].checked == true){
					whichr++;
				}else{
					forcount[n].parentNode.style.background = "green";
					forcount[n].parentNode.style.color = "white";
				}
				howmanyr++;
			}else{
				if(forcount[n].parentNode.getElementsByTagName("input")[0].checked == true){
					forcount[n].parentNode.style.background = "red";
					forcount[n].parentNode.style.color = "white";
				}
				whichw++;
			}
		}

		if(whichr == howmanyr && whichw == 0){
			score.value = Number(score.value) + 5 ;
		}
	}
	
	rate.value = Number(score.value) / ( tstp.getElementsByClassName("session").length * 5 ) * 100;
	rate.value = Number(rate.value).toFixed(2) + "%" ;
}

function debut(para){
	var lis = new Array();
	lis = para.parentNode.getElementsByTagName("li");
	if(lis[0].style.display == ""){
		for(i=0;i<lis.length;i++){
			lis[i].style.display = "block";
		}
		
	}else{
		for(i=0;i<lis.length;i++){
			lis[i].style.display = "";
		}
	}
}

/*
function qstr(){
	var qop = document.getElementsByClassName("gn-submenu");
	var colleqop = new Array();
	
	//收集所有可选题库
	for(i=1;i<qop.length;i++){
		for(j=0;j<qop[i].getElementsByClassName("gn-icon").length;j++){
			colleqop[colleqop.length] = qop[i].getElementsByClassName("gn-icon")[j];
		}
	}
	
	
	if(whatyc.innerText == "　无　"){
		//未选定范围时执行，随机选择一个题库
		var rndmz = Math.floor(Math.random() * colleqop.length);
		colleqop[rndmz].onclick();
		
		//初始化
		document.getElementsByClassName("sum")[0].value = 0;
		document.getElementsByClassName("sum")[1].value = 0;
		
		//出单选还是多选？	
		var sop = Math.floor(Math.random() *2) ;
		if(sop == 0){
			document.getElementsByClassName("sum")[0].value = 1;		
		}else if(sop == 1){
			document.getElementsByClassName("sum")[1].value = 1;		
		}
		init();
		whatyc.innerHTML = "　无　";
	}else {
		//获得whatyc innerText
		var where = whatyc.innerText;
		
		//找出是哪个题库
		for(i=0;i<colleqop.length;i++){
			if(colleqop[i] == where){
				colleqop[i].click();
				break;
			}
		}
		
		document.getElementsByClassName("sum")[0].value = 0;
		document.getElementsByClassName("sum")[1].value = 0;
		
		//出单选还是多选？	
		var sop = Math.floor(Math.random() *2) ;
		if(sop == 0){
			document.getElementsByClassName("sum")[0].value = 1;		
		}else if(sop == 1){
			document.getElementsByClassName("sum")[1].value = 1;		
		}
		init();
	}
}
*/