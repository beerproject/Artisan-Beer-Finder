$(document).ready(function() {
  $('#like').on('click', (e) => {
    e.preventDefault();
    $.post('/like', {
      userId: beerInfo.currentUser._id,
      beerId: beerInfo.currentBeer._id,
      likes: beerInfo.currentBeer.likes
    })
    .then( response => {
      beerInfo.currentBeer.likes++;
      $('.total-likes').text(beerInfo.currentBeer.likes);
      $('#like').text('Liked');
      $('#like').off('click');
    })
    .catch( err => {
      console.log(err);
    });
  });
});
