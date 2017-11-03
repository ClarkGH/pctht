"use strict";

//Set drag and drop event listeners
const dragDropSetup = () => {
  var dragSourceElement = null;
  const rows = document.querySelectorAll( '#pallet li, #layout li div' );

  function handleDragStart( e ) {
    dragSourceElement = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData( 'text/html', this.innerHTML );
  }

  function handleDragOver( e ) { //e.target is source node
    if ( e.preventDefault ) {
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
}

// set up image split events
const imgSplitSetup = () => {
  const layoutRows = document.querySelectorAll( '#layout li div' );

  [].forEach.call( layoutRows, ( row ) => {
    row.addEventListener( 'dblclick', ( e ) => { // e.target is double clicked element
      const el = e.target,
        elClone = el.cloneNode();
      if ( el.tagName === 'IMG' ) {
        row.append(elClone);
        el.style.height = ( el.height/2 + 'px' );
        elClone.style.height = el.style.height;
      }
    }, false );
  });
}

// set up save/load events
const saveLoadLayout = () => { //I'm adding too many event listeners here with every click on load, this needs to be refactored
  const save = document.getElementById( 'save' ),
    load = document.getElementById( 'load' );

  var layoutEl = document.getElementById( 'layout' ), //layout element
    palletEl = document.getElementById( 'pallet' ), //pallet element
    layoutState = document.getElementById( 'layout' ).cloneNode( true ),
    palletState = document.getElementById( 'pallet' ).cloneNode( true );

  const handleLoad = ( e ) => {
    layoutEl.replaceWith( layoutState );
    palletEl.replaceWith( palletState );
    dragDropSetup();
    imgSplitSetup();
    saveLoadLayout();
    console.log('too many load events');
  }

  const handleSave = ( e ) => {
    layoutState = document.getElementById( 'layout' ).cloneNode( true ),
    palletState = document.getElementById( 'pallet' ).cloneNode( true );
    console.log('too many load events');
  }

  save.addEventListener( 'click', handleSave );

  load.addEventListener( 'click', handleLoad );
}

//initial page setup
dragDropSetup();
imgSplitSetup();
saveLoadLayout();