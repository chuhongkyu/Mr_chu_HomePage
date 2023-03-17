
var docStyle = document.documentElement.style;

// setting CSS variables inside this JS where they 
// can be declaratively used inside the CSS file.
document.addEventListener('mousemove', function(e) {
  docStyle.setProperty('--mouse-x', e.clientX);
  //docStyle.setProperty('--mouse-y', e.clientY);
});
