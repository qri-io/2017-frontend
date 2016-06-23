import React from 'react'
import ResultsChart from '../components/ResultsChart'

let results = {"data":[[2013,316427395,10844792,393121,3.624975011046777,33.03023431330906],[2012,314102623,8578610,287554,3.351988259170192,26.39601007088693],[2010,308745538,5459240,241977,4.432430155113166,16.898262024437745]],"meta":{"code":200},"schema":[{"name":"year","type":"integer","description":""},{"name":"total_population","type":"integer","description":""},{"name":"us_manufactured_total","type":"integer","description":""},{"name":"us_exported_total","type":"integer","description":""},{"name":"us_exported_percentage","type":"float","description":""},{"name":"us_remaining_per_capita","type":"float","description":""}]}

export default class ChartTest extends React.Component {
	render() {
		return (
			<div id="chartTest">
				<ResultsChart results={results} />
			</div>
		);
	}
}
