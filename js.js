window.addEventListener("load", () => {
  function preloadImage(url) {
    var img = new Image();
    img.src = url;
  }
  preloadImage("/cursor/iggyright.png");
  preloadImage("/cursor/iggyleft.png");
  preloadImage("/cursor/iggyeat.png");
  preloadImage("/cursor/iggytongue.png");
});

gsap.set(".follower", { xPercent: -50, yPercent: -50 });
gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

const follow = document.querySelector(".follower");
const cur = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
  gsap.to(cur, 0.2, { x: e.clientX, y: e.clientY });
  gsap.to(follow, 0.9, { x: e.clientX, y: e.clientY });
});

gsap.set(".follower", { xPercent: -50, yPercent: -50 });
gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

function getPositionAtCenter(element) {
  const { top, left, width, height } = element.getBoundingClientRect();

  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

function getDistanceBetweenElements(a, b) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return { a: aPosition.x, b: bPosition.x, c: aPosition.y, d: bPosition.y };
}

const distance = getDistanceBetweenElements(follow, cur);

window.addEventListener("mousemove", (event) => {
  cur.style.opacity = "1";
  const dist = getDistanceBetweenElements(cur, follow);
  const isOverlapping = dist.a == dist.b || dist.c == dist.d;
  let diff = Math.abs(dist.a - dist.b);
  let diff2 = Math.abs(dist.c - dist.d);

  if (dist.a > dist.b) {
    follow.style.backgroundImage = "url(/cursor/iggyright.png)";
  } else if (dist.a < dist.b) {
    follow.style.backgroundImage = "url(/cursor/iggyleft.png)";
  }
});

// eat
(function (mouseStopDelay) {
  let timeout;
  document.addEventListener("mousemove", function (e) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      let event = new CustomEvent("mousestop", {
        detail: {
          clientX: e.clientX,
          clientY: e.clientY,
        },
        bubbles: true,
        cancelable: true,
      });
      e.target.dispatchEvent(event);
    }, mouseStopDelay);
  });
})(1000);

window.addEventListener("mousestop", (event) => {
  const dist = getDistanceBetweenElements(cur, follow);
  const isOverlapping = dist.a == dist.b;
  let diff = Math.abs(dist.a - dist.b);
  let diff2 = Math.abs(dist.c - dist.d);

  if (isOverlapping) {
    follow.style.backgroundImage = "url(/cursor/iggyeat.png)";
    cur.style.opacity = "0";
  }
});

//  tongue
(function (mouseStopDelay2) {
  let timeout;
  document.addEventListener("mousemove", function (e) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      let event = new CustomEvent("mousestop2", {
        detail: {
          clientX: e.clientX,
          clientY: e.clientY,
        },
        bubbles: true,
        cancelable: true,
      });
      e.target.dispatchEvent(event);
    }, mouseStopDelay2);
  });
})(400);
window.addEventListener("mousestop2", (event) => {
  follow.style.backgroundImage = "url(/cursor/iggytongue.png)";
});
