(function ($) {

    var container = $('<div id="tattle_container">').appendTo('body');

    $.fn.tattle = function(message, options) {

        var defaults = {
            message_class : '',
            duration : 5000
        };

        var settings = $.extend(true, defaults, options);

        $(container).find(".tattle_message").each(function() {
            close_tattle(this, 1000);
        });
        var element = $('<div class="tattle_message ' + settings.message_class + '"><span class="tattle_close"></span>' + message + '</div>')
            .hide()
            .click(function() { close_tattle(element); })
            .prependTo(container).slideDown(200, function() {
                if (settings.duration) {
                    setTimeout(function() { close_tattle(element); }, settings.duration);
                }
            });
        return element;
    };

    function close_tattle(element, duration) {
        var duration = duration || 200;
        if ( ! $(element).hasClass('tattle_closing')) {
            $(element).addClass('tattle_closing');
            $(element).fadeOut(duration, function() { $(element).remove(); });
        }
    }

})(jQuery);

function tattle(message, options) {
    return jQuery.fn.tattle(message, options);
}