import anime from 'animejs';
import { debounce } from 'throttle-debounce';

const emojiUrlLookup = {
    celebrate:
        'data:image/png;base64,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',
    heart:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABG1JREFUaAXtWdtrHFUYP9+Z3aRpkFIvUM0mESK2tM1uNIigKJEiWEsrFVP0pTbeEN98EcUbFUT/giL1oakPKkYsVrTigwaKgkg1u2m9oWiSTRtQLEXSpLsz5/P7dp0w2TlnZmd2tlnKDoQ557v8vt/v3HZmIkT7ao9AewTaI3BFjwAiAv81S2Rc/LoIFTb0bVSL6nlQuAcFDAiBkhLnBchJCXhk0C5ONiJsOpUZUQhjAtUICtEjBCgQ+DtVOS675ZvZC7Pnw/BDhUxbmb0KxSEUuMkIBuLrtGU9ta00+6MxRuM409G3tew4hwWKOzXuigkELNCoPTPoFI+ZYtgeKKRg9R5QqI4EAbg+KlgCgKezzlxd8YQ9RsvoLRqgDhcj6C5BjhH2uCnGKKTQkRlUtviWllGXKVlvh1eHVPE1va9qnZKZVwj3YFCM3wdLMiVuz5aK036fEFJnZBvaeDS6iErmwYLsedaEW/VFFVHB7apy0iNrZ2Qq3X+LcOzv9SnhVgKlM8F6IOfMfuKNzlt9uwU6H9OG1tb1xhrbVurWofLMD7V+7YwAqv21gVH6FaKoxqe7BnrdvEqbbA2JIDATN60QoXC3SyDunTbx1aq0vLLxuc22uHgreQZuqZWA1Y3M6m68HqLYkbd6H+ZsRLUjHoovS8vNt1Z/uerma5cWF//ypcc2wNlqKt4QG6Imsau7+7rN//76t9fsm5HlUvkab0Dj7eQEuFz+57hKiG+PrO+2zrkJrXrXcfQtLSafl5l/aGNubEUh9ARxPqeKvkPDNyNV8vhHK4oI4qYVAhK+aFUhJm5aIfTg8m6rCjFx0+4RFkEPdqfp9N/WWoLgDD2Qbtdx0s8IRdKmOqRLWEtbECejkOzdA4dpun5aS+Le2syFOXlt3rZxaXFQwcrcrxA/9SasVVsC7Mo6xc9M9QOFcFLeypygN7n7TACXw05vnp/nnOLOoFrGpeUmpTutx2htLrj9y33n2swhrG6okK0XZ84JCfsIyA4Da4Lf5toVDiHgoUI4P2fPnaTA50KwEndzTa5dD3DoHvGC5K2ecXrHeNRra1YbQBzNOfMH6sWva0ZcsOyDdzxOBd53+826cw2uFQU/0owwMI6OWoWPvnmPZmY0SqF6Y0nEBIl4BCYmnHpzOC6yEE7CkZFU/uRvH9D7617uJ3YBHMvdddM+mJyMfLDEEsLEcXg4XZhaeDupPcN7Iju06Uk4daocZ2BiC3GL5WXPC9R+Pe5nHiJAqeLFnJp/w8WMc29YCBel0+wh+k/DO8Qp6ufVJQDcT6fTh3HIe3MSEcKAp9O9tzkOHqdXZPNXe09l/sW2LNizvTz3ncccuxnp+A2qwoQ618EwPRd9GRTHPo7h2KREMGZiQhhsy8W5s9mXn7gXhHyJplqxzXuxjX0cw7FeX6PtxJZWLZGfU/33XFL2CdrJneyjQpc6ZWrnFnvmq9rYJPpNE8Lk/lzff/2FZafyPrNhnbXrRn4AbV/tEWiPQHsE2iNwJY3Af3pWX3UQU+kkAAAAAElFTkSuQmCC',
    plusone:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAA8xJREFUaAXtWFtIFFEY/s84O2pKXvLSRTFMUVlECeshDHoQixBKCjJCqF6ChCB6KMEbWhQ9RPTSQ0gPQuRL9CLUiy+aBVIbq0KRZSVCWSqizraXmb8zm8icmZ11ZndWQ+bAYc9/P99/zpzznwVwmpMBJwNOBpwMOBmIPQMkdlP7LAtGurKJHGqJ5NGVkv7gS82NxUgyNY9XE5s15iB0SELsjhRfDv7po/x1gXCRjDeaJyPUxRtzU4GgV+h/8c49DYhX4gWyKVurYOReKo+/y675xhufBd0uxHhhAGz4ihQMtV1HaU4MysTTH6h0BdGeKdjjxVpCU62pm9O2vLUKhtsmATBF7R6BDM/U3mxS89RjnHALIH9qpLziTnH0Qm+gRi22ZWwZCAWxm+5pTVYxJ+ps5K9ZIONTRSeD+KOqxio0BQQnkksASaESpGgBOQn+i3uUwWwKCEjyZUC4qlgKRAIfmjNjIq0S5wUPNPAfGdE8XeDTK2cZnlUi9hlZjbSqn01EyE4SGetZTGfoWIiNAcJzIQgQj36CWEx5GXq+dY4hkMKh9otI8JTi8ujyz4qdZDns3R9pWxGopqfZgDY8At8zU9v1hlQszVHZfp3cKzynt/oJLT8W2hAIBVGOiMcVpxNSHkxAnrF/hB0I/3TVSlxS6JGaTuSYuRARuzj0ZmQpPY0EkhMZ2G7fDBAYu7MXUJxXejPvibuQs3uy0fyxQKJp/ueyLQPE8GNvcH2Afdy8bh1a/fWgrVhLuTm4JIyGdenlNn7bf+S+QvCIEY5cnUtbGIZAqpJ+gNK1rd1fB0FN9Z9Pj+YmwbuqSmZaDgz3au0STW/RrVXpm4LJUqZED2dS/HaX/hqeYq/kokHYVhS+c6AkQwZ4m+gF0PlnthYhRHl06ups9LokWjQaNlrWIymd1NkZGiRAwABJgH+dy6LXbRWSBBWKoC/wclcOiLDIvtMYG0mSjtHyZ1bNTBZw9PPBW9NqnmUgza73ax/7QKis7xem0f+cOLYuV0fQjKUQnKEL2KmwW331GqmelFF+qOX6A9w5ynui5lsG0pEyuGbfww92E7efPn03v1kGEsuUcSozE5bEx4ptq+gp7wtWx+Imqo05IEm8csGF39yMN2EP3acmFmQ5mEzL9ZOKbS63wriwizAFhLh932lApWuaCRAai0SRpoDYGTyb+KA4QumzXgz6oPPN4PbwScUhWdLqb8jfITiWlg9yQF/vaGcTnR4mVcHDRipbtEQxghsvPzd9GWYXOuJygxjhG43Lo2PsZMDJgJMBJwNOBtYy8BerNyDkZWeQngAAAABJRU5ErkJggg==',
    question:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABL5JREFUaAXtWXlsFGUUf2/2KmBbFUjtQpQlKSIYrZDuRsQYIjaNoYIEREUT0QhRAvGK0YToGiP/iNGIBEWpeDRiWkg84h+SaDFatxgN3aZWpMcWZas9LN2Qdrvbmec3W2b2nJmd2Q8TyX7JZt73e/f7zpkFKLZiBYoVKFbg/1QBvBjBEhE6fXCDSHALgFQJEswGhCigMIQShB0uaIm2Yj9P31wTudJHZedE2EFAO4CoQj9Q/FUAfH39Qni/qQlFfVljLrdE7MtppYjUxBK4ythtqgQGXQ5cGw1gKBU1S3NJxOalNZJIRwHIYTaAaXkMO5142+SP2G1NH0Cwqqjouby0SJKo0XoSsiVyx+LUuHEj2RS7Zp8FJ1LiGNvLplOZWcdZ8kTeo72wJQvPEygokeaGTS9EoqW1efoyFJOQthsKaQhYToTanf7eQc9LGnZV+MEVjdDw8DbYu/lJWLX4uIrnJIiqZ/hofk6eAWg34OdkU4dzPUj04vFTt+bkK+Cee56Dp+reULqw/fb9sO7NZvj85BoVyyRiEngZ9mcmbtQ3PSLUudTJDrg9suGzo25N+3MuG4Gdq9/K4j+26kAWlgqQBPNS+/nSphMB6fTdbJfxyA6Gz8/R9FNV2S3Z7VNZfPcVA1lYBlCe0c+rayERuFOxPCVqz8y2Hm8LzCwtZxv8I0x+XNH5Y8RgCQjsKmOhaUeibWyZwrqr+gsYm0gWkAClrzvv+CoyXjZOkq0Dq/6JMNkGCjo9bIveJet92LpZUc/5RILBnAwDEA34WWxqd8iO5mYxpoEf8Mb4ykweBUtWA4nHPgncCw8cOASUKZDSt9uE6vgJbE+B8iLNTy2EUm3L+HduHjkOt22Chw6+p5sEAHZYSUL2aWVq5Y5VB936wb5nD7ZsMUiCpYH4jt5o6bhgbwkmm/yuoaXCAkmLQ5b11IU+7h+++n4tnSSO32xYiLVWr/SaQSUdWKP8fhLe/f7sZ+HRSu3TTzWN/bNc6D3fipYWumzG8m1TjUGDiFbUNf8WXrxWg63Cl88aG4b4jJvHT2BYBS0Q5hd7Hk5+P7b05V/6lrGDU7955oYmrnX310z8jGf0JY25XBMh8gsUdLzd1l2zKy7adaftknldsa21h2oCh28KGYdpLMF31+p45TW2NW0bjGgdM9MBucsH4k/U7at59PH9ncYh5ifBbUSoq2QBc7lTdisavOjZ7PQ0SyIoy/Jq/EYkRvLCThRGZ4dOxD0wOj/AKwHFDrcRASTtq7Di7cITBZjMgAru8hsRSm7lS9xdcJ/v07TgAj2+b0MjC/6SQdsUnEtjcujo7ixm7LNX393sPeV5WUcUbeyym256KFJxXf0zfT2Kzfp6EP1+9t2RU+M3IikBrdj9HfzUtzwFSZBd7POpip38UpDfUxpUoECC3xoR4CN261sn/3qHPKcLjMu0Or8RkbAKBEpc8W0Cm1v/ceOXCNCr7MvKIjn+a2afAaNDkXee/KYW78hM2ismYrJgF12c4xpJxlpij8JM50QSuEBNxl2T7B6m/KkTzxIoAEg/tQowxA7EU+xATCx2TTM23IDXx45o8gtgXDJrhOfUOsIOQ/3/DSUKFVD0omqxAsUKFCtwCVXgX3EZXzwqy3FMAAAAAElFTkSuQmCC',
    smile:
        'data:image/png;base64,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'
};

