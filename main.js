"use strict";

var dragSourceElement = null;

function handleDragStart( e ) {

  dragSourceElement = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData( 'text/html', this.innerHTML );
}

function handleDragOver( e ) {
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
  if ( e.stopPrgation ) {
    e.stopPropagation;
  }

  if (dragSourceElement != this) {
    dragSourceElement.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }

  return false;
}

function handleDragEnd( e ) { //e is source node
  [].forEach.call( rows, ( row ) => {
    row.classList.remove( 'over' );
  });
}

var rows = document.querySelectorAll( '#pallet li, #layout li div' );
console.log(rows);

[].forEach.call( rows, ( row ) => {
  row.addEventListener( 'dragstart', handleDragStart, false );
  row.addEventListener( 'dragenter', handleDragEnter, false );
  row.addEventListener( 'dragover', handleDragOver, false );
  row.addEventListener( 'dragleave', handleDragLeave, false );
  row.addEventListener( 'drop', handleDrop, false );
  row.addEventListener( 'dragend', handleDragEnd, false );
});