import { GameStatus, MoveDirection, GameViewer } from "./types";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./teris";
import { TerisRule } from "./TerisRule";
import PageConfig from "./PageConfig";
import { Square } from "./Square";



export class Game {
    private _gameStatus: GameStatus = GameStatus.init
    private _curTeris?: SquareGroup
    private _nextTeris: SquareGroup | undefined = createTeris({ x: 0, y: 0 })
    private _timer?: any
    private _duration: number = 1000
    private _exist: Square[] = []
    private _score: number
    constructor(private _viewer: GameViewer) {
        this._score = 0
        this.init()
        this._viewer.init(this)

    }
    get gameStatus() {
        return this._gameStatus
    }

    public get score() {
        return this._score
    }

    public set score(val) {
        this._score = val;
        this._viewer.showScore(val)
        this.speed()
    }


    private init() {
        this._nextTeris = createTeris({ x: 0, y: 0 })
        this.reset(PageConfig.nextSize.width, this._nextTeris)
        this._viewer.showNext(this._nextTeris)
    }
    start() {
        if (this._gameStatus === GameStatus.init) {
            this.switchTeris()
        }
        if (this._gameStatus === GameStatus.playing) {
            return
        }
        if (this._gameStatus === GameStatus.over) {
            this.init()
            this.switchTeris()
        }
        this._gameStatus = GameStatus.playing
        this.autoToDrop()

    }
    pause() {
        if (this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause
            clearInterval(this._timer)
            this._timer = undefined
        }
    }

    controlLeft() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.moveDirection(this._curTeris, MoveDirection.left, this._exist)
        }
    }
    controlRight() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.moveDirection(this._curTeris, MoveDirection.right, this._exist)
        }
    }
    controlDown() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            // TerisRule.moveAlongDown(this._curTeris, this._exist)
           const res= TerisRule.moveDirection(this._curTeris, MoveDirection.down, this._exist)
           if(!res){
            this.hitBottom()            
           } 

        }
    }
    controlRotate() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.rotate(this._curTeris, this._exist)
        }
    }
    private autoToDrop() {
        if (this._timer || this._gameStatus !== GameStatus.playing) {
            return
        } else {
            this._timer = setInterval(() => {
                if (this._curTeris) {
                    const res = TerisRule.moveDirection(this._curTeris, MoveDirection.down, this._exist)

                    if (!res) {
                        this.hitBottom()
                    }
                }
            }, this._duration)
        }
    }
    private switchTeris() {
        this._curTeris = this._nextTeris
        this.reset(PageConfig.panelSize.width, this._curTeris!)
        if (this.isOver()) {
            return
        }
        this.init()
        this._viewer.switch(this._curTeris!)
    }
    private isOver(): boolean {
        const ok = TerisRule.canIMove(this._curTeris!.shape, this._curTeris!.centerPoint, this._exist)
        if (!ok) {
            this._viewer.showOver(this)
            this._curTeris = undefined
            this._nextTeris?.square.forEach(it => {
                it.viewer?.remove()
            })
            clearInterval(this._timer)
            this._timer = undefined
            this._gameStatus = GameStatus.over
            this._exist.forEach(it => {
                it.viewer!.remove()
            })
            this._exist = []
        }
        return !ok
    }
    private reset(width: number, teris: SquareGroup) {
        const x = Math.floor(width / 2) - 1
        teris.centerPoint = { x, y: 0 }

        while (teris.square.some(sq => { return sq.point.y < 0 })) {

            teris.centerPoint = {
                x: teris.centerPoint.x,
                y: teris.centerPoint.y + 1
            }
        }
    }
    private hitBottom() {
        this._exist.push(...this._curTeris!.square)
        const num = TerisRule.deleteSquare(this._exist)
        this.addScore(num)
        this.switchTeris()
    }
    private addScore(num: number) {
        if (num === 0) {
            return
        }
        else if (num === 1) {
            this.score += 10
        } else if (this.score === 2) {
            this.score += 30
        } else if (num === 3) {
            this.score += 50
        } else {
            this.score += 80
        }
    }
    speed() {
        const level = PageConfig.speed
        let len = level.length
        for (let i = len - 1; i >= 0; i--) {
            if (this.score >= level[i].score) {
                this._duration = level[i].duration
                break
            }
        }
        console.log(this._duration)
    }
}