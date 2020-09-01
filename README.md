# Emote Widget

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

To emote | əˈmōt | is to display emotions openly, especially while acting. But the word also has a meaning in internet history. The original internet chat tool, IRC, provided a `/me` command, which allowed IRC channel participants to share emotion.

If my name were `friendlybug80` on IRC, when I typed `/me jumps for joy`, all IRC channel participants would see

```
* friendlybug80 jumps for joy
```

The 3rd-person `* friendlybug75 jumps for joy` is an emote.

**tl;dr The emote widget (and its associated [server](https://github.com/fostive/emote-server)) allows virtual event attendees watching the event stream to share their emotion with other attendees and the presenter in real time. It's a higher fidelity, virtual-only version of clapping.**

## Prerequisites

-   git
-   node
-   API server deployed or running locally https://github.com/fostive/emote-server

## Installing

1. `git clone git@github.com:fostive/emote-widget.git`
1. `cd emote-widget`
1. Update the `apiDomain` in `config.js` to your API server's domain.
1. `npm install`

## Running

1. `npm run watch`

## Deploying

1. `npm run build` to generate a `dist/main.js` file
1. Include `main.js` inside the `<head>` tags of the HTML page into which you want to embed the widget.

    ```html
    <script type="text/javascript" src="main.js"></script>
    <!-- main.js can be found in the dist folder in this project -->
    ```

1. Add the `<emote-widget>` HTML element within the `<body>` of the page. It doesn't matter where within the body you put it. The widget will be absolutely positioned on the page using CSS.

    `<emote-widget talk-id="mytalk" open="true"></emote-widget>`

    1. The `talk-id` value `mytalk` is a unique string identifier for the current talk. You'll need to update this when the talk changes. See the next step for more details.
    1. Set `open` to `false` if you want to start your Widget closed
    1. Colors, fonts, and positioning can be configured in `widget.scss`
    1. Set `widget-side` to `right` or `left` in `widget.scss`
    1. Add absolute positioning to your site's CSS to adjust were it appears.

    ```css
    emote-widget {
        position: absolute;
        right: 0;
        bottom: 0;
    }
    ```

1. Write some JavaScript to update the `talk-id` attribute's value when the talk changes. This will reset the counters to zero and record future clicks toward the new `talk-id` value. The `talk-id` value can be any string, but make sure it's unique for each "segment" (e.g. talk, panel discussion, keynote, etc) of your event for which you want to uniquely capture emote events. Something like the following can be used, but you'll have to implement a way to invoke the function when the talk changes.

    ```javascript
    updatTalkId(talkId) {
        const widget = document.querySelector('emote-widget');
        widget.setAttribute('talk-id', '<NEW_TALK_ID>');
    }
    ```

1. If you need to add a hook for every emote received you can pass a callback to the `onEmote` method on the emote widget.

    ```javascript
    const widget = document.querySelector('emote-widget');
    widget.onEmote((event) => {
        if (event.data === 'smile') {
            // do something
        }
    });
    ```

## 🛠 Built With

-   [Lightning Web Components](https://lwc.dev) to build the Web Components
-   [Anime.js](https://animejs.com) to animate the emojis

## 🤝 Contributing

We love contributions, small or big, from others!

Please see our [CONTRIBUTING](https://github.com/fostive/.github/blob/main/CONTRIBUTING.md) guidelines. The first thing to do is to discuss the change you wish to make via issue, email, or any other method with the owners of this repository.

Also, please review our [code of conduct](https://github.com/fostive/.github/blob/main/CODE_OF_CONDUCT.md). Please adhere to it in all your interactions with this project.

Thanks goes to these wonderful ✨ people ([emoji key](https://allcontributors.org/docs/en/emoji-key)) for contributing to the project:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/DianaPerkinsDesign"><img src="https://avatars0.githubusercontent.com/u/3477197?v=4" width="100px;" alt=""/><br /><sub><b>Diana Perkins</b></sub></a><br /><a href="#design-DianaPerkinsDesign" title="Design">🎨</a> <a href="https://github.com/fostive/emote-widget/commits?author=DianaPerkinsDesign" title="Code">💻</a> <a href="#ideas-DianaPerkinsDesign" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://crc.io"><img src="https://avatars3.githubusercontent.com/u/275734?v=4" width="100px;" alt=""/><br /><sub><b>Chris Castle</b></sub></a><br /><a href="https://github.com/fostive/emote-widget/commits?author=crcastle" title="Code">💻</a> <a href="https://github.com/fostive/emote-widget/commits?author=crcastle" title="Documentation">📖</a> <a href="#ideas-crcastle" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://julianduque.co"><img src="https://avatars3.githubusercontent.com/u/733877?v=4" width="100px;" alt=""/><br /><sub><b>Julián Duque</b></sub></a><br /><a href="https://github.com/fostive/emote-widget/commits?author=julianduque" title="Code">💻</a> <a href="https://github.com/fostive/emote-widget/pulls?q=is%3Apr+reviewed-by%3Ajulianduque" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/fostive/emote-widget/commits?author=julianduque" title="Documentation">📖</a></td>
    <td align="center"><a href="https://clif.world"><img src="https://avatars2.githubusercontent.com/u/13678764?v=4" width="100px;" alt=""/><br /><sub><b>Clifton Campbell</b></sub></a><br /><a href="https://github.com/fostive/emote-widget/commits?author=clif-os" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lukekarrys"><img src="https://avatars3.githubusercontent.com/u/542108?v=4" width="100px;" alt=""/><br /><sub><b>Luke Karrys</b></sub></a><br /><a href="https://github.com/fostive/emote-widget/commits?author=lukekarrys" title="Code">💻</a> <a href="#tool-lukekarrys" title="Tools">🔧</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Code of Conduct

Please review and adhere to our [CODE_OF_CONDUCT.md](https://github.com/fostive/.github/blob/main/CODE_OF_CONDUCT.md) before contributing to this project in any way (e.g. creating an issue, writing code, etc).

## 📝 License

This project is licensed under the Creative Commons Zero v1.0 License. See the [LICENSE](LICENSE) file for details.
