document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  let cursor = document.querySelector('.cursor');
  let cursor2 = document.querySelector('.cursor2');
  let mouseX = 0;
  let mouseY = 0;

  gsap.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
      gsap.set(cursor, {
        css: {
          left: mouseX,
          top: mouseY,
        },
      });
      gsap.set(cursor2, {
        css: {
          left: mouseX,
          top: mouseY,
        },
      });
    },
  });

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const stickyBar = document.querySelector('.sticky-bar'),
    footerTrigger = document.querySelector('.trigger-footer'),
    stickBarTriggerHeight = stickyBar.offsetHeight,
    footerTriggerHeight = footerTrigger.offsetHeight;

  function getStickyBarCenter() {
    return stickyBar.offsetTop + stickyBar.offsetHeight / 2;
  }

  ScrollTrigger.create({
    trigger: stickyBar,
    start: 'bottom bottom',
    end: () => `top+=${stickBarTriggerHeight - window.innerHeight} center`,
    scrub: true,
    onUpdate: (self) => {
      const startTop = 92,
        endTop = 50,
        newTop = startTop + (endTop - startTop) * self.progress;
      stickyBar.style.top = `${newTop}%`;
    },
  });

  ScrollTrigger.create({
    trigger: stickyBar,
    start: () =>
      `top+=${stickBarTriggerHeight - (window.innerHeight + 100)} center`,
    end: 'top top',
    scrub: true,
    onUpdate: (self) => {
      const fontSizeStart = window.innerWidth < 900 ? 2.5 : 1.25;
      const fontSizeEnd = 9;
      const newFontSize =
        fontSizeStart + (fontSizeEnd - fontSizeStart) * (1 - self.progress);

      stickyBar.querySelectorAll('p').forEach((p) => {
        p.style.fontSize = `${newFontSize}vw`;
      });
    },
  });

  document.querySelectorAll('.row').forEach((row) => {
    ScrollTrigger.create({
      trigger: row,
      start: () => `top+=${getStickyBarCenter() - 550} center`,
      end: () => `top+=${getStickyBarCenter() - 450} center`,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const maxGap = window.innerWidth < 900 ? 10 : 15;
        const minGap = window.innerWidth < 900 ? 0.5 : 1;

        const currentGap = minGap + (maxGap - minGap) * progress;
        row.style.gap = `${currentGap}rem`;
      },
    });
  });

  document.querySelectorAll('.row').forEach((row) => {
    ScrollTrigger.create({
      trigger: row,
      start: () => `top+=${getStickyBarCenter() - 400} center`,
      end: () => `top+=${getStickyBarCenter() - 300} center`,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const maxGap = window.innerWidth < 900 ? 0.5 : 1;
        const minGap = window.innerWidth < 900 ? 10 : 15;

        const currentGap = minGap + (maxGap - minGap) * progress;
        row.style.gap = `${currentGap}rem`;
      },
    });
  });

  ScrollTrigger.create({
    trigger: footerTrigger,
    start: 'top bottom',
    end: () => `top+=${footerTriggerHeight - window.innerHeight} center`,
    scrub: true,
    onUpdate: (self) => {
      const startTop = 50,
        endTop = 92,
        newTop = startTop + (endTop - startTop) * self.progress;
      stickyBar.style.top = `${newTop}%`;
    },
  });

  ScrollTrigger.create({
    trigger: footerTrigger,
    start: () =>
      `top+=${footerTriggerHeight - (window.innerHeight + 100)} bottom`,
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const fontSizeStart = window.innerWidth < 900 ? 2.5 : 1.25;
      const fontSizeEnd = 9;
      const newFontSize =
        fontSizeStart + (fontSizeEnd - fontSizeStart) * self.progress;

      stickyBar.querySelectorAll('p').forEach((p) => {
        p.style.fontSize = `${newFontSize}vw`;
      });
    },
  });
});
