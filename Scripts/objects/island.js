var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // ISLAND CLASS ++++++++++++++++++++++++++++++++++++
    var Pills = (function (_super) {
        __extends(Pills, _super);
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function Pills() {
            _super.call(this, "pills");
            this._speed.y = 5; //pills speed
            this._reset(this._topBounds);
            this.name = "pills";
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        Pills.prototype._checkBounds = function (value) {
            // check to see if the top of the pills 
            // is outside the viewport         
            if (this.y >= value) {
                this._reset(this._topBounds);
            }
        };
        // reset the ocean offscreen
        Pills.prototype._reset = function (value) {
            this.y = value;
            this.x = Math.floor(Math.random() * this._rightBounds) + this._leftBounds;
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        Pills.prototype.update = function () {
            // scroll the pills 5 px per frame
            this.y += this._speed.y;
            this._checkBounds(this._bottomBounds);
        };
        return Pills;
    })(objects.GameObject);
    objects.Pills = Pills;
})(objects || (objects = {}));
//# sourceMappingURL=island.js.map