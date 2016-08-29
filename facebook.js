// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {


  if (response.status === 'connected') {
    testAPI();
  } else if (response.status === 'not_authorized') {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {

  FB.getLoginStatus(function(response) {
    if (response.status != 'connected') {
      FB.login();
    }
    statusChangeCallback(response);

  });
}

function fbLogout() {
  document.getElementById('prof-pic').innerHTML =  '<img src="dist/img/user-alt-128.png" class="user-image" alt="User Image">'
  document.getElementById('prof-pic2').innerHTML = '<img src="dist/img/user-alt-128.png" class="img-circle" alt="User Image">'
  document.getElementById('prof-pic3').innerHTML = '<img src="dist/img/user-alt-128.png" class="img-circle" alt="User Image">'
  document.getElementById('user-name').innerHTML = 'Username';
  document.getElementById('user-name2').innerHTML = 'Username';
  document.getElementById('user-name3').innerHTML = 'Username';
  document.getElementById('user-coupons').innerHTML = 'Log in to see your coupons';
  FB.logout(function(response) {
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1823783637837562',
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.7' // use graph api version 2.5
  });

  // User can be:
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
var uname;
var uid;
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log(response)
    console.log('Successful login for: ' + response.name);
    uname = response.name;
    uid = response.id;
    document.getElementById('prof-pic').innerHTML = '<img src="http://graph.facebook.com/' + response.id + '/picture"/>';
    document.getElementById('prof-pic2').innerHTML = '<img src="http://graph.facebook.com/' + response.id + '/picture?type=normal">';
    document.getElementById('prof-pic3').innerHTML = '<img src="http://graph.facebook.com/' + response.id + '/picture"/>';
    document.getElementById('user-name').innerHTML = response.name;
    document.getElementById('user-name2').innerHTML = response.name;
    document.getElementById('user-name3').innerHTML = response.name;
    document.getElementById('user-coupons').innerHTML = 'Your facebook id is ' +response.id + '.';
  });
}





$(function() {
$('#signupbutton').click(function (){

    //var firstName = $('#firstName').val();
    //var lastName = $('#lastName').val();
    //var grade = $('#grade').val();
    //var PR = $('#PR').val();
    var personname = uname;
    var personid = uid;
    console.log(personname);
    console.log(personid);
    //debugger;
    $.ajax({
        type: 'POST',
        url: 'dataentry.php',
        datatype: 'json',
        data: {'personname': personname, 'personid': personid},
        success: function(data){
            alert('success');
            console.log(data);
            var personname = data[0];
            var personid = data[1];
            console.log(personname);
            console.log(personid);
            document.getElementById('checkdata').innerHTML = personid;
            //$('#runnerInfo').append("<tr><td>"+firstName+"</td><td>"+lastName+"</td><td>"+grade+"</td><td>"+PR+"</td></tr>");  
        },
        error: function (request, error) {
            alert('failure');

            console.log("fail!");
            console.log(arguments);
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }

    });

});
});
