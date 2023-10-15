const s1 = document.querySelector(".s1");
const s2 = document.querySelector(".s2");
const home = document.querySelector(".home");
const bottomB = document.querySelector(".bottom");
const startBtn = document.querySelector(".start-btn");
const title = document.querySelector(".title img");
const popupsBtns = document.querySelectorAll(".popups .btns img");

function showHide(el, state) {
  el.style.display = `${state}`;
}

function resetBg(url, height) {
  bottomB.style.backgroundImage = url;
  bottomB.style.height = height;
}

startBtn.addEventListener("click", () => {
  showHide(s1, "none");
  showHide(s2.children[0], "flex");
  showHide(s2.children[1], "flex");

  resetBg("url(./assets/images/b/bottom.png)", "77vw");
});

home.addEventListener("click", () => {
  showHide(s1, "flex");
  showHide(s2.children[0], "none");
  showHide(s2.children[1], "none");
  glossHandler("remove");
  exHandler("remove");
  title.src = "./assets/images/b/";
  for (let i = 0; i < popupsBtns.length; i++) {
    popupsBtns[i].src.indexOf("sel") != -1 &&
      (popupsBtns[i].src =
        popupsBtns[i].src.slice(0, popupsBtns[i].src.lastIndexOf("-")) +
        ".png");
  }
});

popupsBtns.forEach((btn, btnIndx) => {
  btn.onclick = () => {
    title.src =
      title.src.slice(0, title.src.lastIndexOf("/")) +
      "/" +
      (btnIndx + 1) +
      ".png";

    for (let i = 0; i < popupsBtns.length; i++) {
      switch (i) {
        case 0:
          popupsBtns[i].src =
            popupsBtns[i].src.slice(0, popupsBtns[i].src.lastIndexOf("/")) +
            "/gl.png";
          break;
        case 1:
          popupsBtns[i].src =
            popupsBtns[i].src.slice(0, popupsBtns[i].src.lastIndexOf("/")) +
            "/act.png";

          break;
        case 2:
          popupsBtns[i].src =
            popupsBtns[i].src.slice(0, popupsBtns[i].src.lastIndexOf("/")) +
            "/tr.png";
          break;
        default:
          break;
      }
    }
    glossHandler("remove");
    exHandler("remove");
    switch (btnIndx) {
      case 0:
        btn.src = btn.src.slice(0, btn.src.lastIndexOf("/")) + "/gl-sel.png";
        resetBg("url(./assets/images/gloss/back/b.png)", "106vw");
        glossHandler("init");
        break;
      case 1:
        btn.src = btn.src.slice(0, btn.src.lastIndexOf("/")) + "/act-sel.png";
        resetBg("url(./assets/images/ex3/b.png)", "228vw");
        exHandler("init");
        break;
      case 2:
        btn.src = btn.src.slice(0, btn.src.lastIndexOf("/")) + "/tr-sel.png";
        break;
      default:
        break;
    }
  };
});

function glossHandler(action) {
  if (action == "init") {
    const div = document.createElement("div");
    div.className = "gloss";
    div.innerHTML = `<div class="content">
    <img src="./assets/images/gloss/popup/" alt=""> 
  </div>
  <div class="btns">
    <img src="./assets/images/gloss/buttons/1-n.png" alt="">
    <img src="./assets/images/gloss/buttons/2-n.png" alt="">
    <img src="./assets/images/gloss/buttons/3-n.png" alt="">
  </div>`;
    bottomB.append(div);

    const glossBtns = document.querySelectorAll(".gloss .btns img");
    const glossContent = document.querySelector(".gloss .content img");

    glossBtns.forEach((btn, btnIndx) => {
      btn.onclick = () => {
        glossContent.src =
          glossContent.src.slice(0, glossContent.src.lastIndexOf("/")) +
          "/" +
          (btnIndx + 1) +
          ".png";
        for (let i = 0; i < glossBtns.length; i++) {
          glossBtns[i].src =
            btn.src.slice(0, btn.src.lastIndexOf("/")) +
            "/" +
            (btnIndx + 1) +
            "-t.png";
        }
        btn.src =
          btn.src.slice(0, btn.src.lastIndexOf("/")) +
          "/" +
          (btnIndx + 1) +
          "-s.png";
      };
    });
  } else if (action == "remove") {
    bottomB.querySelector(".gloss")?.remove();
  }
}

function exHandler(action) {
  if (action == "init") {
    const div = document.createElement("div");
    div.className = "ex";
    div.innerHTML = `<div class="navigator">
        <img src="./assets/images/ex3/1.png" alt="">
        <button class="nav1"></button>
        <button class="nav2"></button>
        <button class="nav3"></button>
        <button class="nav4"></button>
    </div>`;
    bottomB.append(div);
    const navBtns = document.querySelectorAll(".navigator button");
    const navImg = document.querySelector(".navigator img");
    const ex = document.querySelector(".ex");
    navBtns.forEach((btn, btnIndx) => {
      btn.onclick = () => {
        if (btnIndx == 2) {
          const ex3 = document.createElement("div");
          ex3.className = "ex3";
          ex3.innerHTML = `<div class="g1">
              <button>تحقق من إجاباتك</button>
              <div>
                  <input type="text" maxlength="1" class="i1">
                  <input type="text" maxlength="1" class="i2">
              </div>
          </div>
          <div class="g2">
              <button>تحقق من إجاباتك</button>
              <div>
                  <input type="text" maxlength="1" class="i3">
                  <input type="text" maxlength="1" class="i4">
              </div>
          </div>
          <div class="g3">
              <button>تحقق من إجاباتك</button>
              <div>
                  <input type="text" maxlength="1" class="i5">
                  <input type="text" maxlength="1" class="i6">
              </div>
          </div>`;

          ex.append(ex3);

          resetBg("url(./assets/images/ex3/b3.png)", "228vw");
          navImg.src =
            navImg.src.slice(0, navImg.src.lastIndexOf("/")) +
            "/" +
            (btnIndx + 1) +
            ".png";
        } else {
          resetBg("url(./assets/images/ex3/b.png)", "228vw");
          switch (btnIndx) {
            case 0:
              navImg.src =
                navImg.src.slice(0, navImg.src.lastIndexOf("/")) +
                "/" +
                (btnIndx + 1) +
                ".png";
              break;
            case 1:
              navImg.src =
                navImg.src.slice(0, navImg.src.lastIndexOf("/")) +
                "/" +
                (btnIndx + 1) +
                ".png";
              break;
            case 3:
              navImg.src =
                navImg.src.slice(0, navImg.src.lastIndexOf("/")) +
                "/" +
                (btnIndx + 1) +
                ".png";
              break;

            default:
              break;
          }
          bottomB.querySelector(".ex3")?.remove();
        }
      };
    });
  } else if (action == "remove") {
    bottomB.querySelector(".ex")?.remove();
  }
}
