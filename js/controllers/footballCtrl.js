
boxPlotApp.controller('footballCtrl', function ($scope) {
  
  // array that will be used to 
  $scope.arrSel = [];

  $scope.pushSelection = function () {

  };

  // selected players
  $scope.selection = [];
  $scope.selectedPlayers = []; 




  $scope.class = "notSelected";
   // players
  $scope.players = ['AJ Green', 'Andre Johnson', 'Anquan Boldin',
                    'Brandon Marshall','Brian Hartline',
                    'Calvin Johnson','Demaryius Thomas',
                    'Desean Jackson','Jacoby Jones',
                    'Jason Witten', 'Lance Moore', 'Mike Wallace',
                    'Miles Austin', 'Randall Cobb',
                    'Reggie Wayne', 'Roddy White', 'Stevie Johnson',
                    'Victor Cruz', 'Vincent Jackson', 'Wes Welker'];

  $scope.playerIndex = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

  

  // toggle selection for a given players by name
  $scope.toggleSelection = function toggleSelection(playerName) {

    
    

    // finds index of from selection
    // this essentially is used to check to see if the player already exists within
    // the array $scope.selection
    var idx = $scope.selectedPlayers.indexOf(playerName);

    // funds index of from players
    // returns the index of wherever they are in the big list
    var idx2 = $scope.players.indexOf(playerName);
    console.log('Computed idx: ' + idx);

    

      // is currently selected
      if (idx > -1) {
        console.log('Index exists, we remove: ' + playerName + ', new array: ' + $scope.selection);
        $scope.selection.splice(idx, 1);
        $scope.selectedPlayers.splice(idx, 1);
      }


      // is newly selected
      else {                  
          if ($scope.selection.length < 6) {
              $scope.selection.push(idx2);
              $scope.selectedPlayers.push(playerName);
              console.log('Index did not exist, we added: ' + playerName + ' new array is: ' + $scope.selection);
          }
      };

    
  };
  

});

