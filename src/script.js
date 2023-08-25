const grid = { row:33, nRows:16 },
      size = 2.5,
      spacing = size*11;

let i, currentRow = -1;

gsap.set('.rectFill', {attr:{height:spacing}}); // set fill pattern's height

for (i=0; i<grid.nRows; i++){ // draw rounded rectangles
  let availableSpace = grid.row;
  
  for (j=0; j<4; j++){
    let w = gsap.utils.random(2,availableSpace/3,1), //random width between 2 and half of the available space in the row
        r = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
        c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    
    document.getElementById('grid').appendChild(r);
    document.getElementById('grid').appendChild(c);
    availableSpace -= w+gsap.utils.random(0,4,1); 

    gsap.set(r, {opacity:0.9, attr:{
      width:(spacing+size)*w,
      height:spacing,
      x:(availableSpace*(size+spacing))-spacing/2, //TO-DO: improve spacing here
      // x:(xPos*(size+spacing))-spacing/2,
      y:(i*(size+spacing))-spacing/2,
      fill:'url(#c'+gsap.utils.random(0,6,1)+')',
      rx:spacing/2,
      ry:spacing/2
    }});
    
    gsap.timeline({repeat:-1, yoyo:true, defaults:{ease:'expo.inOut'}})
        .fromTo(c, {attr:{
          cx:availableSpace*(size+spacing),
          cy:(i*(size+spacing)),
          fill:'url(#c'+gsap.utils.random(0,6,1)+')',
          r:spacing/2.5
        }},{
          duration:gsap.utils.random(2,3),
          attr:{
              cx:'+='+(w-1)*(size+spacing)},
        })
      .progress(Math.random());
    
  }
}


for (i=0; i<grid.row*grid.nRows; i++) { // draw grid
    if (i%grid.row==0) currentRow++;
  
    let c = document.createElementNS("http://www.w3.org/2000/svg", "circle");  
    document.getElementById('grid').appendChild(c);
  
    gsap.set(c, {attr:{
      fill:'url(#c'+gsap.utils.random(0,6,1)+')',
      cx:gsap.utils.wrap(0,grid.row, i)*(size+spacing),
      cy:currentRow*(size+spacing),
      r:size
    }});
}


function doResize(){
  gsap.set('#grid', {x:'50%', xPercent:-50, y:'50%', yPercent:-50}) //center grid
}
doResize();

window.addEventListener('resize', doResize);