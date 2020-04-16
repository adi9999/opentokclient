
var SERVER_BASE_URL = 'https://opentokapitest.herokuapp.com/';
var session;



// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}


$(document).ready(function(){
  $("#btn1").click(function(){
	  fetch(SERVER_BASE_URL + 'room/group1').then(function(res) {	
		  return res.json()
		}).then(function(res) {
		  apiKey = res.apiKey;
		  sessionId = res.sessionId;
		  token = res.token;
		  initializeSession(apiKey, sessionId);
		  connect_pub_sub();
		}).catch(handleError);
	
  });
  
  $("#btn3").click(function(){
    fetch(SERVER_BASE_URL + 'room/group2').then(function(res) {	
		  return res.json()
		}).then(function(res) {
		  apiKey = res.apiKey;
		  sessionId = res.sessionId;
		  token = res.token;
		  initializeSession(apiKey, sessionId);
		  connect_pub_sub();
		}).catch(handleError);
	
  });

$("#btn2 , #btn4").click(function(){
    session.disconnect();
  });

});


function connect_pub_sub(){
	  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
  
  // Subscribe to a newly created stream
	session.on('streamCreated', function(event) {
	//here subscriber is id from div element in our app
	// subscribe to new streams , Below Code meaning in simple word (whenever a new message/video/audio from client than this message show to current user)
	  session.subscribe(event.stream, 'subscriber', {
		insertMode: 'append',
		width: '100%',
		height: '100%'
	  }, handleError);
	});

  // Create a publisher
  //here publisher is Id of div element
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);
	
}

function initializeSession(app_key,sess_id) {
// this work should be done by server , create session in opentok cloud and return sesion id
  session = OT.initSession(app_key, sess_id);

}