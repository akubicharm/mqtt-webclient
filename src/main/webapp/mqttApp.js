/**
 * MQTT Web Client Sample This sample message using mqtt over http
 */
angular.module('mqttApp', []).controller('mqttController',
		function($scope, $interval) {
			var mqttCli = this;
			var client;

			// 描画を更新させるためのインターバル
			$interval(function() {
			}, 5000);

			$scope.topicMessages = [ {
				text : ""
			} ];
			$scope.servers = [ {
				text : "ws://52.10.104.181:1884"
			}, {
				text : "ws://test.mosquitto.org:8080/mqtt"
			}, {
				text : "ws://localhost:8080/mqtt"
			} ];
			$scope.mqttServerSelected = "";
			$scope.mqttServerAddr = $scope.servers[0].text;

			$scope.msgSamples = [ {
				text : "Hello Red Hat!"
			}, {
				text : "おはようございます。"
			}, {
				text : "レッドハットです。"
			}, {
				text : "JBoss A-MQは様々なプロトコルに対応しています。"
			} ];
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
				// client = mqtt.connect($scope.mqttServerAddr);
				client = mows.createClient($scope.mqttServerAddr);
				connectionStatus = "CONNECTED";
			};

			mqttCli.disconnect = function() {
				client.end();
				connectionStatus = "DISCONNECTED";
			}

			mqttCli.subscribe = function() {
				client.subscribe(this.subscribeTopicName);
				client.on("message", function(topic, payload) {
					var msg = [ topic, payload ].join(": ");
					if ($scope.topicMessages.length > 5) {
						$scope.topicMessages.shift();
					}
					;
					$scope.topicMessages.push({
						text : msg
					});
					console.log(msg);
				});
			};

			mqttCli.publish = function() {
				client.publish(this.publishTopicName, $scope.publishMessage);
			};

			$scope.updateMsg = function() {
				$scope.publishMessage = $scope.msgSample.text;
			}

		});