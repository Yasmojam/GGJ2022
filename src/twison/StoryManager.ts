// import twison from "../assets/stories/godcomplex.json";
import { getLocalStorage, setLocalStorage } from "../localStorage/functions";
import storyEng from "../assets/stories/godcomplex_eng.json";
import storyRu from "../assets/stories/godcomplex_ru.json";
import storyAr from "../assets/stories/godcomplex_ar.json";

const storyByLocale: { [key: string]: Story} = {
  EN: storyEng,
  RU: storyRu,
  AR: storyAr,
};

const LINK_REGEX = /\[\[.*?\]\]/g;

class StoryManager {
  story: Story;
  _pidOrder: string[];
  passagesByPid: { [key: string]: Passage };
  _choices: string[];
  locale: string;

  constructor(locale: string) {
    console.log(locale)
    this.locale = locale;
    this.story = this.preprocess();
    this._pidOrder = getLocalStorage("pidOrder", [this.story.startnode]);
    this._choices = getLocalStorage("choices", []);
    this.passagesByPid = {};
    this.story.passages.forEach(
      (passage) => (this.passagesByPid[passage.pid] = passage)
    );
  }

  getPidOrder(): string[] {
    return this._pidOrder;
  }

  getChoices(): string[] {
    return this._choices.length > 0 ? this._choices : ["empty"];
  }

  pushPid(pid: string) {
    this._pidOrder.push(pid);
    this.saveState();
  };

  popPid(): string | undefined {
    const result = this._pidOrder.pop();
    this.saveState();
    return result;
  }

  pushChoice(choice: string): void {
    this._choices.push(choice);
    this.saveState();
  };

  popChoice(): string | undefined {
    const choice = this._choices.pop();
    this.saveState();
    return choice;
  }

  reset(): void {
    this._choices = [];
    this._pidOrder = [this.story.startnode];
    this.saveState();
  }

  saveState(): void {
    setLocalStorage("pidOrder", this._pidOrder);
    setLocalStorage("choices", this._choices);
  }

  preprocess(): Story {
    const story = storyByLocale[this.locale] ?? storyEng;
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
        this.pushPid(pid);
        const choice = this.getCurrentChoiceTag();
        if (choice) {
          this.pushChoice(choice);
        }
      }
    }
    return this.getCurrentPid();
  }

  getCurrentChoiceTag(): string | null {
    return (this.currentPassage().tags ?? [])[0]
  }

  goBack(): string {
    if (this.getPidOrder().length > 1) {
      if (this.getCurrentChoiceTag()) {
        this.popChoice();
      }
      this.popPid();
    }
    return this.getCurrentPid();
  }

  getCurrentPid(): string {
    const pidOrder = this.getPidOrder();
    return pidOrder[pidOrder.length - 1];
  }

  getStartNode(): string {
    return this.story.startnode;
  }
}

export default StoryManager;
