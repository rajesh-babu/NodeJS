describe('Segmentation Testing', function() {
  it('should Open the segmentation', function() {
	// No need to wait for AngularJS load check as login page is non angular
	browser.ignoreSynchronization = true;
	// Load Login and fill the credential 
	browser.get('http://localhost:9080/cas/login?service=http%3A%2F%2Flocalhost%3A9080%2Fcs%2Fwem%2Ffatwire%2Fhome');
	element(by.name('username')).sendKeys('fwadmin');
	element(by.name('password')).sendKeys('xceladmin');
	element(by.xpath('//*[@id="loginbox"]/div[8]/div[2]/div[16]/span')).click().then(function() 
	{  
	  // switch to iframe as menu section inside the iframe
	  browser.switchTo().frame(browser.driver.findElement(by.xpath('//*[@id="frame1"]/iframe'))).then(function(){
		// wait for page to load
		browser.driver.wait(function(){ return browser.driver.isElementPresent(by.id('dijit_PopupMenuBarItem_3')); }, 10000);
		// Need to mouse move to the menu section as protractor clicks the elements if it's visible DOM
		browser.actions().mouseMove(element(by.id('dijit_PopupMenuBarItem_3'))).perform().then(function()
			{
			browser.actions().mouseMove(element(by.id('fw_dijit_UIPopupMenuItem_5'))).perform().then(function(){				
				browser.driver.wait(function(){ return browser.driver.isElementPresent(by.id('fw_dijit_UIMenuItem_55')); }, 10000);
				browser.actions().mouseMove(element(by.id('fw_dijit_UIMenuItem_55'))).perform();
			});
		});
		// Click the "Segment Menu item"
		element(by.id('fw_dijit_UIMenuItem_55')).click();
		browser.driver.wait(function(){ return browser.driver.isElementPresent(by.id('contentPane_view-3')); }, 10000);
		browser.switchTo().frame(browser.driver.findElement(by.id('contentPane_view-3'))).then(function(){
			// click the details Link
			element(by.xpath('//*[@id="dijit_layout_TabContainer_0_tablist"]/div[4]/div/div[2]')).click();
		});
		
	  });
	  
	}); 
	browser.driver.sleep(10000);
  });
});


