    params = getParams();
    var key, locationkey, desigkey, acctkey, expkey, statuskey;
    query = decodeURI(params["query"]);
    query = query.split("+").join(" ");
    if (query == "undefined") { 
        key = ''; 
    } else {
        key = query.toLowerCase();    
    }
    locationkey = unescape(params["location"]);
    skillkey = unescape(params["skillset"]);
    desigkey = unescape(params["designation"]);
    acctkey = unescape(params["acct"]);
    expkey = unescape(params["exp"]);
    statuskey = unescape(params["status"]);

    var listing = document.getElementById("listing");
    var card1 = "<div class=\"col-md-6 col-lg-4\"><div class=\"block-profilecard\"><div class=\"flag-bg d-none d-md-block\"><img src=\"images/";
    var card2 = ".jpg\" alt=\"flag\"></div><div class=\"vcard\"><div class=\"d-flex\"><div class=\"image ";
    var card3 = "\"><img src=\"images/";
    var card4 = ".jpg\" alt=\"Person here\"><div class=\"status\"></div></div><div class=\"name-text\"><h2 class=\"heading\">";
    var card5 ="</h2><span class=\"meta\">";
    var card6 = "</span><div class=\"details row\"><div class=\"col-6\"><div class=\"row\"><div class=\"col-3 col-md-12 icon\"><i class=\"icon-map-marker\"></i></div><div class=\"col-8 col-md-12 text\">";
    var card7 = "</div></div></div><div class=\"col-6\"><div class=\"row\"><div class=\"col-3 col-md-12 icon\"><i class=\"icon-list\"></i></div><div id=\"skillset\" class=\"col-8 col-md-12 text\">";
    var card8 = "</div></div></div></div></div></div><button class=\"btn btn-secondary btn-block\" type=\"button\" onclick=\"location.href=\'profile?id=";
    var card9 ="\'\">View</button></div></div></div>";
    var obj, dbParam, xmlhttp, myObj, x;
    var namestr, printstr, desigstr, skillstr1, skillstr2, locationstr, acctstr, expstr, statstr;
    var matchcount = 0;
    var today = new Date();
    obj = { table: "search" };
    dbParam = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            for (x in myObj) {
                namestr = myObj[x].Name.Full.toLowerCase();
                desigstr = myObj[x].Designation.toLowerCase();
                skillstr1 = myObj[x].Skillset[0].toLowerCase();
                skillstr2 = myObj[x].Skillset[1].toLowerCase();
                locationstr = myObj[x].Location[1];
                acctstr = myObj[x].Account;
                var startDate = new Date("1 " + myObj[x].Experience);
                var exp = Date.daysBetween(startDate, today);
                if (exp > 5) {
                    expstr = "sr";
                } else if (exp > 2) {
                    expstr = "md";
                } else {
                    expstr = "jr";
                }
                statstr = myObj[x].Status;
                if (namestr.includes(key)||desigstr.includes(key)||skillstr1.includes(key)||skillstr2.match(key)) {
                    if (locationkey != "undefined" && !locationstr.match(locationkey)) { continue; }
                    if (desigkey != "undefined" && !desigstr.includes(desigkey)) { continue; }
                    if (skillkey != "undefined" && !skillstr2.match(skillkey)) { continue; }
                    if (acctkey != "undefined" && !acctstr.match(acctkey)) { continue; }
                    if (expkey != "undefined" && !expstr.match(expkey)) { continue; }
                    if (statuskey != "undefined" && !statstr.match(statuskey)) { continue; }
                    printstr = card1 + myObj[x].Country + card2 + myObj[x].Status + card3 + myObj[x].ID + card4 + myObj[x].Name.Alias + card5 + myObj[x].Designation + card6 + myObj[x].Location[0] + card7 + myObj[x].Skillset[0] + card8 + myObj[x].ID + card9;
                    listing.innerHTML += printstr;
                    matchcount++;
                }                                                     
            }
            if (matchcount == 1) {
                document.getElementById("records").innerText = matchcount + " record found";
            } else if (matchcount > 1) {
                document.getElementById("records").innerText = matchcount + " records found";
            } else {
                document.getElementById("records").innerText = "No records found";
            }
            if (key != '') {
                document.getElementById("records").innerText += " for \'" + query + "\'";
            }
        }
    };
    xmlhttp.open("GET", "BU_Report_28082018.json", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + dbParam);
