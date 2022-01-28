import twison from '../assets/stories/godcomplex.json';


const LINK_REGEX = /\[\[.*?\]\]/g;


class StoryManager {

    constructor() {
        this.story = JSON.parse(JSON.stringify(twison));
        this.preprocess();
        this.pidOrder = [this.story.startnode];
    }

    preprocess() {
        this.passagesByPid = {};
        this.story.passages.forEach((passage) => {
            // Build up easy reference object
            this.passagesByPid[passage.pid] = passage;

            // Process text
            passage.text = passage.text.replace(LINK_REGEX, '');
            passage.text = passage.text.split('\n');

            // discard unless stuff
            passage.links?.forEach(link => delete link.link);
            delete passage.position;
            delete passage.tags;
        });
    }

    currentPassage() {
        return this.passagesByPid[this.getCurrentPid()];
    }

    goToLink(pid) {
        if (pid in this.passagesByPid) {
            this.pidOrder.push(pid);
        }
        return this.getCurrentPid();
    }

    goBack() {
        if (this.pidOrder.length > 1) {
            this.pidOrder.pop();
        }
        return this.getCurrentPid();
    }

    getTextLines() {
        return this.currentPassage().text;
    }

    getLinks() {
        return this.currentPassage().links;
    }

    getChapterTitle() {
        return this.currentPassage().name;
    }

    getCurrentPid() {
        return this.pidOrder[this.pidOrder.length - 1];
    }
}

export default StoryManager;
