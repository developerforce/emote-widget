import { LightningElement, api } from 'lwc';

export default class Confetti extends LightningElement {
    @api emojis = [];

    connectedCallback() {
        const floating = require(/* webpackChunkName: "floating.js" */ 'floating.js');
        console.log(floating);
        // const thing = floating({
        //     content: '😇',
        //     number: 3,
        //     duration: 11
        // });
    }
}
