import { Square } from "./Square";
import { Shape, Point } from "./types";

export class SquareGroup {
    private _square: readonly Square[]
    protected isclock: boolean = true
    constructor(
        private _shape: Shape,
        private _centerPoint: Point,
        private _color: string) {
        const arr: Square[] = []
        this._shape.forEach(p => {
            const sq = new Square()
            sq.color = this._color
            sq.point = {
                x: this._centerPoint.x + p.x,
                y: this._centerPoint.y + p.y
            }
            arr.push(sq)
        })
        this._square = arr
    }

    get centerPoint(): Point {
        return this._centerPoint
    }

    get shape(): Point[] {
        return this._shape
    }

    set centerPoint(val) {
        this._centerPoint = val
        this._shape.forEach((p, i) => {
            this._square[i].color = this._color
            this._square[i].point = {
                x: this._centerPoint.x + p.x,
                y: this._centerPoint.y + p.y
            }

        })
    }

    get square() {
        return this._square
    }
    afterRotateShape() {
        if (this.isclock) {
            const res = this._shape.map(it => {
                const newP: Point = {
                    x: -it.y,
                    y: it.x
                }
                return newP
            })
            return res
        } else {
            const res = this._shape.map(it => {
                const newP: Point = {
                    x: it.y,
                    y: -it.x
                }
                return newP
            })
            return res
        }
    }
    rotate() {
        const shape = this.afterRotateShape()
        this._shape = shape
        this.centerPoint = this._centerPoint
    }
}