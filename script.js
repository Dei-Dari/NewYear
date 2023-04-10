// Unit 2. Объект. Массивы. Строки. Введение в ООПЗадание 2
// Рассчитайте, сколько дней, часов, минут и секунд осталось до Нового года.
// часы на заметку
// https://habr.com/ru/post/171015/
// реализация часов
// фокус-группа: отрывающийся календарь и даже время
// https://ru.wikipedia.org/wiki/ISO_8601
// https://ru.stackoverflow.com/questions/983698/%D0%A1%D0%B0%D0%BC%D1%8B%D0%B5-%D0%BA%D0%BE%D1%80%D0%BE%D1%82%D0%BA%D0%B8%D0%B5-%D0%B8-%D0%BF%D1%80%D0%BE%D1%81%D1%82%D1%8B%D0%B5-%D1%81%D0%BF%D0%BE%D1%81%D0%BE%D0%B1%D1%8B-%D0%B3%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8-%D1%80%D0%B0%D0%B7%D0%BB%D0%B8%D1%87%D0%BD%D1%8B%D1%85-%D1%84%D1%80%D0%B0%D0%BA%D1%82%D0%B0%D0%BB%D0%BE%D0%B2-%D0%B8%D0%BB%D0%B8-%D0%B4%D1%80%D1%83%D0%B3%D0%B8%D1%85-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0
// https://habr.com/ru/company/microsoft/blog/110237/
// https://dark-lore.ru/theatre/snezhinka-koha-na-js-s-ispolzovaniem-canvas-kak-narisovat-snezhinku-koha/
// https://youtu.be/QFGP1GXGsaE
// https://worldtimeapi.org/



var date = new Date();  //системное время
// коррекция системного времени минуты/секунды

var newYear = new Date(date.getFullYear() + 1, 0, 1);

var request = new XMLHttpRequest();
request.open('GET', 'http://worldtimeapi.org/api/timezone/Asia/Yekaterinburg', false);
request.send(); //срабатывает не с первого раза
if (request.status == 200) {
  let requestTime = request.responseText; // получаем текст ответа
  let time = new Date(JSON.parse(requestTime).datetime); // получаем время

  var secDelta = time.getSeconds() - date.getSeconds();
  var minDelta = time.getMinutes() - date.getMinutes();
}


function currentTime() {
  var date = new Date();  //системное время
 
 
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  // коррекция минуты секунды к системному от первоначального запроса
  date.setMinutes(date.getMinutes() + minDelta);
  date.setSeconds(date.getSeconds() + secDelta);

  if (newYear == date)
  {
    newYear.setFullYear += 1; //??пересчет на новый год
  }
  
  var time = newYear - date;
  

  var timeUntilNY = Math.abs(Math.floor(time / 1000));	//sec
  var dayUntilNY = Math.floor(timeUntilNY / (60 * 60 * 24));	//day
  var hourUntilNY = Math.floor((timeUntilNY - dayUntilNY * (60 * 60 * 24)) / (60 * 60));	//hour
  var minUntilNY = Math.floor((timeUntilNY - dayUntilNY * (60 * 60 * 24) - hourUntilNY * (60 * 60)) / 60);	//min
  var secUntilNY = Math.floor(timeUntilNY - dayUntilNY * (60 * 60 * 24) - hourUntilNY * (60 * 60) - minUntilNY * 60);	//se	


  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);

  hourUntilNY = updateTime(hourUntilNY);
  minUntilNY = updateTime(minUntilNY);
  secUntilNY = updateTime(secUntilNY);

  //document.getElementById("date").innerText = newYear + " " + day + "." + month + "." + year + '\n';
  document.getElementById("dateNow").innerText = day + "." + month + "." + year + '\n' + hour + " : " + min + " : " + sec;
  document.getElementById("timeUntil").innerText = "до Нового Года" + '\n' + dayUntilNY + " дней " + hourUntilNY + " : " + minUntilNY + " : " + secUntilNY;
  var t = setTimeout(function () { currentTime() }, 1000);
}

