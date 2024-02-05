/* 
  #accountchecker
*/

function getAccount(){
    var loggedin = sessionStorage.getItem("checkiflogged");
    if(loggedin === "true")
    {
      document.getElementById("acc-name").innerHTML = "Hi, " + sessionStorage.getItem("name");
      document.getElementById("signinout").innerHTML = "Log Out";
      return true;
    }
    else{
      document.getElementById("acc-name").innerHTML = "Hi, Guest";
      document.getElementById("signinout").innerHTML = "Log In";
      window.alert("You are not logged in");
      return false;
    }
  }

  getAccount();
  