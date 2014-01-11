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
    hintText: 'First Name',
    left: 10,
    top: 10,
    width: 300
});

var lastNameField = FloatingLabelFields.createTextField({
    hintText: 'Last Name',
    left: 10,
    top: 10,
    width: 300
});

var emailField = FloatingLabelFields.createTextField({
    hintText: 'Email Address',
    left: 10,
    top: 10,
    width: 300
});

var phoneNumberField = FloatingLabelFields.createTextField({
    hintText: 'Phone Number',
    left: 10,
    top: 10,
    width: 300
});



mainView.add(firstNameField);
mainView.add(lastNameField);
mainView.add(emailField);
mainView.add(phoneNumberField);

mainWindow.add(mainView);



var navWindow = Ti.UI.iOS.createNavigationWindow({
    window: mainWindow
});
navWindow.open();