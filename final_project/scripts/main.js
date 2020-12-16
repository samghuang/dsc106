// Global constants
const DEBUG = true;
const Knife_PRICE = 14.25;
const Fork_PRICE = 9.99;

// Some little helpers
const log = msg => (DEBUG ? console.log(msg) : '');
const select = id => document.getElementById(id);

function plotMap() {
	// Prepare demo data
	// Data is joined to map using value of 'hc-key' property by default.
	// See API docs for 'joinBy' for more info on linking data and map.
	var data = [
		['eu', (235/102).toFixed(2)],
		['oc', (220/115)],
		['af', (219/222).toFixed(2)],
		['as', (125/133).toFixed(2)],
		['na', (199/173).toFixed(2)],
		['sa', (175/176).toFixed(3)]
	];

	// Create the chart
	Highcharts.mapChart('worldMap', {
		chart: {
			map: 'custom/world-continents'
		},
		
		title: {
			text: 'World Wide Sales'
		},

		plotOptions: {
			series: {
				cursor: 'pointer',
				point: {
					events: {
						click: function(){
							// figure out what the shape id is and transform to proper one
							countries = {'North America':'NORTHAMERICA','South America':'SOUTHAMERICA','Europe':'EUROPE','Africa':'AFRICA','Asia':'ASIA','Oceania':'AUSTRALIA'};
							shapeId = countries[this.name];

							// plot each shape id correctly 
							plotColumn(shapeId);
							plotPie(shapeId);
							updateScoreCards(shapeId);
						}
					}
				},
			dataLabels: {
				enabled: true,
				format: '{point.name}'
			},
			allowPointSelect: true
			}
		},

		mapNavigation: {
			enabled: false,
			buttonOptions: {
				verticalAlign: 'bottom'
			}
		},

		colorAxis: {
			min: 0
		},

		series: [{
			data: data,
			name: 'Knife to Fork Ratio',
			states: {
				hover: {
					color: '#0C3'
				}, 
				select: {
						color: '#7CA82B'
				}
			}
		}]
	});

}

function plotBeerMap(){
	Highcharts.getJSON('data/states.json', function (data) {
	// Make codes uppercase to match the map data
	data.forEach(function (p) {
		p.code = p.code.toUpperCase();
	});
	// Instantiate the map
	Highcharts.mapChart('beer_container', {
		chart: {
		map: 'countries/us/us-all',
		borderWidth: 0
		},

		title: {
		text: 'Unique Craft Beers Per State'
		},

		exporting: {
		sourceWidth: 700,
		sourceHeight: 600
		},

		// legend: {
		// layout: 'horizontal',
		// borderWidth: 0,
		// backgroundColor: 'rgba(255,255,255,0.85)',
		// floating: false,
		// verticalAlign: 'right',
		// y: 50
		// },

		mapNavigation: {
		enabled: true
		},

		colorAxis: {
		min: 1,
		type: 'logarithmic',
		minColor: '#F8C337',
		maxColor: '#9F2429',
		stops: [
			[0, '#F6F4F2'],
			[0.34, '#D8A149'],
			[0.67, '#B64D31'],
			[1, '#363230']
		]
		},

		series: [{
			animation: {
				duration: 1000
			},
			data: data,
			joinBy: ['postal-code', 'code'],
			dataLabels: {
				enabled: false,
				color: '#FFFFFF',
				format: '{point.code}'
			},
			name: 'Unique Craft Beers',
			tooltip: {
				pointFormat: '{point.code}: {point.value}'
			}
			}]
		});
	});
}

function plotSales(sales) {
	// Plot the world map
	//plotMap();
	plotBeerMap();
	plotColorado();
	plotIndiana();
	plotMichigan();
	plotCali();

	// Make sales data available globally
	data = sales;
}

