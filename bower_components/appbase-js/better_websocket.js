var WebSocket = require('ws')
var EventEmitter = require('events').EventEmitter

var betterWs = function betterWs(url) {
	var conn = new WebSocket(url)
	var ee = new EventEmitter()

	ee.send = function(dataObj) {
		conn.send(JSON.stringify(dataObj))
		return this
	}

	conn.onopen = function() {
		ee.emit('open')
	}

	conn.onmessage = function(message) {
		var dataObj = JSON.parse(message.data)
		ee.emit('message', dataObj)
	}

	conn.onerror = function(err) {
		ee.emit('error', err)
	}

	conn.onclose = function(close) {
		ee.emit('close', close)
	}

	return ee
}

module.exports = betterWs