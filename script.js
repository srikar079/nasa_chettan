window.onload = function() {
    let leftSpeech = document.getElementById('left-speech');
    let rightSpeech = document.getElementById('right-speech');
  
    setTimeout(() => {
      leftSpeech.style.display = 'block'; // Left character speaks first
    }, 1000);
  
    setTimeout(() => {
      leftSpeech.style.display = 'none';
      rightSpeech.style.display = 'block'; // Right character speaks after
    }, 4000);
  
    setTimeout(() => {
      rightSpeech.style.display = 'none'; // Hide both after a few seconds
    }, 8000);
  };
  