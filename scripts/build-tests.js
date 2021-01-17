const fs = require('fs');
const path = require('path');
const webTests = require('../lib/meta');

function build() {
	webTests.list('ecma262').forEach((item) => {
		const testSources = webTests.testSources('ecma262', item.spec.section);

		for (const testName in testSources) {
			fs.writeFileSync(
				path.join(
					__dirname,
					'../tests',
					`ecma262-${item.spec.section}-${testName}.html`
				),
				testTemplateHTML(
					testName,
					item,
					testSources,
				)
			);
		}
	});

	webTests.list('geometry-1').forEach((item) => {
		const testSources = webTests.testSources('geometry-1', item.spec.section);

		for (const testName in testSources) {
			fs.writeFileSync(
				path.join(
					__dirname,
					'../tests',
					`geometry_1-${item.spec.section}-${testName}.html`
				),
				testTemplateHTML(
					testName,
					item,
					testSources,
				)
			);
		}
	});

	webTests.list('url').forEach((item) => {
		const testSources = webTests.testSources('url', item.spec.section);

		for (const testName in testSources) {
			fs.writeFileSync(
				path.join(
					__dirname,
					'../tests',
					`url-${item.spec.section}-${testName}.html`
				),
				testTemplateHTML(
					testName,
					item,
					testSources,
				)
			);
		}
	});
}

build();
console.log('updated tests/*');

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function testTemplateHTML(testName, item, testSources) {
	return `<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
	<title>${item.spec.name} | ${testName} | ${item.spec.id}</title>
	<link rel="icon" href="data:;base64,iVBORw0KGgo=">
</head>
<body>
	<script>
		function callback(success) {
			window.testSuccess = success;
		}
		
		;${testSources[testName]};
	</script>
</body>
</html>
`;
}