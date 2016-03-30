// PLAY SCENE
module scenes {
    export class Play extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _snow: objects.Snow;
        private _pills: objects.Pills;
        private _trees: objects.Trees[];
        private _cloudCount: number;
        private _player: objects.Player;
        private _collision: managers.Collision;
        private _scoreLabel: objects.Label;
        private _livesLabel: objects.Label;

        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();

        }

        // PUBLIC METHODS +++++++++++++++++++++

        // Start Method
        public start(): void {

            //reset scoreboard
            scoreboard.setLives(5);
            scoreboard.setScore(0);
            console.log(scoreboard.getLives());
            console.log(scoreboard.getScore());

            // Set Trees Count
            this._cloudCount = 3;

            // Instantiate Trees array
            this._trees = new Array<objects.Trees>();

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
            for (var trees: number = 0; trees < this._cloudCount; trees++) {
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
        }

        // PLAY Scene updates here
        public update(): void {
            this._snow.update();
            this._pills.update();
            this._player.update();

            //update each trees
            for (var trees = 0; trees < 3; trees++) {
                this._trees[trees].update();
                //this._collision.update(this._player, this._trees[trees]);
               // this._collision.check();
            }

           // this._collision.update(this._player, this._pills);
            this._updateScore();

            if (scoreboard.getLives() < 1) {
              //  this._player.engineOff();
                scene = config.Scene.END;
                changeScene();
            }

        }

        private _updateScore(): void {
            this._scoreLabel.text = "Score: " + scoreboard.getScore();
            this._livesLabel.text = "Lives: " + scoreboard.getLives();
        }


        //EVENT HANDLERS ++++++++++++++++++++

    }
}