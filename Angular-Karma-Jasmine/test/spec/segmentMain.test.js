describe('Segmentation Unit Testing', function() {

	beforeEach(module('segmentApp'));

	var createSegmentCtrl2,
	scope;

	beforeEach(inject(function ($rootScope, $controller) {
		 var html = '<input id="segmentsListFw" value=""></input>';
         angular.element(document.body).append(html);
		scope = $rootScope.$new();
		createSegmentCtrl2 = $controller('createSegmentCtrl', {
		$scope: scope
		});
	}));
	it('Checks Query format extract', function () {
		var idArr= [{id:"1"},{id:"2"}];
		expect(createSegmentCtrl2.getSelectedSegmentsIds(idArr)).toEqual("?id=1,2");
	});

});
