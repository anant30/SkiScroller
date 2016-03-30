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
            //reset scoreboard
            scoreboard.setLives(5);
            scoreboard.setScore(0);
            console.log(scoreboard.getLives());
            console.log(scoreboard.getScore());
            // Set Trees Count
            this._cloudCount = 3;
            // Instantiate Trees array
            this._trees = new Array();
            // added snow to the scene
            this._snow = new objects.Snow();
            this.addChild(this._snow);
            // added pills to the scene
            this._pills = new objects.Pills();
            this.addChild(this._pills);
            // added player to the scene
            this._player = new objects.Player();
            this.addChild(this._player);
            //added clouds to the scene
            for (var trees = 0; trees < this._cloudCount; trees++) {
                this._trees[trees] = new objects.Trees();
                this.addChild(this._trees[trees]);
            }
            // Score Label
            this._scoreLabel = new objects.Label("Score: ", " 40px Consolas ", "#000000", config.Screen.CENTER_X - 250, config.Screen.CENTER_Y - 200, true);
            this.addChild(this._scoreLabel);
            // Lives Label
            this._livesLabel = new objects.Label("Lives: ", " 40px Consolas ", "#000000", config.Screen.CENTER_X + 250, config.Screen.CENTER_Y + 200, true);
            this.addChild(this._livesLabel);
            // added collision manager to the scene
            this._collision = new managers.Collision(this._player);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // PLAY Scene updates here
        Play.prototype.update = function () {
            this._snow.update();
            this._pills.update();
            this._player.update();
            //update each trees
            for (var trees = 0; trees < 3; trees++) {
                this._trees[trees].update();
            }
            // this._collision.update(this._player, this._pills);
            this._updateScore();
            if (scoreboard.getLives() < 1) {
                //  this._player.engineOff();
                scene = config.Scene.END;
                changeScene();
            }
        };
        Play.prototype._updateScore = function () {
            this._scoreLabel.text = "Score: " + scoreboard.getScore();
            this._livesLabel.text = "Lives: " + scoreboard.getLives();
        };
        return Play;
    })(objects.Scene);
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map