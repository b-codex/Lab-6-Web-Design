/*  
Here is the exercise on working on the remaining bom method 

Location , Navigator , screen , Window 

Follow the Instruction on the comments 

1. Declare the UI Variables for selecting on the elements 
2. Use the innerHTML property to display the result on each element 
3. The Text  of the elements will lead you what bom information is required 

Adding Extra is Possible if you want to explore more ...

Good Luck !!! 
*/




// Define UI Variables  here 

// Location Info
var href = document.querySelector('body > div > div > div:nth-child(2) > a:nth-child(1) > span')
var protocol = document.querySelector('body > div > div > div:nth-child(2) > a:nth-child(2) > span')
var host = document.querySelector('body > div > div > div:nth-child(2) > a:nth-child(3) > span')
var port = document.querySelector('body > div > div > div:nth-child(2) > a:nth-child(4) > span')
var hostName = document.querySelector('body > div > div > div:nth-child(2) > a:nth-child(5) > span')

// Browser Info
var appName = document.querySelector('body > div > div > div:nth-child(4) > a:nth-child(1) > span')
var appVersion = document.querySelector('body > div > div > div:nth-child(4) > a:nth-child(2) > span')
var platform = document.querySelector('body > div > div > div:nth-child(4) > a:nth-child(3) > span')
var language = document.querySelector('body > div > div > div:nth-child(4) > a:nth-child(4) > span')
var cookieEnabled = document.querySelector('body > div > div > div:nth-child(4) > a:nth-child(5) > span')

// Screen Info
var height = document.querySelector('body > div > div > div:nth-child(6) > a:nth-child(1) > span')
var width = document.querySelector('body > div > div > div:nth-child(6) > a:nth-child(2) > span')
var pixelDepth = document.querySelector('body > div > div > div:nth-child(6) > a:nth-child(3) > span')

// Browsing History Info
var length = document.querySelector('body > div > div > div:nth-child(8) > a:nth-child(1) > span')
var state = document.querySelector('body > div > div > div:nth-child(8) > a:nth-child(2) > span')



// Display the BOM Information on the innerHTML of the elements

href.innerHTML = window.location.href
protocol.innerHTML = window.location.protocol
host.innerHTML = window.location.host
port.innerHTML = window.location.port
hostName.innerHTML = window.location.hostname

appName.innerHTML = window.navigator.appName
appVersion.innerHTML = window.navigator.appVersion
platform.innerHTML = window.navigator.userAgent
language.innerHTML = window.navigator.language
cookieEnabled.innerHTML = window.navigator.cookieEnabled

height.innerHTML = window.screen.height
width.innerHTML = window.screen.width
pixelDepth.innerHTML = window.screen.pixelDepth

length.innerHTML = window.history.length
state.innerHTML = window.history.state