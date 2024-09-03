## By rating

```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api

dv.table(
	["file", "rating"], 
	dv.pages("\"games\"")
		.sort(p => -p.rating)
		.limit(100)
		.map(p => [
			p.file.link,
			f(dv, p, "rating"),
		])
)
```

