var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // CLOUD CLASS ++++++++++++++++++++++++++++++++++++
    var Trees = (function (_super) {
        __extends(Trees, _super);
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        function Trees() {
            _super.call(this, "trees");
            this._reset(this._topBounds);
            this.name = "trees";
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        Trees.prototype._checkBounds = function (value) {
            // check to see if the top of the trees 
            // is outside the viewport         
            if (this.y >= value) {
                this._reset(this._topBounds);
            }
        };
        // reset the trees offscreen
        Trees.prototype._reset = function (value) {
            this._speed.y = Math.floor(Math.random() * 5) + 5;
            this._speed.x = Math.floor(Math.random() * 4) - 2;
            this.y = value;
            this.x = Math.floor(Math.random() * this._rightBounds) + this._leftBounds;
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        Trees.prototype.update = function () {
            // scroll the trees down the screen
            this.y += this._speed.y;
            this.x += this._speed.x;
            this._checkBounds(this._bottomBounds);
        };
        return Trees;
    })(objects.GameObject);
    objects.Trees = Trees;
})(objects || (objects = {}));
//# sourceMappingURL=trees.js.map