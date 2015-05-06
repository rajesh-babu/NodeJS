exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['todo-spec.js'],
  multiCapabilities: [{
    browserName: 'chrome'
  }]
  /*
   onPrepare: function() {
    browser.driver.get('http://localhost:9080/cas/login?service=http%3A%2F%2Flocalhost%3A9080%2Fcs%2Fwem%2Ffatwire%2Fhome');
	browser.driver.getTitle().then(function(title) {
		//element(by.xpath('//*[@id="username"]')).sendKeys('fwadmin');
		//browser.driver.findElement(By.xpath('//*[@id="username"]')).sendKeys('fwadmin');
		//element(by.xpath('//*[@id="password"]')).sendKeys('xceladmin');
		//browser.driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('xceladmin');
		browser.driver.findElement(By.xpath('//*[@id="loginbox"]/div[8]/div[2]/div[16]/span')).click();
	});

    
	
	
	element(by.id('username')).sendKeys('fwadmin');
	element(by.id('password')).sendKeys('xceladmin');
	element(by.xpath('//*[@id="loginbox"]/div[8]/div[2]/div[16]/span')).click();
	

    // Login takes some time, so wait until it's done.
    // For the test app's login, we know it's done when it redirects to
    // index.html.
    return browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return /index/.test(url);
      });
    }, 10000);
  }
*/
  
};
