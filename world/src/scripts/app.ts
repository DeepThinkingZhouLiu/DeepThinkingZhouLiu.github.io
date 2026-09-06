import type { StationId } from './room';

export async function startRoom() {
  const host = document.querySelector<HTMLElement>('#scene')!;
  const dialog = document.querySelector<HTMLDialogElement>('#detail-dialog')!;
  const contents = document.querySelector<HTMLElement>('#dialog-content')!;
  const reading = document.querySelector<HTMLElement>('#reading-room')!;
  let opener: HTMLElement | null = null;
  function open(id: StationId) {
    const source = document.querySelector<HTMLElement>(
      `[data-content="${id}"]`,
    );
    if (!source) return;
    opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const clone = source.cloneNode(true) as HTMLElement;
    clone.id = `dialog-${id}`;
    clone.querySelector('h2')!.id = `dialog-title-${id}`;
    clone.setAttribute('aria-labelledby', `dialog-title-${id}`);
    contents.replaceChildren(clone);
    dialog.setAttribute('aria-labelledby', `dialog-title-${id}`);
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }
  document.querySelectorAll<HTMLAnchorElement>('[data-open]').forEach((link) =>
    link.addEventListener('click', (event) => {
      event.preventDefault();
      open(link.dataset.open as StationId);
    }),
  );
  const close = () => dialog.close();
  document.querySelector('#close-dialog')!.addEventListener('click', close);
  document.querySelector('#return-room')!.addEventListener('click', close);
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    opener?.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        close();
    }
  });
  function revealReading() {
    reading.classList.add('visible');
  }
  document
    .querySelector('#text-view')!
    .addEventListener('click', revealReading);
  document
    .querySelector('.skip-link')!
    .addEventListener('click', revealReading);
  function handleHash() {
    if (
      location.hash.startsWith('#content-') ||
      location.hash === '#reading-room'
    ) {
      revealReading();
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    }
  }
  window.addEventListener('hashchange', handleHash);
  function failed() {
    document.body.classList.remove('ready');
    document.body.classList.add('unavailable');
    document.querySelector('#loading')?.remove();
    document.querySelector('#fallback')!.removeAttribute('hidden');
    revealReading();
  }
  try {
    const { createWorld } = await import('./world');
    const world = createWorld(host, open, failed);
    document.querySelector('#loading')!.remove();
    document.body.classList.add('ready');
    handleHash();
    window.addEventListener('pagehide', () => world.dispose(), { once: true });
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) location.reload();
    });
  } catch (error) {
    console.warn('Research room is unavailable; using the text view.', error);
    failed();
  }
}
