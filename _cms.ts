import { default as lumeCMS } from "lume/cms/mod.ts";
import {formatDateIso} from "./_utils/date.ts"

const cms = lumeCMS();


cms.document(
	"globals",
	"src:_data.yml",
	[
		{
			name: "title",
			type: "text",
			label: "Site title", 
			description: "The main title of the site.",
			attributes: {
				placeholder: "Peafowl",
			}
		},
		{
			name: "subtitle",
			type: "text",
			label: "Site subtitle",
			description: "The caption to be displayed below the title of the site.",
			attributes: {
				placeholder: "Review CMS",
			}
		},
	]
)

cms.document(
	"index",
	"src:index.md",
	[
		{
			name: "content",
			type: "markdown",
			label: "Introduction text",
			description: "The text to display at the top of the home page."
		}
	]
)

cms.document(
	"list-games",
	"src:list-games.md",
	[
		{
			name: "content",
			type: "markdown",
			label: "Introduction",
			description: "The text to display at the top of the page."
		}
	]
)

cms.collection(
	"games",
	"src:games/*.md",
	[
		{
			name: "name",
			type: "text",
			label: "Name",
			description: "The full name of the game.",
			attributes: {
				required: true,
				placeholder: "Ricochet Returns"
			}
		},
		{
			name: "name_sort",
			type: "text",
			label: "Sort as",
			description: "If specified, when sorting games alphabetically, the game will be sorted as if this was its actual name.",
			attributes: {
				placeholder: "Ricochet 2"
			}
		},
		{
			name: "active",
			type: "checkbox",
			label: "Now playing",
			description: "Whether you're currently playing this game or not. If checked, prominently displays the game on the home page."
		},
		{
			name: "rating",
			type: "number",
			label: "Rating",
			description: "The rating from 1 to 100 you want to give to the game. A rating from 1 to 35 is considered negative, from 36 to 65 mixed, from 66 to 95 positive, and from 96 to 100 perfect. A rating of 0 means unscored.",
			attributes: {
				placeholder: "Unscored"
			}
		},
		{
			name: "content",
			type: "markdown",
			label: "Review",
			description: "The review to display on the game page.",
			attributes: {
				placeholder: "Truly, the most *game* of all times."
			}
		},
		{
			name: "progress",
			type: "select",
			label: "Progress",
			description: "How much progress you've made in the game.",
			options: [
				{
					value: "",
					label: "",
				},
				{
					value: "notapplicable",
					label: "Not applicable: the game has nothing to progress in.",
				},
				{
					value: "new",
					label: "New: you haven't started playing the game yet.",
				},
				{
					value: "started",
					label: "Started: you have started the game, but not reached its end.",
				},
				{
					value: "beaten",
					label: "Beaten: you have reached the end of the game, such as the credits, but haven't done everything yet.",
				},
				{
					value: "completed",
					label: "Completed: you have cleared everything that this game has to offer.",
				},
				{
					value: "mastered",
					label: "Mastered: you have overcome self-imposed challenges far greater than the ones intended by the game."
				},
			]
		},
		{
			name: "hours_played",
			type: "number",
			label: "Hours played",
			description: "The number of hours you've played the game for. 0 is considered unknown; set to a negative value to explicitly state that you haven't played this game at all."
		},
		{
			name: "purchased_on",
			type: "date",
			label: "Purchased on",
			description: "The date on which you've purchased the game.",
		},
		{
			name: "started_on",
			type: "date",
			label: "Started on",
			description: "The date on which you've first started playing the game.",
		},
		{
			name: "beaten_on",
			type: "date",
			label: "Beaten on",
			description: "The date on which you've first beaten the game.",
		},
		{
			name: "completed_on",
			type: "date",
			label: "Completed on",
			description: "The date on which you've first completed the game.",
		},
		{
			name: "mastered_on",
			type: "date",
			label: "Mastered on",
			description: "The date on which you've achieved mastery of the game.",
		},
		{
			name: "identifiers",
			type: "choose-list",
			label: "Identifiers",
			description: "Details that unequivocabily and globally identify the game. Shouldn't be edited manually.",
			fields: [
				{
					name: "steam",
					type: "object",
					label: "Steam",
					description: "The game, as it is available on Steam.",
					fields: [
						{
							name: "appid",
							type: "text",
							label: "AppID",
							description: "The AppID that the game has on Steam. Usually ends with a 0. Can be obtained from the store page link, after the /app/ segment.",
						},
						{
							name: "name",
							type: "text",
							label: "Name",
							description: "The title of the game, as it appears on Steam."
						},
						{
							name: "synced_on",
							type: "date",
							label: "Last sync",
							description: "The date of the last sync."
						}
					]
				}
			]
		}
	]
)


export default cms;
