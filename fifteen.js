window.onload = function()
{

//.......Assign Variables along with creating blank div.


	var gameBoard = $("puzzlearea");
	var puzzleDivs = gameBoard.getElementsByTagName("div");
	var shuffleUp = $("shufflebutton");
	
	var blankDiv = document.createElement("div");
	blankDiv.id = "blank";
	gameBoard.appendChild(blankDiv);
	
	var blankspace = $("blank");
	blankspace.style.backgroundImage = "none";
	blankspace.style.borderColor = "transparent";
	

//.......Adding puzzle piece to each div.

	for (var i=0; i < puzzleDivs.length; i++) 
	{
		puzzleDivs[i].addClassName("puzzlepiece");
		puzzleDivs[i].style.position='relative';
		puzzleDivs[i].style.display='inline-block';
	}

	var nCoord = 0;
		for(var g = 0; g <= 300; g+=100)
			{
					for(var q = 0; q <= 300; q+=100)
							{
									var y=g;
									var x=q;

									puzzleDivs[nCoord].style.backgroundPosition = x + "px" + " " + y + "px";
									nCoord++;
							}
			}



	for (var i = 0; i < puzzleDivs.length; i++) 
	{
		var nextSib = puzzleDivs[i].nextSibling;
		var addOne= puzzleDivs[i+1];
		gameBoard.replaceChild(addOne,nextSib);
	}

//.......shuffle button.

	for (var i = 0; i < puzzleDivs.length; i++) 
	{
		
		puzzleDivs[i].onmouseover = hover;
		puzzleDivs[i].onclick = swop;
	}
	shuffleUp.onclick = shuffle;



	for (var i = 0; i <3; i++) 
	{
		var space = document.createElement("br");
		gameBoard.appendChild(space);
	}


var option = document.createElement("select");
 option.setAttribute("id", "list");
 var optionlist = ["one", "two", "three", "four","five"];
 var optiontext = ["Blank","AlleBerry", "Bird", "Flower", "Plane"];
 for (var i = 0; i < optionlist.length; i++) 
 {
  optionlist[i] = document.createElement("option");
  optionlist[i].text = optiontext[i];
 }
 for (var k = 0; k < optionlist.length; k++) 
 {
  option.appendChild(optionlist[k]);
 }

var box = $("controls");
 box.appendChild(option);
 


};



function movableTile(c)
{
	var blank = document.getElementById("blank");
	var previousBlank = blank.previousSibling;
	var nextBlank = blank.nextSibling;
	
	if (c.isSameNode(previousBlank)) 
	{
		return true;
	}
	else if(c.isSameNode(nextBlank))
	{
		return true;
	}
	else
	{
		
		var tileAbove = blank.previousSibling.previousSibling.previousSibling.previousSibling;
			
		if (tileAbove !== null) 
		{
			if (c.isSameNode(tileAbove))
			{
				return true;
			}
		}

		var tileBelow = blank.nextSibling.nextSibling.nextSibling.nextSibling;
			
		if (tileBelow !== null) 
		{
			if (c.isSameNode(tileBelow)) 
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}
}



function swop()
{
	var blankspace = document.getElementById("blank");
	var gameBoard = $("puzzlearea");
	
	if (movableTile(this)) 
	{
	
		
	
		var nextTile = this.nextSibling;
		var nextBlank = blankspace.nextSibling;
		gameBoard.insertBefore(blankspace,nextTile);
		gameBoard.insertBefore(this,nextBlank);
	}	
}



function shuffle()
{
	var puzzArea = document.getElementById("puzzlearea");
	var blank = document.getElementById("blank");
	var puzzlepieces = puzzArea.getElementsByTagName("div");
	for (var i = 0; i <200; i++) 
	{
		var ran = Math.floor(Math.random()*14);
		var rantile = puzzlepieces[ran];
		if (movableTile(rantile)) 
		{
			var rtnext = rantile.nextSibling;
			var nextBlank = blank.nextSibling;
			puzzArea.insertBefore(blank,rtnext);
			puzzArea.insertBefore(rantile,nextBlank);
		}
    }
}


function hover()
{
	var blankspace = document.getElementById("blank");
	var neighbors = [];

	if(movableTile(this))
	{
		var leftTile = this.previousSibling;
		var rightTile = this.nextSibling;
		var topTile = leftTile;
		var tileBelow = rightTile;
		topTile = topTile.previousSibling.previousSibling.previousSibling;
		tileBelow = tileBelow.nextSibling.nextSibling.nextSibling;
		
		neighbors.push(leftTile,rightTile,topTile,tileBelow);

		for(var i = 0; i < neighbors.length;i++)
		{
			if(neighbors[i] == blankspace){
			this.addClassName('movablepiece');
			}
		}
		
	}
	else
	{
		var puzzleDivs = $$("div#overall div#puzzlearea div");
		for (var i=0; i < puzzleDivs.length; i++) 
		{
			this.removeClassName('movablepiece');
		}	
	}
}




