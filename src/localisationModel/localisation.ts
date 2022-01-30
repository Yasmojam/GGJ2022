// This file contains structures and functions relevant to tokenising a story given as a Twison JSON file.
// After tokenising, a new adjusted Twison JSON file is created replacing the tokens with their uuids.
// The uuids will then be used alongside a locale to obtain the correct text to display for that language.

import StoryManager from "../twison/StoryManager";
import { v4 as uuidv4 } from 'uuid';

const translate = async (text: string, targetLanguage: string) => {
	const API_KEY = "AIzaSyBa00-rEQeqhkyOB-WGC3VBm5GFp3xCKlA"; // baby don't hurt me, baby don't hurt me, no more

	let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
	url += '&q=' + encodeURI(text);
	url += `&target=${targetLanguage}`;

	const res = await fetch(url, { 
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		}
	})
	return (await res.json()).data.translations[0].translatedText;
}

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
		
		this.parseEnglishStoryToTextTokens().then(() => {
			console.log(JSON.stringify(this.generalisedLocaleStory));
			console.log(JSON.stringify(this.localisationTokens));
			console.log(JSON.stringify(this.textTokens));	
		});

		// console.log(translate("hello", Locale.Arabic));
	}

	// Uses generalisedLocaleStory as a workspace to parse the English story into text tokens. Changes generalisedLocaleStory in place.
	async parseEnglishStoryToTextTokens() {
		for(const passage of this.generalisedLocaleStory.passages) {
			const textTokenID = uuidv4();
			const textToken: TextToken = {
				id: textTokenID,
				localisationTokens: [],
			};

			// Add the text of the passage to the text token.
			const englishLocalisationToken: LocalisationToken = {
				id: uuidv4(),
				locale: Locale.English,
				text: passage.text,
			};

			// Translate passage to Arabic and add to the text token.
			const arabicLocalisationToken: LocalisationToken = {
				id: uuidv4(),
				locale: Locale.Arabic,
				text: await translate(passage.text, Locale.Arabic),
			};

			// Translate passage to Russian and add to the text token.
			const russianLocalisationToken: LocalisationToken = {
				id: uuidv4(),
				locale: Locale.Russian,
				text: await translate(passage.text, Locale.Russian),
			};

			passage.text = textTokenID;
			textToken.localisationTokens.push(englishLocalisationToken);
			textToken.localisationTokens.push(arabicLocalisationToken);
			textToken.localisationTokens.push(russianLocalisationToken);
			this.localisationTokens.push(englishLocalisationToken);
			this.localisationTokens.push(arabicLocalisationToken);
			this.localisationTokens.push(russianLocalisationToken);
			this.textTokens.push(textToken);
		
			// Add the links to the text token.
			passage.links?.forEach(async (link: Link) => {
				const linkTokenID = uuidv4();
				const linkToken: TextToken = {
					id: linkTokenID,
					localisationTokens: [],
				}
				
				const englishLinkLocalisationToken: LocalisationToken = {
					id: uuidv4(),
					locale: Locale.English,
					text: link.name,
				}

				// Translate link to Arabic and add to the text token.
				const arabicLinkLocalisationToken: LocalisationToken = {
					id: uuidv4(),
					locale: Locale.Arabic,
					text: await translate(link.name, Locale.Arabic),
				}
				
				// Translate link to Russian and add to the text token.
				const russianLinkLocalisationToken: LocalisationToken = {
					id: uuidv4(),
					locale: Locale.Russian,
					text: await translate(link.name, Locale.Russian),
				}

				link.name = linkTokenID;
				linkToken.localisationTokens.push(englishLinkLocalisationToken);
				linkToken.localisationTokens.push(arabicLinkLocalisationToken);
				linkToken.localisationTokens.push(russianLinkLocalisationToken);
				this.localisationTokens.push(englishLinkLocalisationToken);
				this.localisationTokens.push(arabicLinkLocalisationToken);
				this.localisationTokens.push(russianLinkLocalisationToken);
				this.textTokens.push(linkToken);
			});
		}
	}
}