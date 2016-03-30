// PLAY SCENE
module scenes {
    export class Play extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _snow: objects.Snow;
        private _pointsBox: createjs.Bitmap;
        private _livesBox: createjs.Bitmap;
        private _pills: objects.Pills;
        private _carCount: number;
        private _player: objects.Player;
        private _collision: managers.Collision;
        private _pointsLabel: objects.Label;
        private _points: number;
        private _livesLabel: objects.Label;
        private _lives: number;
        private _gameoverImage: createjs.Bitmap;
        private _finalPointsLabel: objects.Label;
        private _restartPedal: createjs.Bitmap;
        private _trees: objects.Trees[];


        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();

        }

        // PUBLIC METHODS +++++++++++++++++++++

        // Start Method
        public start(): void {
            // Set trees Count, points, trees health
            this._carCount = 2;
            this._points = 0;
            this._lives = 100;

            // added snow to the scene
            this._snow = new objects.Snow();
            this.addChild(this._snow);
            
            // add the Points box the play scene
            this._pointsLabel = new objects.Label("Score","28px Consolas",
                "#000000",
                100, 20, false);
            this.addChild(this._pointsLabel);
            
            // add the Car Health box the play scene
            this._livesLabel = new objects.Label("Energy left","23px Consolas",
                "#000000",
                420, 20, false);
            this.addChild(this._livesLabel);

            // added enery pills to the scene
            this._pills = new objects.Pills();
            this.addChild(this._pills);

            // added player to the scene
            this._player = new objects.Player();
            this.addChild(this._player);

            // Add trees
            this._trees = new Array<objects.Trees>();
            for (var trees: number = 0; trees < this._carCount; trees++) {
                this._trees[trees] = new objects.Trees();
                this.addChild(this._trees[trees]);
            }




            // Add Points label
            this._pointsLabel = new objects.Label(
                this._points.toString(),
                "14px Consolas",
                "#000000",
                150, 50, false);
            this._pointsLabel.textAlign = "right";
            this.addChild(this._pointsLabel);

            // Add Lives label
            this._livesLabel = new objects.Label(
                this._lives.toString(),
                "14px Consolas",
                "#000000",
                450, 50, false);
            this._livesLabel.textAlign = "right";
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
                    this._pointsLabel = new objects.Label(
                        this._points.toString(),
                        "14px Consolas",
                        "#000000",
                        150, 50, false);
                    this._pointsLabel.textAlign = "right";
                    this.addChild(this._pointsLabel);
                }
            }

            // Check if the collision is with a red trees
            this._trees.forEach(trees => {
                trees.update();
                if (this._collision.check(trees)) {
                    if (this._lives <= 1) {
                        this.endOfGame();
                    }
                    else {
                        // Play trees crash sound
                        var audioFile = document.createElement("audio");
                        audioFile.src = "../../Assets/audio/car_crash.mp3";
                        audioFile.play();
                        // Decrement trees health variable
                        this._lives--;
                        // Update Car Health label
                        this.removeChild(this._livesLabel);
                        this._livesLabel = new objects.Label(
                            this._lives.toString(),
                            "14px Consolas",
                            "#000000",
                            450, 50, false);
                        this._livesLabel.textAlign = "right";
                        this.addChild(this._livesLabel);
                    }
                }
            });



        }

        // PRIVATE METHODS +++++++++++++++++++++++++++

        private endOfGame(): void {
            // console.log("Game Over!");
            this.removeChild(this._pointsLabel);
            this.removeChild(this._livesLabel);

            // add the gameover image
            this._gameoverImage = new objects.Button("MenuBackground", 0, 0, false);
            this.addChild(this._gameoverImage);

            // add the final score
            this.removeChild(this._pointsLabel);
            this._finalPointsLabel = new objects.Label("Your Score is : "+
                this._points.toString(),
                "40px Consolas",
                "#000000",
                200, 50, false);
            this._finalPointsLabel.textAlign = "right";
            this.addChild(this._finalPointsLabel);

            // add the restart pedal image
            this._restartPedal = new objects.Button("RestartButton", 450, 300, false);
            this.addChild(this._restartPedal);
            // restart button listner
            this._restartPedal.on("click", this._restartPedalClick, this);
        }

        private _restartPedalClick(event: createjs.MouseEvent): void {
           

            // Reset to the PLAY Scene
            scene = config.Scene.PLAY;
            changeScene();
        }

    }
}