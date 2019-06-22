$(document).ready(function(){
kiosk ({"vertical":"widgetleft", "horizontal": "widgetright", "name":1, "phone":1});
      $("#phone").keypress(function(data){
           if(data.which!=8 && data.which!=0 && (data.which<48 || data.which>57))
           {
               return false;
           }
       });
});


function callnow(){
  if(validate()==0)
  {
    var phone=$('#phone').val();
    var phonevalid=phone.replace("+","");
    var validphone = phonevalid.replace(/ /g,"");
      if(phone.length>5)
      {
        var access_key = 'c75b2f03dd8e1380b4ad84fc134f19d8';
        $.ajax({
        url: "http://apilayer.net/api/validate?access_key="+access_key+"&number="+validphone+"& country_code=&format=1",
        type: "GET",
        dataType: "json",
        success: function(data) {
            var valid = data.valid;
              if(valid==false)
              {
                $('#errorphone').text("Phone Number not valid..!!");
              }
              else {
                $('#errorphone').html("&nbsp;");
                saveCall();
              }
        },
        error:function(er){
            $('#errorphone').text("Sori Error Server..!!");
        }
        });
      }
  }
}

function saveCall(){
  var yourname=$('#name').val();
  var phone=$('#phone').val();
  var phonevalid=phone.replace("+","");
  var validphone = phonevalid.replace(/ /g,"");
  $.post("saveCall.txt", {
      yourname: yourname,
      validphone: validphone
  }, function (data) {
      if(data=='success'){
          alert("Thanks ... You will receive a call soon...");
      }
      else {
          alert("Sori... Connection issue...!!");
      }
  });
}

function validate(){
  var er=0;
  var yourname=$('#name').val();
  var phone=$('#phone').val();
  var phonevalid=phone.replace("+","");
  var validphone = phonevalid.replace(/ /g,"");

  if(yourname=="")
  {
    $('#errorname').text("Your Name still empty..!!");
    er=1;
  }
  else {
    $('#errorname').html("");
    er=0;
  }

  if(phone=="")
  {
    $('#errorphone').text("Phone still empty..!!");
    er=1;
  }
  else {
    $('#errorphone').html("&nbsp;");
    er=0;
  }

  if(phone.length<6)
  {
    $('#errorphone').text("Phone Character not valid..!!");
    er=1;
  }
  else {
    $('#errorphone').html("&nbsp;");
    er=0;
  }
   return er;
}

function showclose(){
  $('#widgetbody').slideToggle(200, function(){
   if($('#widgetbody').is(':visible')){
     $("#maximize").css("display", "block");
     $("#minimize").css("display", "none");
   } else {
     $("#maximize").css("display", "none");
     $("#minimize").css("display", "block");
   }
});
}
function kiosk(gb){
  $('#widget').addClass(gb.horizontal);
  $('#widget').append('<div align="center" id="headwidget">'+
                      '<div id="maximize">'+
                      '<div class="col-10" align="left">'+
                      '<strong><span class="fontsize14 fontyellow">DO YOU WANT A CALLBACK ?</span></strong><br>'+
                      '<span class="fontsize9">Please give us your details and we will get back to you</span>'+
                      '</div><div class="col-2"><a href="#" onclick="showclose()" class="widgetclosbutton">'+
                      '<img src="./images/close.png"></a></div></div>'+
                      '<div id="minimize">'+
                      '<div class="col-10" align="right" style="padding-top:5px;">'+
                      '<strong><img id="logocall" src="./images/logocolor.png"> Click here to get a call back &rsaquo;&rsaquo;</strong>'+
                      '</div><div class="col-2"><a href="#" onclick="showclose()" class="widgetclosbutton"><img src="./images/call.png"></a>'+
                      '</div></div><div class="col-clear"></div></div>'+
                      '<div id="widgetbody">'+
                          '<div class="widgetform">'+
                          '<div class="errortext" id="errorname">&nbsp;</div>'+
                              '<input type="text" id="name" placeholder="Your Name">'+
                              '<span class="errortext" id="errorphone">&nbsp;</span>'+
                              '<div id="flagphone">'+
                              '    <div id="flagimage">'+
                              '        <div><a href="#" onclick="phoneflag(\'+62\')"><img src="./images/flag/+62.png"></a></div>'+
                              '        <div><a href="#" onclick="phoneflag(\'+65\')"><img src="./images/flag/+65.png"></a></div>'+
                              '        <div><a href="#" onclick="phoneflag(\'+66\')"><img src="./images/flag/+66.png"></a></div>'+
                              '        <div><a href="#" onclick="phoneflag(\'+63\')"><img src="./images/flag/+63.png"></a></div>'+
                              '        <div><a href="#" onclick="phoneflag(\'+60\')"><img src="./images/flag/+60.png"></a></div>'+
                              '    </div>'+
                              '    <a href="#" onclick="displayflag()"><div><img id="flagicon" src="./images/flag/+62.png"></div></a>'+
                              '    <input type="text" id="phone" value="+62">'+
                              '    <div class="col-clear"></div>'+
                              '</div>'+
                              '<span class="errortext">&nbsp;</span>'+
                              '<div class="widgetbuttonschedule" align="center">'+
                              '    <button onclick="callnow()" id="btncallnow">Call Now</button>'+
                              '    Schedule a call for later'+
                              '</div>'+
                          '</div>'+
                          '<div class="widgetfooter">'+
                          '  <img src="./images/logo.png">'+
                          '</div>'+
                          '<div id="success">'+
                          '</div>'+
                          '</div>');
}


function phoneflag(flag){
  console.log(flag);
  document.getElementById("phone").value=flag;
  document.getElementById("flagicon").src = "./images/flag/"+flag+".png";

var x = document.getElementById("flagimage");
    x.style.display = "none";
}

function displayflag() {
  var x = document.getElementById("flagimage");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