function plotColorado(){

	// The pie chart
	Highcharts.chart('colorado_pie', {
		chart: {
		  plotBackgroundColor: null,
		  plotBorderWidth: null,
		  plotShadow: false,
		  type: 'pie'
		},
		title: {
		  text: 'Types of Beers'
		},
		tooltip: {
		  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		accessibility: {
		  point: {
			valueSuffix: '%'
		  }
		},
		plotOptions: {
		  pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: {
			  enabled: true,
			  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
			}
		  }
		},
		series: [{
			name: 'Brands',
			colorByPoint: true,
			data: [{
			name: 'Stout',
			y: 18,
			sliced: true,
			selected: true,
			color: '#A1A299'
			}, {
			name: 'APA',
			y: 40, 
			color: '#F6C236'
			}, {
			name: 'Ale',
			y: 81,
			color: '#F2A727'
			}, {
			name: 'IPA',
			y: 57,
			color: '#E06225'
			}, {
			name: 'Lager',
			y: 18,
			color: '#97222A'
			}, {
			name: 'Other',
			y: 44,
			color: '#050707'
			}, {
			name: 'Pilsner',
			y: 1,
			color: '#B94126'
			}, {
			name: 'Porter',
			y: 6,
			color: '#523124'
			}]
		}]
	});

	// The histogram
	var data = [26.,  26.,  45.,  27.,  67.,  42.,  10.,  69.,  17.,  17., 104.,
	85.,  83.,  45.,  34.,  44.,  72.,  22.,  30.,  26.,  94.,  38.,
	45.,  72.,  35.,  35.,  35.,   9.,  15.,  68.,  19.,  29.,  71.,
	46.,  25.,  15.,  25.,  31.,  23., 100.,  17.,  12.,  49.,  74.,
	74.,  58.,  20.,  20.,  20.,  70.,  19.,  75.,  43.,  21.,  68.,
	40.,  40.,  70.,  29.,  21.,  18.,  29.,  18.,  29.,  70.,  18.,
	70.,  18.,  72.,  29.,  36.,  35.,  65.,  65.,  35.,  65.,  65.,
	65.,  85.,  65.,  65.,  85.,  70.,  60.,  85.,  98.,  35., 100.,
	35.,  85.,  65.,  85.,  98.,  98.,  35.,  35.,  35.,  65.,  65.,
	65.,  65.,  65.,  60.,  23.,  48.,  22.,  28.,  24.,  75.,  14.,
	17.,  15.,  21.,  68.,  21.,  14.,  40.,  60., 100., 100.,  25.,
	100.,  20.,  65.,  65.,  15.,  18.,  58.,  65.,  65.,  17.,  25.,
	65.,  87.,  33.,  65.,  24.,  51.,  33.,  30.,  90.,  30.,  15.,
	22.,  45.,  40.];

	Highcharts.chart('colorado_hist', {
		title: {
			text: 'International Bitterness Units'
		},

		xAxis: [{
			title: { text: 'Data' },
			alignTicks: false
		}, {
			title: { text: 'Histogram' },
			alignTicks: false,
			opposite: true
		}],

		yAxis: [{
			title: { text: 'Data' }
		}, {
			title: { text: 'Histogram' },
			opposite: true
		}],

		plotOptions: {
			histogram: {
			accessibility: {
				pointDescriptionFormatter: function (point) {
				var ix = point.index + 1,
					x1 = point.x.toFixed(3),
					x2 = point.x2.toFixed(3),
					val = point.y;
				return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
				}
			}
			}
		},

		series: [{
			name: 'Histogram',
			type: 'histogram',
			xAxis: 1,
			yAxis: 1,
			baseSeries: 's1',
			zIndex: -1,
			color: '#D8A149'

		}, {
			name: 'Data',
			type: 'scatter',
			data: data,
			id: 's1',
			marker: {
			radius: 0
			}
		}]
	});
}

