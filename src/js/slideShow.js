export function slideshow() {
  const img = document.getElementById('slideshow');

  let i = 1;

  setInterval(() => {
    img.style.opacity = 0;

    setTimeout(() => {
      i = (i + 1) % 3;

      img.src = `./src/assets/imgs/objetivo${i}.png`;
      
      img.style.opacity = 1;
    }, 500);
  }, 2500);
}