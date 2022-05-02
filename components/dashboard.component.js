app.component('qs-dashboard', {
	template: `
		<div class="qs-dashboard">
			<h1>Dashboard</h1>
			<div class="bbox" v-for="bbox in bboxes" :data-id="bbox.bbox_id">
				<div class="header">
					<div class="name">
						<img height="40" src="./images/icon-box.png" />
						<div>
							<h3>{{bbox.bbox_id}}</h3>
							<p>Testbox</p>
						</div>
					</div>
					<div class="actions">
						<img height="24" src="./images/icon-arrow-down.svg" />
					</div>
				</div>
				<div class="content">
					<div class="chart">
						<div class="header">
							<div class="title">Weight</div>
							<div class="warning">{{weightWarning}}</div>
							<div class="filter">
								<select v-model="hours" @change="getWeightChart">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
									<option>6</option>
									<option>7</option>
									<option>8</option>
									<option>9</option>
									<option>10</option>
									<option>11</option>
									<option>12</option>
									<option>13</option>
									<option>14</option>
									<option>15</option>
									<option>16</option>
									<option>17</option>
									<option>18</option>
									<option>19</option>
									<option>20</option>
									<option>21</option>
									<option>22</option>
									<option>23</option>
									<option>24</option>
								</select>
								<span> Hours</span>
							</div>
						</div>
						<div class="data">
							<canvas id="bhive_weight"></canvas>
							<a v-if="!weightData" class="button load" @click="getWeightChart">Show Data</a>
						</div>
					</div>
					<div class="chart">
						<div class="header">
							<div class="title">Temperature</div>
							<div class="warning">{{temptWarning}}</div>
							<div class="filter">
								<select v-model="hours" @change="getTempChart">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
									<option>6</option>
									<option>7</option>
									<option>8</option>
									<option>9</option>
									<option>10</option>
									<option>11</option>
									<option>12</option>
									<option>13</option>
									<option>14</option>
									<option>15</option>
									<option>16</option>
									<option>17</option>
									<option>18</option>
									<option>19</option>
									<option>20</option>
									<option>21</option>
									<option>22</option>
									<option>23</option>
									<option>24</option>
								</select>
								<span> Hours</span>
							</div>
						</div>
						<div class="data">
							<canvas id="bhive_temp"></canvas>
							<a v-if="!tempData" class="button load" @click="getTempChart">Show Data</a>
						</div>
					</div>
					<div class="chart" v-if="finished.scans">
						<div class="header">
							<div class="title">Scans</div>
							<div class="warning">{{scanWarning}}</div>
							<!-- <div class="filter">
								<select v-model="hours">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
									<option>6</option>
									<option>7</option>
									<option>8</option>
									<option>9</option>
									<option>10</option>
									<option>11</option>
									<option>12</option>
									<option>13</option>
									<option>14</option>
									<option>15</option>
									<option>16</option>
									<option>17</option>
									<option>18</option>
									<option>19</option>
									<option>20</option>
									<option>21</option>
									<option>22</option>
									<option>23</option>
									<option>24</option>
								</select>
								<span> Hours</span>
							</div> -->
						</div>
						<div class="data">
							<div class="scan_upload">
								<input type="file" name="scan" ref="scanUpload">
								<div>
									{{scanUploadStatus}} 
									<a class="button submit" @click="uploadScan(bbox.bhives[0].bhive_id)">Upload</a>
								</div>
							</div>
							<div id="scan_details" class="scan_details" v-if="scanDetailsID !== false">
								<h3>Scan Details for "{{bboxes[0].bhives[0].scans[scanDetailsID].date}}"</h3>
								<p>{{bboxes[0].bhives[0].scans[scanDetailsID].metadata.length}} Detections:</p>
								<div v-for="(overview, overviewID) in bboxes[0].bhives[0].scans[scanDetailsID].overview">
									<!-- <span :style="{color: scan.css_color}">&#x2718;</span> 
									{{scan.class}} ({{scan.confidence_percent}}) -->
									<span :style="{color: overview.color}">&#x2718;</span> 
									{{ overviewID }}: {{ overview.amount }}
								</div>
								<p>
									Image & Marker:<br>
									<span class="note">scroll/drag to see whole image or <a @click="openScanImage">open image as fullsize</a></span>
								</p>
								<div class="img_container">
									<img :src="bboxes[0].bhives[0].scans[scanDetailsID].imageUrl" />
									<div v-for="scan in bboxes[0].bhives[0].scans[scanDetailsID].metadata" class="scan_detection tooltip_trigger" :style="{height: scan.css_height, width: scan.css_width, left: scan.css_left, top: scan.css_top, border: scan.css_border}">
										<div :style="{background: scan.css_color}" class="tooltip">{{scan.class}} ({{scan.confidence_percent}})</div>
									</div>
								</div>
							</div>
							<div class="table" id="bhive_scan">
								<div class="entry head">
									<div class="time">Date & Time</div>
									<div class="detections">Detections</div>
									<div class="mites">Mites</div>
									<div class="image">Details</div>
								</div>
								<div class="entry data" v-for="(scan, scanID) in bboxes[0].bhives[0].scans">
									<div class="time">{{scan.date}}</div>
									<div v-if="scan.metadata" class="detections">{{scan.metadata.length}}</div>
									<div v-else class="detections"></div>
									<div class="mites">{{scan.mites}}</div>
									<div class="details">
										<a href="#scan_details" @click="setScanDetailsID(scanID)">Details</a>
									</div>
								</div>
							</div>
							<!-- <a v-if="!scanData" class="button load" @click="getScans">Show Data</a> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<div :class="{'active': popupActive}" class="popup">
			<a class="close" @click="closeScanImage">CLOSE X</a>
			<div class="img_container" v-if="scanDetailsID !== false">
				<img :src="bboxes[0].bhives[0].scans[scanDetailsID].imageUrl" />
				<div v-for="scan in bboxes[0].bhives[0].scans[scanDetailsID].metadata" class="scan_detection tooltip_trigger" :style="{height: scan.css_height, width: scan.css_width, left: scan.css_left, top: scan.css_top, border: scan.css_border}">
					<div :style="{background: scan.css_color}" class="tooltip">{{scan.class}} ({{scan.confidence_percent}})</div>
				</div>
			</div>
		</div>
	`,
	data() {
		return {
			finished: {
				weights: false,
				temps: false,
				scans: false
			},
			bboxes: [],
			hours: 4,
			weightData: false,
			weightWarning: '',
			tempData: false,
			temptWarning: '',
			scanData: false,
			scanWarning: '',
			scanDetailsID: false,
			scanUploadStatus: '',
			popupActive: false
		}
	},
	created: function() {
		this.getBoxes();
	},
	methods: {
		getBoxes: function() {
			this.bboxes = [];
			// get bboxes
			axios.get('https://api.queensaver.com/v1/bboxes', { withCredentials: true, crossDomain: true })
			.then(function (response) {
				// iterate over all bboxes
				response.data.bboxes.forEach((value, index) => {
					// set up bhives array
					let bhives = [];
					// iterate over all behives within current bbox
					value.bhive.forEach((hive_value, hive_index) => {
						// create bhive object and set bhive id
						bhives[hive_index] = {
							bhive_id: hive_value.bhive_id,
						}
						// get behive weights
						axios.get('https://api.queensaver.com/v1/scale?bhive_id=' + hive_value.bhive_id + '&epoch=' +  Math.floor(Date.now()/1000) + '&seconds_in_the_past=' + (60 * 60 * 24 * 1).toString(), { withCredentials: true, crossDomain: true })
						.then(function (response) {
							// set bhive weights
							bhives[hive_index].weights = response.data.weights.reverse()
							// data grab is finished
							this.finished.weights = true
						}.bind(this))
						.catch(function (error) {
							console.log(error);
						});
						// get behive temps
						axios.get('https://api.queensaver.com/v1/temperature?bhive_id=' + hive_value.bhive_id + '&epoch=' +  Math.floor(Date.now()/1000) + '&seconds_in_the_past=' + (60 * 60 * 24 * 1).toString(), { withCredentials: true, crossDomain: true })
						.then(function (response) {
							// set bhive temps
							bhives[hive_index].temps = response.data.temperatures.reverse()
							// data grab is finished
							this.finished.temps = true
						}.bind(this))
						.catch(function (error) {
							console.log(error);
						});
						// get behive scan
						axios.get('https://api.queensaver.com/v1/varroa-scan?bhive_id=' + hive_value.bhive_id + '&epoch=' +  Math.floor(Date.now()/1000) + '&seconds_in_the_past=' + (60 * 60 * 24 * 1000).toString(), { withCredentials: true, crossDomain: true })
						.then(function (response) {
							// set bhive scans
							bhives[hive_index].scans = response.data.varroaScans.reverse()
							bhives[hive_index].scans.forEach((scan_value, scan_index) => {
								scan_value.overview = {
									mite: {amount: 0, color: '#FF005C'},
									bee_leg: {amount: 0, color: '#1EAE98'},
									bee_wing: {amount: 0, color: '#AA2EE6'},
									ant: {amount: 0, color: '#04009A'},
									other: {amount: 0, color: '#F98404'}
								}
								scan_value.open = false
								scan_value.date = new Date(scan_value.epoch * 1000).toLocaleString('de-DE');
								if (scan_value.metadata) {
									scan_value.metadata.forEach((metadata_value, metadata_index) => {
										metadata_value.css_height = metadata_value.height + 4 + 'px';
										metadata_value.css_width = metadata_value.width + 4 + 'px';
										metadata_value.css_left = (metadata_value.xCenter - 2 - metadata_value.width / 2) + 'px';
										metadata_value.css_top = (metadata_value.yCenter - 2 - metadata_value.height / 2) + 'px';
										switch (metadata_value.class) {
											case 'mite':
												metadata_value.css_color = '#FF005C';
												scan_value.overview.mite.amount += 1;
												break;
											case 'bee_leg':
												metadata_value.css_color = '#1EAE98';
												scan_value.overview.bee_leg.amount += 1;
												break;
											case 'bee_wing':
												metadata_value.css_color = '#AA2EE6';
												scan_value.overview.bee_wing.amount += 1;
												break;
											case 'ant':
												metadata_value.css_color = '#04009A';
												scan_value.overview.ant.amount += 1;
												break;
											default:
												metadata_value.css_color = '#F98404';
												scan_value.overview.other.amount += 1;
												break;
										}
										metadata_value.css_border = '2px solid ' + metadata_value.css_color;
										metadata_value.confidence_percent = Math.round(metadata_value.confidence * 100) + '%';
									});
								}
							});
							// data grab is finished
							this.finished.scans = true
						}.bind(this))
						.catch(function (error) {
							console.log(error);
						});
					});
					// fill bboxes data array
					this.bboxes[index] = {
						bbox_id: value.bbox_id,
						shedule: value.schedule,
						bhives: bhives
					};
				});
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
		},
		getWeightChart: function() {
			this.weightWarning = '';
			this.weightData = true;
			if (this.$bhive_weight !== null) {
				this.$bhive_weight.destroy();
			}
			let chart_data = [];
			this.bboxes[0].bhives[0].weights.forEach((value, index) => {
				if (index >= this.hours * 4) {
					return;
				}
				if (parseInt(value.weight) > 2675) {
					this.weightWarning = 'Warning: Value greater than 2.675!';
				}
				chart_data[index] = {
					x: value.epoch * 1000,
					y: value.weight
				}
			});
			const ctx = document.getElementById('bhive_weight').getContext('2d');
			this.$bhive_weight = new Chart(ctx, {
				type: 'line',
				data: {
					datasets: [{
						data: chart_data,
						backgroundColor: 'rgb(0, 0, 0)',
						borderColor: 'rgb(0, 0, 0)',
						tension: 0.4,
					}]
				},
				options: {
					plugins: {
						legend: {
							display: false
						}
					},
					scales: {
						x: {
							ticks: {
								color: 'rgb(0,0,0)'
							},
							grid: {
								display: false
							},
							type: 'timeseries',
							time:  {
								// tooltipFormat: 'dd.MM.yyy, HH:ii',
								unit: 'hour',
								displayFormats: {
									hour: 'HH:ii'
								}
							}
						},
						y: {
							ticks: {
								color: 'rgb(0,0,0)'
							},
							// grid: {
							// 	display: false
							// },
							beginAtZero: false
						}
					}
				}
			});
		},
		getTempChart: function() {
			this.tempWarning = '';
			this.tempData = true;
			if (this.$bhive_temp !== null) {
				this.$bhive_temp.destroy();
			}
			let chart_data = [];
			this.bboxes[0].bhives[0].temps.forEach((value, index) => {
				if (index >= this.hours * 4) {
					return;
				}
				// if (parseInt(value.weight) > 2675) {
				// 	this.weightWarning = 'Warning: Value greater than 2.675!';
				// }
				chart_data[index] = {
					x: value.epoch * 1000,
					y: value.temperature
				}
			});
			const ctx = document.getElementById('bhive_temp').getContext('2d');
			this.$bhive_temp = new Chart(ctx, {
				type: 'line',
				data: {
					datasets: [{
						data: chart_data,
						backgroundColor: 'rgb(0, 0, 0)',
						borderColor: 'rgb(0, 0, 0)',
						tension: 0.4,
					}]
				},
				options: {
					plugins: {
						legend: {
							display: false
						}
					},
					scales: {
						x: {
							ticks: {
								color: 'rgb(0,0,0)'
							},
							grid: {
								display: false
							},
							type: 'timeseries',
							time:  {
								// tooltipFormat: 'dd.MM.yyy, HH:ii',
								unit: 'hour',
								displayFormats: {
									hour: 'HH:ii'
								}
							}
						},
						y: {
							ticks: {
								color: 'rgb(0,0,0)'
							},
							// grid: {
							// 	display: false
							// },
							beginAtZero: false
						}
					}
				}
			});
		},
		uploadScan: function(bhive_id) {
			this.scanUploadStatus = 'uploading ...';
			var files = this.$refs.scanUpload[0].files[0];
			var formData = new FormData();
			formData.append('bhiveId', bhive_id);
			formData.append('epoch', Math.floor(Date.now()/1000));
			formData.append('scan', files);
			axios.post('https://api.queensaver.com/v1/varroa-scan-image', formData, { withCredentials: true, crossDomain: true })
			.then(function (response) {
				this.scanUploadStatus = 'upload successful ...';
				location.reload();
			}.bind(this))
			.catch(function (error) {
				this.scanUploadStatus = 'upload error ...';
				console.log(error);
			});
		},
		setScanDetailsID: function(scanID) {
			this.scanDetailsID = scanID;
		},
		openScanImage: function() {
			this.popupActive = true;
		},
		closeScanImage: function() {
			this.popupActive = false;
		}
	}
})