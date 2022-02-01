// import twison from "../assets/stories/godcomplex.json";
import storyEng from "../assets/stories/godcomplex_eng.json";
import storyRu from "../assets/stories/godcomplex_ru.json";
import storyAr from "../assets/stories/godcomplex_ar.json";

const LINK_REGEX = /\[\[.*?\]\]/g;

class StoryManager {
  story: Story;
  pidOrder: string[];
  passagesByPid: { [key: string]: Passage };
  choices: string[];

  locale: string;

  constructor(locale: string) {
    console.log(locale)
    this.locale = locale
    this.story = this.preprocess();
    this.pidOrder = [this.story.startnode];
    this.passagesByPid = {};
    this.choices = [];
    this.story.passages.forEach(
      (passage) => (this.passagesByPid[passage.pid] = passage)
    );
  }

  preprocess(): Story {
    const story = this.locale === "EN" ? storyEng : this.locale === "RU" ? storyRu : storyAr;
    const copy = JSON.parse(JSON.stringify(story));
    copy.passages.forEach((passage: any) => {
      // Process text
      passage.text = passage.text.replace(LINK_REGEX, "");

      // discard unless stuff
      passage.links?.forEach((link: any) => delete link.link);
      delete passage.position;
    });
    return copy;
  }

  currentPassage(): Passage {
    return this.passagesByPid[this.getCurrentPid()];
  }

  goToLink(pid: string): string {
    if (pid in this.passagesByPid) {
      if (pid === this.story.startnode) {
        this.reset();
      } else {
        this.pidOrder.push(pid);
        const choice = this.getCurrentChoiceTag();
        if (choice) {
          this.choices.push(choice);
        }
      }
    }
    return this.getCurrentPid();
  }

  reset(): void {
    this.choices = [];
    this.pidOrder = [this.story.startnode];
  }

  getCurrentChoiceTag(): string | null {
    return (this.currentPassage().tags ?? [])[0]
  }

  getChoices(): string[] {
    return this.choices.length > 0 ? this.choices : ["empty"];
  }

  goBack(): string {
    if (this.pidOrder.length > 1) {
      this.pidOrder.pop();
    }
    return this.getCurrentPid();
  }

  getCurrentPid(): string {
    return this.pidOrder[this.pidOrder.length - 1];
  }

  getStartNode(): string {
    return this.story.startnode;
  }
}

export default StoryManager;
