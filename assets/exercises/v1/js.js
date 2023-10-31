const MyPurple='#7e4d7c';
const myBlue='#4388a3';
const myLightBlue='#88cbd4';
const myGrey='rgba(59, 118, 165, 0.3)';

window.onload = () => {
  const undo=document.getElementById('undo');
  const canvas = document.getElementById("myc");
  const board = document.getElementById("board");
  const header = document.querySelector(".header");
  const step_pixles = 18;
  const context = canvas.getContext("2d");
  canvas.style.background = "#FFF";
  let saved_distances_div = document.querySelector(".saved-distances");
  let x_guide_start = 0;
  let y_guide_start = 0;
  let cw, ch;
  resize();
  let m, c, xy_pair;
  let line_extension = 1000;
  let scale_factor = 3;
  let givenPoint = [getProjectedX(2), getProjectedY(2), 2];
  let points = [
    [getProjectedX(0), getProjectedY(0), 3],
    [getProjectedX(0), getProjectedY(2), 3],
    [getProjectedX(1), getProjectedY(1), 3],
    [getProjectedX(2), getProjectedY(1), 3],
    [getProjectedX(2), getProjectedY(0), 3],
   
  ];
  let slop_arr = [];
  let c_arr = [];
  let distance_array = [];
  let new_points = [];
  let sq_width = cw / step_pixles;
  let My_measure = ["OA=", "OB=", "OC=","OD=", "OE="];

  let confirm_box = document.querySelector(".confirm");
  let ok_d = confirm_box.querySelector("#ok_d");
  let cancel_d = confirm_box.querySelector("#cancel_d");
  let overlay_box = document.querySelector(".overlay");
  let chkBtn=document.getElementById('chkBtn');

  let current_Distance = 0;

  //////////new

  var just_clicked_X = null;
  var just_clicked_Y = null;
  var just_moving_X = null;
  var just_moving_Y = null;


  let screenWidth = document.documentElement.clientWidth;
  let screenHeight = document.documentElement.clientHeight;
  let offsetX = (screenWidth - cw) / 2;
  let offsetY = (screenHeight - ch) / 2;
  let is_draw = false;
  let is_finished = true;

  let clicked_X_arr = [];
  let clicked_Y_arr = [];
  let line_X_arr = [];
  let line_Y_arr = [];

  let shape_X_arr = [];
  let shape_Y_arr = [];


  let labels = ["A", "B", "C", "D", "E"];

  
  
  let opt_selector = "na";

   let line_points = [];
   let shape_points = [];


  function resize() {
    let w = getComputedStyle(board).width.split("px")[0];
    let h = getComputedStyle(board).height.split("px")[0];
    canvas.width = w;
    canvas.height = h;
    cw = canvas.width;
    ch = canvas.height;
    header.style.width = `calc(${cw}px - 2vw)`;
    // header.style.width = w+'px';

  }

  window.onresize = () => {
    resize();
    initial_setup();
    fill_distance_div();
  };




  function draw(x1, x2, y1, y2, color, line_w) {
    context.beginPath();
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = line_w;
    context.strokeStyle = color;
    context.stroke();
  }

  function animate() {
    requestAnimationFrame(animate);
    x_guide_start += 0.1;
    draw();
  }

  function drawX_lines() {
    context.setLineDash([]);
    for (let index = 0; index < cw; index++) {
      draw(x_guide_start, x_guide_start, 0, ch,myGrey, 1);

      x_guide_start += cw / step_pixles;
    }
  }

  function drawY_lines() {
    context.setLineDash([]);

    for (let index = 0; index < ch; index++) {
      context.strokeStyle = myGrey;

      draw(0, cw, y_guide_start, y_guide_start, myGrey, 1);

      y_guide_start += ch / step_pixles;
    }
  }

  // drawX_lines();
  // drawY_lines();
  // drawXY_axis();



  
  let axisOffset=0.5;
  function drawXY_axis(limX,limY) {
    context.strokeStyle = "blue";
    draw(getProjectedX(-limX-axisOffset), getProjectedX(limX+axisOffset), ch / 2, ch / 2);
    draw(cw / 2, cw / 2, getProjectedY(-limY-axisOffset), getProjectedY(limY+axisOffset));
    draw_ticks(limX,limY);

  }

  function draw_ticks(limX,limY)
  {
    let yLimit=limX;
    let xLimit=limY;
    write_txt("⮝",getProjectedX(0), getProjectedY(limY+axisOffset/2),"1.5vw tj-b");
    write_txt('⮟',getProjectedX(0), getProjectedY(-limY-axisOffset),"1.5vw tj-b");
    write_txt('⮞',getProjectedX(limX+axisOffset), getProjectedY(-0.25),"1.5vw tj-b");
    write_txt('⮜',getProjectedX(-limX-axisOffset), getProjectedY(-0.25),"1.5vw tj-b");




    for (let index = -xLimit; index <= xLimit; index++) {
      if(index!=0)
      {
        write_txt(index,getProjectedX(-0.5),getProjectedY(index-0.15),"0.8vw tj-b");
        // write_txt(`(0,${index})`,getProjectedX(0.5),getProjectedY(index),"0.8vw tj-b")
      }

   }

   for (let index = -yLimit; index <= yLimit; index++) {
    if(index!=0)
    {
    write_txt(index,getProjectedX(index),getProjectedY(-0.5),"0.8vw tj-b");
    // write_txt(`(${index},0)`,getProjectedX(index),getProjectedY(-0.5),"0.8vw tj-b");
    }


 }

  }

  function getProjectedX(xglobal) {
    return  ((xglobal * cw) / step_pixles + cw / 2).toFixed(1);;

  }

  function getProjectedY(yglobal) {
    return (-1 * ((yglobal * ch) / step_pixles) + ch / 2).toFixed(1);;
  }


  function get_inversed_ProjectedX(x_in_pixels) {
    return ((step_pixles/cw)*(x_in_pixels-cw/2)).toFixed(1); ;
  }

  function get_inversed_ProjectedY(y_in_pixels) {
    return (-1 * (step_pixles/ch)*(y_in_pixels-ch/2)).toFixed(1); ;
  }



  function drawDot(x, y, r, color) {
    context.beginPath();
    context.arc(x, y, r, Math.PI / 180, false);
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = 1;
    context.stroke();
    // context.fill();
    context.closePath();
  }

  function drawShape(group, color, is_dash, line_width,label) {

    // console.log(group.length);
    context.beginPath();
    context.lineWidth = line_width;
    if (is_dash) {
      context.setLineDash([2, 2]);
    } else {
      context.setLineDash([]);
    }
    group.forEach((element,i) => {
      context.strokeStyle = color;
      context.fillStyle = color;

      context.lineTo(element[0], element[1]);
 
      if(label)
      {
        label=labels;
        if(get_inversed_ProjectedX(element[0])>0)
        {
          write_txt(label[i]+'`',element[0][0]-get_inversed_ProjectedX(sq_width*step_pixles*2), element[1])
        }
        else
        {
          write_txt(label[i]+'`',element[0][0]-get_inversed_ProjectedX(sq_width*step_pixles*2), element[1])

        }


      }
    });
    context.stroke();
    // context.fill();
    context.closePath();
    
    if(group.length==points.length)
    {
      // context.closePath();
      context.stroke();
    }
  }

  function find_slop(x1, y1, x2, y2) {
    let m2 = (y2 - y1) / (x2 - x1);
    slop_arr.push(m2);
    return m2;
  }

  function find_c(x, y, m) {
    let c = y - m * x;
    c_arr.push(c);
    return c;
  }

  function get_point_on_straight_line(m, x, c) {
    let y;
    y = m * x + c;
    let array = [x, y];
    return array;
  }

  function draw_guides() {
    points.forEach((point, i) => {
      m = find_slop(givenPoint[0], givenPoint[1], point[0], point[1]);
      c = find_c(givenPoint[0], givenPoint[1], m);
      if (point[0] > givenPoint[0]) {
        xy_pair = get_point_on_straight_line(m, point[0] + line_extension, c);
      } else {
        xy_pair = get_point_on_straight_line(m, point[0] - line_extension, c);
      }
      // check if slop is if(m!='Infinity')
      if (m == "Infinity") {
        let max_y = getProjectedY(-3);
        drawDot(givenPoint[0], max_y, 3, "#7600ff");
        drawShape(
          [
            [givenPoint[0], givenPoint[1]],
            [givenPoint[0], max_y],
          ],
          "red",
          true,
          1
        );
      } else {
        drawDot(xy_pair[0], xy_pair[1], 3, "#7600ff");
        drawShape(
          [
            [givenPoint[0], givenPoint[1]],
            [xy_pair[0], xy_pair[1]],
          ],
          "red",
          true,
          1
        );
      }
    });
  }
  fill_distance_array();

  function check_drawings(tempShape,tempPoints)
  {
    let mytemp=[];
  
    console.log('drawed :',tempShape);
    console.log('original : ',tempPoints);
    console.log('givien point : ',givenPoint[1]);
  
  
  // console.log(slop_arr);
  // console.log(c_arr);
  
  
  tempPoints.forEach((point,i) => {
    find_slop(givenPoint[0], givenPoint[1],point[0], point[1]);
  });
  tempPoints.forEach((point,i) => {
    find_c(givenPoint[0], givenPoint[1],slop_arr[i]);
    let tempX=calculate_X_Prime_using_distance(i);
    // console.log(tempX);
    mytemp.push(get_point_on_straight_line(slop_arr[i],tempX,c_arr[i]));
  });
  tempPoints.forEach((point,i) => {
    if (slop_arr[i] == "Infinity"){
      console.log(distance_array);
      mytemp[i][1]=parseFloat(givenPoint[1])+parseFloat(distance_array[i]*scale_factor);
      // mytemp[i][1]=0;
  
    }
  });
  console.log('code generated : ' , mytemp);
    
    let tolerance=0.01;
    console.log(get_inversed_ProjectedY(tolerance));
      if (mytemp.length != tempShape.length) 
          return false;
    
      for (let index = 0; index < tempShape.length; index++) {
       
        if (get_inversed_ProjectedX(tempShape[index][0][0]) > parseFloat(get_inversed_ProjectedX(mytemp[index][0]))+tolerance 
        ||get_inversed_ProjectedX( tempShape[index][0][0]) < parseFloat(get_inversed_ProjectedX((mytemp[index][0]))-tolerance ) )
            return false;
        if (get_inversed_ProjectedY(tempShape[index][1][0]) > parseFloat(get_inversed_ProjectedY(mytemp[index][1]))+tolerance 
        ||get_inversed_ProjectedY( tempShape[index][1][0]) < parseFloat(get_inversed_ProjectedY((mytemp[index][1]))-tolerance ) )
            return false;
      }
      return true;
  }
chkBtn.onclick=()=>
{
  // console.log(shape_points[0][0][0]);
  // console.log(points[0][0]);

  let tempPoints=points;
  let tempShape=shape_points;

  // let temp=tempShape[tempShape.length-1];
  // tempShape.pop();
  // tempShape.unshift(temp);
  // console.log(tempShape);
//   console.log(tempPoints);

  if(check_drawings(tempShape,tempPoints))
  {
    overlay_box.style.display='flex';
    overlay_box.style.justifyContent='center';
    overlay_box.style.alignItems='center';
    overlay_box.style.flexDirection='row-reverse';
  overlay_box.innerHTML='<span class="myClose">x</span><p class="pop_up_p">أحسنت إجابة صحيحة </p>'

  document.querySelector('.myClose').onclick=()=>
{
  overlay_box.style.display='none';
  overlay_box.innerHTML='';
}

  }
else
{
    overlay_box.style.display='flex';
    overlay_box.style.justifyContent='center';
    overlay_box.style.alignItems='center';
    overlay_box.style.flexDirection='row-reverse';
  overlay_box.innerHTML='<span class="myClose">x</span><p class="pop_up_p">للأسف إجابة خاطئة !</p>'

document.querySelector('.myClose').onclick=()=>
{
  overlay_box.style.display='none';
  overlay_box.innerHTML='';
}
}
}



  function get_distance(x1, y1, x2, y2) {
    let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return distance.toFixed(1);
    // return distance.toFixed(0);

  }

  function fill_distance_array() {
    points.forEach((point) => {
      let point_distance = get_distance(
        givenPoint[0],
        givenPoint[1],
        point[0],
        point[1]
      );
      distance_array.push(point_distance);
    });
  }


  function calculate_X_Prime_using_distance(i) {
    let x_Prime;
    let D_i = distance_array[i] * (scale_factor - 1);
    let M_i = slop_arr[i];
    let x0 = points[i][0];
    if (x0 > givenPoint[0]) {
      x_Prime = x0 + D_i / Math.sqrt(1 + Math.pow(M_i, 2));
    } else {
      x_Prime = x0 - D_i / Math.sqrt(1 + Math.pow(M_i, 2));
    }
    return x_Prime;
  }

  function draw_newPoints() {
    points.forEach((point, i) => {
      let xy_pair2 = get_point_on_straight_line(
        slop_arr[i],
        calculate_X_Prime_using_distance(i),
        c_arr[i]
      );
      drawDot(xy_pair2[0], xy_pair2[1], 10, "yellow");
      new_points.push([xy_pair2[0], xy_pair2[1]]);
    });
  }



  document.addEventListener("mousemove", onMouseUpdate, false);
  canvas.addEventListener("click", onMouseClicked, false);



  document.getElementById("measureOrDraw").onchange = (e) => {
    opt_selector = document.getElementById("measureOrDraw").value;
  };

  function onMouseClicked(e) {
    if(opt_selector !='na')
    {
      is_finished = !is_finished;
    }
    console.log(opt_selector);

    if (is_finished == false && e.target.id == "myc" && opt_selector != 'na') {

      is_draw = true;
      just_clicked_X = e.pageX - offsetX;
      just_clicked_Y = e.pageY - offsetY;
      clicked_X_arr.push(just_clicked_X);
      clicked_Y_arr.push(just_clicked_Y);
    } else {
      if (get_current_radio != -1 && opt_selector === "measure") {
        confirm_box.style.display = "block";
        overlay_box.style.display = "block";
        is_finished = !is_finished;
      } else {
        confirm_box.style.display = "none";
        overlay_box.style.display = "none";
        if( opt_selector ==='draw-line')
        {
          line_X_arr.push(just_moving_X);
          line_Y_arr.push(just_moving_Y);
          let DotSize = 5;
          if (window.innerWidth < 991 && window.innerWidth > 520) DotSize = 4;
          else if (window.innerWidth <= 520) DotSize = 3;
          drawDot(just_moving_X, just_moving_Y, DotSize, myBlue);
        }

        if(opt_selector ==='draw-shape' )
        {
          shape_X_arr.push(just_moving_X);
          shape_Y_arr.push(just_moving_Y);
          let DotSize = 5;
          if (window.innerWidth < 991 && window.innerWidth > 520) DotSize = 4;
          else if (window.innerWidth <= 520) DotSize = 3;
          drawDot(just_moving_X, just_moving_Y, DotSize, myBlue);
        }


      }
    }
  }

  function get_current_radio() {
    let radios = document.querySelector(".confirm").querySelectorAll("input");
    let temp_i = -1;
    radios.forEach((r, i) => {
      if (r.checked) {
        temp_i = i;
      }
    });
    return temp_i;
  }

  cancel_d.onclick = (e) => {
    confirm_box.style.display = "none";
    overlay_box.style.display = "none";
  };

  ok_d.onclick = (e) => {
    let saved_d_p = document
      .querySelector(".saved-distances")
      .querySelectorAll("p");
      console.log(saved_d_p);
    let current_radio = get_current_radio();

    saved_d_p.forEach((p, i) => {
      // if (i != 0 && current_radio  !=-1) {
        saved_d_p[current_radio].innerText =
          saved_d_p[current_radio].innerText.split(" ")[0] +
          " " +
          current_Distance;
      // }
    });
    // fill_distance_div();
    confirm_box.style.display = "none";
    overlay_box.style.display = "none";
  };

  function onMouseUpdate(e) {

    if (is_draw == true && is_finished == false && e.target.id == "myc") {
      just_moving_X = e.pageX - offsetX;
      just_moving_Y = e.pageY - offsetY;
      //   clicked_X_arr.forEach((element, i) => {
      draw_while_move(just_moving_X, just_moving_Y);
      let DotSize = 5;
      if (window.innerWidth < 991 && window.innerWidth > 520) DotSize = 4;
      else if (window.innerWidth <= 520) DotSize = 3;
      drawDot(just_moving_X, just_moving_Y, DotSize, myBlue);
      draw_display(givenPoint[0], givenPoint[1], just_moving_X, just_moving_Y);
      //   });
    }
  }
  function draw_display(x1, y1, x2, y2) {
    let D_global = get_distance(x1, y1, x2, y2);
    sq_width = cw / step_pixles;
    D_global = D_global / sq_width;
    D_global = D_global.toFixed(1);
    // D_global = D_global.toFixed(0);

    set_current_Distance(D_global);
    write_txt("المسافة هي : " + D_global, canvas.width / 6, canvas.height / 2);
  }

  function set_current_Distance(D_global) {
    current_Distance = D_global;
  }

  function draw_while_move(x2, y2) {
    clearCanvas(context,0, 0, cw, ch);
    context.beginPath();
    clicked_X_arr.forEach((point, i) => {
      context.lineTo(givenPoint[0], givenPoint[1]);
      context.lineTo(x2, y2);
      context.strokeStyle = "#04b348eb";
      context.lineWidth = 2;
      context.stroke();
    });

    increment_line_shape_by_array();
    initial_setup();
  }

  
undo.onclick=()=>
{
  switch (opt_selector) {
    case 'draw-line':
      if (line_points.length !=0)
      {
        line_X_arr.pop();
        line_Y_arr.pop();
        draw_while_move(givenPoint[0], givenPoint[1]);
        // console.log(line_X_arr);
     }
      break;
      case 'draw-shape':
        if (shape_points.length !=0)
        {
          shape_X_arr.pop();
        shape_Y_arr.pop();
        draw_while_move(givenPoint[0], givenPoint[1]);
        // console.log(shape_X_arr);
        }
      break;
    default:
      break;
  }

  

}

  function increment_line_shape_by_array()
  {
    line_points = [];
    line_X_arr.forEach((point, i) => {
      let DotSize = 5;
      if (window.innerWidth < 991 && window.innerWidth > 520) DotSize = 4;
      else if (window.innerWidth <= 520) DotSize = 3;
      drawDot(line_X_arr[i], line_Y_arr[i], DotSize,myBlue);
      let temp = [[line_X_arr[i]], [line_Y_arr[i]]];
      line_points.push(temp);
    });

    shape_points = [];
    shape_X_arr.forEach((point, i) => {
      let DotSize = 5;
      if (window.innerWidth < 991 && window.innerWidth > 520) DotSize = 4;
      else if (window.innerWidth <= 520) DotSize = 3;
      drawDot(shape_X_arr[i], shape_Y_arr[i], DotSize,myBlue);
      let temp = [[shape_X_arr[i]], [shape_Y_arr[i]]];
      shape_points.push(temp);
    });

    
    let LineSize = 3;
    line_points.forEach(element => {
        drawShape([[givenPoint[0],givenPoint[1]],[element[0],element[1]]], 'red', true, LineSize);
      });


      if (window.innerWidth <= 520) LineSize = 2;
if (shape_points.length==points.length) {
  is_finished=true;
}

      drawShape(shape_points, myLightBlue, false, LineSize,'A`');
 
    
  }

  function clearCanvas(ctx,clear_start,clear_end,clear_W,clear_H)
  {
    ctx.clearRect(clear_start, clear_end, clear_W, clear_H);

  }
  function initial_setup() {
    x_guide_start = 0;
    y_guide_start = 0;
    drawX_lines();
    drawY_lines();
    // drawXY_axis(4,4);

    write_txt("O", givenPoint[0], givenPoint[1] - sq_width / 2);
    let redDotSize = 9;
    if (window.innerWidth < 991 && window.innerWidth > 520) redDotSize = 6;
    else if (window.innerWidth <= 520) redDotSize = 3;
    drawDot(givenPoint[0], givenPoint[1], redDotSize,myBlue);
    let LineSize = 3;
    if (window.innerWidth <= 520) LineSize = 2;
    drawShape(points, myLightBlue, false, LineSize);

    //label for points
    points.forEach((element, i) => {
      let x_pos=element[0];
      let y_pos=element[1];

      // console.log(get_inversed_ProjectedX(x_pos));
      // console.log(get_inversed_ProjectedY(y_pos));

     
        if(get_inversed_ProjectedX(x_pos)>0)
        {
          write_txt(labels[i],x_pos-get_inversed_ProjectedX(sq_width), y_pos-get_inversed_ProjectedY(sq_width),"0.9vw tj-b")
        }
        else
        {
          write_txt(labels[i],x_pos-get_inversed_ProjectedX(sq_width*step_pixles), y_pos-get_inversed_ProjectedY(sq_width),"0.9vw tj-b")

        }

      
    });
  }

  function fill_distance_div() {
    saved_distances_div.querySelector(".measures").innerHTML=``;
    My_measure.forEach((element) => {
      let p = document.createElement("p");
      p.innerText = element;
      saved_distances_div.querySelector(".measures").append(p);
    });
  }

  function write_txt(txt, text_x, text_y,font_prop) {
    context.font = "1.5vw tj-b";
    if(font_prop)
    {
      context.font = font_prop;

    }
    context.fillStyle = MyPurple;
    context.textAlign = "center";
    context.fillText(txt, text_x, text_y);
  }

  initial_setup();
  fill_distance_div();
};
