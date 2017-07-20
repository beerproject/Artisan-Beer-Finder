$(document).ready(function() {
  $('#vote').on('click', (e) => {
    $.post('/like', {
      userId: currentUser._id,
      beerId: currentBeer._id
    })
    .then( response =>{
      console.log(response);
    })
    .catch( err => {
      console.log(err);
    });
  });
});
