exports.createTextField = function () {
    var options = arguments[0] || {},
        defaults = {
            borderColor: "#d6d6d6",
            borderWidth: 0.5,
            color: "#000000",
            delay: 100,
            duration: 300,
            height: 18,
            hintTextColor: "#c4c4c4",
            hintTextFocusColor: "#0000ff",
            hintTextFont: {
                fontSize: 10,
                fontWeight: 'bold'
            },
            font: {
                fontFamily: "HelveticaNeue-Light",
                fontSize: 15
            },
            width: Ti.UI.FILL
        };



    // Floating label animations
    var fadeIn = Ti.UI.createAnimation({
        delay: defaults.delay,
        duration: defaults.duration,
        opacity: 1.0
    });
    var slideDown = Ti.UI.createAnimation({
        duration: defaults.duration,
        top: (options.hintTextFont && options.hintTextFont.fontSize) ?
             (options.hintTextFont.fontSize + 4) :
             (defaults.hintTextFont.fontSize + 4)
    });

    var transitionToFocusColor = Ti.UI.createAnimation({
        color: options.hintTextFocusColor || defaults.hintTextFocusColor,
        duration: defaults.duration
    });
    var transitionToBlurColor = Ti.UI.createAnimation({
        color: options.hintTextColor || defaults.hintTextColor,
        duration: defaults.duration
    });

    // Text field animations
    var fadeOut = Ti.UI.createAnimation({
        duration: defaults.duration,
        opacity: 0.0
    });
    var slideUp = Ti.UI.createAnimation({
        delay: defaults.delay,
        duration: defaults.duration,
        top: 0
    });



    // Make sure that a hintText key value was passed.
    if (options.hintText === undefined && typeof options.hintText === "string") {
        throw "FloatingLabelFields module requires a 'hintText' key of type string to be passed.";
    }



    // Create the UI elements
    var container = Ti.UI.createView({
        borderColor: options.borderColor || defaults.borderColor,
        borderWidth: options.borderWidth || defaults.borderWidth,
        height: Ti.UI.SIZE,
        width: options.width || defaults.width
    });

    // Only enforce positioning properties if they were passed as options
    if (options.left) {
        container.left = options.left;
    }

    if (options.top) {
        container.top = options.top;
    }

    var floatingLabel = Ti.UI.createLabel({
        color: options.hintTextColor || defaults.hintTextColor,
        font: options.hintTextFont || defaults.hintTextFont,
        left: 5,
        opacity: 0,
        text: options.hintText,
        textAlign: 'left',
        top: 3
    });
    var textField = Ti.UI.createTextField({
        borderWidth: 0,
        font: options.font || defaults.font,
        hintText: options.hintText,
        left: 5,
        top: 0
    });
    var padding = Ti.UI.createView({
        height: 5,
        width: Ti.UI.SIZE
    });



    container.add(floatingLabel);
    container.add(textField);
    container.add(padding);



    // Basically, pass the click event onto the textfield
    container.addEventListener('click', function () {
        textField.focus();
    });

    // Toggle the visibility of the floating label depending on the textfield input
    textField.addEventListener('change', function (e) {
        if (e.value.length === 0) {
            floatingLabel.animate(fadeOut);
            textField.animate(slideUp);
        } else {
            floatingLabel.animate(fadeIn);
            textField.animate(slideDown);
        }
    });

    // Toggle the color of the floating label depending on the focus state of the text field
    textField.addEventListener('focus', function () {
        floatingLabel.animate(transitionToFocusColor);
    });

    textField.addEventListener('blur', function () {
        floatingLabel.animate(transitionToBlurColor);
    });



    // Store a reference to the textfield in the container object
    container.textField = textField;



    // Return the parent container
    return container;
};

exports.createTextArea = function () {
    var options = arguments[0] || {};
};