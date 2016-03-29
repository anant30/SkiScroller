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
            // Set Trees Count
            this._cloudCount = 3;
            // Instantiate Trees array
            this._clouds = new Array();
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
            for (var trees = 0; trees < this._cloudCount; trees++) {
                this._clouds[trees] = new objects.Trees();
                this.addChild(this._clouds[trees]);
            }
            // added collision manager to the scene
            this._collision = new managers.Collision(this._player);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // PLAY Scene updates here
        Play.prototype.update = function () {
            var _this = this;
            this._ocean.update();
            this._island.update();
            this._player.update();
            this._clouds.forEach(function (trees) {
                trees.update();
                _this._collision.check(trees);
            });
            this._collision.check(this._island);
        };
        return Play;
    })(objects.Scene);
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map