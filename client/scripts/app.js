/*
    Directive by HTML5 UP
    html5up.net | @n33co
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
'use strict';
(function($) {

    skel.init({
        reset: 'full',
        breakpoints: {
            global:     { range: '*', href: '/styles/style.css', containers: '51em', grid: { gutters: 30 } },
            wide:       { range: '-1680', href: '/styles/style-wide.css' },
            normal:     { range: '-1280', href: '/styles/style-normal.css', containers: '48em' },
            narrow:     { range: '-980', href: '/styles/style-narrow.css', containers: '95%', grid: { gutters: 30 } },
            narrower:   { range: '-840', href: '/styles/style-narrower.css', containers: '95%!', grid: { zoom: 2, gutters: 20 } },
            mobile:     { range: '-736', href: '/styles/style-mobile.css', containers: '90%!', grid: { gutters: 20 }, viewport: { scalable: false } },
            mobilep:    { range: '-480', href: '/styles/style-mobilep.css', containers: '100%!', grid: { zoom: 3 } }
        }
    });

    $(function() {

        var $window = $(window),
            $body = $('body');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');
        
        $window.on('load', function() {
            $body.removeClass('is-loading');
        });

        $('.scrolly').scrolly();
    });

})(jQuery);

$(function(){

    $('.close').click(function(){
        $('.notification.error').slideUp(300);
        $('.notification.success').slideUp(300);
        return false;
    });
    // Submitting forms
    $('#contact_us').on('submit', function(){
        var error = $('.notification.error');
        var success = $('.notification.success');
        success.slideUp(300);
        error.slideUp(300);
        var $form = $(this);
        var email = $('#email').val();
        if (!isValidateEmail(email)) {
            error.slideDown(300);
            return false;
        }

        sendMail('New Message: '+$('#subject').val(), 
            'New message from contact us.\n\nFrom: ' + $('#name').val() + '\nEmail: '+ email + '\n\nContent:\n\n'+$('#message').val(),
            function(data){
                success.slideDown(300);
                $form[0].reset();
            },
            function(err){
                error.slideDown(300);
            }
        );
        return false;
    });

    // Sending emails using mandrill
    function sendMail(subject, body, success, error)
    {
        var mailer = new mandrill.Mandrill('LFs_KT0LlJ_4MncIOq_bvw');
        var message = {
            'message': {
                'text': body+'\n\n Note: This is an automated email send by getparkave.com',
                'subject': subject,
                'from_email': 'info@getparkave.com',
                'from_name': 'Park Ave Landing',
                'to': [{'email': 'info@getparkave.com'}]
            }
        };
        mailer.call('/messages/send', message, success, error);
    }
    // Validating an email address
    function isValidateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});