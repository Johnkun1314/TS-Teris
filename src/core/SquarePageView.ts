import { Square } from "./Square";

import $ from 'jquery'
import { Iview } from "./types";
import PageConfig from "./PageConfig";

export class SquarePageView implements Iview {
    private isremove:boolean = false
    private dom?: JQuery<HTMLElement>
    constructor(
        private square: Square,
        private container: JQuery<HTMLElement>
    ) { }
    show(): void {
        if (!this.dom) {
            this.dom = $('<div>').css({
                position: "absolute",
                width: PageConfig.SquareSize.width,
                height: PageConfig.SquareSize.width,
                border: "1px solid #ccc",
                boxSizing: "border-box"
            }).appendTo(this.container)
        }
        this.dom.css({
            left: this.square.point.x * PageConfig.SquareSize.width,
            top: this.square.point.y * PageConfig.SquareSize.height,
            background: this.square.color
        })
    }
    remove(): void {
        if(this.dom && !this.isremove) {
            this.dom.remove()
        }
    }
}