function plotMichigan(){
	// The pie chart
	Highcharts.chart('michigan_pie', {
		chart: {
		  plotBackgroundColor: null,
		  plotBorderWidth: null,
		  plotShadow: false,
		  type: 'pie'
		},
		title: {
		  text: 'Types of Beers'
		},
		tooltip: {
		  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		accessibility: {
		  point: {
			valueSuffix: '%'
		  }
		},
		plotOptions: {
		  pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: {
			  enabled: true,
			  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
			}
		  }
		},
		series: [{
			name: 'Brands',
			colorByPoint: true,
			data: [{
			name: 'Stout',
			y: 10,
			sliced: true,
			selected: true,
			color: '#A1A299'
			}, {
			name: 'APA',
			y: 7,
			color: '#F6C236'
			}, {
			name: 'Ale',
			y: 57,
			color: '#F2A727'
			}, {
			name: 'IPA',
			y: 30,
			color: '#E06225'
			}, {
			name: 'Lager',
			y: 6,
			color: '#97222A'
			}, {
			name: 'Other',
			y: 34,
			color: '#050707'
			}, {
			name: 'Pilsner',
			y: 0,
			color: '#B94126'
			}, {
			name: 'Porter',
			y: 5,
			color: '#523124'
			}]
		}]
	});

	// The histogram
	var data = [55.,  17., 115.,  12.,   8.,  62.,  12.,  54.,  47.,  30.,  51.,
        58.,  10.,  50.,  65.,  42.,  69.,  18.,  11.,   6.,  25.,  35.,
        25.,  35.,  55.,  10.,  15.,  65.,  40.,  35.,  12.,  25.,  20.,
        74.,  11.,  35.,  72.,  15.]

	Highcharts.chart('michigan_hist', {
		title: {
			text: 'International Bitterness Units'
		},

		xAxis: [{
			title: { text: 'Data' },
			alignTicks: false
		}, {
			title: { text: 'Histogram' },
			alignTicks: false,
			opposite: true
		}],

		yAxis: [{
			title: { text: 'Data' }
		}, {
			title: { text: 'Histogram' },
			opposite: true
		}],

		plotOptions: {
			histogram: {
			accessibility: {
				pointDescriptionFormatter: function (point) {
				var ix = point.index + 1,
					x1 = point.x.toFixed(3),
					x2 = point.x2.toFixed(3),
					val = point.y;
				return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
				}
			}
			}
		},

		series: [{
			name: 'Histogram',
			type: 'histogram',
			xAxis: 1,
			yAxis: 1,
			baseSeries: 's1',
			zIndex: -1,
			color: '#D8A149'
		}, {
			name: 'Data',
			type: 'scatter',
			data: data,
			id: 's1',
			marker: {
			radius: 0
			}
		}]
	});
}

