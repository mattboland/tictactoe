var tictactoe = (function() {

  //cache selectors
  var board = $('#board');
  var x = $('#x');
  var o = $('#o');
  var ref = $('#refresh');
  var box = $('.cell');
  var selectionMade = false;
  var selection;
  var comp;
  var avail = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  var gamePiece;
  var moveCount = 0;
  var aiMove = false;
  // event handlers
  x.one('click', xselect);
  o.one('click', oselect);
  ref.on('click', refr);

  //selecting game piece
  function xselect() {
    selection = 'x';
    comp = 'o';
    selectionMade = true;
    x.addClass('red'); //highlights selection
    o.off('click'); //does not allow change of selection  
  }

  function oselect() {
    selection = 'o';
    comp = 'x';
    selectionMade = true;
    o.addClass('red');
    x.off('click');
  }

  //turns cell to players selection
  box.on('click', function() {
    if (selectionMade) {
      //console.log(avail);
      $(this).text(selection); //marks box
      avail.splice(this.id, 1, 't');
      //console.log(avail);
      moveCount++;
      winn(selection);
      aiMove = true;
      computerMove();
    } else {
      alert('please make selection x or o.')
    }
  });

  box.hover(function() {
    $(this).addClass("hover");
  }, function() {
    $(this).removeClass("hover");
  });

  //computer moves
  function computerMove() {
    var rando = Math.floor(Math.random() * 9);
    var compBox = avail[rando];
    if (compBox != 't' && aiMove) {
      $('#' + compBox).html(comp);
      avail.splice(compBox, 1, 't');
      moveCount++;
      winn(comp);
      aiMove = false;
    } else {
      computerMove();
    }
  }
  //check if game won
  function winn(currentMove) {
    if (
      (box[0].innerText == currentMove && box[1].innerText == currentMove && box[2].innerText == currentMove) ||
      (box[3].innerText == currentMove && box[4].innerText == currentMove && box[5].innerText == currentMove) ||
      (box[6].innerText == currentMove && box[7].innerText == currentMove && box[8].innerText == currentMove) ||
      (box[0].innerText == currentMove && box[3].innerText == currentMove && box[6].innerText == currentMove) ||
      (box[1].innerText == currentMove && box[4].innerText == currentMove && box[7].innerText == currentMove) ||
      (box[2].innerText == currentMove && box[5].innerText == currentMove && box[8].innerText == currentMove) ||
      (box[0].innerText == currentMove && box[4].innerText == currentMove && box[8].innerText == currentMove) ||
      (box[2].innerText == currentMove && box[4].innerText == currentMove && box[6].innerText == currentMove)) {

      alert(currentMove + ' wins!');
      refr();
    } else if (moveCount == 9) {
      alert('Tie Game!');
      refr();
    }
  }

  //refresh game sets everything back to default start settings
  function refr() {
    $.each(box, function() {
      $(this).html('');
    });
    selectionMade = false;
    o.removeClass('red');
    x.removeClass('red');
    x.one('click', xselect);
    o.one('click', oselect);
    avail = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    moveCount = 0;
    aiMove = false;
  }

})()