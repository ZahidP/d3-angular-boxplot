

boxPlotApp.directive('boxPlot', ['d3Service', function(d3Service) {		//might have to add in $window, $timeOut
      return {
        restrict: 'EA',
        scope: {
          data: "=",
          label: "="
       //   onClick: "&"
        },
        link: function(scope, iElement, iAttrs) {
        	d3Service.d3().then(function(d3) {

          
           
          
          

	          // on window resize, re-render d3 canvas
	       window.onresize = function() {
	         return scope.$apply();
	       };
	          
	      scope.$watch(function(){
	              return angular.element(window)[0].innerWidth;
	            }, function(){
                
	              return scope.render(scope.data);
	            }
	          );	

	          // watch for data changes and re-render
	          
	         scope.$watch('data', function(newVals, oldVals) {
              console.log('new Vals: ' + newVals);
              console.log('old Vals: ' + oldVals);
              svg = d3.select(iElement[0]).selectAll("svg");
              
	            return scope.render(newVals);
	         }, true);	

	          // define render function
    scope.render = function(data,label){
      // remove all previous items before render
         
    //  svg.selectAll('.box').remove();
    console.log(scope.label[1]);


      (function() {
              
              // Inspired by http://informationandvisualization.de/blog/box-plot
              d3.box = function() {
                var width = 1,
                    height = 1,
                    duration = 0,
                    domain = null,
                    value = Number,
                    whiskers = boxWhiskers,
                    quartiles = boxQuartiles,
                    tickFormat = null;

                // For each small multiple…
                function box(g) {
                  g.each(function(dataFinal, i) {
              //      d = d.map(value).sort(d3.ascending);

                var d = dataFinal[1].sort(d3.ascending);
                    var g = d3.select(this),
                        n = d.length,
                        min = d[0],
                        max = d[n - 1];

                    // Compute quartiles. Must return exactly 3 elements.
                    var quartileData = d.quartiles = quartiles(d);

                    // Compute whiskers. Must return exactly 2 elements, or null.
                    var whiskerIndices = whiskers && whiskers.call(this, d, i),
                        whiskerData = whiskerIndices && whiskerIndices.map(function(i) { return d[i]; });

                    // Compute outliers. If no whiskers are specified, all data are "outliers".
                    // We compute the outliers as indices, so that we can join across transitions!
                    var outlierIndices = whiskerIndices
                        ? d3.range(0, whiskerIndices[0]).concat(d3.range(whiskerIndices[1] + 1, n))
                        : d3.range(n);

                    // Compute the new x-scale.
                    var x1 = d3.scale.linear()
                        .domain(domain && domain.call(this, d, i) || [min, max])
                        .range([height, 0]);

                    // Retrieve the old x-scale, if this is an update.
                    var x0 = this.__chart__ || d3.scale.linear()
                        .domain([0, Infinity])
                        .range(x1.range());

                    // Stash the new scale.
                    this.__chart__ = x1;

                    // Note: the box, median, and box tick elements are fixed in number,
                    // so we only have to handle enter and update. In contrast, the outlierIndices           < ====== IMPORTANT READ THIS =======
                    // and other elements are variable, so we need to exit them! Variable
                    // elements also fade in and out.


                    

                    // Update center line: the vertical line spanning the whiskers.
                    var center = g.selectAll("line.center")
                        .data(whiskerData ? [whiskerData] : []);

                    center.enter().insert("line", "rect")
                        .attr("class", "center")
                        .attr("x1", width / 2)
                        .attr("y1", function(d) { return x0(d[0]); })
                        .attr("x2", width / 2)
                        .attr("y2", function(d) { return x0(d[1]); })
                        .style("opacity", 1e-6)
                      .transition()
                        .duration(duration)
                        .style("opacity", 1)
                        .attr("y1", function(d) { return x1(d[0]); })
                        .attr("y2", function(d) { return x1(d[1]); });

                    center.transition()
                        .duration(duration)
                        .style("opacity", 1)
                        .attr("y1", function(d) { return x1(d[0]); })
                        .attr("y2", function(d) { return x1(d[1]); });

                    center.exit().transition()
                        .duration(duration)
                        .style("opacity", 1e-6)
                        .attr("y1", function(d) { return x1(d[0]); })
                        .attr("y2", function(d) { return x1(d[1]); })
                        .remove();

                    // Update innerquartile box.
                    var box = g.selectAll("rect.box")
                        .data([quartileData]);

                    box.enter().append("rect")
                        .attr("class", "box")
                        .attr("x", 0)
                        .attr("y", function(d) { return x0(d[2]); })
                        .attr("width", width)
                        .attr("height", function(d) { return x0(d[0]) - x0(d[2]); })
                      .transition()
                        .duration(duration)
                        .attr("y", function(d) { return x1(d[2]); })
                        .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

                    box.transition()
                        .duration(duration)
                        .attr("y", function(d) { return x1(d[2]); })
                        .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

                    // Update median line.
                    var medianLine = g.selectAll("line.median")
                        .data([quartileData[1]]);

                    medianLine.enter().append("line")
                        .attr("class", "median")
                        .attr("x1", 0)
                        .attr("y1", x0)
                        .attr("x2", width)
                        .attr("y2", x0)
                      .transition()
                        .duration(duration)
                        .attr("y1", x1)
                        .attr("y2", x1);

                    medianLine.transition()
                        .duration(duration)
                        .attr("y1", x1)
                        .attr("y2", x1);

                    // Update whiskers.
                    var whisker = g.selectAll("line.whisker")
                        .data(whiskerData || []);

                    whisker.enter().insert("line", "circle, text")
                        .attr("class", "whisker")
                        .attr("x1", 0)
                        .attr("y1", x0)
                        .attr("x2", width)
                        .attr("y2", x0)
                        .style("opacity", 1e-6)
                      .transition()
                        .duration(duration)
                        .attr("y1", x1)
                        .attr("y2", x1)
                        .style("opacity", 1);

                    whisker.transition()
                        .duration(duration)
                        .attr("y1", x1)
                        .attr("y2", x1)
                        .style("opacity", 1);

                    whisker.exit().transition()
                        .duration(duration)
                        .attr("y1", x1)
                        .attr("y2", x1)
                        .style("opacity", 1e-6)
                        .remove();

                    // Update outliers.
                    var outlier = g.selectAll("circle.outlier")
                        .data(outlierIndices, Number);

                    outlier.enter().insert("circle", "text")
                        .attr("class", "outlier")
                        .attr("r", 5)
                        .attr("cx", width / 2)
                        .attr("cy", function(i) { return x0(d[i]); })
                        .style("opacity", 1e-6)
                      .transition()
                        .duration(duration)
                        .attr("cy", function(i) { return x1(d[i]); })
                        .style("opacity", 1);

                    outlier.transition()
                        .duration(duration)
                        .attr("cy", function(i) { return x1(d[i]); })
                        .style("opacity", 1);

                    outlier.exit().transition()
                        .duration(duration)
                        .attr("cy", function(i) { return x1(d[i]); })
                        .style("opacity", 1e-6)
                        .remove();

                    // Compute the tick format.
                    var format = tickFormat || x1.tickFormat(8);

                    // Update box ticks.
                    var boxTick = g.selectAll("text.box")
                        .data(quartileData);

                    boxTick.enter().append("text")
                        .attr("class", "box")
                        .attr("dy", ".3em")
                        .attr("dx", function(d, i) { return i & 1 ? 6 : -6 })
                        .attr("x", function(d, i) { return i & 1 ? width : 0 })
                        .attr("y", x0)
                        .attr("text-anchor", function(d, i) { return i & 1 ? "start" : "end"; })
                        .text(format)
                      .transition()
                        .duration(duration)
                        .attr("y", x1);

         

                    // Update whisker ticks. These are handled separately from the box
                    // ticks because they may or may not exist, and we want don't want
                    // to join box ticks pre-transition with whisker ticks post-.
                    var whiskerTick = g.selectAll("text.whisker")
                        .data(whiskerData || []);

                    whiskerTick.enter().append("text")
                        .attr("class", "whisker")
                        .attr("dy", ".3em")
                        .attr("dx", 6)
                        .attr("x", width)
                        .attr("y", x0)
                        .text(format)
                        .style("opacity", 1e-6)
                      .transition()
                        .duration(duration)
                        .attr("y", x1)
                        .style("opacity", 1);

                    whiskerTick.transition()
                        .duration(duration)
                        .text(format)
                        .attr("y", x1)
                        .style("opacity", 1);

                    whiskerTick.exit().transition()
                        .duration(duration)
                        .attr("y", x1)
                        .style("opacity", 1e-6)
                        .remove();
                  });
                  d3.timer.flush();
                }

                box.width = function(x) {
                  if (!arguments.length) return width;
                  width = x;
                  return box;
                };

                box.height = function(x) {
                  if (!arguments.length) return height;
                  height = x;
                  return box;
                };

                box.tickFormat = function(x) {
                  if (!arguments.length) return tickFormat;
                  tickFormat = x;
                  return box;
                };

                box.duration = function(x) {
                  if (!arguments.length) return duration;
                  duration = x;
                  return box;
                };

                box.domain = function(x) {
                  if (!arguments.length) return domain;
                  domain = x == null ? x : d3.functor(x);
                  return box;
                };

                box.value = function(x) {
                  if (!arguments.length) return value;
                  value = x;
                  return box;
                };

                box.whiskers = function(x) {
                  if (!arguments.length) return whiskers;
                  whiskers = x;
                  return box;
                };

                box.quartiles = function(x) {
                  if (!arguments.length) return quartiles;
                  quartiles = x;
                  return box;
                };

                return box;
              };

              function boxWhiskers(d) {
                return [0, d.length - 1];
              }

              function boxQuartiles(d) {
                return [
                  d3.quantile(d, .25),
                  d3.quantile(d, .5),
                  d3.quantile(d, .75)
                ];
              }

          })();


					// The script function here
					// Let's figure out what is does.
			// ==========================================================//
			// ==========================================================//



		      

  			// ==== define variables for drawing svg elements ==== //

  				var margin = {top: 10, right: 50, bottom: 30, left: 50},
  		        width = 120 - margin.left - margin.right,
  		        height = 380 - margin.top - margin.bottom;

  		    var min = Infinity,
  		        max = -Infinity;

  		   


  		    


  		    d3.csv("data-sets/allstats-sorted.csv", function(error, csv) {
  		      var datam = [];

          


           for (var jj=0; jj < 20; jj+=1) {         // loop to initialize datam array
            datam[jj] = [];                         // initialie each column
            datam[jj][0] = scope.label[jj];         // set first row/element of each column to player name
            datam[jj][1] = [];                      // set next row/element to empty, will eventually be stats array
          }
          

  		      var category = 'x.Tgts';
  		      csv.forEach(function(x) {
  		        var e = parseFloat(x.playerid - 1),
  		            r = parseFloat(x.row - 1),
  		            s = parseFloat(x.Tgts),
  		            d = datam[e];
  		        console.log('e is :' + e);
  		        if (!d) d = datam[e][1] = [s];
  		        d[1].push(s);                         // push stats array into the second element of each column
  		        
  		        if (s > max) max = s;
  		        if (s < min) min = s;
  		      });
            
  		     

  		    // ====== subsetting the data array ====== //
  			

          var selected = [];
          selected = data;        // data is the data object passed in from the scope, selected takes these indices
          console.log(data);      
  		    var dataFinal = [];     // initialize dataFinal array, this will be used to display selected elements
          

            

		      function addArrElements(element, index, array) {      // this function addArrElements will be used
		        dataFinal.push(datam[element]);                     // to push the selected elements into dataFinal
  		      };  

    
  		    selected.forEach(addArrElements);                     // addArrElements is called here on the 'selected' array
  		   
          


      // ======= Actual Drawing Part of the Code ======== //
  
        var chart = d3.box()
          .whiskers(iqr(1.5))
          .height(height) 
          .domain([min, max]);
   

        var svg = d3.select(iElement[0]).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .attr("class", "box")    
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
        // the x-axis
        var x = d3.scale.ordinal()     
          .domain( dataFinal.map(function(d) { console.log(d); return d[0] } ) )     
          .rangeRoundBands([0 , width], 0.7, 0.3);    

        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

        // the y-axis
        var y = d3.scale.linear()
          .domain([min, max])
          .range([height + margin.top, 0 + margin.top]);
  
        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

        // draw the boxplots  
        svg.selectAll(".box")    
            .data(data)
          .enter().append("g")
          .attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
            .call(chart.width(x.rangeBand()).duration(1000)); 
        
              
        // add a title
        svg.append("text")
              .attr("x", (width / 2))             
              .attr("y", 0 + (margin.top / 2))
              .attr("text-anchor", "middle")  
              .style("font-size", "18px") 
              //.style("text-decoration", "underline")  
              .text("WR Stats 2011-2013");
 
         // draw y axis
        svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
          .append("text") // and text1
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("font-size", "16px") 
            .text("Revenue in €");    
  
        // draw x axis  
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
            .call(xAxis)
          .append("text")             // text label for the x axis
              .attr("x", (width / 2) )
              .attr("y",  10 )
          .attr("dy", ".71em")
              .style("text-anchor", "middle")
          .style("font-size", "16px") 
              .text("Quarter"); 

  	      
  		    });     // close csv function

		    

			    // Returns a function to compute the interquartile range.
			    function iqr(k) {
			      return function(d, i) {
			        var q1 = d.quartiles[0],
			            q3 = d.quartiles[2],
			            iqr = (q3 - q1) * k,
			            i = -1,
			            j = d.length;
			        while (d[++i] < q1 - iqr);
			        while (d[--j] > q3 + iqr);
			        return [i, j];
			      };
			    };


        };  //end render

		})	//end d3Service.d3().then
        }     //end link
	}    //end return
}]);