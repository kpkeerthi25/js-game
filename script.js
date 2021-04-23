window.onload = function () {
  var playerName = "hello";
  var timerStatus = 0;
  var time = 0;
  const createTimer = () => {
    let myTimer = setInterval(clock, 100);

    function clock() {
      if (timerStatus == 2) {
        clearInterval(myTimer);
      }
      document.getElementById("time").textContent = ` Time : ${(
        time + 0.1
      ).toFixed(2)}`;
      time += 0.1;
    }
  };

  const createGamePage = () => {
    const increment = 105 / 2 - 25 / 2;

    const n = 4;
    const m = 5;

    let currentPos = 0;

    const getPos = (id) => {
      var offsets = document.getElementById(id).getBoundingClientRect();
      var top = offsets.top;
      var left = offsets.left;

      return {
        x: top,
        y: left,
      };
    };

    const createBox = (number) => {
      var box = document.createElement("div");
      box.textContent = number;
      box.id = number;
      box.style.width = "100px";
      box.style.height = "100px";
      box.style.margin = "5px";
      box.style.background = "#9494b8";

      return box;
    };

    const createBall = () => {
      var ball = document.createElement("div");
      ball.id = "ball";
      ball.style.height = "25px";
      ball.style.width = "25px";
      ball.style.background = "#bbb";
      ball.style.borderRadius = "50%";
      ball.style.display = "block";
      ball.style.position = "absolute";
      ball.style.zIndex = 1;
      initialPos = getPos(1);

      ball.style.top = initialPos.x + increment + "px";
      ball.style.left = initialPos.y + increment - 110 + "px";

      return ball;
    };

    const createGrid = (n, m) => {
      let gridDiv = document.createElement("div");

      gridDiv.style.display = "flex";
      gridDiv.style.position = "absolute";
      gridDiv.style.flexDirection = "column";
      for (var i = 0; i < n; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.style.display = "flex";
        rowDiv.style.flexDirection = "row";
        for (var j = 0; j < m; j++) {
          let columnDiv = createBox(m * i + j + 1);
          if (i % 2 == 0) rowDiv.append(columnDiv);
          else rowDiv.prepend(columnDiv);
        }
        gridDiv.prepend(rowDiv);
      }
      return gridDiv;
    };

    const moveRight = () => {
      return new Promise(function (resolve, reject) {
        var id = null;
        var elem = document.getElementById("ball");
        var pos = getPos("ball").y;
        var ePos = pos;
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() {
          if (ePos == pos + 110) {
            clearInterval(id);
            resolve(true);
          } else {
            ePos++;
            elem.style.left = ePos + "px";
          }
        }
      });
    };

    const moveLeft = () => {
      return new Promise(function (resolve, reject) {
        var id = null;
        var elem = document.getElementById("ball");
        var pos = getPos("ball").y;
        var ePos = pos;
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() {
          if (ePos == pos - 110) {
            clearInterval(id);
            resolve(true);
          } else {
            ePos--;
            elem.style.left = ePos + "px";
          }
        }
      });
    };

    const moveUp = () => {
      return new Promise(function (resolve, reject) {
        var id = null;
        var elem = document.getElementById("ball");
        var pos = getPos("ball").x;
        var ePos = pos;
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() {
          if (ePos == pos - 110) {
            clearInterval(id);
            resolve(true);
          } else {
            ePos--;
            elem.style.top = ePos + "px";
          }
        }
      });
    };

    //to decided what direction to move
    const movement = async (roll) => {
      document.getElementById("but").removeEventListener("click", dieRoll);
      for (var i = 0; i < roll && currentPos < n * m; i++) {
        console.log(currentPos);
        if (currentPos % m == 0 && currentPos != 0) {
          await moveUp();
        } else if (Math.ceil(currentPos / m) % 2 == 0 && currentPos != 0) {
          await moveLeft();
        } else {
          await moveRight();
        }
        currentPos++;
      }
      if (currentPos >= n * m) {
        alert(`game Over you took ${time} seconds`);
        timerStatus = 2;
      }
      document.getElementById("but").addEventListener("click", dieRoll);
    };

    const dieRoll = () => {
      var temp = Math.floor(Math.random() * 6) + 1;

      console.log(temp);
      document.getElementById("die").textContent = temp;

      movement(temp);
    };

    const createDieComponent = () => {
      var butDiv = document.createElement("div");
      var but = document.createElement("button");
      butDiv.style.display = "flex";

      but.style.height = "50px";
      but.style.width = "100px";
      but.textContent = "Roll the die";
      but.id = "but";

      var name = document.createElement("div");
      name.textContent = `Welcome ${playerName}`;
      name.style.fontSize = "20px";
      name.style.fontWeight = "bold";
      name.style.color = "white";
      name.style.textAlign = "center";
      name.style.margin = "0 50px";
      name.style.padding = "10px 0";
      butDiv.appendChild(name);
      butDiv.appendChild(but);
      butDiv.style.position = "relative";
      butDiv.style.top = n * 110 + "px";

      butDiv.style.margin = "50px";

      var die = document.createElement("div");
      butDiv.appendChild(die);
      die.style.textAlign = "center";
      die.style.margin = "0 50px";
      die.id = "die";
      die.style.width = "100px";
      die.style.border = "2px solid ";
      die.style.background = "white";
      die.style.padding = "10px 0";
      die.textContent = `0`;

      but.addEventListener("click", dieRoll);

      return butDiv;
    };
    const createTimeDisplay = () => {
      var timeDiv = document.createElement("div");
      timeDiv.style.display = "block";
      timeDiv.style.width = "100px";
      timeDiv.textContent = "0";
      timeDiv.id = "time";
      timeDiv.style.border = "2px solid";
      timeDiv.style.position = "relative";
      timeDiv.style.top = n * 110 + "px";
      timeDiv.style.background = "white";
      timeDiv.style.padding = "10px 0";
      timeDiv.style.textAlign = "center";
      timeDiv.style.margin = "50px";

      return timeDiv;
    };

    document.body.style.margin = "75px";
    document.body.style.background = "green";
    document.getElementById("hello").appendChild(createGrid(n, m));
    document.getElementById("hello").prepend(createBall());

    document.getElementById("hello").appendChild(createDieComponent());
    document.getElementById("hello").appendChild(createTimeDisplay());
  };

  const createStartPage = () => {
    function removeAllChildNodes(parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }

    function startGame() {
      if (document.getElementById("input").value == "") {
        alert("enter player name");
        return;
      }
      console.log(playerName);
      playerName = document.getElementById("input").value;
      console.log(playerName);
      removeAllChildNodes(document.getElementById("hello"));
      createGamePage();
      if (timerStatus == 0) {
        timerStatus = 1;
        createTimer();
      }
    }

    var dataDiv = document.createElement("div");
    var input = document.createElement("input");
    dataDiv.style.display = "flex";

    input.style.width = "200px";
    input.textContent = "Roll the die";
    input.id = "input";

    var name = document.createElement("div");
    name.textContent = `Enter Player Name : `;
    name.id = "name";
    name.style.textAlign = "center";
    name.style.margin = "0 50px";
    name.style.padding = "10px 0";
    dataDiv.appendChild(name);
    dataDiv.appendChild(input);

    dataDiv.style.top = 110 + "px";

    dataDiv.style.margin = "50px";

    document.body.style.margin = "75px";
    document.body.style.background = "green";

    document.getElementById("hello").appendChild(dataDiv);

    var submitDiv = document.createElement("div");
    submitDiv.style.display = "flex";
    submitDiv.style.justifyContent = "center";
    var submitButton = document.createElement("button");
    submitButton.style.height = "50px";
    submitButton.style.width = "100px";
    submitButton.textContent = "Start Game";
    submitButton.id = "submitBut";

    submitButton.addEventListener("click", startGame);

    submitDiv.appendChild(submitButton);

    document.getElementById("hello").appendChild(submitDiv);
  };

  createStartPage();
};
