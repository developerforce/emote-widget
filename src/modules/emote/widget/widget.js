import { LightningElement, api, track } from 'lwc';
import { config } from '../../../../config.js';
import Animation from 'emote/animation';

const { apiDomain, ssePath, emotePath } = config;

export default class Widget extends LightningElement {
    eventSource;
    eventList;
    emoteCallback;
    intervalId;
    talk;
    showWidget = true;
    showOptions = false;
    showAnimations = true;
    selectedOption = true;
    animation;

    COUNT_REFRESH_INTERVAL = 5000;

    // TODO: Design way to import this from config or from server
    @track buttonsData = [
        {
            name: 'celebrate',
            emoji: '🎉',
            count: '0'
        },
        {
            name: 'heart',
            emoji: '♥️',
            count: '0'
        },
        {
            name: 'smile',
            emoji: '😊',
            count: '0'
        },
        {
            name: 'clap',
            emoji: '👏',
            count: '0'
        },
        {
            name: 'plusone',
            emoji: '👍',
            count: '0'
        },
        {
            name: 'question',
            emoji: '❓',
            count: '0'
        }
    ];

    // Start animation component
    renderedCallback() {
        if (this.animation) return;

        const canvasEl = this.template.querySelector('.animation-canvas');
        this.animation = new Animation(canvasEl);
    }

    @api
    get talkId() {
        return this.talk;
    }

    @api
    get open() {
        return this.showWidget;
    }

    set open(value) {
        this.showWidget = value === 'true';
    }

    // Handle when the value of the "talk-id" attribute is set (or updated)
    set talkId(value) {
        this.talk = value;

        if (this.eventSource) {
            this.cleanUp();
        }

        // Initialize event source
        this.eventSource = new EventSource(`${apiDomain}${ssePath}/${value}`);

        // Increment displayed count when SSE received
        this.eventSource.addEventListener(
            'emote',
            this.emoteReceived.bind(this)
        );

        // Update displayed count periodically from server
        this.updateAllCounts();
        this.intervalId = setInterval(
            this.updateAllCounts.bind(this),
            this.COUNT_REFRESH_INTERVAL
        );
    }

    // Avoid memory leaks
    disconnectedCallback() {
        this.cleanUp();
    }

    // Tear down interval and event source to avoid memory leaks
    cleanUp() {
        clearInterval(this.intervalId);

        this.eventSource.removeEventListener(
            'emote',
            this.emoteReceived.bind(this)
        );
        this.eventSource.close();
        this.animation = false;
    }

    emoteReceived(event) {
        // If animations are enabled, trigger an animation
        if (this.showAnimations) {
            this.animation.fireAnimation(event.data);
        }

        // If a listener is added then trigger it
        if (typeof this.emoteCallback === 'function') {
            this.emoteCallback(event);
        }

        // For each button, increment its count if its name matches the string in the event
        this.buttonsData.forEach((button) => {
            if (button.name === event.data) {
                button.count = parseInt(button.count, 10) + 1;
            }
        });
    }

    // Get all counts from the server for current talk
    async getAllCounts() {
        return fetch(`${apiDomain}${emotePath}/${this.talk}`)
            .then((response) => response.json())
            .catch((error) => console.error('Error:', error));
    }

    // Update displayed counts of all emojis from server
    async updateAllCounts() {
        const counts = await this.getAllCounts();

        // Update count of each emoji for which we received data
        // and zero out any others for which we didn't receive data
        const keys = Object.keys(counts);
        this.buttonsData.forEach((button) => {
            if (keys.includes(button.name)) {
                button.count = counts[button.name];
            } else {
                button.count = 0;
            }
        });
    }

    @api
    onEmote(callback) {
        this.emoteCallback = callback;
    }

    // Control bubble visibility
    get showBubble() {
        return this.showWidget || this.showOptions;
    }

    // Open options dialog
    openOptions() {
        this.showOptions = true;
        this.showWidget = false;
    }

    // Close options dialog
    closeOptions() {
        this.showOptions = false;
        this.showWidget = true;
    }

    // Save the selected option to enable or disable animations
    saveOptions() {
        this.showAnimations = this.selectedOption;
        this.closeOptions();
    }

    // Select a configuration option to enable or disable animations
    selectOption(event) {
        this.selectedOption = event.target.value === 'true';
    }

    // Toggle widget visibility
    toggleWidget() {
        if (this.showOptions) {
            this.showWidget = false;
            this.showOptions = false;
            return;
        }

        this.showWidget = !this.showWidget;
    }
}
