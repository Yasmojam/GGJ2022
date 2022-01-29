import twison from "../assets/stories/godcomplex.json";

const LINK_REGEX = /\[\[.*?\]\]/g;

class StoryManager {
  story: Story;
  pidOrder: string[];
  passagesByPid: { [key: string]: Passage };

  constructor() {
    this.story = this.preprocess();
    this.pidOrder = [this.story.startnode];
    this.passagesByPid = {};
    this.story.passages.forEach(
      (passage) => (this.passagesByPid[passage.pid] = passage)
    );
  }

  preprocess(): Story {
    const copy = JSON.parse(JSON.stringify(twison));
    copy.passages.forEach((passage: any) => {
      // Process text
      passage.text = passage.text.replace(LINK_REGEX, "");
      passage.text = passage.text.split("\n");

      // discard unless stuff
      passage.links?.forEach((link: any) => delete link.link);
      delete passage.position;
      delete passage.tags;
    });
    return copy;
  }

  currentPassage(): Passage {
    return this.passagesByPid[this.getCurrentPid()];
  }

  goToLink(pid: string): string {
    if (pid in this.passagesByPid) {
      this.pidOrder.push(pid);
    }
    return this.getCurrentPid();
  }

  goBack(): string {
    if (this.pidOrder.length > 1) {
      this.pidOrder.pop();
    }
    return this.getCurrentPid();
  }

  getTextLines(): string[] {
    return this.currentPassage().text;
  }

  getLinks(): Link[] {
    return this.currentPassage().links || [];
  }

  getChapterTitle(): string {
    return this.currentPassage().name;
  }

  getCurrentPid(): string {
    return this.pidOrder[this.pidOrder.length - 1];
  }
}

export default StoryManager;
