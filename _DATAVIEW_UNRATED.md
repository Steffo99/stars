```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api

dv.table(
	["file"], 
	dv.pages("\"games\"")
		.sort(p => p.name_sort ? p.name_sort : p.name)
		.filter(p => p.progress !== "new" && p.rating == 0)
		.map(p => [
			p.file.link,
		])
)
```
