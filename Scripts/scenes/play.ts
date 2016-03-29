// PLAY SCENE
module scenes {
    export class Play extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _ocean: objects.Snow;
        private _island: objects.Pills;
        private _clouds: objects.Trees[];
        private _cloudCount:number;
        private _player: objects.Player;
        private _collision: managers.Collision;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
           
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            // Set Trees Count
            this._cloudCount = 3;
            
            // Instantiate Trees array
            this._clouds = new Array<objects.Trees>();
                
            // added snow to the scene
            this._ocean = new objects.Snow();
            this.addChild(this._ocean);

            // added pills to the scene
            this._island = new objects.Pills();
            this.addChild(this._island);

            // added player to the scene
            this._player = new objects.Player();
            this.addChild(this._player);
            
            //added clouds to the scene
            for(var trees:number = 0; trees < this._cloudCount; trees++) {
                this._clouds[trees] = new objects.Trees();
               this.addChild(this._clouds[trees]);
            }
            
            // added collision manager to the scene
            this._collision = new managers.Collision(this._player);
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // PLAY Scene updates here
        public update(): void {
            this._ocean.update();
            this._island.update();
           
            this._player.update();
           
            this._clouds.forEach(trees => {
                trees.update();
                this._collision.check(trees);
            });
            
            this._collision.check(this._island);
        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
    }
}