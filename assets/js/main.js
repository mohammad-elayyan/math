const audio = document.querySelector("audio");
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
        // resetBg("url(./assets/images/ex3/b.png)", "208vw");
        resetBg("url(./assets/images/exercises/nav/b1.svg)", "149vw");
        exHandler("init");
        break;
      case 2:
        btn.src = btn.src.slice(0, btn.src.lastIndexOf("/")) + "/tr-sel.svg";
        resetBg("url(./assets/images/exercises/nav/b.svg)", "110.3vw");
        exrsHandler("init");
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
    <img src="./assets/images/gloss/math.gif" class="gif" alt=""> 
  </div>
  <div class="btns">
    <img src="./assets/images/gloss/buttons/1-n.svg" alt="">
    <img src="./assets/images/gloss/buttons/2-n.svg" alt="">
    <img src="./assets/images/gloss/buttons/3-n.svg" alt="">
  </div>`;
    bottomB.append(div);

    const glossBtns = document.querySelectorAll(".gloss .btns img");
    const glossContent = document.querySelectorAll(".gloss .content img")[0];

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
        audioHandler("init", "g", btnIndx);
      };
    });
  } else if (action == "remove") {
    bottomB.querySelector(".gloss")?.remove();
    audioHandler("remove");
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
      const video = document.createElement("video");
      const iframe = document.createElement("iframe");
      const img = document.createElement("img");
      iframe.className = "iframe";
      video.setAttribute("controls", "true");
      if (btnIndx == 0) {
        video.src = `./assets/videos/${btnIndx + 1}.mp4`;
        ex.append(video);
        img.src = `./assets/images/chkBtn.svg`;
        img.className = "i01";
        ex.append(img);
        iframe.src = `./assets/exercises/v${btnIndx + 1}/index.html`;
        ex.append(iframe);
      }
      btn.onclick = () => {
        bottomB.querySelector(".ex").children[3]?.remove();
        if (btnIndx == 2) {
          bottomB.querySelector(".ex").children[2]?.remove();
          bottomB.querySelector(".ex").children[1]?.remove();
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
                  </div><div class="g4">
                  <button class="check">تحقق من إجاباتك</button>
                  <button class="check">تحقق من إجاباتك</button>
                  <div>
                  <input type="text" class="i7 ">
                  <input type="text"  class="i8 ">
                  <input type="text"  class="i9 ">
                  </div>
                  </div>`;

          ex.append(ex3);

          resetBg("url(./assets/images/ex3/b3.png)", "237vw");
          navImg.src =
            navImg.src.slice(0, navImg.src.lastIndexOf("/")) +
            "/" +
            (btnIndx + 1) +
            ".svg";

          const checkBtns = bottomB.querySelectorAll(".ex3 .check");
          const chkBtn = bottomB.querySelector(".ex3 .chk");

          checkBtns.forEach((btn, btnIndx) => {
            const ex3 = bottomB.querySelector(".ex3");
            let inputs = btn.nextElementSibling.children;
            btn.onclick = () => {
              if (btnIndx < 3) {
                if (
                  inputs[0].value !== "" &&
                  inputs[1].value !== "" &&
                  !isNaN(inputs[0].value) &&
                  !isNaN(inputs[1].value)
                ) {
                  let res = false;
                  for (let i = 0; i < inputs.length; i++) {
                    if (i + 1 < inputs.length) {
                      let overlay = "";

                      switch (btnIndx) {
                        case 0:
                          res = inputCheck(
                            inputs[i].value,
                            inputs[i + 1].value,
                            4,
                            2
                          );
                          overlay = createFeedback(
                            true,
                            res,
                            inputs,
                            i,
                            btnIndx,
                            ["42.5", "60.15", "41", "65"]
                          );
                          ex3.children[btnIndx].append(overlay);
                          break;
                        case 1:
                          res = inputCheck(
                            inputs[i].value,
                            inputs[i + 1].value,
                            4,
                            2
                          );
                          overlay = createFeedback(
                            true,
                            res,
                            inputs,
                            i,
                            btnIndx,
                            ["78.3", "96", "77", "100.8"]
                          );

                          ex3.children[btnIndx].append(overlay);
                          break;

                        case 2:
                          res = inputCheck(
                            inputs[i].value,
                            inputs[i + 1].value,
                            6,
                            0
                          );
                          overlay = createFeedback(
                            false,
                            res,
                            inputs,
                            i,
                            btnIndx,
                            ["126.3", "145.45", "124.9"]
                          );

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
              } else {
                if (btnIndx == 3) {
                  let inp1 = ex3.querySelectorAll("input")[btnIndx * 2];
                  if (inp1.value != "" && !isNaN(inp1.value)) {
                    let res = inputCheck(inp1.value, "", 4, "", true);
                    if (res) {
                      inp1.style.color = "#3dd15d";
                      inp1.setAttribute("readonly", "true");
                    } else {
                      inp1.style.color = "#dc767c";
                    }
                  } else {
                    alert("يرجى ادخال قيمة صحيحة");
                  }
                } else if (btnIndx == 4) {
                  let inp1 = ex3.querySelectorAll("input")[btnIndx * 2 - 1];
                  let inp2 = ex3.querySelectorAll("input")[btnIndx * 2];
                  if (
                    inp1.value != "" &&
                    !isNaN(inp1.value) &&
                    inp2.value != "" &&
                    !isNaN(inp2.value)
                  ) {
                    let res = inputCheck(inp1.value, inp2.value, -36, 0);

                    if (res) {
                      inp1.style.color = "#3dd15d";
                      inp2.style.color = "#3dd15d";
                      inp1.setAttribute("readonly", "true");
                      inp2.setAttribute("readonly", "true");
                    } else {
                      inp1.style.color = "#dc767c";
                      inp2.style.color = "#dc767c";
                    }
                  } else {
                    alert("يرجى ادخال قيمة صحيحة");
                  }
                }
              }
            };
          });
        } else {
          bottomB.querySelector(".ex").children[3]?.remove();
          bottomB.querySelector(".ex").children[2]?.remove();
          bottomB.querySelector(".ex").children[1]?.remove();
          resetBg("url(./assets/images/exercises/nav/b.svg)", "149vw");

          video.src = `./assets/videos/${btnIndx + 1}.mp4`;
          ex.append(video);

          if (btnIndx <= 1) {
            img.src = `./assets/images/chkBtn.svg`;
            img.className = "i01";
            ex.append(img);
            resetBg("url(./assets/images/exercises/nav/b1.svg)", "149vw");
            iframe.src = `./assets/exercises/v${btnIndx + 1}/index.html`;
            ex.append(iframe);
          } else if (btnIndx == 3) {
            resetBg("url(./assets/images/exercises/nav/b.svg)", "110.3vw");
          }

          let chk = document.createElement("div");
          chk.className = "ex4";
          chk.innerHTML = `<img src="./assets/images/chkBtn.svg" /><div class="q"><h2>تُظهر العدسة المكبرة المجاورة أكبر 7 مرات من حجمها الأصلي. إذا كان بذرة التفاح المجاورة تحت العدسة 1.75cm فأجد الطول الحقيقي لبذرة التفاح.</h2><img src="./assets/images/ex4/1.svg" /> </div><div class="g2">
          <button class="check">تحقق من إجاباتك</button>
          <div>
          <input type="text" class="i5">
          </div>
          </div>`;

          switch (btnIndx) {
            case 0:
              navImg.src =
                navImg.src.slice(0, navImg.src.lastIndexOf("/")) +
                "/" +
                (btnIndx + 1) +
                ".svg";
              break;
            case 1:
              navImg.src =
                navImg.src.slice(0, navImg.src.lastIndexOf("/")) +
                "/" +
                (btnIndx + 1) +
                ".svg";
              break;
            case 3:
              navImg.src =
                navImg.src.slice(0, navImg.src.lastIndexOf("/")) +
                "/" +
                (btnIndx + 1) +
                ".svg";
              ex.append(chk);

              const chkBtn = document.querySelector(".check");
              const inp = document.querySelector("input");

              chkBtn.onclick = () => {
                let res = inputCheck(inp.value, "", 0.25, "");
                if (res) {
                  inp.style.color = "#3dd15d";
                  inp.setAttribute("readonly", "true");
                } else {
                  inp.style.color = "#dc767c";
                }
              };
              break;

            default:
              break;
          }
        }
      };
    });
  } else if (action == "remove") {
    bottomB.querySelector(".ex")?.remove();
  }
}