function plotIndiana(){
	// The pie chart
	Highcharts.chart('indiana_pie', {
		chart: {
		  plotBackgroundColor: null,
		  plotBorderWidth: null,
		  plotShadow: false,
		  type: 'pie'
		},
		title: {
		  text: 'Types of Beers'
		},
		tooltip: {
		  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		accessibility: {
		  point: {
			valueSuffix: '%'
		  }
		},
		plotOptions: {
		  pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			dataLabels: {
			  enabled: true,
			  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
			}
		  }
		},
		series: [{
			name: 'Brands',
			colorByPoint: true,
			data: [{
			name: 'Stout',
			y: 8,
			sliced: true,
			selected: true,
			color: '#A1A299'
			}, {
			name: 'APA',
			y: 13,
			color: '#F6C236'
			}, {
			name: 'Ale',
			y: 41,
			color: '#F2A727'
			}, {
			name: 'IPA',
			y: 34,
			color: '#E06225'
			}, {
			name: 'Lager',
			y: 6,
			color: '#97222A'
			}, {
			name: 'Other',
			y: 28,
			color: '#050707'
			}, {
			name: 'Pilsner',
			y: 0,
			color: '#B94126'
			}, {
			name: 'Porter',
			y: 9,
			color: '#523124'
			}]
		}]
	});

	// The histogram
	var data = [60.,  45.,  65.,  50.,  15.,  18.,  46.,  75.,  40., 115.,  16.,
        86.,  40.,   8.,  30.,  23.,  61.,  48.,  27., 104.,  90.,  22.,
        18.,  33.,  60.,  27.,  22.,  33.,  25.,  36.,  18.,  27.,  25.,
        13.,  65.,  66.,  33.,  23.,  26.,  60.,  22.,  58.,  77.,  62.,
        29.,  23.,  20.,  23.,  36.,  30.,  23.,  75.,  75.,  75.,  75.,
        30.,  55.,  77.,  50.,  75.,  23.,  27.,  23.,  60.,  24.,  23.,
        24.,  24.,  91.,  30.,  77.,  23.,  60.,  23.,  20.,  50.,  22.,
        64.,  31.,  37.,  27.,  20.,  12.,  90., 115.,  36.,  22.,  50.,
        35.,  50.,  15.];

	Highcharts.chart('indiana_hist', {
		title: {
			text: ''
		},

		xAxis: [{
			title: { text: 'Data' },
			alignTicks: false
		}, {
			title: { text: 'Histogram' },
			alignTicks: false,
			opposite: true
		}],

		yAxis: [{
			title: { text: 'Data' }
		}, {
			title: { text: 'Histogram' },
			opposite: true
		}],

		plotOptions: {
			histogram: {
			accessibility: {
				pointDescriptionFormatter: function (point) {
				var ix = point.index + 1,
					x1 = point.x.toFixed(3),
					x2 = point.x2.toFixed(3),
					val = point.y;
				return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
				}
			}
			}
		},

		series: [{
			name: 'Histogram',
			type: 'histogram',
			xAxis: 1,
			yAxis: 1,
			baseSeries: 's1',
			zIndex: -1,
			color: '#D8A149'
		}, {
			name: 'Data',
			type: 'scatter',
			data: data,
			id: 's1',
			marker: {
			radius: 0
			}
		}]
	});
}

function plotCali(){
	Highcharts.chart('cali_column', {
		chart: {
		  type: 'column'
		},
		title: {
		  text: 'Types of Californian Beers'
		},
		xAxis: {
		  categories: [
			'Stout',
			'APA',
			'Ale',
			'IPA',
			'Lager',
			'Other'
		  ],
		  crosshair: true
		},
		yAxis: {
		  min: 0,
		  title: {
			text: 'Number of Beers'
		  }
		},
		tooltip: {
		  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			'<td style="padding:0"><b>{point.y:.1f} Beers</b></td></tr>',
		  footerFormat: '</table>',
		  shared: true,
		  useHTML: true
		},
		plotOptions: {
		  column: {
			pointPadding: 0.2,
			borderWidth: 0
		  }
		},
		series: [{
		  name: 'San Diego',
		  // Stout APA Ale IPA Lager Pilsner Porter Other
		  data: [20, 40, 120, 170, 10, 60],
		  color: '#D8A149'
	  
		}, {
		  name: 'San Francisco',
		  data: [20, 30, 60, 90, 10, 100],
		  color: '#B64D31'
	  
		}, {
		  name: 'Boonville',
		  data: [30, 20, 0, 20, 10, 30],
		  color: '#523124'
		}]
	});
}

function updateToSF(){
	// Update the title 
	document.getElementById('temp_city').innerHTML = 'Top Three San Francisco Breweries';

	// Update the ordered list 
	document.getElementById('first').innerHTML = '21st Amendment Brewery';
	document.getElementById('second').innerHTML = 'Anchor Brewing Company';
	document.getElementById('third').innerHTML = 'Fort Point Beer Company';

	// Change onclick of the button 
	document.getElementById('first_button').setAttribute('onclick','changeTableTo21AB()');
	document.getElementById('second_button').setAttribute('onclick','changeTableToABC()'); 
	document.getElementById('third_button').setAttribute('onclick','changeTableToFPBC()');


	// Update the default table title 
	document.getElementById('temp_brewery').innerHTML = '21st Amendment Brewery';

	// New table 
	changeTableTo21AB();
	

}

