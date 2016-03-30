var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// PLAY SCENE
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Play() {
            _super.call(this);
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Play.prototype.start = function () {
            // Set trees Count, points, trees health
            this._carCount = 2;
            this._points = 0;
            this._lives = 100;
            // added snow to the scene
            this._snow = new objects.Snow();
            this.addChild(this._snow);
            // add the Points box the play scene
            this._pointsLabel = new objects.Label("Score", "28px Consolas", "#000000", 100, 20, false);
            this.addChild(this._pointsLabel);
            // add the Car Health box the play scene
            this._livesLabel = new objects.Label("Energy left", "23px Consolas", "#000000", 420, 20, false);
            this.addChild(this._livesLabel);
            // added enery pills to the scene
            this._pills = new objects.Pills();
            this.addChild(this._pills);
            // added player to the scene
            this._player = new objects.Player();
            this.addChild(this._player);
            // Add trees
            this._trees = new Array();
            for (var trees = 0; trees < this._carCount; trees++) {
                this._trees[trees] = new objects.Trees();
                this.addChild(this._trees[trees]);
            }
            // Add Points label
            this._pointsLabel = new objects.Label(this._points.toString(), "14px Consolas", "#000000", 150, 50, false);
            this._pointsLabel.textAlign = "right";
            this.addChild(this._pointsLabel);
            // Add Lives label
            this._livesLabel = new objects.Label(this._lives.toString(), "14px Consolas", "#000000", 450, 50, false);
            this._livesLabel.textAlign = "right";
            this.addChild(this._livesLabel);
            // added collision manager to the scene
            this._collision = new managers.Collision(this._player);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // PLAY Scene updates here
        Play.prototype.update = function () {
            var _this = this;
            this._snow.update();
            this._pills.update();
            this._player.update();
            // Check if the collision is with a Gas tank
            if (this._collision.check(this._pills)) {
                if (this._lives <= 1 || this._points >= 1000) {
                    this.endOfGame();
                }
                else {
                    // Play Points sound
                    var audioFile = document.createElement("audio");
                    audioFile.src = "../../Assets/audio/gastank_point.mp3";
                    audioFile.play();
                    // Increment points variable
                    this._points++;
                    // Update Points label
                    this.removeChild(this._pointsLabel);
                    this._pointsLabel = new objects.Label(this._points.toString(), "14px Consolas", "#000000", 150, 50, false);
                    this._pointsLabel.textAlign = "right";
                    this.addChild(this._pointsLabel);
                }
            }
            // Check if the collision is with a red trees
            this._trees.forEach(function (trees) {
                trees.update();
                if (_this._collision.check(trees)) {
                    if (_this._lives <= 1) {
                        _this.endOfGame();
                    }
                    else {
                        // Play trees crash sound
                        var audioFile = document.createElement("audio");
                        audioFile.src = "../../Assets/audio/car_crash.mp3";
                        audioFile.play();
                        // Decrement trees health variable
                        _this._lives--;
                        // Update Car Health label
                        _this.removeChild(_this._livesLabel);
                        _this._livesLabel = new objects.Label(_this._lives.toString(), "14px Consolas", "#000000", 450, 50, false);
                        _this._livesLabel.textAlign = "right";
                        _this.addChild(_this._livesLabel);
                    }
                }
            });
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++
        Play.prototype.endOfGame = function () {
            // console.log("Game Over!");
            this.removeChild(this._pointsLabel);
            this.removeChild(this._livesLabel);
            // add the gameover image
            this._gameoverImage = new objects.Button("MenuBackground", 0, 0, false);
            this.addChild(this._gameoverImage);
            // add the final score
            this.removeChild(this._pointsLabel);
            this._finalPointsLabel = new objects.Label("Your Score is : " +
                this._points.toString(), "40px Consolas", "#000000", 200, 50, false);
            this._finalPointsLabel.textAlign = "right";
            this.addChild(this._finalPointsLabel);
            // add the restart pedal image
            this._restartPedal = new objects.Button("RestartButton", 450, 300, false);
            this.addChild(this._restartPedal);
            // restart button listner
            this._restartPedal.on("click", this._restartPedalClick, this);
        };
        Play.prototype._restartPedalClick = function (event) {
            // Reset to the PLAY Scene
            scene = config.Scene.PLAY;
            changeScene();
        };
        return Play;
    })(objects.Scene);
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map