function exrsHandler(action) {
  if (action == "init") {
    const div = document.createElement("div");
    div.className = "ex";
    div.innerHTML = `<div class="navigator">
        <img src="./assets/images/exercises/nav/1.svg" alt="">
        <button class="nav1"></button>
        <button class="nav2"></button>
        <button class="nav3"></button>
        <button class="nav4"></button>
        <button class="nav5"></button>
        <button class="nav6"></button>
        <button class="nav7"></button>
        <button class="nav8"></button>
        <button class="nav9"></button>
        <button class="nav10"></button>
    </div>`;
    bottomB.append(div);
    const navBtns = document.querySelectorAll(".navigator button");
    const navImg = document.querySelector(".navigator img");
    const ex = document.querySelector(".ex");
    navBtns.forEach((btn, btnIndx) => {
      const iframe = document.createElement("iframe");
      iframe.className = "iframe";
      if (btnIndx == 0) {
        iframe.src = `./assets/exercises/1/index.html`;
        ex.append(iframe);
      }
      btn.onclick = () => {
        document.querySelector(".iframe").remove();
        navImg.src =
          navImg.src.slice(0, navImg.src.lastIndexOf("/")) +
          "/" +
          (btnIndx + 1) +
          ".svg";
        232;

        ex.children[3]?.remove();
        ex.children[2]?.remove();
        ex.children[1]?.remove();
        if (btnIndx >= 2 && btnIndx <= 4) {
          let res = "";
          const div = document.createElement("div");
          div.innerHTML = `<h1>أجد معامل التكبير في كل مما يأتي:</h1>
          <img src="./assets/images/exercises/${btnIndx}.svg" alt="">
          <div>
          <h2 class="num z-3">معامل التكبير = </h2>
          <input class="z-3" type="text" />
          <button class="check">تحقق من إجاباتك</button>
          </div>
          `;
          div.className = "img";
          ex.append(div);

          const chk = document?.querySelector(".img button");
          const inp = document.querySelectorAll(".img input");
          chk &&
            (chk.onclick = () => {
              if (inp[0].value !== "" && !isNaN(inp[0].value)) {
                switch (btnIndx) {
                  case 2:
                    res = inputCheck(
                      document?.querySelector(".img input").value,
                      0,
                      2,
                      0
                    );
                    break;
                  case 3:
                    res = inputCheck(
                      document?.querySelector(".img input").value,
                      0,
                      3,
                      0
                    );
                    break;
                  case 4:
                    res = inputCheck(
                      document?.querySelector(".img input").value,
                      0,
                      2,
                      0
                    );
                    break;

                  default:
                    break;
                }
                overlay = createFeedback(false, res, inp, 0, btnIndx, [
                  "21",
                  "18",
                  "22.3",
                  "19.4",
                ]);
                ex.append(overlay);
              } else {
                alert("يرجى ادخال قيمة صحيحة");
              }
            });
        } else if (btnIndx == 7) {
          const div = document.createElement("div");
          div.className = "ex3 exr8 ";
          div.innerHTML = `
          <img src="./assets/images/exercises/asset.svg" style="width: 67.3vw;position: absolute;left: 4vw;top: 1.5vw;" />
          <div class="g4">
          <button class="check">تحقق من إجاباتك</button>
          <button class="check">تحقق من إجاباتك</button>
          <div>
          <input type="text" class="i7 ">
          <input type="text"  class="i8 ">
          <input type="text"  class="i9 ">
          </div>
          </div>`;
          ex.append(div);
          let chk = document.createElement("div");
          chk.className = "ex4";
          chk.innerHTML = `<img src="./assets/images/exercises/asset2.svg" style="width: 67.3vw;position: absolute;left: 0vw;top: 1.5vw;" /><div class="g2">
          <button class="check">تحقق من إجاباتك</button>
          <div>
          <input type="text" class="i5">
          </div>
          </div>`;
          ex.append(chk);

          const chkBtns = document.querySelectorAll(".check");
          const inp = document.querySelectorAll("input");
          chkBtns.forEach((chkBtn, chkBtnIndx) => {
            chkBtn.onclick = () => {
              switch (chkBtnIndx) {
                case 0:
                  let res1 = inputCheck(inp[chkBtnIndx].value, "", 2, "");
                  if (
                    inp[chkBtnIndx].value != "" &&
                    !isNaN(inp[chkBtnIndx].value)
                  ) {
                    if (res1) {
                      inp[chkBtnIndx].style.color = "#3dd15d";
                      inp[chkBtnIndx].setAttribute("readonly", "true");
                    } else {
                      inp[chkBtnIndx].style.color = "#dc767c";
                    }
                  } else {
                    alert("يرجى ادخال قيمة صحيحة");
                  }
                  break;
                case 1:
                  let res2 = inputCheck(
                    inp[chkBtnIndx].value,
                    inp[chkBtnIndx + 1].value,
                    0,
                    8
                  );
                  if (
                    inp[chkBtnIndx].value != "" &&
                    !isNaN(inp[chkBtnIndx].value) &&
                    inp[chkBtnIndx + 1].value != "" &&
                    !isNaN(inp[chkBtnIndx + 1].value)
                  ) {
                    if (res2) {
                      inp[chkBtnIndx].style.color = "#3dd15d";
                      inp[chkBtnIndx + 1].style.color = "#3dd15d";
                      inp[chkBtnIndx].setAttribute("readonly", "true");
                      inp[chkBtnIndx + 1].setAttribute("readonly", "true");
                    } else {
                      inp[chkBtnIndx].style.color = "#dc767c";
                      inp[chkBtnIndx + 1].style.color = "#dc767c";
                    }
                  } else {
                    alert("يرجى ادخال قيمة صحيحة");
                  }
                  break;
                case 2:
                  let res3 = inputCheck(
                    inp[chkBtnIndx + 1].value,
                    "",
                    1.25,
                    ""
                  );
                  if (
                    inp[chkBtnIndx + 1].value != "" &&
                    !isNaN(inp[chkBtnIndx + 1].value)
                  ) {
                    if (res3) {
                      inp[chkBtnIndx + 1].style.color = "#3dd15d";
                      inp[chkBtnIndx + 1].setAttribute("readonly", "true");
                    } else {
                      inp[chkBtnIndx + 1].style.color = "#dc767c";
                    }
                  } else {
                    alert("يرجى ادخال قيمة صحيحة");
                  }
                  break;
                default:
                  break;
              }
            };
          });
        } else if (btnIndx == 9) {
          let chk = document.createElement("div");
          chk.className = "ex4 exr10";
          chk.innerHTML = `<div class="q">
          <h2>تبرير مثلث إحداثيات رؤوسه (1) (1) (1) كبر باستعمال نقطة الأصل كمركز للتكبير، فإذا كان إحداثيًا أحد رؤوس الصورة (186) المطلوب</h2>
          <div class="g4">
          <button class="check">تحقق من إجاباتك</button>
          <button class="check">تحقق من إجاباتك</button>
          <div>
          <h2 style="position: absolute;right: 0;top: 12.8vw;">معامل التكبير</h2>
          <h2 style="position: absolute;right: 0;top: 16vw;">إحداثيي الرأس B بعد التكبير</h2>
          <input type="text" class="i7 ">
          <input type="text"  class="i8 ">
          <input type="text"  class="i9 ">
          </div>
          </div>
          </div>
          <div class="q">
          <h2>أكتشف الخطأ رسم عدنان مستطيلاً طوله 3cm، وعرضه 2cm، ثم أوجد صورة له تحت تأثير معامل تكبير قيمته 5، فكان عرض المستطيل الجديد 15cm ، أبين الخطأ الذي وقع فيه عدنان وأصححه.</h2>
          <div class="g4">
          <textarea rows="7"></textarea>
          <button class="check">إرسال</button>
          </div>
          </div>
          <div class="q">
          <h2>اكتب كيف أجد معامل التكبير لشكل مرسوم في المستوى الإحداثي؟</h2>
          <div class="g4">
          <textarea rows="7"></textarea>
          <button class="check">إرسال</button>
          </div>
          </div>
          `;
          ex.append(chk);

          const chkBtns = document.querySelectorAll(".check");
          const inp = document.querySelectorAll("input");
          chkBtns.forEach((chkBtn, chkBtnIndx) => {
            chkBtn.onclick = () => {
              switch (chkBtnIndx) {
                case 0:
                  let res1 = inputCheck(inp[chkBtnIndx].value, "", 6, "");
                  if (
                    inp[chkBtnIndx].value != "" &&
                    !isNaN(inp[chkBtnIndx].value)
                  ) {
                    if (res1) {
                      inp[chkBtnIndx].style.color = "#3dd15d";
                      inp[chkBtnIndx].setAttribute("readonly", "true");
                    } else {
                      inp[chkBtnIndx].style.color = "#dc767c";
                    }
                  } else {
                    alert("يرجى ادخال قيمة صحيحة");
                  }
                  break;
                case 1:
                  let res2 = inputCheck(
                    inp[chkBtnIndx].value,
                    inp[chkBtnIndx + 1].value,
                    0,
                    6
                  );
                  if (
                    inp[chkBtnIndx].value != "" &&
                    !isNaN(inp[chkBtnIndx].value) &&
                    inp[chkBtnIndx + 1].value != "" &&
                    !isNaN(inp[chkBtnIndx + 1].value)
                  ) {
                    if (res2) {
                      inp[chkBtnIndx].style.color = "#3dd15d";
                      inp[chkBtnIndx + 1].style.color = "#3dd15d";
                      inp[chkBtnIndx].setAttribute("readonly", "true");
                      inp[chkBtnIndx + 1].setAttribute("readonly", "true");
                    } else {
                      inp[chkBtnIndx].style.color = "#dc767c";
                      inp[chkBtnIndx + 1].style.color = "#dc767c";
                    }
                  } else {
                    alert("يرجى ادخال قيمة صحيحة");
                  }
                  break;

                default:
                  break;
              }
            };
          });
        } else {
          iframe.src = `./assets/exercises/${btnIndx + 1}/index.html`;
          ex.append(iframe);
        }
      };
    });
  } else if (action == "remove") {
    bottomB.querySelector(".ex")?.remove();
  }
}

