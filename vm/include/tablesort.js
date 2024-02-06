/*
Table Sorter v2.1
Adds bi-directional sorting to table columns.
Copyright (C) 2005 Digital Routes, Scotland
Copyright (C) 2007 Neil Fraser, California
http://neil.fraser.name/software/tablesort/

This program is free software you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License (www.gnu.org) for more details.

Include on your page:
  <SCRIPT LANGUAGE='JavaScript1.2' SRC='tablesort.js'></SCRIPT>
*/


// Namespace object.
var TableSort = {};


// Default text values for the arrows.  Override these with custom image tags.
TableSort.arrowNone = "";
TableSort.arrowUp = " <img STYLE='margin-left:3px;' height=10 width=10 src='../image/srtDown.gif' >";
TableSort.arrowDown = " <img STYLE='margin-left:3px;' height=10 width=10 src='../image/srtUp.gif' >";

// List of all the tables
TableSort.tables = [];

// Upon which column was the table sorted last time.  -=up, +=down
TableSort.lastSort = [];


// When the page finishes loading, add initialise all tables.
// Preserve any existing onload function.
if (window.onload) {
  TableSort.oldOnload = window.onload;
}
// Set a new onload function.
window.onload = function() {
  TableSort.init();
  if (TableSort.oldOnload) {
    TableSort.oldOnload();
  }
}


// Make one, several or all tables sortable.
// Call this function with the ID(s) of any tables which are created
// with DTHML after the page has loaded.
TableSort.init = function() {
  if (navigator.appName == "Microsoft Internet Explorer" &&
      navigator.platform.indexOf("Mac") == 0) {
    // The Mac version of MSIE is way too buggy to deal with.
    return;
  }
  if (arguments.length == 0) {
    // Locate all the document's tables.
    var tableNodeList = document.getElementsByTagName('TABLE');
    for (var x = 0; x < tableNodeList.length; x++) {
      TableSort.tables.push(tableNodeList[x]);
      TableSort.initTable(x);
    }
  } else {
    // Initialise only the specified tables.
    var table;
    for (var x = 0; x < arguments.length; x++) {
      table = document.getElementById(arguments[x]);
      if (table) {
        TableSort.tables.push(table);
        TableSort.initTable(TableSort.tables.length - 1);
      }
    }
  }
}


// Turn all the header/footer cells of one table into sorting links.
TableSort.initTable = function(t) {
  var table = TableSort.tables[t];
  if (table.tHead) {
    for (var y = 0; y < table.tHead.rows.length; y++) {
      for (var x = 0; x < table.tHead.rows[y].cells.length; x++) {
        TableSort.linkCell(table.tHead.rows[y].cells[x], t, x, y);
      }
    }
  }
  if (table.tFoot) {
    for (y = 0; y < table.tFoot.rows.length; y++) {
      for (x = 0; x < table.tFoot.rows[y].cells.length; x++) {
        TableSort.linkCell(table.tFoot.rows[y].cells[x], t, x, y);
      }
    }
  }
  TableSort.lastSort[t] = 0;
}


// Turn one header/footer cell into a sorting link.
// ヘッダの初期化
TableSort.linkCell = function(cell, t, x, y) {
  if (TableSort.getLabel(cell)) {
    var link = document.createElement('SPAN');
//    link.href = "#Sort_" + t + "_" + x;
		link.id = "H"+x;
		link.style.color = "#0000FF";
		link.style.cursor = "pointer";
	_wcell = escape(TableSort.getLabel(cell));
	if( _wcell=="case" || _wcell=="num" ) {
		link.style.borderBottom = "1px dashed #0000FF";
	}
	if( _wcell!="chk" ) {
	    link.onclick = new Function("TableSort.click(" + t + ", " + x + ", \"" + escape(TableSort.getLabel(cell)) + "\"); return false");
	}
    cell.appendChild(link);
    for (var c = 0; c < cell.childNodes.length - 1; c++) {
      link.appendChild(cell.childNodes[c]);
    }
    // Add an element where the sorting arrows will go.
    var arrow = document.createElement('SPAN');
    arrow.innerHTML = TableSort.arrowNone;
    arrow.name = "TableSort_" + t + "_" + x + "_" + y;
	arrow.onclick = link.onclick;
	arrow.style.cursor = "pointer";
    cell.appendChild(arrow);
  }
}


// Return the 'label' attribute for a cell.
// Opera won't let us make up novel attribute names,
// so 'label' is picked because it is obscure.
TableSort.getLabel = function(cell) {
  var str;
  if (window.opera) {
    // Opera 7 & 8 have a bug with getAttribute,
    // so this is an ugly hack to sidestep it.
    var m = cell.outerHTML.match(/^<[^>]+LABEL=['"]*([^'" ]+)['"]*/i);
    str = m ? m[1] : "";
  } else {
    str = cell.getAttribute('label');
  }
  return str ? str.toLowerCase() : '';
}

