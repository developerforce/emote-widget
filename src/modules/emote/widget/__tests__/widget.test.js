// These tests are examples to get you started on how how to test
// Lightning Web Components using the Jest testing framework.
//
// See the LWC Recipes Open Source sample application for many other
// test scenarios and best practices.
//
// https://github.com/trailheadapps/lwc-recipes-oss

import { createElement } from 'lwc';
import Widget from 'emote/widget';

describe('emote-widget', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('contains a p element', () => {
        const element = createElement('emote-widget', {
            is: Widget
        });
        document.body.appendChild(element);

        // Get p element
        const pEl = element.shadowRoot.querySelector('p');

        expect(pEl).toBeTruthy();
    });

    // it('contains a span tag that displays the greeting message.', () => {
    //     const INITIAL_GREETING = 'Hello';

    //     const element = createElement('my-greeting', {
    //         is: MyGreeting
    //     });
    //     document.body.appendChild(element);

    //     // Get span element
    //     const spanEl = element.shadowRoot.querySelector('span');

    //     expect(spanEl.textContent).toBe(INITIAL_GREETING);
    // });
});
