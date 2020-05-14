import { SquareGroup } from "./SquareGroup";
import { Game } from "./Game";

export interface Point {
    readonly x: number
    readonly y: number
}

export interface Iview {
    show(): void
    remove(): void
}


export type Shape = Point[]

export enum MoveDirection {
    left,
    right,
    down
}

export enum GameStatus {
    init,
    playing,
    pause,
    over
}

export interface GameViewer {
    showNext(teris: SquareGroup): void
    switch(teris: SquareGroup): void
    showScore(score:number):void
    init(game:Game): void
    showOver(game:Game):void
    pause(status:string):void
}