function updateToSD(){
	// Update the title 
	document.getElementById('temp_city').innerHTML = 'Top Three San Diego Breweries';

	// Update the ordered list 
	document.getElementById('first').innerHTML = 'Modern Times Beer';
	document.getElementById('second').innerHTML = 'TailGate Beer';
	document.getElementById('third').innerHTML = 'Mike Hess Brewing Company';

	// Change onclick of the button 
	document.getElementById('first_button').setAttribute('onclick','changeTableToMTB()');
	document.getElementById('second_button').setAttribute('onclick','changeTableToTGB()'); 
	document.getElementById('third_button').setAttribute('onclick','changeTableToMHBC()');


	// Update the default table title 
	document.getElementById('temp_brewery').innerHTML = 'Modern Times Beer';

	// New table 
	new_table = "<table><tr><th>Company</th><th>Contact</th><th>Country</th></tr><tr><td>Alfreds Futterkiste</td><td>Maria Anders</td><td>Germany</td></tr></table>"
	// Update the table 
	changeTableToMTB();

}

function updateToBoonville(){
	// Update the title 
	document.getElementById('temp_city').innerHTML = 'Top Three Boonville Breweries';

	// Update the ordered list 
	document.getElementById('first').innerHTML = 'Anderson Valley Brewing Company';
	document.getElementById('second').innerHTML = 'Mission Brewery';
	document.getElementById('third').innerHTML = 'Saint Archer Brewery';

	// Change onclick of the button 
	document.getElementById('first_button').setAttribute('onclick','changeTableToAVBC()');
	document.getElementById('second_button').setAttribute('onclick','changeTableToMB()'); 
	document.getElementById('third_button').setAttribute('onclick','changeTableToSAB()');


	// Update the default table title 
	document.getElementById('temp_brewery').innerHTML = 'Anderson Valley Brewing Company';

	// New table 
	changeTableToAVBC();
}

// San Diego Top Three
function changeTableToMTB(){
	document.getElementById('temp_brewery').innerHTML = 'Modern Times Beer';
	new_table = '<table><tr><th>Beer</th><th>Style</th><th>ibu</th><th>abv</th></tr><tr><td>City of the Sun	</td><td>American IPA</td><td>85.0</td><td>0.075</td></tr><tr><td>Booming Rollers</td><td>American IPA</td><td>75.0</td><td>0.068</td></tr><tr><td>Oneida</td><td>American Pale Ale (APA)</td><td>50.0</td><td>0.052</td></tr><tr><td>Aurora</td><td>American Amber / Red Ale</td><td>75.0</td><td>0.067</td></tr><tr><td>Lomaland</td><td>Saison / Farmhouse Ale</td><td>30.0</td><td>0.055</td></tr><tr><td>Fortunate Islands	</td><td>American Pale Wheat Ale</td><td>46.0</td><td>0.047</td></tr><tr><td>Black House</td><td>American Stout</td><td>40.0</td><td>0.058</td></tr><tr><td>Blazing World</td><td>American Amber/Red Ale</td><td>115.0</td><td>0.065</td></tr></table>';
	document.getElementById('temp_table').innerHTML = new_table;
}

function changeTableToTGB(){
	document.getElementById('temp_brewery').innerHTML = 'Tail Gate Beer';
	new_table = '<table><tr><th>Beer</th><th>Style</th><th>ibu</th><th>abv</th></tr><tr><td>Dodgy Knight Imperial IPA</td><td>American Double / Imperial IPA</td><td>95.0</td><td>0.080</td></tr><tr><td>TailGate Saison</td><td>Saison / Farmhouse Ale</td><td>75.0</td><td>0.050</td></tr><tr><td>TailGate IPA</td><td>American IPA</td><td>44.0</td><td>0.050</td></tr><tr><td>TailGate Hefeweizen</td><td>Hefeweizen</td><td>28.0</td><td>0.049</td></tr><tr><td>Blacktop Blonde</td><td>American Blonde Ale</td><td>19.0</td><td>0.050</td></tr></table>';
	document.getElementById('temp_table').innerHTML = new_table;
}

