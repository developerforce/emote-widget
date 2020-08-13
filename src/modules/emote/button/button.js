import { LightningElement, api } from 'lwc';
import { config } from '../../../../config.js';

const { apiDomain, emotePath } = config;

// const API_SERVER = 'http://localhost:8080';
// const API_ROUTE = '/api/emote/';

export default class Button extends LightningElement {
    @api emoji = 'unknown';
    @api name = 'unknown';
    @api talkId = 'unknown';
    @api count = 0;

    // On button click, POST message to API server
    handleClick() {
        fetch(`${apiDomain}${emotePath}/${this.talkId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emote: this.name })
        }).catch((error) => console.error('Error:', error));
    }
}
