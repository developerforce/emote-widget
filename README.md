# Emote Widget

This project generates the JavaScript you will include on the page into which you want to embed the widget.

1. Deploy the server at https://github.com/fostive/emote-server.
1. Update the `apiDomain` in `config.js` to your server's domain.
1. Add this inside the `<head>` tags of the page into which you want to embed the widget.

    ```html
    <script type="text/javascript" src="main.js"></script>
    <!-- main.js can be found in the dist folder in this project -->
    ```

1. Add the `<emote-widget` HTML element within the `<body>` of the page. It doesn't matter where within the body you put it.

    `<emote-widget talk-id="mytalk" position="bottom-right"></emote-widget>`

    1. The `talk-id` value `mytalk` is a unique string identifier for the current talk. You'll need to update this when the talk changes. See the next step for more details.
    1. Colors, fonts, and positioning can be configured in `widget.scss`
    1. Set `widget-side` to `right` or `left` in `widget.scss`
    2. Add absolute positioning to your site's CSS to adjust were it appears.
    ```
    emote-widget {
        position: absolute;
        right: 0;
        bottom: 0;
    }
    ```

1. Write some JavaScript to update the `talk-id` attribute's value when the talk changes. This will reset the counters to zero and record future clicks toward the new `talk-id` value. The `talk-id` value can be any string, but make sure it's unique for each "segment" (e.g. talk, panel discussion) of your event for which you want to uniquely capture emote events. Something like the following can be used, but you'll have to implement a way to invoke the function when the talk changes.

    ```javascript
    updatTalkId(talkId) {
        const widget = document.querySelector('emote-widget');
        widget.setAttribute('talk-id', <NEW_TALK_ID>);
    }
    ```

## Development

1. git clone
1. `cd emote-widget`
1. `npm install`
1. `npm run watch`

`npm run build` will create a production build in the `dist` folder.


## TODO

- [ ] Make widget position fixed on page - &yet
- [ ] Make widget position configurable - &yet
- [ ] Add emoji animation on click and on receiving an event - &yet
- [ ] Apply styling to widget, buttons, counts, etc. - &yet
- [ ] Consider incrementing displayed count **on click** instead of waiting for SSE. Network delay may delay count increment after a click and confuse the user -- they will click and not see the number increment right away.
- [ ] Determine a better way to make widget JS available to event organizer. Right now they have to copy the `dist/main.js` file to their event website and serve it from that website.
- [ ] Add tests for components
- [x] Make counters work
- [x] Periodically update counts
- [x] Make API URL configurable
- [x] Handle update of `talk-id` attribute
- [x] Remove old / unnecessary components (greeting, hero, app)