function changeTableToMHBC(){
	document.getElementById('temp_brewery').innerHTML = 'Mike Hess Brewing Company';
	new_table = '<table><tr><th>Beer</th><th>Style</th><th>ibu</th><th>abv</th></tr><tr><td>Solis</td><td>American IPA</td><td>85.0</td><td>0.075</td></tr><tr><td>Jucundus</td><td>Wheat Ale</td><td>24.0</td><td>0.060</td></tr><tr><td>Habitus</td><td>American Double / Imperial IPA</td><td>100.0</td><td>0.080</td></tr><tr><td>Grazias</td><td>Cream Ale</td><td>30.0</td><td>0.063</td></tr><tr><td>Claritas</td><td>Kölsch</td><td>28.0</td><td>0.058</td></tr></table>';
	document.getElementById('temp_table').innerHTML = new_table;
}

// SF Top Three
function changeTableTo21AB(){
	document.getElementById('temp_brewery').innerHTML = '21st Amendment Brewery';
	new_table = '<table><tr><th>Beer</th><th>Style</th><th>ibu</th><th>abv</th></tr><tr><td>He Said Baltic-Style Porter</td><td>Baltic Porter</td><td>85.0</td><td>0.082</td></tr><tr><td>He Said Belgian-Style Tripel</td><td>Tripel</td><td>24.0</td><td>0.082</td></tr><tr><td>Lower De Boom</td><td>American Barleywine</td><td>92.0</td><td>0.099</td></tr><tr><td>Fireside Chat</td><td>Winter Warmer</td><td>45.0</td><td>0.079</td></tr><tr><td>Marooned On Hog Island</td><td>American Stout</td><td>28.0</td><td>0.079</td></tr><tr><td>Bitter American</td><td>American Pale Ale (APA)</td><td>42.0</td><td>0.044</td></tr><tr><td>Hell or High Watermelon Wheat (2009)</td><td>Fruit / Vegetable Beer</td><td>17.0</td><td>0.049</td></tr><tr><td>21st Amendment Watermelon Wheat Beer (2006)</td><td>Fruit / Vegetable Beer</td><td>17.0</td><td>0.049</td></tr></table>';
	document.getElementById('temp_table').innerHTML = new_table;
}
function changeTableToABC(){
	document.getElementById('temp_brewery').innerHTML = 'Anchor Brewing Company';
	new_table = '<table><tr><th>Beer</th><th>Style</th><th>ibu</th><th>abv</th></tr><tr><td>Liberty Ale</td><td>American IPA</td><td>85.0</td><td>0.059</td></tr><tr><td>IPA</td><td>American IPA</td><td>24.0</td><td>0.065</td></tr><tr><td>Summer Wheat</td><td>American Pale Wheat Ale</td><td>92.0</td><td>0.045</td></tr><tr><td>California Lager</td><td>American Amber / Red Lager</td><td>45.0</td><td>0.049</td></tr><tr><td>Brotherhood Steam</td><td>California Common / Steam Beer</td><td>28.0</td><td>0.056</td></table>';
	document.getElementById('temp_table').innerHTML = new_table;
}
function changeTableToFPBC(){
	document.getElementById('temp_brewery').innerHTML = 'Fort Point Beer Company';
	new_table = '<table><tr><th>Beer</th><th>Style</th><th>ibu</th><th>abv</th></tr><tr><td>Park</td><td>American Pale Wheat Ale</td><td>19.0</td><td>0.047</td></tr><tr><td>Westfalia</td><td>American Amber / Red Ale</td><td>16.0</td><td>0.056</td></tr><tr><td>KSA</td><td>Kölsch</td><td>17.0</td><td>0.046</td></tr><tr><td>Villager</td><td>American IPA</td><td>42.0</td><td>0.063</td></tr></table>';
	document.getElementById('temp_table').innerHTML = new_table;
}