const calculateAlpha = (yCurrent, yStart, yEnd) => {
    const yMid = (yStart - yEnd) / 2;
    const alpha = 1 - Math.abs(yMid - (yCurrent - 20)) / yMid;
    return alpha < 0 ? 0 : alpha;
};

const renderParticule = (anim) => {
    anim.animatables.forEach((i) => i.target.draw());
};

export default class Animation {
    canvasEl;
    ctx;
    render;
    images = {};
    animate;

    constructor(elem) {
        this.canvasEl = elem;
        this.setCanvasSize();
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

    loadImage(name) {
        if (this.images[name]) {
            return this.images[name];
        }

        const image = new Image();
        image.src = emojiUrlLookup[name];
        this.images[name] = image;
        return image;
    }

    setCanvasSize() {
        this.canvasRect = this.canvasEl.getBoundingClientRect();
        this.canvasEl.width = this.canvasRect.width;
        this.canvasEl.height = this.canvasRect.height;
        this.canvasEl.getContext('2d').scale(1, 1);
    }

    setParticuleDirection(p) {
        const angle = 1.55;
        const radius = -this.canvasRect.height;
        return {
            x: p.x + radius * Math.cos(angle),
            y: p.y + radius * Math.sin(angle)
        };
    }

    createParticule(img) {
        const p = {};
        const x = anime.random(30, 60);
        const yBase = this.canvasRect.height - 78;
        const yWiggle = 30;
        const y = anime.random(yBase - yWiggle / 2, yBase + yWiggle / 2);
        p.startPos = { x, y };
        p.x = x;
        p.y = y;
        p.radius = anime.random(24, 48);
        p.endPos = this.setParticuleDirection(p);
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

    animateParticules(img) {
        const particules = [this.createParticule(img)];

        anime.timeline().add({
            targets: particules,
            x: (p) => p.endPos.x,
            y: (p) => p.endPos.y,
            radius: anime.random(10, 80),
            duration: anime.random(12000, 15000),
            easing: 'easeOutExpo',
            update: renderParticule
        });
    }

    fireAnimation(name) {
        const img = this.loadImage(name);
        if (this.animate) {
            this.animate(img);
        } else {
            this.animate = debounce(10, (image) => {
                this.render.play();
                this.animateParticules(image);
            });
            this.animate(img);
        }
    }
}
