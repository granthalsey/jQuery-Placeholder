(function ($) {
    var default_options = {
        labelClass: 'placeholder'
    };
    var ph = "PLACEHOLDER-INPUT";
    var phl = "PLACEHOLDER-LABEL";
    var boundEvents = false;
    //check for browser support for placeholder attribute
    var input = document.createElement("input");
    if('placeholder' in input) {
        $.fn.placeholder = $.fn.unplaceholder = function () { }; //empty function
        delete input;
        return;
    };
    delete input;
    $.fn.placeholder = function (options) {
        bindEvents();
        var opts = $.extend(default_options, options)
        this.each(function () {
            var rnd = Math.random().toString(32).replace(/\./, ''),
                input = $(this),
                label = $('<label style="display:none; position:absolute; z-index:100; "></label>');
            if(!input.attr('placeholder') || input.data(ph) === ph) return;
            //make sure the input tag has an ID assigned, if not, assign one.
            if(!input.attr('id')) input.attr('id') = 'input_' + rnd;
            label.attr('id', input.attr('id') + "_placeholder").data(ph, '#' + input.attr('id')) //reference to the input tag
            .attr('for', input.attr('id')).addClass(opts.labelClass).addClass(opts.labelClass + '-for-' + this.tagName.toLowerCase()) //ex: watermark-for-textarea
            .addClass(phl).text(input.attr('placeholder'));
            input.data(phl, '#' + label.attr('id')) //set a reference to the label
            .data(ph, ph) //set that the field is watermarked
            .addClass(ph) //add the watermark class
            .before(label); //add the label field to the page
            itemIn.call(this);
            itemOut.call(this);
        });
    };
    $.fn.unplaceholder = function () {
        this.each(function () {
            var input = $(this),
                label = $(input.data(phl));
            if(input.data(ph) !== ph) return;
            label.remove();
            input.removeData(ph).removeData(phl).removeClass(ph);
        });
    };

    function bindEvents() {
        if(boundEvents) return;
        $('.' + ph).live('click', itemIn).live('focusin', itemIn).live('change', itemIn).live('focusout', itemOut);
        bound = true;
        boundEvents = true;
    };

    function itemIn() {
        var input = $(this),
            label = $(input.data(phl));
        label.css('display', 'none');
    };

    function itemOut() {
        var that = this;
        setTimeout(function () {
            var input = $(that);
            $(input.data(phl)).css('display', !!input.val() ? 'none' : 'inline');
        }, 200);
    };
} (jQuery));
