/**
 * MQTT Web Client Sample This sample message using mqtt over http
 */
angular.module('mqttApp', []).controller('mqttController', function() {
	var mqttCli = this;
	var client;
	
	//this.mqttServerAddr = "ws://test.mosquitto.org:8080/mqtt";
	this.mqttServerAddr = "ws://52.10.104.181:1884";
	this.topicName = "redhatkkdemo.vote.car";
	
	this.ShiftImg = "images/ShiftLever.jpg";


	// ------------------------------
	// FUNCTIONS

	mqttCli.connect = function() {
		client = mows.createClient(mqttCli.mqttServerAddr);
		console.log("connect");
	};

	mqttCli.disconnect = function() {
		if (client != null)
			client.end();
		console.log("disconnect");
	}

	mqttCli.publish = function(message) {
		console.log("publish : " + message);
		client.publish(mqttCli.topicName, message);
	};
	
	mqttCli.vote = function(direction, speed) {
		console.log("vote : " + direction);
		var msg = mqttCli.createMessage(direction, speed);
		mqttCli.publish(msg);
		
		this.ShiftImg = "images/ShiftLever" + speed + ".jpg";
	}
	
	
	/**
	 * {"speed": 1, "direction": 1, "seconds": 10} 
	 * direction {1, 0} = 前、後ろ
	 * speed [1..10]
	 */
	
	mqttCli.createMessage = function(direction, speed) {
		var t = new Date().getTime();
		var data = "{" +
				"'speed': " + speed * 2
				+ ", 'direction':" + direction
				+ ", 'seconds': " + "10"
				+ "}";
		console.log("timestamp : " + t);
		console.log("data : " + data);
		message
		= "{"
			+ "'id': '" + t + "', "
			+ "'type' : 'cardemo', "
			+ "'timestamp' : '" + t + "', "
			+ "'data' : " + data
			+ "}";
		console.log(message);
		return  message;
	}
});