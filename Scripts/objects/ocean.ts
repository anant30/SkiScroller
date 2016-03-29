module objects {
    // OCEAN CLASS ++++++++++++++++++++++++++++++++++++
    export class Snow extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        constructor() {
            super("snow");
            
           this._speed.y = 5; //snow speed
           this._reset(480);
        }
        
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        protected _checkBounds(value:number):void {
            // check to see if the top of the snow 
            // is met the top of the scene
            
            if(this.y >= value) {
                this._reset(480);
            }
        }
        
        // reset the snow offscreen
        protected _reset(value:number):void {
            this.y = value;
        }
        
        
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        public update():void {
            // scroll the snow 5 px per frame
            this.y -= this._speed.y;
            this._checkBounds(0);
        }
    }
}