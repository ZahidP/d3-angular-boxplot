d3-angular-boxpot
=================

D3.js Boxplot Directive using Angular (based off of Mike Bostock's d3-boxplot, and Gregory Hilkert's d3AngularIntegration)

See: http://bl.ocks.org/mbostock/4061502   d3-boxplot
See: https://github.com/EpiphanyMachine/d3AngularIntegration   d3-angular integration

My explanation skills are likely quite poor, please let me know if I can improve. 

Also, let me know how I can improve my code in any way.

More changes/features should be coming (show names on hover, perhaps show mean/median/variance etc).







<b> Controller: </b>

'$scope.selection' array: the buttons are used to push new indices which you want to graph into this array


(boxPlot) Directive:

scope.render(data): 'scope.selection' is passed as the data object. This will select new players to graph.


Changes to original box.js from bl.ocks.org:


svg.exit().transition()
    .duration(500)
    .attr("y", 20)
    .style("opacity", 1e-6)
    .remove();
    
This is used to remove any extra boxes.

See: http://bost.ocks.org/mike/circles/ for explanation on enter() & exit() .

Essentially, enter() is used whenever an additionaly element enters your dataset, and exit() is used whenever an element is removed. From your dataset.

