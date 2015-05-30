/**
 * MQTT Web Client Sample This sample message using mqtt over http
 */
angular.module('mqttApp', []).controller('mqttController', function($scope) {
	var mqttCli = this;
	var client;

	$scope.topicMessages = [ {
		text : ""
	} ];
	$scope.servers = [ {
		text: "ws://test.mosquitto.org:8080/mqtt"
	}, {
		text: "ws://localhost:8080/mqtt"
	} ];
	$scope.mqttServerSelected = "";
	$scope.mqttServerAddr = $scope.servers[0].text;
	
	$scope.msgSamples = [
	{text: "おはようございます。"},
	{text: "レッドハット"},
	{text: "JBoss A-MQのデモ"}
	];
	$scope.msgSample = $scope.msgSamples[0].text;
	
	this.connectionStatus = "DISCON";
	this.subscribeTopicName = "redhatkkdemo";
	this.publishTopicName = "redhatkkdemo";
	$scope.publishMessage = "Hello World!";
	
	
	// ------------------------------
	// FUNCTIONS
	
	// update server input field with selected server
	$scope.updateServer = function() {
		$scope.mqttServerAddr = $scope.mqttServerSelected.text;
	}

	mqttCli.connect = function() {
		client = mqtt.connect($scope.mqttServerAddr);
		connectionStatus = "CONNECTED";
	};

	mqttCli.subscribe = function() {
		client.subscribe(this.subscribeTopicName);
		client.on("message", function(topic, payload) {
			var msg = [ topic, payload ].join(": ");
			// this.topicMessage = msg;
			// client.end();
			if ($scope.topicMessages.length > 5) {
				$scope.topicMessages.shift();
			}
			;
			$scope.topicMessages.push({
				text : msg
			});
		});
	};

	mqttCli.publish = function() {
		client.publish(this.publishTopicName, $scope.publishMessage);
	};
	
	
	$scope.updateMsg = function() {
		$scope.publishMessage = $scope.msgSample.text;
	}

});