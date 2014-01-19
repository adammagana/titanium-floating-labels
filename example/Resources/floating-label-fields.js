var defaults = {
    borderColor: "#d6d6d6",
    borderWidth: 0.5,
    bottom: 0,
    color: "#000000",
    delay: 100,
    duration: 200,
    height: 41,
    hintText: "Textfield",
    hintTextColor: "#c4c4c4",
    hintTextFocusColor: "#426bf2",
    hintTextFont: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    font: {
        fontFamily: "HelveticaNeue-Light",
        fontSize: 15
    },
    left: null,
    right: null,
    top: null,
    width: Ti.UI.FILL
};

function pickOutExtraOptions(options) {
    var extraOptions = {};

    for (var option in options) {
        if (defaults[option] === undefined) {
            extraOptions[option] = options[option];
        }
    }

    return extraOptions;
}



exports.createTextField = function () {
    var options = arguments[0] || {};



    // Floating label animations
    var fadeIn = Ti.UI.createAnimation({
        delay: defaults.delay || options.delay,
        duration: defaults.duration || options.duration,
        opacity: 1.0
    });
    var fadeOut = Ti.UI.createAnimation({
        duration: defaults.duration || options.duration,
        opacity: 0.0
    });

    var transitionToFocusColor = Ti.UI.createAnimation({
        color: options.hintTextFocusColor || defaults.hintTextFocusColor,
        duration: defaults.duration
    });
    var transitionToBlurColor = Ti.UI.createAnimation({
        color: options.hintTextColor || defaults.hintTextColor,
        duration: defaults.duration
    });



    // Make sure that a hintText key value was passed.
    if (options.hintText === undefined && typeof options.hintText === "string") {
        throw {
            name: "Missing Required Argument",
            message: "FloatingLabelFields module requires a `hintText` keyword argument of type string."
        };
    }



    // Create the UI elements
    var container = Ti.UI.createView({
        borderColor: options.borderColor || defaults.borderColor,
        borderWidth: options.borderWidth || defaults.borderWidth,
        height: options.height || defaults.height,
        layout: 'vertical',
        width: options.width || defaults.width
    });

    // Only enforce positioning properties on the container if they were passed as options
    if (options.left) {
        container.left = options.left;
    }

    if (options.right) {
        container.right = options.right;
    }

    if (options.top) {
        container.top = options.top;
    }

    if (options.bottom) {
        container.bottom = options.bottom;
    }

    var floatingLabel = Ti.UI.createLabel({
        color: options.hintTextColor || defaults.hintTextColor,
        font: options.hintTextFont || defaults.hintTextFont,
        height: (options.hintTextFont && options.hintTextFont.fontSize) ? (options.hintTextFont.fontSize + 3) : (defaults.hintTextFont.fontSize + 3),
        left: 7,
        minimumFontSize: (options.hintTextFont && options.hintTextFont.fontSize) ? (options.hintTextFont.fontSize) : (defaults.hintTextFont.fontSize),
        opacity: 0,
        text: options.hintText,
        textAlign: 'left',
        top: 5
    });
    var textField = Ti.UI.createTextField({
        borderWidth: 0,
        font: options.font || defaults.font,
        height: (options.font && options.font.fontSize) ? (options.font.fontSize + 3) : (defaults.font.fontSize + 3),
        hintText: options.hintText,
        left: 7,
        top: 0
    });
    var padding = Ti.UI.createView({
        height: 5,
        width: Ti.UI.SIZE
    });



    // Apply any ancillary options/properties to the textfield
    textField.applyProperties(pickOutExtraOptions(options));



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
        } else {
            floatingLabel.animate(fadeIn);
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