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

  resetBg("url(./assets/images/b/bottom.png)", "70vw");
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
        ".svg");
  }
});

popupsBtns.forEach((btn, btnIndx) => {
  btn.onclick = () => {
    title.src =
      title.src.slice(0, title.src.lastIndexOf("/")) +
      "/" +
      (btnIndx + 1) +
      ".svg";

    for (let i = 0; i < popupsBtns.length; i++) {
      switch (i) {
        case 0:
          popupsBtns[i].src =
            popupsBtns[i].src.slice(0, popupsBtns[i].src.lastIndexOf("/")) +
            "/gl.svg";
          break;
        case 1:
          popupsBtns[i].src =
            popupsBtns[i].src.slice(0, popupsBtns[i].src.lastIndexOf("/")) +
            "/act.svg";

          break;
        case 2:
          popupsBtns[i].src =
            popupsBtns[i].src.slice(0, popupsBtns[i].src.lastIndexOf("/")) +
            "/tr.svg";
          break;
        default:
          break;
      }
    }
    glossHandler("remove");
    exHandler("remove");
    switch (btnIndx) {
      case 0:
        btn.src = btn.src.slice(0, btn.src.lastIndexOf("/")) + "/gl-sel.svg";
        resetBg("url(./assets/images/gloss/back/b.png)", "96.3vw");
        glossHandler("init");
        break;
      case 1:
        btn.src = btn.src.slice(0, btn.src.lastIndexOf("/")) + "/act-sel.svg";
        resetBg("url(./assets/images/ex3/b.png)", "208vw");
        exHandler("init");
        break;
      case 2:
        btn.src = btn.src.slice(0, btn.src.lastIndexOf("/")) + "/tr-sel.svg";
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
    <img src="./assets/images/gloss/buttons/1-n.svg" alt="">
    <img src="./assets/images/gloss/buttons/2-n.svg" alt="">
    <img src="./assets/images/gloss/buttons/3-n.svg" alt="">
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
          ".svg";
        for (let i = 0; i < glossBtns.length; i++) {
          glossBtns[i].src =
            btn.src.slice(0, btn.src.lastIndexOf("/")) +
            "/" +
            (i + 1) +
            "-t.svg";
        }
        btn.src =
          btn.src.slice(0, btn.src.lastIndexOf("/")) +
          "/" +
          (btnIndx + 1) +
          "-s.svg";
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
        <img src="./assets/images/ex3/1.svg" alt="">
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
              <button class="check">تحقق من إجاباتك</button>
              <div>
                  <input type="text" maxlength="1" class="i1 z-4">
                  <input type="text" maxlength="1" class="i2 z-4">
              </div>
          </div>
          <div class="g2">
              <button class="check">تحقق من إجاباتك</button>
              <div>
                  <input type="text" maxlength="1" class="i3 z-4">
                  <input type="text" maxlength="1" class="i4 z-4">
              </div>
          </div>
          <div class="g3">
              <button class="check">تحقق من إجاباتك</button>
              <div>
                  <input type="text" maxlength="1" class="i5 z-4">
                  <input type="text" maxlength="1" class="i6 z-4">
              </div>
          </div>`;

          ex.append(ex3);

          resetBg("url(./assets/images/ex3/b3.png)", "208vw");
          navImg.src =
            navImg.src.slice(0, navImg.src.lastIndexOf("/")) +
            "/" +
            (btnIndx + 1) +
            ".svg";

          const checkBtns = bottomB.querySelectorAll(".ex3 .check");

          checkBtns.forEach((btn, btnIndx) => {
            let inputs = btn.nextElementSibling.children;
            btn.onclick = () => {
              if (
                inputs[0].value !== "" &&
                inputs[1].value !== "" &&
                !isNaN(inputs[0].value) &&
                !isNaN(inputs[1].value)
              ) {
                let res = false;
                for (let i = 0; i < inputs.length; i++) {
                  // console.log(inputs[i].value);
                  if (i + 1 < inputs.length) {
                    const ex3 = bottomB.querySelector(".ex3");
                    const overlay = document.createElement("div");
                    overlay.className = "overlay z-2";

                    switch (btnIndx) {
                      case 0:
                        res = inputCheck(
                          inputs[i].value,
                          inputs[i + 1].value,
                          4,
                          2
                        );
                        if (res) {
                          overlay.innerHTML = `
                          <button onclick="removeOverlay()" style="top: 43.5vw;" class="x z-4"></button>
                          <img src="./assets/images/ex3/q1t.svg" class="box z-3" style="top: 60.15vw;" alt="" />
                          <img src="./assets/images/ex3/t.svg" class="feedback z-3" style="top: 41vw;" alt="" />
                          <h1 class="z-4" style="top: 65vw;color:#3dd15d;">${
                            inputs[i].value / inputs[(i = 1)].value
                          }</h1>
                            <button class="fb-btn z-4">أحسنت</button>`;
                          inputs[0].style.color = "#3dd15d";
                          inputs[1].style.color = "#3dd15d";
                        } else {
                          overlay.innerHTML = `
                            <button onclick="removeOverlay()" style="top: 43.5vw;" class="x z-4"></button>
                          <img src="./assets/images/ex3/q1f.svg" class="box z-3" style="top: 60.15vw;" alt="" />
                          <img src="./assets/images/ex3/f.svg" class="feedback z-3" style="top: 41vw;" alt="" />
                          <h1 class="z-4" style="top: 65vw;color:#dc767c;">${
                            inputs[i].value / inputs[(i = 1)].value
                          }</h1>
                          <button onclick="removeOverlay()" class="fb-btn retry z-4">إعادة المحاولة</button>`;
                          inputs[0].style.color = "#dc767c";
                          inputs[1].style.color = "#dc767c";
                        }
                        inputs[0].setAttribute("readonly", "true");
                        inputs[1].setAttribute("readonly", "true");
                        ex3.children[btnIndx].append(overlay);
                        break;
                      case 1:
                        res = inputCheck(
                          inputs[i].value,
                          inputs[i + 1].value,
                          4,
                          2
                        );
                        if (res) {
                          overlay.innerHTML = `
                          <button onclick="removeOverlay()" style="top: 78.3vw;" class="x z-4"></button>
                          <img src="./assets/images/ex3/q2t.svg" class="box z-3" style="top: 96vw;" alt="" />
                          <img src="./assets/images/ex3/t.svg" class="feedback z-3" style="top: 77vw;" alt="" />
                          <h1 class="z-4" style="top: 100.8vw;">${
                            inputs[i].value / inputs[(i = 1)].value
                          }</h1>
                            <button class="fb-btn z-4">أحسنت</button>`;
                        } else {
                          overlay.innerHTML = `
                            <button onclick="removeOverlay()" style="top: 78.3vw;" class="x z-4"></button>
                          <img src="./assets/images/ex3/q2f.svg" class="box z-3" style="top: 96vw;" alt="" />
                          <img src="./assets/images/ex3/f.svg" class="feedback z-3" style="top: 77vw;" alt="" />
                          <h1 class="z-4" style="top: 100.8vw;color:#dc767c;">${
                            inputs[i].value / inputs[(i = 1)].value
                          }</h1>
                          <button onclick="removeOverlay()" class="fb-btn retry z-4">إعادة المحاولة</button>`;
                          inputs[0].style.color = "#dc767c";
                          inputs[1].style.color = "#dc767c";
                        }
                        inputs[0].setAttribute("readonly", "true");
                        inputs[1].setAttribute("readonly", "true");
                        ex3.children[btnIndx].append(overlay);
                        break;
                      case 2:
                        res = inputCheck(
                          inputs[i].value,
                          inputs[i + 1].value,
                          6,
                          0
                        );
                        if (res) {
                          overlay.innerHTML = `
                          <button onclick="removeOverlay()" style="top: 126.3vw;" class="x z-4"></button>
                          <img src="./assets/images/ex3/q3t.svg" class="box z-3" style="top: 145.3vw;" alt="" />
                          <img src="./assets/images/ex3/t.svg" class="feedback z-3" style="top: 124.9vw;" alt="" />
                          
                            <button class="fb-btn z-4">أحسنت</button>`;
                        } else {
                          overlay.innerHTML = `
                            <button onclick="removeOverlay()" style="top: 126.3vw;" class="x z-4"></button>
                          <img src="./assets/images/ex3/q3f.svg" class="box z-3" style="top: 145.3vw;" alt="" />
                          <img src="./assets/images/ex3/f.svg" class="feedback z-3" style="top: 124.9vw;" alt="" />
                          
                          <button onclick="removeOverlay()" class="fb-btn retry z-4">إعادة المحاولة</button>`;
                          inputs[0].style.color = "#dc767c";
                          inputs[1].style.color = "#dc767c";
                        }
                        inputs[0].setAttribute("readonly", "true");
                        inputs[1].setAttribute("readonly", "true");
                        ex3.children[btnIndx].append(overlay);
                        break;
                      default:
                        break;
                    }
                  }
                }
              } else {
                alert("يرجى ادخال قيم صحيحة");
              }
            };
          });
        } else {
          resetBg("url(./assets/images/ex3/b.png)", "208vw");

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

function inputCheck(a, b, x, y) {
  if (a == x && b == y) {
    return true;
  } else {
    return false;
  }
}
function removeOverlay() {
  const overlay = bottomB.querySelector(".overlay");
  const inputs = bottomB.querySelectorAll("input");
  inputs.forEach((i) => {
    i.removeAttribute("readonly");
    i.style.color = "#000";
  });
  overlay.remove();
}
