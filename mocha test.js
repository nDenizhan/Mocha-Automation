// NOTES BEFORE LAUNCH
// run ./node_modules/.bin/chromedriver in a terminal
// yarn test in other terminal

const webdriver = require('selenium-webdriver')

const userName = 'testUser';
const password = 'testPass';
const state = 10; //10 is KS
const examTrial = 'trialPass';
const adminPass = 'admPass';
const delayTimeShort = 3; //3 secs
const delayTimeLong = 6; 
const delayAMinute = 65;
const delayTimeStartExam = 6;
const examDuration = 1 * 1000; //1 secs
var sessionPasswords = ['session1', 'session2'];
var questionCounts = [2, 2]
const finalSessionPass = sessionPasswords[sessionPasswords.length - 1];
const finalSessionQuestionCount = questionCounts[1];
const totalSessionCount = sessionPasswords.length;


var quotes = ["Blank", "Dude, suckin' at something is the first step at being sorta good at something.", 
"Either I will find a way, or I will make one. - Philip Sidney", 
"Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time. - Thomas A. Edison", 
"You are never too old to set another goal or to dream a new dream. - C.S Lewis", 
"If you can dream it, you can do it.- Walt Disney", 
"United wishes and good will cannot overcome brute facts,’ Churchill wrote in his War Memoirs. ‘Truth is incontrovertible. Panic may resent it. Ignorance may deride it. Malice may distort it. But there it is.",
"Fighting is vigorously proceeding, and we shall see who can stand the bucketing best — Briton or Boer.",
"Never give up, for that is just the place and time that the tide will turn.- Harriet Beecher Stowe", 
"One would have thought that if there was one cause in the world which the Conservative party would have hastened to defend, it would be the cause of the British Empire in India … Our fight is hard. It will also be long … But win or lose, we must do our duty. If the British people are to lose their Indian Empire, they shall do so with their eyes open.",
"I know where I'm going and I know the truth, and I don't have to be what you want me to be. I'm free to be what I want. - Muhammad Ali", 
"In politics when you are in doubt what to do, do nothing … when you are in doubt what to say, say what you really think.",
"If you always put limit on everything you do, physical or anything else. It will spread into your work and into your life. There are no limits. There are only plateaus, and you must not stay there, you must go beyond them. - Bruce Lee",];

function getRandomQuote(){
    var randNum = Math.floor(Math.random() * 12) + 1;
    return quotes[randNum];
}

function autoFillText(){
    var returnStr = '';
    for (i = 0; i < 10; i++){
        returnStr += getRandomQuote() + '\uE006';
    }
    return returnStr;
}

    const driver = new webdriver.Builder()
  // The "9515" is the port opened by chrome driver.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    'goog:chromeOptions': {
      // Here is the path to your Electron binary.
      binary: '/Users/ilg/Desktop/targetAppPath'
    }
  })
  .forBrowser('chrome') // note: use .forBrowser('electron') for selenium-webdriver <= 3.6.0
  .build()

