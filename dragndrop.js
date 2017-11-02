"use strict";

var dragSourceElement = null;
const rows = document.querySelectorAll( '#pallet li, #layout li div' );

function handleDragStart( e ) {
  dragSourceElement = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData( 'text/html', this.innerHTML );
}

function handleDragOver( e ) { //e.target is source node
  if (e.preventDefault) {
    e.preventDefault(); //allows drop
  }

  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter( e ) {
  this.classList.add( 'over' ); //e.target is current hover target
}

function handleDragLeave( e ) {
  this.classList.remove( 'over' ); //e.target is prev target el
}

function handleDrop( e ) { //e is current target el
  if ( e.stopPropagation ) {
    e.stopPropagation;
  }

  if ( dragSourceElement != this ) {
    dragSourceElement.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData( 'text/html' );
  }
  return false;
}

function handleDragEnd( e ) { //e is source node
  [].forEach.call( rows, ( row ) => {
    row.classList.remove( 'over' );
  });
}

[].forEach.call( rows, ( row ) => {
  row.addEventListener( 'dragstart', handleDragStart, false ); // on dragStart event
  row.addEventListener( 'dragenter', handleDragEnter, false ); // on dragEnter event
  row.addEventListener( 'dragover', handleDragOver, false ); // on dragOver event
  row.addEventListener( 'dragleave', handleDragLeave, false ); // on dragLeave event
  row.addEventListener( 'drop', handleDrop, false ); //on handleDrop event
  row.addEventListener( 'dragend', handleDragEnd, false ); //on dragEnd event
});