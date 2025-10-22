class Stem {
    constructor(prevStem = null, x = null, y = null, possType = []) {
        this.prevStem = prevStem;
        if (this.prevStem === null) {
            this.index = 0;
            this.x = x;
            this.y = y;
            this.possType = possType;
        } else {
            this.index = prevStem.index+1;
            this.x = prevStem.getEndX();
            this.y = prevStem.getEndY();
            this.possType = prevStem.getNextTypePoss();
        }
        this.red = 130;
        this.blue = 160;
        this.growProgress = 0;
        this.finishGrow = false;
    }

    getEndX() {
        switch (this.type) {
            case 1:
                return this.x;
            case 2:
            case 5:
            case 7:
            case 9:
            case 11:
                return this.x+1;
            case 3:
            case 4:
            case 6:
            case 8:
            case 10:
                return this.x-1;
        }
    }

    getEndY() {
        switch (this.type) {
            case 1:
            case 4:
            case 5:
            case 8:
            case 9:
                return this.y-1;
            case 2:
            case 3:
                return this.y;
            case 6:
            case 7:
            case 10:
            case 11:
                return this.y+1;
        }
    }

    getNextTypePoss() {
        switch (this.type) {
            case 1:
                return [4, 5];
            case 2:
                return [9, 11];
            case 3:
                return [8, 10];
            case 4:
            case 6:
                return [3, 8, 10];
            case 5:
            case 7:
                return [2, 9, 11];
            case 8:
            case 9:
                return [1, 4, 5];
            case 10:
            case 11:
                return [6, 7];
        }
    }

    pickType() {
        if (this.possType.length > 0) {
            let randIdx = Math.floor(Math.random()*this.possType.length);

            this.type = this.possType.splice(randIdx, 1)[0];
            
            switch (this.type) {
                case 1:
                case 2:
                case 3:
                    this.growIncrement = 2;
                    this.growLimit = 50;
                    break;
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                    this.growIncrement = 2;
                    this.growLimit = 90;
                    break;
            }

            return true;
        } else {
            return false;
        }
    }

    isValid() {
        let valid;
        let x = this.getEndX();
        let y = this.getEndY();
        
        if (x-1 >= 0 && x+1 <= gridX && y-1 >= 0 && y+1 <= gridY) {
            if (gridArr[x-1][y-1] || gridArr[x][y-1] || gridArr[x-1][y] || gridArr[x][y]) {
                valid = false;
            } else {
                valid = true;
            }
        } else {
            valid = false;
        }

        return valid;
    }

    getFilledGrid() {
        switch (this.type) {
            case 1:
                return [[this.x-1, this.y-1], [this.x, this.y-1]];
            case 2:
                return [[this.x, this.y-1], [this.x, this.y]];
            case 3:
                return [[this.x-1, this.y-1], [this.x-1, this.y]];
            case 4:
            case 8:
                return [[this.x-1, this.y-1]];
            case 5:
            case 9:
                return [[this.x, this.y-1]];
            case 6:
            case 10:
                return [[this.x-1, this.y]];
            case 7:
            case 11:
                return [[this.x, this.y]];
        }
    }

    grow() {
        switch (this.type) {
            case 1:
                this.#drawLine(gridSize*this.x, (gridSize*this.y) - this.growProgress);
                break;
            case 2:
                this.#drawLine((gridSize*this.x) + this.growProgress, gridSize*this.y);
                break;
            case 3:
                this.#drawLine((gridSize*this.x) - this.growProgress, gridSize*this.y);
                break;
            case 4:
                this.#drawArc(gridSize*(this.x-1), gridSize*this.y, -this.growProgress);
                break;
            case 5:
                this.#drawArc(gridSize*(this.x+1), gridSize*this.y, 180 + this.growProgress);
                break;
            case 6:
                this.#drawArc(gridSize*(this.x-1), gridSize*this.y, this.growProgress);
                break;
            case 7:
                this.#drawArc(gridSize*(this.x+1), gridSize*this.y, 180 - this.growProgress);
                break;
            case 8:
                this.#drawArc(gridSize*this.x, gridSize*(this.y-1), 90 + this.growProgress);
                break;
            case 9:
                this.#drawArc(gridSize*this.x, gridSize*(this.y-1), 90 - this.growProgress);
                break;
            case 10:
                this.#drawArc(gridSize*this.x, gridSize*(this.y+1), 270 - this.growProgress);
                break;
            case 11:
                this.#drawArc(gridSize*this.x, gridSize*(this.y+1), 270 + this.growProgress);
                break;
        }

        if (this.growProgress < this.growLimit) {
            this.growProgress += this.growIncrement;
            this.red += 2;
            this.blue -= 1;
        } else {
            this.#drawEnd();
            this.finishGrow = true;
        }
    }

    #drawLine(x, y) {
        push();
        noStroke();
        fill(this.red, 0, this.blue);
        circle(x, y, 10);
        pop();
    }

    #drawArc(x, y, angle) {
        push();
        translate(x, y);
        rotate(angle);
        
        noStroke();
        fill(this.red, 0, this.blue);
        circle(gridSize, 0, 10);
        pop();
    }

    #drawEnd() {
        push();
        fill(this.red, 0, this.blue);
        circle(gridSize*this.getEndX(), gridSize*this.getEndY(), this.index%4 == 0 ? 30 : 20);
        pop();
    }
}