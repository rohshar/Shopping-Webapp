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
  console.log('work1');
  FB.init({
    appId      : '1823783637837562',
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
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
  console.log('work2');
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log(response)
    console.log('Successful login for: ' + response.name);
    document.getElementById('prof-pic').innerHTML = '<img src="http://graph.facebook.com/' + response.id + '/picture"/>';
    document.getElementById('prof-pic2').innerHTML = '<img src="http://graph.facebook.com/' + response.id + '/picture?type=normal">';
    document.getElementById('prof-pic3').innerHTML = '<img src="http://graph.facebook.com/' + response.id + '/picture"/>';
    document.getElementById('user-name').innerHTML = response.name;
    document.getElementById('user-name2').innerHTML = response.name;
    document.getElementById('user-name3').innerHTML = response.name;
    document.getElementById('user-coupons').innerHTML = 'Your facebook id is ' +response.id + '.';
  });
}
