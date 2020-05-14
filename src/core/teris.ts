import { Shape, Point } from './types'
import { getRandom } from './util'
import { SquareGroup } from './SquareGroup'

export class Tshape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], _centerPoint, _color)
    }
    rotate() {
        super.rotate()
    }
}

export class Lshape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super([{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }], _centerPoint, _color)
    }
    rotate() {
        super.rotate()
    }
}


export class LMirrorsshape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super([{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }], _centerPoint, _color)
    }
    rotate() {
        super.rotate()
    }
}



export class Sshape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }], _centerPoint, _color)
    }
    rotate() {
        super.rotate()
        this.isclock = !this.isclock
    }
}


export class SMirrorsshape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super([{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], _centerPoint, _color)
    }
    rotate() {
        super.rotate()
        this.isclock = !this.isclock
    }
}



export class Sqshape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], _centerPoint, _color)
    }
    rotate() {

    }
}



export class Lishape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], _centerPoint, _color)
    }
    rotate() {
        super.rotate()
        this.isclock = !this.isclock
    }
}



export const shapes = [
    Tshape,
    Lshape,
    LMirrorsshape,
    Sshape,
    SMirrorsshape,
    Sqshape,
    Lishape
]

export const colors = [
    'red',
    'blue',
    'orange',
    'purple',
    'yellow',
    'green'
]

export function createTeris(centerPoint: Point) {
    let index = getRandom(0, shapes.length)
    const shape = shapes[index]
    index = getRandom(0, colors.length)
    const color = colors[index]
    return new shape(centerPoint, color)
}