//Boonville Top Three

//Anderson Valley Brewing Company
function changeTableToAVBC(){
	document.getElementById('temp_brewery').innerHTML = 'Anderson Valley Brewing Company';
	new_table = '<table><tr><th>Beer</th><th>Style</th><th>ibu</th><th>abv</th></tr><tr><td>Blood Orange Gose</td><td>Gose</td><td>85.0</td><td>0.042</td></tr><tr><td>Keebarlin Pale Ale</td><td>American Pale Ale (APA)</td><td>24.0</td><td>0.042</td></tr><tr><td>the Kimmie, the Yink and the Holy Gose</td><td>Gose</td><td>92.0</td><td>0.048</td></tr><tr><td>Fall Hornin</td><td>Pumpkin Ale</td><td>45.0</td><td>0.060</td></tr><tr><td>Boont Amber Ale</td><td>American Amber / Red Ale</td><td>15.0</td><td>0.058</td></tr><tr><td>Barney Flats Oatmeal Stout</td><td>Oatmeal Stout</td><td>13.0</td><td>0.057</td></tr><tr><td>Summer Solstice(2009)</td><td>Cream Ale</td><td>4.0</td><td>0.056</td></tr><tr><td>Hop Ottin IPA</td><td>American IPA</td><td>80.0</td><td>0.070</td></tr></table>';
	document.getElementById('temp_table').innerHTML = new_table;
}

function changeTableToMB(){
	document.getElementById('temp_brewery').innerHTML = 'Mission Brewery';
	new_table = '<table><tr><th>Beer</th><th>Style</th><th>ibu</th><th>abv</th></tr><tr><td>Cortez Gold</td><td>Belgian Pale Ale</td><td>85.0</td><td>0.050</td></tr><tr><td>Mission IPA</td><td>American IPA</td><td>66.0</td><td>0.068</td></tr><tr><td>El Conquistador Extra Pale Ale</td><td>American Pale Ale (APA)</td><td>44.0</td><td>0.048</td></tr><tr><td>Shipwrecked Double IPA</td><td>American Double / Imperial IPA</td><td>75.0</td><td>0.092</td></tr></table>';
	document.getElementById('temp_table').innerHTML = new_table;
}

function changeTableToSAB(){
	document.getElementById('temp_brewery').innerHTML = 'Saint Archer Brewery';
	new_table = '<table><tr><th>Beer</th><th>Style</th><th>ibu</th><th>abv</th></tr><tr><td>Saint Archer White Ale</td><td>Witbier</td><td>15.0</td><td>0.050</td></tr><tr><td>Saint Archer IPA</td><td>American IPA</td><td>66.0</td><td>0.068</td></tr><tr><td>Saint Archer Pale Ale</td><td>American Pale Ale (APA)</td><td>40.0</td><td>0.052</td></tr><tr><td>Saint Archer Blonde</td><td>Kölsch</td><td>22.0</td><td>0.048</td></tr></table>';
	document.getElementById('temp_table').innerHTML = new_table;
}

function updateScoreCards(continent) {
	let sales = data[continent];
	let Knifees = 0, Forks = 0;
	for (const datum of sales) {
		Knifees += datum['Knife'];
		Forks += datum['Fork'];
	}
	let revenue = Knife_PRICE * Knifees + Fork_PRICE * Forks;
	select('dingusSold').innerHTML = Knifees;
	select('widgetSold').innerHTML = Forks;
	select('totalSales').innerHTML = revenue.toFixed(2);
}

async function loadJSON(path) {
	let response = await fetch(path);
	let dataset = await response.json(); // Now available in global scope
	return dataset;
}

function init() {
	salesPromise = loadJSON('./data/sales.json');
	stocksPromise = loadJSON('./data/stocks.json');
	salesPromise.then(function (sales) {
		plotSales(sales);
	});
	stocksPromise.then(function (stocks) {
		plotStocks(stocks);
	});
}

document.addEventListener('DOMContentLoaded', init, false);