function delay(ms){
  return new Promise(resolve=>setTimeout(resolve, ms*1000));
  }

  async function resetExam(){
    try{
      await delay(delayTimeLong)
      const resetCheckbox = await driver.findElement(webdriver.By.id('resetSession')) //Reset the Application
      await resetCheckbox.click()
      console.log('Reset the Application')
      await delay(delayTimeShort)

      const btnStart = await driver.findElement(webdriver.By.id('start-btn'))
      await btnStart.click()
      console.log('Clicked Start button')
    }
    catch(err){
      console.log('Test ERR: ', err)
    }
  
  }

  async function gotoAdminmenu(){
    try{
      await delay(delayTimeShort)
      await driver.findElement(webdriver.By.xpath('//*[@id="footer-logo"]')).click()    //Clicked admin link
      console.log('Clicked admin link')

      await delay(delayTimeShort)
      const adminPassField = await driver.findElement(webdriver.By.id('admin-password-for-admin-panel')) //Clicked adminpass textfield
      await adminPassField.click()
      console.log('Clicked adminpass textfield')

      await delay(delayTimeShort)
      const inputAdminpass = await driver.findElement(webdriver.By.id('admin-password-for-admin-panel')) //Input admin password
      inputAdminpass.sendKeys(adminPass)
      console.log('Input admin password')

      await delay(delayTimeShort)
      await driver.findElement(webdriver.By.className('btn btn-popup btn-darkgreen')).click()    //Clicked admin link
      console.log('Clicked ok button')
  
  
    }
    catch(err){
      console.log('Test ERR: ', err)
    }
  
  }

  async function loginOffline(){
    try{
      await delay(delayTimeLong)
      await driver.findElement(webdriver.By.id('noInternet')).click()
      console.log('Clicked noInternet')

      // Set ignorePreLogin True
    const ignorePrelogincheckbox = await driver.findElement(webdriver.By.id('ignorePreLogin'))
    await ignorePrelogincheckbox.click()
    console.log('Clicked ignorePreLogin')

    await delay(delayTimeShort)

    // Click Start button
    const btnStart = await driver.findElement(webdriver.By.id('start-btn'))
    await btnStart.click()
    console.log('Clicked Start button')

     // Click Login button
     const loginBtn = await driver.findElement(webdriver.By.id('login-btn'))
     loginBtn.click()
      
    }
    catch(err){
      console.log('Test ERR: ', err)
    }
  
  }

