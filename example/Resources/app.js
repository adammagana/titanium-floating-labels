Ti.UI.setBackgroundColor('#ffffff');

var FloatingLabelFields = require('floating-label-fields');

var mainWindow = Ti.UI.createWindow({
    title: 'Floating Labels'
});

var mainView = Ti.UI.createView({
    layout: 'vertical',
    width: '100%'
});

var firstNameField = FloatingLabelFields.createTextField({
    autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,
    autocorrect: false,
    hintText: 'First Name',
    left: 10,
    top: 10,
    width: 300
});

var lastNameField = FloatingLabelFields.createTextField({
    autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,
    autocorrect: false,
    hintText: 'Last Name',
    left: 10,
    top: 10,
    width: 300
});

var emailField = FloatingLabelFields.createTextField({
    autocorrect: false,
    hintText: 'Email Address',
    left: 10,
    top: 10,
    width: 300
});

var phoneNumberField = FloatingLabelFields.createTextField({
    hintText: 'Phone Number',
    keyboardType: Ti.UI.KEYBOARD_PHONE_PAD,
    left: 10,
    top: 10,
    width: 300
});



mainView.add(firstNameField);
mainView.add(lastNameField);
mainView.add(emailField);
mainView.add(phoneNumberField);

mainWindow.add(mainView);



if (Ti.Platform.osname === 'iphone') {
    var navWindow = Ti.UI.iOS.createNavigationWindow({
        window: mainWindow
    });
    navWindow.open();
} else if (Ti.Platform.osname === 'android') {
    mainWindow.open();
}