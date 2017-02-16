// set window.datasets so that the completer can always map against it
window.datasets || (window.datasets = [])

export const datasetCompleter = {
	getCompletions: function(editor, session, pos, prefix, callback) {
		if (prefix.length === 0) { callback(null, []); return }
		// console.log(editor, session, pos, prefix);
		// wordList like [{"word":"flow","freq":24,"score":300,"flags":"bc","syllables":"1"}]
		// callback(null, wordList.map(function(ea) {
				// return {name: ea.word, value: ea.word, score: ea.score, meta: "rhyme"}
		// }));
		if (window.debug) {
			console.log(session, pos, prefix);
		}

		callback(null, window.datasets.map(function(ds) {
			return { name : ds.slug, value : ds.slug, score : 1, meta : "dataset" };
		}));

		// callback(null, []);
	}
}