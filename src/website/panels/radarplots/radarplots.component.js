import {
    createPanelComponent
} from '../panels';

import template from './radarplots.html';
import './radarplots.css';
import RadarChart from './radarChart';

class RadarPlotsController {

    constructor($element, datasetsSrv) {
        'ngInject';
        this.$element = $element;
        this.datasetsSrv = datasetsSrv;
    }

    $postLink() {
        this.requestRandomData();
    }

    requestRandomData(nbData = 3) {
        this.datasetsSrv.getRandomNumericData(this.panelCtrl.workspaceCtrl.datasetId, nbData).then(carsData => {
            this.dataStats = carsData.dataStats;
            this.data = carsData.data;
            this.dataLabels = carsData.dataLabels;
            this.createVisualization(this.$element[0]);
        });
    }

    // adapted from http://bl.ocks.org/nbremer/21746a9668ffdf6d8242
    createVisualization(element) {
        let processedData = _.map(this.data, d => {
            let ret = [];
            _.forOwn(d, (v, k) => ret.push({
                'axis': k,
                'value': (v - this.dataStats[k].min) /
                (this.dataStats[k].max - this.dataStats[k].min)
            }));
            return ret;
        });
        var margin = {
                top: 50,
                right: 10,
                bottom: 0,
                left: 10
            },
            width = 1200,
            height = 350;

        var radarChartOptions = {
            w: width,
            h: height,
            margin: margin,
            maxValue: 1.0,
            levels: 5,
            roundStrokes: true
        };

        //Call function to draw the Radar chart
        RadarChart($(element).find(".radar-plots-container")[0], processedData, this.dataLabels, radarChartOptions);
    }

}

export default createPanelComponent(template, RadarPlotsController);
