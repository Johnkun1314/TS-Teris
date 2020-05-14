import { GameViewer, GameStatus } from "./types";
import { SquareGroup } from "./SquareGroup";
import { SquarePageView } from "./SquarePageView";
import $ from 'jquery'
import { Game } from "./Game";
import PageConfig from "./PageConfig";

export class GamePageViewer implements GameViewer {
    
    private nextDom = $('#nexttip')
    private rootDom = $('#root')
    private panelDom = $('#panel')
    private scoreDom = $('#score_num')
    private _over:string = 'none'
    showOver(game:Game): void {
        if(this._over == 'none'){
            $('#over').css({
                display:'block'
            }).html('游戏结束,得分:'+game.score)
            this._over = 'block'
        }else{
            $('#over').css({
                display:'none'
            })
            this._over = 'none'
        }
    }
    pause(status:string): void {
            $('#over').css({
                display:status
            }).html('游戏暂停')
       
    }
    init(game: Game) {
        this.panelDom.css({
            width: PageConfig.panelSize.width * PageConfig.SquareSize.width,
            height: PageConfig.panelSize.height * PageConfig.SquareSize.height
        })
        this.rootDom.css({
            width: PageConfig.panelSize.width * PageConfig.SquareSize.width + 200,
            height: PageConfig.panelSize.height * PageConfig.SquareSize.height
        })
        $(document).keydown((e) => {
            if (e.keyCode === 37) {
                
                game.controlLeft();
            }
            else if (e.keyCode === 38) {
                game.controlRotate();
            }
            else if (e.keyCode === 39) {
                game.controlRight();
            }
            else if (e.keyCode === 40) {
                game.controlDown();
            }
            else if (e.keyCode === 32) {
                if (game.gameStatus === GameStatus.playing) {
                    this.pause('block')
                    game.pause();
                }
                else {
                    game.start();
                    this.pause('none')
                }
            }
        })

    }
    showScore(score:number) {
        this.scoreDom.html(score.toString())
    }
    showNext(teris: SquareGroup): void {
        teris.square.forEach(it => {
            it.viewer = new SquarePageView(it, $('#nexttip'))
        })
    }
    switch(teris: SquareGroup): void {
        teris.square.forEach(it => {
            it.viewer!.remove()
            it.viewer = new SquarePageView(it, $('#panel'))
        })
    }

}