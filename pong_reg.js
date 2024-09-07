// Global Variables
var DIRECTION = {
    IDLE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
};
 

// The ball object (The cube that bounces back and forth)
var Ball = {
    new: function (incrementedSpeed) {
        return {
            width: 20,
            height: 20,
            x: (this.canvas.width / 2) - 10,
            y: (this.canvas.height / 2) - 10,
            moveX: DIRECTION.IDLE,
            moveY: DIRECTION.IDLE,
            speed: incrementedSpeed || 8 
        };
    }
};
 
// The ai object (The two lines that move up and down)
var Ai = {
    new: function (side, pos) {
        return {
            width: 20,
            height: 200,
            x: side === 'left' ? 150 : this.canvas.width - 150,
            y : pos,
            score:0,
            move: DIRECTION.IDLE,
            speed: 8
            
        };
    }
};
 
var Game = {
    initialize: function () {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
 
        this.canvas.width = document.documentElement.clientWidth*1.5;
        this.canvas.height = document.documentElement.clientHeight*1.5;
 
        this.canvas.style.width = (this.canvas.width / 2) + 'px';
        this.canvas.style.height = (this.canvas.height / 2) + 'px';

        this.running = this.over = false;
 
        this.player = Ai.new.call(this, 'left', (((this.canvas.height)/2)-35));
        this.ai = Ai.new.call(this, 'right',(((this.canvas.height)/2)-35));
        this.ball = Ball.new.call(this);
 
        this.ai.speed = 5;
        this.turn = this.ai;
        this.timer = 0;
        this.color = '#000000';
 
        Pong.menu();
        Pong.listen();
    },
 
    endGameMenu: function (text) {
        // Change the canvas font size and color
        Pong.context.font = '45px Courier New';
        
        Pong.context.fillStyle =this.color;
 
        // Draw the rectangle behind the 'Press any key to begin' text.
        Pong.context.fillRect(
            Pong.canvas.width / 2 - 350,
            Pong.canvas.height / 2 - 48,
            700,
            100
        );
 
        // Draw the end game menu text ('Game Over' and 'Winner')
        Pong.context.fillText(text,
            Pong.canvas.width / 2,
            Pong.canvas.height / 2 + 15
        );
 
        setTimeout(function () {
            Pong = Object.assign({}, Game);
            Pong.initialize();
        }, 3000);
    },
 
    menu: function () {
        // Draw all the Pong objects in their current state
        Pong.draw();
 
        // Change the canvas font size and color
        this.context.font = '50px Courier New';
        this.context.fillStyle = this.color;
 
        // Draw the rectangle behind the 'Press any key to begin' text.
        this.context.fillRect(
            this.canvas.width / 2 - 350,
            this.canvas.height / 2 - 48,
            700,
            100
        );
 
        // Change the canvas color;
        this.context.fillStyle = '#ffffff';
 
        // Draw the 'press any key to begin' text
        this.context.fillText('Press any key to begin',
            this.canvas.width / 2,
            this.canvas.height / 2 + 15
        );
    },
 
    // Update all objects (move the player, ai, ball, increment the score, etc.)
    update: function () {
        if (!this.over) {

            this.canvas = document.querySelector('canvas');
            this.context = this.canvas.getContext('2d');
 
            this.canvas.width = document.documentElement.clientWidth*1.5;
            this.canvas.height = document.documentElement.clientHeight*1.5;
 
            this.canvas.style.width = (this.canvas.width / 2) + 'px';
            this.canvas.style.height = (this.canvas.height / 2) + 'px';
 
            // If the ball collides with the bound limits - correct the x and y coords.
            if (this.ball.x <= 0){
                Pong._resetTurn.call(this, this.ai, this.player);
                this.ball.speed=8;
            } 
            if (this.ball.x >= this.canvas.width - this.ball.width){
                Pong._resetTurn.call(this, this.player, this.ai);
                this.ball.speed=8;
            }
            if (this.ball.y <= 0){
                  this.ball.moveY = DIRECTION.DOWN;
            }
            if (this.ball.y >= this.canvas.height - this.ball.height){
                this.ball.moveY = DIRECTION.UP;
            } 
 
            // Move player if they player.move value was updated by a keyboard event
            if (this.player.move === DIRECTION.UP) Pong.player.y -= Pong.player.speed;
            else if (this.player.move === DIRECTION.DOWN) this.player.y += this.player.speed;
 
            // On new serve (start of each turn) move the ball to the correct side
            // and randomize the direction to add some challenge.
            if (Pong._turnDelayIsOver.call(this) && this.turn) {
                this.ball.moveX = this.turn === this.player ? DIRECTION.LEFT : DIRECTION.RIGHT;
                this.ball.moveY = [DIRECTION.UP, DIRECTION.DOWN][Math.round(Math.random())];
                this.ball.y = Math.floor(Math.random() * this.canvas.height - 200) + 200;
                this.turn = null;
            }
 
            // If the player collides with the bound limits, update the x and y coords.
            if (this.player.y <= 0) this.player.y = 0;
            else if (this.player.y >= (this.canvas.height - this.player.height)) this.player.y = (this.canvas.height - this.player.height);
 
            // Move ball in intended direction based on moveY and moveX values
            if (this.ball.moveY === DIRECTION.UP) this.ball.y -= (this.ball.speed / 1.5);
            else if (this.ball.moveY === DIRECTION.DOWN) this.ball.y += (this.ball.speed / 1.5);
            if (this.ball.moveX === DIRECTION.LEFT) this.ball.x -= this.ball.speed;
            else if (this.ball.moveX === DIRECTION.RIGHT) this.ball.x += this.ball.speed;
 
            // Handle ai (AI) UP and DOWN movement
            if (this.ai.y > this.ball.y - (this.ai.height / 2)) {
                if (this.ball.moveX === DIRECTION.RIGHT) this.ai.y -= this.ai.speed;
                else this.ai.y -= this.ai.speed / 4;
            }
            if (this.ai.y < this.ball.y - (this.ai.height / 2)) {
                if (this.ball.moveX === DIRECTION.RIGHT) this.ai.y += this.ai.speed;
                else this.ai.y += this.ai.speed / 4;
            }
 
            // Handle ai (AI) wall collision
            if (this.ai.y >= this.canvas.height - this.ai.height) this.ai.y = this.canvas.height - this.ai.height;
            else if (this.ai.y <= 0) this.ai.y = 0;
 
            // Handle Player-Ball collisions
            if (this.ball.x - this.ball.width <= this.player.x && this.ball.x >= this.player.x - this.player.width) {
                if (this.ball.y <= this.player.y + this.player.height && this.ball.y + this.ball.height >= this.player.y) {
                    this.ball.x = (this.player.x + this.ball.width);
                    this.ball.moveX = DIRECTION.RIGHT;

                    this.player.speed += 1;
                    this.ball.speed *= 1.1;
                }
            }
 
            // Handle ai-ball collision
            if (this.ball.x - this.ball.width <= this.ai.x && this.ball.x >= this.ai.x - this.ai.width) {
                if (this.ball.y <= this.ai.y + this.ai.height && this.ball.y + this.ball.height >= this.ai.y) {
                    this.ball.x = (this.ai.x - this.ball.width);
                    this.ball.moveX = DIRECTION.LEFT;

                    this.ai.speed += 2;
                    this.ball.speed *= 1.1;
                }
            }
            Pong.player.x = 150;
            this.ai.x = this.canvas.width - 150;
        }
 
        // Handle the end game
        // Announce the victor
        if (this.player.score+this.ai.score === 10) {
                this.over = true;
                setTimeout(function () { Pong.endGameMenu('Winner is the '+ (this.player.score>this.ai.score)?"player":"bot"); }, 1000);
        }
    },
 
    // Draw the objects to the canvas element
    draw: function () {
        // Clear the Canvas
        this.context.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
 
       
        
 
        // Draw the background
        this.context.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
 
        this.context.fillStyle="red";

        // Draw the Player
        this.context.fillRect(
            this.player.x,
            this.player.y,
            this.player.width,
            this.player.height,
        );

        this.context.fillStyle="cyan";

        // Draw the Ai
        this.context.fillRect(
            this.ai.x,
            this.ai.y,
            this.ai.width,
            this.ai.height 
        );
        
        if(this.ball.x >= this.canvas.width/2)
        this.context.fillStyle="red";
        else
        this.context.fillStyle="cyan";
        

        // Draw the Ball
        if (Pong._turnDelayIsOver.call(this)) {
            this.context.fillRect(
                this.ball.x,
                this.ball.y,
                this.ball.width,
                this.ball.height
            );
        }
 
        this.context.fillStyle="#000000";

        // Draw the net (Line in the middle)
        this.context.beginPath();
        this.context.setLineDash([7, 15]);
        this.context.moveTo((this.canvas.width / 2), this.canvas.height - 140);
        this.context.lineTo((this.canvas.width / 2), 140);
        this.context.lineWidth = 10;
        this.context.strokeStyle = '#ffffff';
        this.context.stroke();
 
        this.context.fillStyle="#FFFFFF";

        // Set the default canvas font and align it to the center
        this.context.font = '100px Courier New';
        this.context.textAlign = 'center';
 
        // Draw the players score (left)
        this.context.fillText(
            this.player.score.toString(),
            (this.canvas.width / 2) - 300,
            200
        );
 
        // Draw the paddles score (right)
        this.context.fillText(
            this.ai.score.toString(),
            (this.canvas.width / 2) + 300,
            200
        );
 
        // Change the font size for the center score value
        this.context.font = '40px Courier';
 
    },
 
    loop: function () {
        Pong.update();
        Pong.draw();
 
        // If the game is not over, draw the next frame.
        if (!Pong.over) requestAnimationFrame(Pong.loop);
    },
 
    listen: function () {
        document.addEventListener('keydown', function (key)  {
            // Handle the 'Press any key to begin' function and start the game.
            if (Pong.running === false) {
                Pong.running = true;
                window.requestAnimationFrame(Pong.loop);
            }
 
            // Handle up arrow and w key events
            if (key.keyCode === 38 || key.keyCode === 87) {Pong.player.move = DIRECTION.UP}
 
            // Handle down arrow and s key events
            if (key.keyCode === 40 || key.keyCode === 83) {Pong.player.move = DIRECTION.DOWN}
        });
 
        // Stop the player from moving when there are no keys being pressed.
        document.addEventListener('keyup', function (key) { Pong.player.move = DIRECTION.IDLE; });
    },
 
 
    // Reset the ball location, the player turns and set a delay before the next round begins.
    _resetTurn: function(victor, loser) {
        this.ball = Ball.new.call(this, this.ball.speed);
        this.turn = loser;
        this.timer = (new Date()).getTime();
 
        victor.score++;
    },
 
    // Wait for a delay to have passed after each turn.
    _turnDelayIsOver: function() {
        return ((new Date()).getTime() - this.timer >= 1000);
    },
 
};
 
var Pong = Object.assign({}, Game);
Pong.initialize();