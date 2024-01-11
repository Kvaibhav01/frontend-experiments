window.onload = function () {
  // Get all elements
  const items = document.querySelectorAll('.item');
  const container = document.querySelector('.container');
  const spans = document.querySelectorAll('.hero-copy span');
  const navFooter = document.querySelectorAll('nav, footer');

  // Variables
  const numberOfItems = items.length;
  const angleIncrement = (100 * Math.PI) / numberOfItems;

  const radius = 300;
  let currentAngle = 100;
  let isMouseOverSpan = false;
  let targetX = 0,
    targetY = 0;
  let currentX = 0,
    currentY = 0;

  // Add images
  const basePath = './assets/';
  items.forEach((item, index) => {
    let img = document.createElement('img');
    img.src = basePath + 'img' + (index + 1) + '.jpg';
    img.alt = 'Image ' + (index + 1);
    item.appendChild(img);
  });

  // Update gallery
  const updateGallery = (mouseX, mouseY, show = true) => {
    targetX = mouseX - container.getBoundingClientRect().left;
    targetY = mouseY - container.getBoundingClientRect().top;

    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    items.forEach(function (item, index) {
      const angle = currentAngle + index * angleIncrement;
      const x = currentX + radius * Math.cos(angle) - item.offsetWidth / 2;
      const y = currentY + radius * Math.sin(angle) - item.offsetHeight / 2;

      gsap.to(item, {
        x: x,
        y: y,
        opacity: show ? 1 : 0,
        duration: 0.5,
        ease: 'power1.out',
      });
    });
  };

  // Event listeners
  spans.forEach((span) => {
    span.addEventListener('mouseenter', (e) => {
      isMouseOverSpan = true;
      updateGallery(e.clientX, e.clientY, true);
      navFooter.forEach((element) => {
        element.style.opacity = 0.5;
      });
    });

    span.addEventListener('mousemove', (e) => {
      if (isMouseOverSpan) {
        targetX = e.clientX - 800;
        targetY = e.clientY - 400;
      }
    });

    span.addEventListener('mouseleave', (e) => {
      isMouseOverSpan = false;
      updateGallery(0, 0, false);
      navFooter.forEach((element) => {
        element.style.opacity = 1;
      });
    });
  });

  // Animation
  gsap.ticker.add(() => {
    currentAngle += 0.005;

    if (currentAngle > 2 * Math.PI) {
      currentAngle -= 2 * Math.PI;
    }

    if (isMouseOverSpan) {
      updateGallery(targetX, targetY, true);
    }
  });

  // Hover effect
  document.querySelectorAll('.hero-copy span').forEach((span) => {
    span.addEventListener('mouseenter', () => {
      span.parentNode.style.color = '#545454';
    });

    span.addEventListener('mouseleave', () => {
      span.parentNode.style.color = '#eeeeee';
    });
  });
};
