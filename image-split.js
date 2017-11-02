"use strict";

const layoutRows = document.querySelectorAll( '#layout li div' );

[].forEach.call( layoutRows, ( row ) => {
  row.addEventListener( 'dblclick', ( e ) => { // e.target is double clicked element
    const el = e.target,
      elClone = el.cloneNode();
    if ( el.tagName === 'IMG' ) {
      row.append(elClone);
      el.style.height = (el.height/2 + 'px');
      elClone.style.height = el.style.height;
    }
  }, false );
});