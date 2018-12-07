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
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html)

});

socket.on('newLocationMessage', function(message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  })

  jQuery('#messages').append(html)
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
