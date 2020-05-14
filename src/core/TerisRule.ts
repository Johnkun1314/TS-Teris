import { Shape, Point, MoveDirection } from "./types";
import PageConfig from "./PageConfig";
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Square";

export class TerisRule {
    static canIMove(shape: Shape, targetPoint: Point, exist: Square[]): boolean {
        const targetSquareShape = shape.map(it => {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y
            }
        })

        let result = targetSquareShape.some(it => {
            return it.x < 0 ||
                it.x > PageConfig.panelSize.width - 1 ||
                it.y < 0 ||
                it.y > PageConfig.panelSize.height - 1
        })

        if (result) {
            return false
        }

        result = targetSquareShape.some(p => {
            return exist.some(sq => {
                return p.x === sq.point.x && p.y === sq.point.y
            })
        })
        if (result) {
            return false
        }
        return true

    }
    static moveAlongDown(teris: SquareGroup, exist: Square[]) {
        while (this.canIMove(teris.shape, {
            x: teris.centerPoint.x,
            y: teris.centerPoint.y + 1
        }, exist)) {
            teris.centerPoint = {
                x: teris.centerPoint.x,
                y: teris.centerPoint.y + 1
            }
        }
    }
    static movePoint(teris: SquareGroup, targetPoint: Point, exist: Square[]) {
        const result = this.canIMove(teris.shape, targetPoint, exist)
        if (result) {
            teris.centerPoint = targetPoint
            return true
        } else {
            return false
        }
    }
    static moveDirection(teris: SquareGroup, direction: MoveDirection, exist: Square[]) {

        let targetPoint: Point
        if (direction == MoveDirection.left) {
            targetPoint = {
                x: teris.centerPoint.x - 1,
                y: teris.centerPoint.y
            }
        } else if (direction == MoveDirection.right) {
            targetPoint = {
                x: teris.centerPoint.x + 1,
                y: teris.centerPoint.y
            }
        } else {
            targetPoint = {
                x: teris.centerPoint.x,
                y: teris.centerPoint.y + 1
            }
        }

        return this.movePoint(teris, targetPoint, exist)
    }
    static rotate(teris: SquareGroup, exist: Square[]) {
        const shape = teris.afterRotateShape()
        const ok = this.canIMove(shape, teris.centerPoint, exist)
        if (ok) {
            teris.rotate()
        }

    }
    private static getLineSquare(exist: Square[], y: number) {
        return exist.filter(it => it.point.y === y)
    }
    static deleteSquare(exist: Square[]): number {
        const arry = exist.map(sq => sq.point.y)
        const maxY = Math.max(...arry)
        const miny = Math.min(...arry)
        let num = 0
        for (let y = miny; y <= maxY; y++) {
            if (this.deleteLine(exist, y)) {
                num++
            }
        }
        return num
    }

    private static deleteLine(exist: Square[], y: number): boolean {
        const squares = this.getLineSquare(exist, y)
        if (squares.length === PageConfig.panelSize.width) {
            squares.forEach(it => {
                it.viewer!.remove()
                const index = exist.indexOf(it)
                exist.splice(index, 1)
            })
            exist.filter(it => it.point.y < y).forEach(p => {
                p.point = {
                    x: p.point.x,
                    y: p.point.y + 1
                }
            })
            return true
        }
        return false
    }

}