var mode2 = "";
// Sort the rows in this table by the specified column.
TableSort.click = function(table, column, mode) {
  if( mode=="chk" ) {
	return;
  }
  mode2 = mode;
  if (!mode.match(/^[_a-z0-9]+$/)) {
    alert("Illegal sorting mode type.");
    return;
  }
  if( mode=="img" ) {
	mode = "case"
  }
  var compareFunction = eval("TableSort.compare_" + mode);
  if (typeof compareFunction != "function") {
    alert("Unknown sorting mode: " + mode);
    return;
  }
  // Determine and record the direction.
  var reverse = true;
  if (Math.abs(TableSort.lastSort[table]) == column + 1) {
    reverse = TableSort.lastSort[table] <= 0;
    TableSort.lastSort[table] = -TableSort.lastSort[table];
  } else {
    TableSort.lastSort[table] = column+1;
  }
  // Display the correct arrows on every header/footer cell.
  var spans = document.getElementsByTagName('SPAN');
  var spanprefix1 = "TableSort_" + table + "_";
  var spanprefix2 = "TableSort_" + table + "_" + column;
  for (var s = 0; s < spans.length; s++) {
    if (spans[s].name && spans[s].name.substring(0, spanprefix1.length) ==
        spanprefix1) {
      if( mode2!="img" && spans[s].name.substring(0, spanprefix2.length) == spanprefix2) {
        if (TableSort.lastSort[table] > 0) {
          spans[s].innerHTML = TableSort.arrowUp;
        } else {
          spans[s].innerHTML = TableSort.arrowDown;
        }
      } else {
        spans[s].innerHTML = TableSort.arrowNone;
      }
    }
  }
  // Fetch the table's data and store it in a dictionary (assoc array).
  if (TableSort.tables[table].tBodies.length < 1) {
    return; // No data in table.
  }
  var tablebody = TableSort.tables[table].tBodies[0];
  var cellDictionary = [];
  var cell;
  for (var y = 0; y < tablebody.rows.length; y++) {
    if (tablebody.rows[y].cells.length > 0) {
      cell = tablebody.rows[y].cells[column];
    } else { // Dodge Safari 1.0.3 bug
      cell = tablebody.rows[y].childNodes[column];
    }
    // タイプがNUMの場合は、数字以外の文字を除去
	if( mode == "num" ) {
	    cellDictionary[y] = [toFlatData(TableSort.dom2txt(cell)), tablebody.rows[y]];
	 } else {
	    cellDictionary[y] = [TableSort.dom2txt(cell), tablebody.rows[y]];
	}
  }
  // Sort the dictionary.
  cellDictionary.sort(compareFunction);
  // Rebuild the table with the new order.
  var i;
  for (y = 0; y < cellDictionary.length; y++) {
    i = reverse ? (cellDictionary.length - 1 - y) : y;
    tablebody.appendChild(cellDictionary[i][1]);
	// 行をストライプにします。
	if( i%2==0 ) {
		cellDictionary[i][1].style.backgroundColor = "#dce4ef";
	} else {
		cellDictionary[i][1].style.backgroundColor = "#ffffff";
	}
  }
  if (window.opera) {
    // Opera needs to rerender the last row due to a redraw bug.
    setTimeout(function() {
      // This is a closure.
      tablebody.appendChild(tablebody.removeChild(
          tablebody.rows[tablebody.rows.length - 1]));
    }, 1);
  }
}


// Recursively build a plain-text version of a DOM structure.
// Bug: whitespace isn't always correct, but shouldn't matter for tablesort.
TableSort.dom2txt = function(obj) {
  var text = "";
  if (!obj) {
    return "";
  }
  if (obj.nodeType == 3) {
    text = obj.data;
  } else {
    for (var x = 0; x < obj.childNodes.length; x++) {
      if( mode2=="img" ) {
        if( obj.childNodes[0].src ) {
      	  text += obj.childNodes[0].src;
        }
      } else {
        text += TableSort.dom2txt(obj.childNodes[x]);
      }
    }
  }
  return text;
}


// Case-sensitive sorting.
// Compare two dictionary structures and indicate which is larger.
TableSort.compare_case = function(a, b) {
  if (a[0] == b[0]) {
    return 0;
  }
  return (a[0] > b[0]) ? 1 : -1;
}


// Case-insensitive sorting.
// Compare two dictionary structures and indicate which is larger.
TableSort.compare_nocase = function(a, b) {
  var aLower = a[0].toLowerCase();
  var bLower = b[0].toLowerCase();
  if (aLower == bLower) {
    return 0;
  }
  return (aLower > bLower) ? 1 : -1;
}


// Numeric sorting.
// Compare two dictionary structures and indicate which is larger.
TableSort.compare_num = function(a, b) {
  var aNum = parseFloat(a[0]);
  if (isNaN(aNum)) {
    aNum = -Number.MAX_VALUE;
  }
  var bNum = parseFloat(b[0]);
  if (isNaN(bNum)) {
    bNum = -Number.MAX_VALUE;
  }
  if (aNum == bNum) {
    return 0;
  }
  return (aNum > bNum) ? 1 : -1;
}

function toFlatData(str) {
	var ret = "";
	var w = "";
	for(var i=0; i<str.length; i++) {
		w =  str.substr(i,1);
		if( w.match(/[0123456789.]/) ) {
			ret = ret + w;
		}
	}
	return ret;
}
