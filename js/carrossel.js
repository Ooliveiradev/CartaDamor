let index = 0;
const carousel = document.getElementById('carouselImages');
const total = carousel.children.length;

function showImage() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

function next() {
  index = (index + 1) % total;
  showImage();
}

function prev() {
  index = (index - 1 + total) % total;
  showImage();
}
