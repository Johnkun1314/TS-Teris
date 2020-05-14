import { Point, Iview } from "./types"

export class Square {
    private _viewers?: Iview
    private _point: Point = {
        x:0,
        y:0
    }
    private _color: string = "#000"
    get point() {
        return this._point
    }
    set point(val) {
        this._point = val
        if(this._viewers) {
            this._viewers.show()
        }
    }
    get color(){
        return this._color
    }
    set color(val:string) {
        this._color = val
        if(this._viewers) {
            this._viewers.show()
        }
    }
    get viewer() {
        return this._viewers
    }
    set viewer(val) {
        this._viewers = val
        if(val){
            val.show()
        }
    }
}
