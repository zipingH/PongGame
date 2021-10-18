export default class POP{
  constructor(width, height, ratio, currentWidth,  currentHeight, canvas, context){
    this.width = width;
    this.height = height;
    this.ratio = ratio;
    this.currentWidth = currentWidth;
    this.currentHeight = currentHeight;
    this.canvas = canvas;
    this.context = context;
  }
  init(){
    // the proportion of width to height
    this.ratio = this.width / this.height;
    // these will change when the screen is resized
    this.currentWidth = this.width;
    this.currentHeight = this.height;
    // // this is our canvas element
    this.canvas = document.getElementsByTagName('canvas')[0];

    // setting this is important
    // otherwise the browser will
    // default to 400 x 600
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // the canvas context enables us to
    // interact with the canvas api
    this.context = this.canvas.getContext("2d");
    this.resize();
  }

  resize(){
    this.currentHeight = window.innerHeight;
    // resize the width in proportion
    // to the new height
    this.currentWidth = this.currentHeight * this.ratio;

    // this will create some extra space on the
    // page, allowing us to scroll past
    // the address bar, thus hiding it.
    if(this.android || this.ios){
      document.body.style.height = (window.innerHeight + 50) + 'px';
    }
    // set the new canvas style width and height
    // note: our canvas is still 400 x 600, but
    // we're essentially scaling it with CSS
    this.canvas.style.width = this.currentWidth + 'px';
    this.canvas.style.height = this.currentHeight + 'px';

    // we use a timeout here because some mobile
    // browsers don't fire if there is not
    // a short delay
    window.setTimeout(function(){
      window.scrollTo(0,1);
    }, 1);
  }
}