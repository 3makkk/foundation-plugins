$.fn.imagePreview = function (user_options) {

    'use strict';
    var defaults = {
        imageWrapper: '.preview',
        after: null
    };
    var options = $.extend(defaults, user_options);
    this.each(function () {


        var fileInputId = $(this).data('id');
        var concreteImageWrapper = $('.preview.' + fileInputId);

        var $this = $(this);

        var createImage = function (e) {
            var img = $(document.createElement('img'));
            // Bild mittels Data-URL laden
            $(img).attr('src', e.target.result);
            $(img).attr('width', '100%');

            $(concreteImageWrapper).html(img);

            if (options.after != null) {
                options.after(e.target.result);
            }
        };

        var preview = function () {
            // Prüfen ob die File API vorhanden ist
            if (this.files !== 'undefined' && typeof FileReader !== 'undefined') {

                // Schleife über alle gewählten Dateien
                for (var f = 0; f < this.files.length; f++) {
                    var file = this.files[f];
                    var reader = new FileReader();

                    // Prüfen, ob auch wirklich ein Bild gewählt
                    // wurde
                    if (!/image\/(jpeg|jpg|png|gif)/.test(file.type)) {
                        alert('Dateityp "' + file.type + '" wird nicht unterstützt.');
                        continue;
                    }


                    // EventListener hinzufügen
                    $(reader).load(createImage);

                    // Einlesen der Datei beginnen
                    reader.readAsDataURL(file);
                }
            }
        };

        $this.change(preview);
    });
    return this;
};

/**
 * Replace Input Element with a styleable Button - Path Element
 * @returns {fn}
 */
$.fn.modernizeFileInput = function () {

    'use strict';
    // Wrapper to Hide FileInput
    var wrapper = $('<div/>').css({
        height: 0,
        width: 0,
        'overflow': 'hidden'
    });

    this.each(function () {

        // Detect FileInput and get the id to detect dependent elements
        var fileInput = $(this);
        var fileInputId = fileInput.data('id');

        console.log(fileInputId);

        // Get Dependent Path and Button Element
        var filePathElement = $('.path.' + fileInputId);
        var fileButton = $('.button.' + fileInputId);

        // Hide InputElement
        fileInput.wrap(wrapper);

        // Show modernElements
        fileButton.show();
        filePathElement.show();

        // Write on change the current File Path into new Path Element
        fileInput.change(function () {
            var strstr = fileInput.val().split('\\');
            var name = strstr[strstr.length - 1];
            $(filePathElement).attr('value', name);
        });

        // Open onClick the file button InputElement "choose file" dialog
        $(fileButton).click(function (e) {
            fileInput.click();
            e.preventDefault();
        }).show();
    });
    return this;
};