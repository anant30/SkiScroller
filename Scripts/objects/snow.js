var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // OCEAN CLASS ++++++++++++++++++++++++++++++++++++
    var Snow = (function (_super) {
        __extends(Snow, _super);
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function Snow() {
            _super.call(this, "snow");
            this._speed.y = 5; //snow speed
            this._reset(480);
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        Snow.prototype._checkBounds = function (value) {
            // check to see if the top of the snow 
            // is met the top of the scene
            if (this.y >= value) {
                this._reset(480);
            }
        };
        // reset the snow offscreen
        Snow.prototype._reset = function (value) {
            this.y = value;
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        Snow.prototype.update = function () {
            // scroll the snow 5 px per frame
            this.y -= this._speed.y;
            this._checkBounds(0);
        };
        return Snow;
    })(objects.GameObject);
    objects.Snow = Snow;
})(objects || (objects = {}));
//# sourceMappingURL=snow.js.map