async function logintoApp(stateNum){
  try{
    var strNum = String(stateNum);
    // Set ignorePreLogin True
    const ignorePrelogincheckbox = await driver.findElement(webdriver.By.id('ignorePreLogin'))
    await ignorePrelogincheckbox.click()
    console.log('Clicked ignorePreLogin')

    await delay(delayTimeShort)

    // Click Start button
    const btnStart = await driver.findElement(webdriver.By.id('start-btn'))
    await btnStart.click()
    console.log('Clicked Start button')

    await delay(delayTimeLong)

    // Input username, password, and state
    const inputUsername = await driver.findElement(webdriver.By.id('login'))
    inputUsername.sendKeys(userName)

    const inputPassword = await driver.findElement(webdriver.By.id('password'))
    inputPassword.sendKeys(password)

    const inputState = await driver.findElement(webdriver.By.xpath('//*[@id="states"]/option[' + strNum + ']')).click()
    await delay(delayTimeShort)

    // Click Login button
    const loginBtn = await driver.findElement(webdriver.By.id('login-btn'))
    loginBtn.click()
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function completeCheklists(){
  try{
    await delay(delayTimeLong)

    // Complete First Checklist
    await driver.findElement(webdriver.By.xpath('//*[@id="help-btn"]')).click()    //Clicked Read More button
    console.log('Clicked Read More button')

    await delay(delayTimeShort)
    driver.executeScript('$(".checklist-container").scrollTop($(".checklist-container")[0].scrollHeight)') //Scrolled down to see checkbox
    console.log('Scrolled down to checkbox')

    await delay(delayTimeShort)
    const checkboxChecklist1 = await driver.findElement(webdriver.By.id('footer-help-checkbox')) //Checked the checkbox
    await checkboxChecklist1.click()
    console.log('Checked the checkbox')

    await delay(delayTimeShort)
    const closebuttonChecklist1 = await driver.findElement(webdriver.By.id('close-help-btn')) //Clicked the Close button
    await closebuttonChecklist1.click()
    console.log('Clicked the Close button')

    // Complete 2nd Checklist
    await driver.findElement(webdriver.By.xpath('//*[@id="before-exam-btn"]')).click()  //Clicked Before Exam button
    console.log('Clicked Before Exam button')

    await delay(delayTimeShort)
    const checkboxChecklist2 = await driver.findElement(webdriver.By.id('checklist-checkbox')) //Checked the 2nd checkbox
    await checkboxChecklist2.click()
    console.log('Checked the 2nd checkbox')

    //close-checklist-btn
    await delay(delayTimeShort)
    const closebuttonChecklist2 = await driver.findElement(webdriver.By.id('close-checklist-btn')) //Clicked the 2nd Close button
    await closebuttonChecklist2.click()
    console.log('Clicked the 2nd Close button')
    
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function autocompleteTrial(){
  try{
    await delay(delayTimeShort)
    await gotoAdminmenu()

    //Click Auto Complete Trial button
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('auto-complete-trial-btn')).click()
    console.log('Click Auto Complete Trial button')
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function activateAdminmode(){
  try{
    await delay(delayTimeShort)
    await gotoAdminmenu()

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('activate-admin-mode-btn')).click()    //Clicked activate admin mode button
    console.log('Clicked activate admin mode button')
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function startLiveExam(examPassword){
  try{
    var examPass = String(examPassword);

    console.log('*** START LIVE EXAM ***')
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('start-live-btn')).click()    //Clicked Start Live Exam button
    console.log('Clicked Start Live Exam button')

    await driver.findElement(webdriver.By.xpath('//*[@id="exams"]')).click()
    await delay(delayTimeShort)
    // await driver.findElement(webdriver.By.xpath('//*[@id="exams"]/option[' + examNumber + ']')).click()
    await driver.findElement(webdriver.By.xpath('//*[@id="exams"]/option[2]')).click()
    console.log('Selected the First exam')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('btn btn-popup btn-darkgreen')).click()
    console.log('Clicked Ok button')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('img-checkbox')).click()
    console.log('Checked the checkbox')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('start-btn')).click()
    console.log('Clicked Continue button')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('message-ok-btn')).click()
    console.log('Clicked Ok button in popup')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('code-field')).click()
    console.log('Clicked password field')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('code-field')).sendKeys(examPass)
    console.log('Input First session password')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('start-exam-btn')).click()
    console.log('Clicked Start Session button')
    await delay(delayTimeLong)

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('checkmark')).click()
    console.log('Checked the confirm checkbox')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('warning-ok-btn')).click()
    console.log('Clicked the Start Session button and Starting the exam!')
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function clickOnEditor(){
  try{
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('ql-editor ql-blank')).click()
    console.log('Clicked on the editor!')
    
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function writeOnEditor(questionNumber){
  try{
    await delay(delayTimeShort)
    let editor2 = await driver.findElement(webdriver.By.css(`.class-for-question-${questionNumber} .ql-editor`))
    editor2.sendKeys("\n\n" + getRandomQuote() + "\n\n" + getRandomQuote())

    console.log('Writing on the editor!')
    await delay(delayTimeLong)
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function doLiveExam(duration, questionCount){
  try{
    await delay(delayTimeStartExam)

    var keepCalling = true;

    setTimeout(function () {
      keepCalling = false;
    }, duration);
    
    while (keepCalling) {  //Inside the hours long exam
      var randomNumber = Math.floor(Math.random() * questionCount) + 1;
      console.log("generated number is " + randomNumber);

      switch(randomNumber){
        case 1:
          console.log("case 1:")
          await changeQuestion(randomNumber)
          await writeOnEditor(randomNumber)
          await clickSavebutton()
          break;
        case 2:
          console.log("case 2:")
          await changeQuestion(randomNumber)
          await writeOnEditor(randomNumber)
          await toggleShortcutsbutton()
          await clickSavebutton()
          break;
        case 3:
          console.log("case 3:")
          await changeQuestion(randomNumber)
          await writeOnEditor(randomNumber)
          await toggleTakenotebutton()
          await clickDarkmodebutton()
          break;
        case 4:
          console.log("case 4:")
          await changeQuestion(randomNumber)
          await writeOnEditor(randomNumber)
          await toggleSessionInfobutton()
          await toggleTakenotebutton()
          await toggleShortcutsbutton()
          await clickDarkmodebutton()
          break;
        case 5:
          console.log("case 5:")
          await changeQuestion(randomNumber)
          await writeOnEditor(randomNumber)
          await setTimerandWait()
          await toggleSessionInfobutton()
          break;
        case 6:
          console.log("case 6:")
          await changeQuestion(randomNumber)
          await writeOnEditor(randomNumber)
          await lockAndBack()
          await writeOnEditor(randomNumber)
          await clickBoldStylebutton()
          await clickSavebutton()
          break;
        default:
          console.log("something else...")
          break;
      }

      await delay(delayTimeShort)
    }

  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function doLiveExamOnly(){
  try{
    await delay(delayTimeStartExam)
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function changeQuestion(questionNum){
  try{
    await delay(delayTimeShort)
    var strNum = String(questionNum);
    
    const button = await driver.findElement(webdriver.By.id(strNum)) //Or put '2' for the 2nd question
    await delay(delayTimeShort)
    button.click()

    console.log("Changed to question " + strNum)
    await delay(delayTimeLong)
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function writeOnBlankEditorsFirst(){
  try{
    await delay(delayTimeShort)
    
      for (let x = 1; x <= 7; x++) {
        let editor1 = await driver.findElement(webdriver.By.css(`.class-for-question-${x} .ql-editor`)) //Write on the blank
        await delay(delayTimeShort)
        editor1.sendKeys("\n\n" + getRandomQuote() + "\n\n")
        await delay(delayTimeShort)
        changeQuestion(x)
        await delay(delayTimeShort)
      }
    
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function clickSavebutton(){
  try{
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('save-btn')).click()
    console.log("Clicked Save button")
    
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function clickDarkmodebutton(){
  try{
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('header-container')).click()
    await delay(delayTimeShort)
    const btnDark = await driver.findElement(webdriver.By.id('btn-darkmode'))
    btnDark.click()
    console.log("Clicked Darkmode button")
    
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function clickBoldStylebutton(){
  try{
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('ql-toolbar ql-snow')).click()
    console.log("Clicked the Toolbar")

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('ql-bold')).click()
    console.log("Clicked Bold style button")
    
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function clickItalicStylebutton(){
  try{
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('ql-toolbar ql-snow')).click()
    console.log("Clicked the Toolbar")

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('ql-italic')).click()
    console.log("Clicked Italic style button")
    
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function clickUnderlineStylebutton(){
  try{
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('ql-toolbar ql-snow')).click()
    console.log("Clicked the Toolbar")

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('ql-underline')).click()
    console.log("Clicked Underline style button")
    
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function toggleShortcutsbutton(){
  try{
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('btn-shortcut')).click()
    console.log("Opened Shortcuts popup")
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('btn-shortcut')).click()
    console.log("Closed Shortcuts popup")
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function toggleTakenotebutton(){
  try{
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('takenote')).click()
    console.log("Opened Takenote popup")
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('takenote')).click()
    console.log("Closed Takenote popup")
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function toggleSessionInfobutton(){
  try{
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('header-container')).click()
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('session-info-btn')).click()
    console.log("Opened Session Info popup")
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('message-ok-btn')).click()
    console.log("Closed Session Info popup")
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function finishExam(){
  try{
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('btn btn-finish btn-finish-top intro-step-finish')).click()
    console.log('Clicked Finish button')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('checkmark')).click()
    console.log('Checked the confirm checkbox')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('warning-ok-btn')).click()
    console.log('Clicked Finish Session button')

    await delay(delayTimeLong)
    await driver.findElement(webdriver.By.id('img-checkbox')).click()
    console.log('Checked the i have read checkbox')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('finish-exam-btn')).click()
    console.log('Clicked back to main menu button')
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function finishFinalExam(){
  try{
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('btn btn-finish btn-finish-top intro-step-finish')).click()
    console.log('Clicked Finish button')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('checkmark')).click()
    console.log('Checked the confirm checkbox')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('warning-ok-btn')).click()
    console.log('Clicked Finish Session button')

    await delay(delayTimeLong)
    await driver.findElement(webdriver.By.id('img-checkbox')).click()
    console.log('Checked the i have read checkbox')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('finish-exam-btn')).click()
    console.log('Clicked back to main menu button')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('exit-application-btn')).click()
    console.log('Clicked Exit Application button')

  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function uploadPartial(){
  try{
    await delay(delayTimeLong)
    await driver.findElement(webdriver.By.id('upload-live-btn')).click()
    console.log('Clicked Upload button')

    await delay(delayTimeLong)
    await driver.findElement(webdriver.By.id('upload-menu-btn')).click()
    await delay(delayTimeStartExam)
    console.log('User partially uploaded!')
    await driver.findElement(webdriver.By.id('back-menu-btn')).click()
    console.log('Clicked Back to Main Menu button')
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function uploadFull(){
  try{
    await delay(delayTimeLong)
    await driver.findElement(webdriver.By.id('upload-menu-btn')).click()
    console.log('Clicked Upload button')
    //User completes upload
    await delay(delayTimeStartExam)
    await driver.findElement(webdriver.By.id('back-menu-btn')).click()
    console.log('Clicked Back to Main Menu button')
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function exitApp(){
  try{
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('close-btn')).click()
    console.log('Clicked Exit App button')

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.className('btn btn-popup btn-darkgreen')).click()
    console.log('Clicked Ok button and exiting the app!')
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function lockAndBack(){
  try{
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('lock-btn')).click()
    console.log('Locked exam and sleeping for ' + String(delayTimeLong) + 'secs...')
    await delay(delayTimeLong)
    await driver.findElement(webdriver.By.id('password-ok-btn')).click()
    console.log('Woke up and got back to exam!')
    
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function setTimerandWait(){
  try{
    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('set-timer-btn')).click()

    await delay(delayTimeShort)
    await driver.findElement(webdriver.By.id('set-timer-btn')).click()
    // console.log('Setting the timer for ' + String(delayTimeOne) + 'secs...')
    
    // await driver.findElement(webdriver.By.id('set-timer-input')).sendKeys("")
    // await delay(delayTimeShort)
    // await driver.findElement(webdriver.By.id('set-timer-input')).sendKeys(String(delayTimeOne))
    // await delay(delayTimeShort)

    // await driver.findElement(webdriver.By.id('timer-start-btn')).click()
    // await delay(delayTimeShort)
    // console.log('Started the timer!')
    // await delay(delayAMinute) //Wait a minute for the timer to finish
    
    // await driver.findElement(webdriver.By.id('remaintime-ok-btn')).click()
    console.log('Time is up!')
    await delay(delayTimeShort)
    
    
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function testSimple(){ //Reset, Login, Exit
  try{
    await resetExam()
    console.log('session pass is ' + sessionPasswords[0])
    console.log('There are ' + totalSessionCount + ' sessions in this exam.')
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

async function testFullExam(sessionCount){ 
  try{
    await resetExam()
    await logintoApp(state)
    await autocompleteTrial()
    await activateAdminmode()

    for (let i = 0; i < sessionCount - 1; i++) {
      await startLiveExam(sessionPasswords[i]) //Do first sessions
      //***********************
      // await doLiveExam(examDuration, questionCounts[i]) //This is the original method for the live exam editor
      await doLiveExamOnly() //This method only idles in the editor
      //***********************
      await finishExam()
      // await uploadPartial()
    }

    await startLiveExam(finalSessionPass) //Do the final session
    //***********************
    // await doLiveExam(examDuration, finalSessionQuestionCount)
    await doLiveExamOnly()
    //***********************

    await finishFinalExam()


  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}


//Select which functions to run here
async function mainTest(){
  try{
    console.log('Test Start: ', new Date())

    await testFullExam(totalSessionCount)

    console.log('Test End: ', new Date())
  }
  catch(err){
    console.log('Test ERR: ', err)
  }

}

mainTest()


