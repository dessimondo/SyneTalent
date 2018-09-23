params = getParams();
id = unescape(params["id"]);
var key = id;

var obj, dbParam, xmlhttp, myObj, x, y, skillset, hist, txt = "";
obj = { table: "profile", limit: 20 };
dbParam = JSON.stringify(obj);
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        for (x in myObj) {
            if (myObj[x].ID == key) {
              var startDate = new Date("1 " + myObj[x].Experience);
              var today = new Date();
              var diff = Date.daysBetween(startDate, today);
              var exp = diff<1 ? "< 1 year" : diff + "+ years";
              
              document.getElementById("status").classList = ("image " + myObj[x].Status + "");
              document.getElementById("thumbnail").src = "images/" + key + ".jpg";
              document.getElementById("hero").setAttribute("style", "background-image: url('images/" + myObj[x].Country + ".jpg');");
              document.getElementById("name").innerHTML = myObj[x].Name.Full;
              document.getElementById("designation").innerHTML = myObj[x].Designation;
              document.getElementById("country").innerHTML = myObj[x].Citizenship;
              document.getElementById("location").innerHTML = myObj[x].Location[0];
              document.getElementById("account").innerHTML = myObj[x].Account;
              document.getElementById("bio").innerHTML = myObj[x].Bio;
              document.getElementById("experience").innerHTML = exp;
              document.getElementById("experience").classList = ("exp-box hvr-grow");
              document.getElementById("fb").href = myObj[x]["Social Media"].Facebook;
              document.getElementById("tweet").href = myObj[x]["Social Media"].Twitter;
              document.getElementById("linkedin").href = myObj[x]["Social Media"].Linkedin;
              document.getElementById("google").href = myObj[x]["Social Media"].Google;
              document.getElementById("git").href = myObj[x]["Social Media"].Github;
              
              hist = myObj[x]["Project History"];
              proj = document.getElementById("project");
              txt = "<table class=\"table\"><thead><tr><th></th><th>Projects</th><th>Start</th><th>End</th></tr></thead>";
              txt += "<tbody>";
              for (y in hist) {
                txt = txt + "<tr><td><img class=\"hvr-grow\" src=\"images/"
                + hist[y].Logo + "\"></td><td>"
                +  hist[y].Name +  "</td><td>"
                +  hist[y].Start +  "</td><td>"
                +  hist[y].End +  "</td></tr>";
              }
              proj.innerHTML = txt + "</tbody></table>";

              skillset = myObj[x].Skills;
              skill = document.getElementById("skillcloud");
              skill.innerHTML = "";
              for (z in skillset) {
                skill.innerHTML +=  "<div class=\"hvr-grow\">" + skillset[z] + "</div>";
              }

              document.getElementById("manager").innerHTML = myObj[x]["Reporting Manager"].Name;
              document.getElementById("email").href = "mailto:" + myObj[x]["Reporting Manager"].Email;
              break; 
            }                                                     
        }
    }
};
xmlhttp.open("GET", "data.json", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("x=" + dbParam);