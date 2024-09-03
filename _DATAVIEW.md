## Unrated

```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api

dv.table(
	["file", "rating"], 
	dv.pages("\"games\"")
		.sort(p => -p.file.name)
		.filter(p => p.rating == 0)
		.map(p => [
			p.file.link,
		])
)
```

## By rating

```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api

dv.table(
	["file", "rating"], 
	dv.pages("\"games\"")
		.sort(p => -p.rating)
		.filter(p => !["", "new"].includes(p.progress))
		.map(p => [
			p.file.link,
			f(dv, p, "rating"),
		])
)
```

