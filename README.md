d3-angular-boxpot
=================

<a href="http://ZahidP.github.io/d3-angular-boxplot"> ZahidP.github.io/d3-angular-boxplot </a>  (does not work with https)

D3.js Boxplot Directive using Angular 
(based off of Mike Bostock's d3-boxplot and Gregory Hilkert's d3AngularIntegration)

See: http://bl.ocks.org/mbostock/4061502   d3-boxplot <br/>
See: https://github.com/EpiphanyMachine/d3AngularIntegration   d3-angular integration









<h4><b> Controller: </b></h4>
'$scope.selection' array: the buttons underneath the boxplot are used to push new indices which you want to graph into this $scope.selection. It is then passed into the directive.




<b><h4> (boxPlot) Directive: </b></h4>
scope.render(data): 'scope.selection' is passed as the data object. This will select new objects to graph. Additionally, we will watch for changes in the data object, and update the chart when it has changed. 



<b><h4> Changes to original box.js from bl.ocks.org: </b></h4>
svg.exit()<br/> .transition()
<br/>    .duration(500)
<br/>    .attr("y", 20)
<br/>    .style("opacity", 1e-6)
<br/>    .remove();
    
This is used to remove any extra boxes. See: http://bost.ocks.org/mike/circles/ for explanation on enter() & exit() .
Essentially, enter() is used whenever an additionaly element enters your dataset, and exit() is used whenever an element is removed. From your dataset.

