/** Matrix representation, w/o any graphical concerns */
function Matrix(width, height, trail_size) {

    this.width = width;
    this.height = height;
    this.trail_size = trail_size;

    this.chars = this.buildValidCharacters();

    this.columns = new Array();

    // fill each column with random trails
    // start with random offsets
    for (var c = 0; c < this.width; c++) {
        this.columns[c] = {};
        var y = Math.floor(Math.random() * height - 2/3*height);
    	this.newTrail(c, y);
    };

};


/** Build a new trail for the given column, at the given 'y' position */
Matrix.prototype.newTrail = function(columnIdx, y) {

	var trail = new Array();
	for (var i = 0; i < this.trail_size; i++) {
		trail[i] = this.chars[Math.floor(Math.random() * this.chars.length)];
	};
	this.columns[columnIdx] = {
		y: y,
		trail: trail
	}
};


/** Move the Matrix to its next state */
Matrix.prototype.next = function() {

    for (var c = 0; c < this.width; c++) {
        var y = this.columns[c].y;
        y = y + 1;
        if (y > this.height + this.trail_size) {
            var y = -Math.floor(Math.random() * MAX_V_DELAY);
        }
        this.newTrail(c, y);
    }
};


/** Build an array of valid characters */
Matrix.prototype.buildValidCharacters = function() {
    var result = [];

    // a-z
    for (var idx = 'a'.charCodeAt(0), end = 'z'.charCodeAt(0); idx <= end; ++idx) { 
        result.push(String.fromCharCode(idx));
    }
  
    // 0-9
    for (var idx = '0'.charCodeAt(0), end = '9'.charCodeAt(0); idx <= end; ++idx) { 
        result.push(String.fromCharCode(idx));
    }

    // more characters can be added depending on the font and your tastes,
    // see http://www.dafont.com/matrix-code-nfi.font

    return result;
};
