// creates the connection!
let socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  let li = jQuery('<li></li>')
  li.text(`${message.from} ${formattedTime}: ${message.text}`)

  jQuery('#messages').append(li)
});

socket.on('newLocationMessage', function(message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  let li = jQuery('<li></li>')
  let a = jQuery('<a target="_blank">My current location</a>')

  li.text(`${message.from} ${formattedTime}: `)
  a.attr('href', message.url)

  li.append(a)
  jQuery('#messages').append(li)
})

// ======= F O R M   S U B M I S S I O N  =======

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  let messageTextbox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('')
  })
})


// =======  L O C A T I O N  =======

let locationButton = jQuery('#send-location')

locationButton.on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...')

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    locationButton.removeAttr('disabled').text('Send Location')
  }, function(e) {
    alert('Unable to fetch location.')
    locationButton.removeAttr('disabled').text('Send Location')
  })
})