//приведение к полному виду 00
function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

currentTime();


//снежинка символом
//странные снежинки не на весь экран
var snowmax = 100
var snowcolor = new Array("#6cf", "#9cf", "#99f", "#ccf", "#66f", "#3cf")
var snowtype = new Array("Times")
var snowletter = "*"
//скорость погружения (рекомендуемые значения от 0.3 до 2)
var sinkspeed = 0.6
var snowmaxsize = 35
var snowminsize = 8
//Set 1 for all-over-snowing, set 2 for left-side-snowing
//Set 3 for center-snowing, set 4 for right-side-snowing
var snowingzone = 1

var snow = new Array()
var marginbottom
var marginright
var timer
var i_snow = 0
var x_mv = new Array();
var crds = new Array();
var lftrght = new Array();
/* var browserinfos = navigator.userAgent
var ie5 = document.all && document.getElementById && !browserinfos.match(/Opera/)*/
var ns6 = document.getElementById && !document.all
/*var opera = browserinfos.match(/Opera/)
var browserok = ie5 || ns6 || opera */

function randommaker(range) {
  rand = Math.floor(range * Math.random())
  return rand
}

function initsnow() {
  /* if (ie5 || opera) {
    marginbottom = document.body.scrollHeight
    marginright = document.body.clientWidth - 15
  }
  else */
  if (ns6) {
    marginbottom = document.body.scrollHeight
    marginright = window.innerWidth - 15
  } 

  var snowsizerange = snowmaxsize - snowminsize
  for (i = 0; i <= snowmax; i++) {
    crds[i] = 0;
    lftrght[i] = Math.random() * 15;
    x_mv[i] = 0.03 + Math.random() / 10;
    snow[i] = document.getElementById("s" + i)
    snow[i].style.fontFamily = snowtype[randommaker(snowtype.length)]
    snow[i].size = randommaker(snowsizerange) + snowminsize
    snow[i].style.fontSize = snow[i].size + 'px';
    snow[i].style.color = snowcolor[randommaker(snowcolor.length)]
    snow[i].style.zIndex = 1000
    snow[i].sink = sinkspeed * snow[i].size / 5
    if (snowingzone == 1) { snow[i].posx = randommaker(marginright - snow[i].size) }
    if (snowingzone == 2) { snow[i].posx = randommaker(marginright / 2 - snow[i].size) }
    if (snowingzone == 3) { snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 4 }
    if (snowingzone == 4) { snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 2 }
    snow[i].posy = randommaker(2 * marginbottom - marginbottom - 2 * snow[i].size)
    snow[i].style.left = snow[i].posx + 'px';
    snow[i].style.top = snow[i].posy + 'px';
  }
  movesnow()
}

function movesnow() {
  for (i = 0; i <= snowmax; i++) {
    crds[i] += x_mv[i];
    snow[i].posy += snow[i].sink
    snow[i].style.left = snow[i].posx + lftrght[i] * Math.sin(crds[i]) + 'px';
    snow[i].style.top = snow[i].posy + 'px';

    if (snow[i].posy >= marginbottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginright - 3 * lftrght[i])) {
      if (snowingzone == 1) { snow[i].posx = randommaker(marginright - snow[i].size) }
      if (snowingzone == 2) { snow[i].posx = randommaker(marginright / 2 - snow[i].size) }
      if (snowingzone == 3) { snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 4 }
      if (snowingzone == 4) { snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 2 }
      snow[i].posy = 0
    }
  }
  var timer = setTimeout("movesnow()", 50)
}

for (i = 0; i <= snowmax; i++) {
  document.write("<span id='s" + i + "' style='position:absolute;top:-" + snowmaxsize + "'>" + snowletter + "</span>")
}
//if (browserok) {
  window.onload = initsnow
//}


//снежинки Коха