function inputCheck(a, b, x, y, us = false) {
  if (!us) {
    if (a == x && b == y) {
      return true;
    } else {
      return false;
    }
  } else {
    if (a == x) {
      return true;
    } else {
      return false;
    }
  }
}

function removeOverlay() {
  const overlay = bottomB.querySelector(".overlay");
  const inputs = bottomB.querySelectorAll("input");
  inputs.forEach((i) => {
    i.removeAttribute("readonly");
    i.style.color = "#000";
    document.querySelector(".num") &&
      (document.querySelector(".num").style.color = "#000");
  });
  overlay.remove();
}

function createFeedback(
  answer = false,
  res = false,
  inputs = [],
  i = 0,
  indx = 0,
  y = []
) {
  const overlay = document.createElement("div");
  overlay.className = "overlay z-2";
  // if (!isChk) {
  let h1 = answer && inputs[i]?.value / inputs[i + 1]?.value;
  // if (inputs.length > 1) {
  if (res) {
    overlay.innerHTML = `
      <button onclick="removeOverlay()" style="top: ${
        y[0]
      }vw" class="x z-4"></button>
      <img src="./assets/images/ex3/q${
        indx + 1
      }t.svg" class="box z-3" style="top:  ${y[1]}vw;" alt="" />
      <img src="./assets/images/ex3/t.svg" class="feedback z-3" style="top:  ${
        y[2]
      }vw;" alt="" />
  
      <h1 class="z-4" style="top:  ${
        y.length == 4 && y[3]
      }vw;color:#3dd15d;">${h1}</h1>
        <button class="fb-btn z-4">أحسنت</button>`;
    inputs[0].style.color = "#3dd15d";
    inputs[1].style.color = "#3dd15d";
  } else {
    overlay.innerHTML = `
        <button onclick="removeOverlay()" style="top:  ${
          y[0]
        }vw" class="x z-4"></button>
      <img src="./assets/images/ex3/q${
        indx + 1
      }f.svg" class="box z-3" style="top:  ${y[1]}vw;" alt="" />
      <img src="./assets/images/ex3/f.svg" class="feedback z-3" style="top:  ${
        y[2]
      }vw;" alt="" />
      <h1 class="z-4" style="top:  ${
        y.length == 4 && y[3]
      }vw;color:#dc767c;">${h1}</h1>
      <button onclick="removeOverlay()" class="fb-btn retry z-4">إعادة المحاولة</button>`;
    inputs[0].style.color = "#dc767c";
    inputs[1].style.color = "#dc767c";
  }
  // } else {
  //   // document.querySelector(".num").style.color = "#fff";
  //   if (res) {
  //     overlay.innerHTML = ` <button class="fb-btn z-4">أحسنت</button><button onclick="removeOverlay()" style="top: ${y[2]}vw;left:${y[3]}vw" class="x z-4"></button><img src="./assets/images/ex3/t.svg" class="feedback z-3" style="top: ${y[0]}vw;left:${y[1]}vw" alt="" />`;
  //     inputs[0].style.color = "#3dd15d";
  //   } else {
  //     inputs[0].style.color = "#dc767c";
  //     overlay.innerHTML = `<button onclick="removeOverlay()" class="fb-btn retry z-4">إعادة المحاولة</button><button onclick="removeOverlay()" style="top: ${y[2]}vw;left:${y[3]}vw" class="x z-4"></button><img src="./assets/images/ex3/f.svg" class="feedback z-3" style="top: ${y[0]}vw;left:${y[1]}vw" alt="" />`;
  //   }
  // }
  inputs[0]?.setAttribute("readonly", "true");
  inputs[1]?.setAttribute("readonly", "true");

  return overlay;
}

function audioHandler(action, pre = "", indx = "") {
  if (action == "init") {
    audio.src = `./assets/audio/${pre + (indx + 1)}.mp3`;
    audio.play();
  } else {
    audio.pause();
    audio.src = ``;
  }
}
