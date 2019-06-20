function showclose() {
  var x = document.getElementById("widgetbody");
  if (x.style.display === "block") {
    x.style.display = "none";
     clearform();
     minimize();
  } else {
    x.style.display = "block";
    clearform();
    maximize();
  }
}

function maximize(){
  document.getElementById("maximize").style.display="block";
  document.getElementById("minimize").style.display="none";
}
function minimize(){
  document.getElementById("maximize").style.display="none";
  document.getElementById("minimize").style.display="block";
}

function clearform(){
  document.getElementById("name").value="";
  document.getElementById("errorname").innerHTML="&nbsp;";
  document.getElementById("phone").value="";
  document.getElementById("errorphone").innerHTML="&nbsp;";
  document.getElementById("comment").value="";
  document.getElementById("errorcomment").innerHTML="&nbsp;";
}

function callnow(){
  validate();
  if(validate()==0)
  {
      saveCall();
  }
  //console.log(validate());
}

function saveCall(){
                var request = new XMLHttpRequest();
                var url = "saveCall.txt";
                request.open("POST", url, true);
                request.setRequestHeader("Content-Type", "application/json");
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                         window.alert("Thanks We Will call you..!!");
                         document.getElementById("btncallnow").disabled = false;
                         document.getElementById("loader").style.display="none";
                    }
                    else {
                        document.getElementById("loader").style.display="block";
                        document.getElementById("btncallnow").disabled = true;
                    }
                };
                var name = document.getElementById("name").value;
                var phone = document.getElementById("phone").value;
                var content = document.getElementById("content").value;
                var comment = document.getElementById("comment").value;
                var data = JSON.stringify({"name": name, "phone": phone, "content": content, "comment": comment});
                request.send(data);
}

function validate(){
  var er=0;
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var content = document.getElementById("content").value;
  var comment = document.getElementById("comment").value;
  if(name==''){
     document.getElementById("errorname").innerHTML="Your Name still empty..!!";
     er=1;
  }
  else {
    document.getElementById("errorname").innerHTML="&nbsp;";
    er=0;
  }

  if(phone==''){
     document.getElementById("errorphone").innerHTML="Phone number still empty..!!";
     er=1;
  }
  else {
    document.getElementById("errorphone").innerHTML="&nbsp;";
    er=0;
  }

  if(content==''){
     document.getElementById("errorcontent").innerHTML="Content still empty..!!";
     er=1;
  }
  else {
    document.getElementById("errorcontent").innerHTML="&nbsp;";
    er=0;
  }

  if(comment==''){
     document.getElementById("errorcomment").innerHTML="Comments still empty..!!";
     er=1;
  }
  else {
    document.getElementById("errorcomment").innerHTML="&nbsp;";
    er=0;
  }
  return er;
}