(function () {
  if (document.createElement('canvas').getContext) {
    if (document.readyState === 'complete')
      snow();
    else
      window.addEventListener('DOMContentLoaded', snow, false);
  }
  else {
    return;
  }

  var deg = Math.PI / 180;
  var maxflakes = 20; var flakes = []; var scrollspeed = 64; var snowspeed = 500;
  var canvas, sky;
  var snowingTimer;
  var invalidateMeasure = false;

  var strokes = ["#6cf", "#9cf", "#99f", "#ccf", "#66f", "#3cf"];

  function rand(n) {
    return Math.floor(n * Math.random());
  }

  // Запуск снегопада
  function snow() {
    canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.zIndex = '-10';

    document.body.insertBefore(canvas, document.body.firstChild);
    sky = canvas.getContext('2d');

    ResetCanvas();

    snowingTimer = setInterval(createSnowflake, snowspeed);
    setInterval(moveSnowflakes, scrollspeed);
    window.addEventListener('resize', ResetCanvas, false);
  }

  // Сброс размеров Canvas
  function ResetCanvas() {
    invalidateMeasure = true;
    canvas.width = document.body.offsetWidth;
    canvas.height = window.innerHeight;
  }

  // Отрисовка кривой Коха
  function leg(n, len) {
    sky.save();       // Сохраняем текущую трансформацию
    if (n == 0) {      // Нерекурсивный случай - отрисовываем линию
      sky.lineTo(len, 0);
    }
    else {
      sky.scale(1 / 3, 1 / 3);  // Уменьшаем масштаб в 3 раза
      leg(n - 1, len); sky.rotate(60 * deg);
      leg(n - 1, len); sky.rotate(-120 * deg);
      leg(n - 1, len); sky.rotate(60 * deg); leg(n - 1, len);
    }
    sky.restore();      // Восстанавливаем трансформацию
    sky.translate(len, 0); // переходим в конец ребра
  }

  // Отрисовка снежинки Коха
  function drawFlake(x, y, angle, len, n, stroke, fill) {
    sky.save(); sky.strokeStyle = stroke;
    sky.fillStyle = fill;
    sky.beginPath();
    sky.translate(x, y);
    sky.moveTo(0, 0); sky.rotate(angle);
    leg(n, len);
    sky.rotate(-120 * deg);
    leg(n, len); sky.rotate(-120 * deg);
    leg(n, len); sky.closePath();
    sky.fill();
    sky.stroke();
    sky.restore();
  }

  // Создание пула снежинок
  function createSnowflake() {
    var order = 2 + rand(2);
    var size = 10 * order + rand(10);
    var x = rand(document.body.offsetWidth);
    var y = window.pageYOffset;
    var stroke = strokes[rand(strokes.length)];

    flakes.push({ x: x, y: y, vx: 0, vy: 3 + rand(3), angle: 0, size: size, order: order, stroke: stroke, fill: 'transparent' });

    if (flakes.length > maxflakes) clearInterval(snowingTimer);
  }

  // Перемещение снежинок
  function moveSnowflakes() {
    sky.clearRect(0, 0, canvas.width, canvas.height);

    var maxy = canvas.height;

    for (var i = 0; i < flakes.length; i++) {
      var flake = flakes[i];

      flake.y += flake.vy;
      flake.x += flake.vx;

      if (flake.y > maxy) flake.y = 0;
      if (invalidateMeasure) {
        flake.x = rand(canvas.width);
      }

      drawFlake(flake.x, flake.y, flake.angle, flake.size, flake.order, flake.stroke, flake.fill);

      // Иногда меняем боковой ветер
      if (rand(4) == 1) flake.vx += (rand(11) - 5) / 10;
      if (flake.vx > 2) flake.vx = 2;
      if (flake.vx < -2) flake.vx = -2;
      if (rand(3) == 1) flake.angle = (rand(13) - 6) / 271;
    }
    if (invalidateMeasure) invalidateMeasure = false;
  }
}());


