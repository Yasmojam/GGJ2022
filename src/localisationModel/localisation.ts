// This file contains structures and functions relevant to tokenising a story given as a Twison JSON file.
// After tokenising, a new adjusted Twison JSON file is created replacing the tokens with their uuids.
// The uuids will then be used alongside a locale to obtain the correct text to display for that language.

import StoryManager from "../twison/StoryManager";
import { v4 as uuidv4 } from 'uuid';

enum Locale {
	English = "en",
	Russian = "ru",
	Arabic = "ar",
}

type TokenID = string;

// This will be a table of all the different localised text in the story. The key is the token ID, and the value is a map of locale to text.
type LocalisationToken = {
	id: TokenID;
	locale: Locale;
	text: string;
}

// Intended to be used to represent a bit of text in a passage (whether the discription or links). The id is what the final generated JSON file will use to reference the text.
type TextToken = {
	id: TokenID;
	localisationTokens: LocalisationToken[];
}

export default class LocalisationManager {
	private localisationTokens: LocalisationToken[] = [];
	private textTokens: TextToken[] = [];
	private generalisedLocaleStory: Story;
	private selectedLocale: Locale = Locale.English;

	public setLocale(locale: Locale) {
		this.selectedLocale = locale;
	}

	public getSelectedLocale(): Locale { return this.selectedLocale; }

	constructor() {
		const storyManager = new StoryManager();

		this.generalisedLocaleStory = {...storyManager.story};
		
		this.parseEnglishStoryToTextTokens();

		// console.log(JSON.stringify(this.generalisedLocaleStory));
		// console.log(JSON.stringify(this.localisationTokens));
		// console.log(JSON.stringify(this.textTokens));	
	}

	// Uses generalisedLocaleStory as a workspace to parse the English story into text tokens. Changes generalisedLocaleStory in place.
	parseEnglishStoryToTextTokens() {
		for(const passage of this.generalisedLocaleStory.passages) {
			const textTokenID = uuidv4();
			const textToken: TextToken = {
				id: textTokenID,
				localisationTokens: [],
			};

			// Add the text of the passage to the text token.
			const textLocalisationToken: LocalisationToken = {
				id: uuidv4(),
				locale: Locale.English,
				text: passage.text,
			};
			passage.text = textTokenID;
			textToken.localisationTokens.push(textLocalisationToken);
			this.localisationTokens.push(textLocalisationToken);
			this.textTokens.push(textToken);
		
			// Add the links to the text token.
			passage.links?.forEach((link: Link) => {
				const linkTokenID = uuidv4();
				const linkToken: TextToken = {
					id: linkTokenID,
					localisationTokens: [],
				}
				
				const linkLocalisationToken: LocalisationToken = {
					id: uuidv4(),
					locale: Locale.English,
					text: link.name,
				}
				link.name = linkTokenID;
				linkToken.localisationTokens.push(linkLocalisationToken);
				this.localisationTokens.push(linkLocalisationToken);
				this.textTokens.push(linkToken);
			});
		}
	}
}