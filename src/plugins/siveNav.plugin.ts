'use strict';

function sideNav(el: HTMLElement | null) {
  let sideNavEl :HTMLElement | null = el;
  let openEl :HTMLElement | null = document.getElementById('js-main-menu-toggle');
  let htmlEl :HTMLElement | null = document.documentElement;
  let sideContEl :HTMLElement | null  = document.querySelector('.sidebar__content');

  let startPosition :number  = 0,
    currentPosition :number = 0,
    isGestureStarted :boolean = false;

  openEl?.addEventListener('click', onToggleMenu);
  sideNavEl?.addEventListener('click', onsideContElClick);
  sideContEl?.addEventListener('pointerdown', onPointerDown);
  sideContEl?.addEventListener('pointermove', onPointerMove);
  sideContEl?.addEventListener('pointerup', onPointerUp);
  sideContEl?.addEventListener('pointercancel', onPointerUp);
  sideContEl?.addEventListener('pointerleave', onPointerUp);

  function onsideContElClick(e: any) {
    // Close only on non content click
    if (e.target === sideNavEl) {
      hide();
    }
  }

  function onToggleMenu() {
    toggle();
  }

  function onPointerDown(evt: any) {
    startPosition = currentPosition = evt.pageX;
    isGestureStarted = true;
    //sideContEl.setPointerCapture(evt.pointerID);
    disableTransition();
  }

  function onPointerMove(evt: any) {
    if (!isGestureStarted) {
      return;
    }

    evt.preventDefault();

    currentPosition = evt.pageX;
    updatePosition();
  }

  function onPointerUp(evt: any) {
    if (evt.target === sideContEl) {
      currentPosition = evt.pageX;
    }

    isGestureStarted = false;
    //sideContEl.releasePointerCapture(evt.pointerID);
    enableTransition();
    resetPosition();

    if (currentPosition - startPosition < -75) {
      hide();
    } else {
      show();
    }
    evt.stopPropagation();
  }

  function resetPosition() {
    requestAnimationFrame(function () {
      // @ts-ignore
      sideContEl.style.transform = '';
    });
  }

  function disableTransition() {
    // @ts-ignore
    sideContEl.style.transition = 'none';
  }

  function enableTransition() {
    // @ts-ignore
    sideContEl.style.transition = '';
  }

  function updatePosition() {
    requestAnimationFrame(function () {
      var diff = Math.min(0, currentPosition - startPosition);
      // @ts-ignore
      sideContEl.style.transform = 'translateX(' + diff + 'px)';
    });
  }

  function show() {
    htmlEl?.classList.add('is-main-menu-open');
  }

  function hide() {
    htmlEl?.classList.remove('is-main-menu-open');
  }

  function toggle() {
    htmlEl?.classList.toggle('is-main-menu-open');
  }
}

export default sideNav
