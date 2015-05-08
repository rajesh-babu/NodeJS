'use strict';

/**
 * Instantiate the angular app and import Angular UI control called "ui.select".
 * Also import the ngSanitize to place the html tag for select's drop down content. 
 */
var app = angular.module('segmentApp', []);

app.filter('segmentsFilter', [function($filter) {
	return function(inputArray, segSearchCriteria, scope){         
		if(!angular.isDefined(segSearchCriteria) || segSearchCriteria == ''){
			return inputArray;
		}         
		var data=[];
		angular.forEach(inputArray, function(item){             
			if(item.description.toLowerCase().indexOf(segSearchCriteria.toLowerCase()) != -1){
			 data.push(item);
			}
		}); 
		scope.segCount = data.length;
		return data;
	};
}]);

app.controller('createSegmentCtrl', function($scope, $http, $timeout, $interval) {
	var $this = this,init = true, isCreateMode = true;
	$scope.segmentValues2 = [];
	$scope.segCount = 0;
	$scope.segSelectedCount = 0;
	
	/**
	 * Return the selected Segments IDs to query and populate remaining available segments list
	 * @param selectedSegArr - Array ( Already selected Segments Object Array)
	 * @Return String (query format)
     */
	function getSelectedSegmentsIds( selectedSegArr ){
		
		var resultStr = "";
		for( var i=0; i < selectedSegArr.length; i++ ){
			var dlimit = (i < (selectedSegArr.length - 1) )? "," : "";
			resultStr = resultStr + selectedSegArr[i].id + dlimit;
		}
		
		return "?id=" + resultStr;
	}
	$this.getSelectedSegmentsIds = getSelectedSegmentsIds;
	  
	/**
	 * Fetch segments from DB based on the query and assign it to available segments list. Need to scope it to '$this' as it's needed for unit testing 
	 * @param query - String ( "" for all and String "?id=1,2,3" if selected segment ID is 1, 2 and 3 )
     */
	function fetchSegments( query ){
		$http.get( 'http://localhost:8080/api/segments/list'+query ).success(function( data ){
		//Response format->{"results":[{"id":"1","code":"ca","description":"H, Engaged, Assigned, AC, male/unknown, 35+","displayvalues":"H,E,AS,AC,M/UNK,35+"},{"id":"2","code":"cb","description":"H, Engaged, Assigned, AC, male/unknown, <age 35","displayvalues":"H,E,AS,AC,M/UNK,<35"}]}
		var dt = [];
		for (var i=0 ;i<data.results.length;i++ ){
			dt.push(data.results[i]);		
		}
		$scope.segmentValues1 = JSON.parse(JSON.stringify(dt));
		updateSegmentCount();
		});
		
	}
	$this.fetchSegments = fetchSegments;
	// Get the selected segments to 1st hidden input when opening the page in edit mode
	var el = document.getElementById( 'segmentsListFw' ),
		existingValue = el.getAttribute( "value" );		
	if( existingValue != "" ){//Edit Mode
		var segVal = JSON.parse( existingValue );
		$scope.segmentValues2 = segVal.selectedList;
		setSelectedSegments(); // For 1st hidden input when opening the page in edit mode
		fetchSegments( getSelectedSegmentsIds( segVal.selectedList ) );
	}else{ // get the full source list if the page is create mode			   
		fetchSegments("");
	}
	 
  /**
   * Event handler for 'Add >' button, Move options from left to right. 
   */
  $scope.addSegValues = function(){
	  if( $scope.selectedSegList1 ){
		addRemoveArr($scope.selectedSegList1, $scope.segmentValues1, $scope.segmentValues2, "add");
	  }
  }
  /**
   * Event handler for '< Remove' button, move options from right to left.
   */
  $scope.addremoveValues = function(){
	  if( $scope.selectedSegList2 ){
		addRemoveArr($scope.selectedSegList2, $scope.segmentValues2, $scope.segmentValues1, "remove");
	  }
  }
  
  /**
   * This function remove the options from source and move the options to destination list.
   */
   function addRemoveArr( selArr, sourceArr, DestArr, mode ){
	  for(var m=0;m<selArr.length;m++){
		   var notFound = true;
		   // check if already exist
		   for(var mm=0;mm<DestArr.length;mm++){
				if(DestArr[mm].id === selArr[m].id){
					notFound = false;
				}
		   }
		   if(notFound){
			DestArr.push(selArr[m]);
		   }else if(mode != "remove"){
			 alert("Already Exist");
			 return;
		   }
	  }
	  for(var j=0;j<selArr.length;j++){
		   for(var k=0;k<sourceArr.length;k++){
			   if(sourceArr[k].id === selArr[j].id){
				   sourceArr.splice(k,1);
			   }
		   }	  	
	  }
	  setSelectedSegments();
	  updateSegmentCount();
  }
  $this.addRemoveArr = addRemoveArr;
  
  /**
   * Returns the List based on the given input parameter
   * @param String - 'source' or 'dest'
   * @return array
   */
    function getSelectedList(type){
	   var arr = [];
	   if(type === "source"){
			arr = $scope.segmentValues1;
	   }else{
			arr = $scope.segmentValues2;
	   }
	   return arr;
    }
	
  /**
   * Set the selected segments to hidden field
   */
    function setSelectedSegments(){
		$scope.hiddenSegmentsVal = angular.toJson({"selectedList":getSelectedList("dest")});
		// sample Format-> {"selectedList":[{"id":"2","code":"cb","description":"H, Engaged, Assigned, AC, male/unknown, <age 35","displayvalues":"H,E,AS,AC,M/UNK,<35"},{"id":"3","code":"cc","description":"H, Unengaged, Assigned, AC, male/unknown, 35+","displayvalues":"H,UN,AS,AC,M/UNK,35+"}]}
   }
    /**
     * Clear the Search text
     */
     $scope.clearSearch = function(){
    	$scope.segSearchCriteria = "";
    	updateSegmentCount();
    }
     
     /**
      * Update the Segment Count for available and selected Segments
      */
       function updateSegmentCount(){
    	   if($scope.segmentValues1 && $scope.segmentValues1.length)
    		   $scope.segCount = $scope.segmentValues1.length;
    	   if($scope.segmentValues2 && $scope.segmentValues2.length)
    		   $scope.segSelectedCount = $scope.segmentValues2.length;
   		}
   

});
