import { LightningElement, api } from 'lwc';
import anime from 'animejs';

const calculateAlpha = (yCurrent, yStart, yEnd) => {
    const yMid = (yStart - yEnd) / 2;
    const alpha = 1 - Math.abs(yMid - (yCurrent - 20)) / yMid;
    return alpha < 0 ? 0 : alpha;
};

const setParticuleDirection = (p) => {
    var angle = 1.62;
    var radius = -100;
    return {
        x: p.x + radius * Math.cos(angle),
        y: p.y + radius * Math.sin(angle)
    };
};

const renderParticule = (anim) => {
    anim.animatables.forEach((i) => i.target.draw());
};

export default class Animation extends LightningElement {
    renderedCallback() {
        this.canvasEl = this.template.querySelector('.animation-canvas');
        this.setCanvasSize();
        this.buttonEl = this.template.querySelector('#button');
        this.ctx = this.canvasEl.getContext('2d');
        this.render = anime({
            duration: Infinity,
            update: () => {
                this.ctx.clearRect(
                    0,
                    0,
                    this.canvasEl.width,
                    this.canvasEl.height
                );
            }
        });
    }

    setCanvasSize() {
        const rect = this.canvasEl.getBoundingClientRect();
        this.canvasEl.width = rect.width;
        this.canvasEl.height = rect.height;
        this.canvasEl.getContext('2d').scale(2, 2);
    }

    createParticule(img) {
        var p = {};
        const x = anime.random(15, 25);
        const y = anime.random(100, 120);
        p.startPos = { x, y };
        p.x = x;
        p.y = y;
        p.radius = anime.random(16, 24);
        p.endPos = setParticuleDirection(p);
        p.draw = () => {
            this.ctx.globalAlpha = calculateAlpha(
                +p.y,
                p.startPos.y,
                p.endPos.y
            );
            this.ctx.drawImage(img, p.x, p.y, p.radius, p.radius);
        };
        return p;
    }

    animateParticules(img, numberOfParticules) {
        var particules = [];
        for (let i = 0; i < numberOfParticules; i++) {
            particules.push(this.createParticule(img));
        }

        anime.timeline().add({
            targets: particules,
            x: function (p) {
                return p.endPos.x;
            },
            y: function (p) {
                return p.endPos.y;
            },
            radius: anime.random(5, 30),
            duration: anime.random(3000, 5000),
            easing: 'easeOutExpo',
            update: renderParticule
        });
    }

    @api
    fireAnimation(img, count) {
        this.render.play();
        this.animateParticules(img, count);
    }
}
