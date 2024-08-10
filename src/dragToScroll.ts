export function dragToScroll(scrollElement: HTMLElement) {
  let isMouseDown = false;
  let lastX: number;
  let lastY: number;
  let initialScrollLeft: number;
  let initialScrollTop: number;

  scrollElement.style.cursor = 'grab'; // Set the initial cursor to grab
  scrollElement.style.userSelect = 'none'; // Prevent selection

  scrollElement.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    lastX = e.clientX;
    lastY = e.clientY;
    initialScrollLeft = scrollElement.scrollLeft;
    initialScrollTop = scrollElement.scrollTop;
    scrollElement.style.cursor = 'grabbing'; // Change cursor to grabbing
  });

  scrollElement.addEventListener('mouseup', () => {
    isMouseDown = false;
    scrollElement.style.cursor = 'grab'; // Reset cursor to grab
  });

  scrollElement.addEventListener('mouseleave', () => {
    isMouseDown = false;
    scrollElement.style.cursor = 'grab'; // Reset cursor to grab on leave
  });

  scrollElement.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      scrollElement.scrollLeft = initialScrollLeft - deltaX;
      scrollElement.scrollTop = initialScrollTop - deltaY;
    }
  });

}
