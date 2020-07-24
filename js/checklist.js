/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {
    
    /*------------------- Open & close checklist items -------------------*/
    $(".checklist-item-title").on("click", function () {
        $(this).next('.checklist-sub-item-wrapper').slideToggle(400);

        if ($(this).closest('.checklist-item').hasClass('open')) {
            
            $(this).closest('.checklist-item').removeClass('open');
            
            
            // Close sub-items when close step
            if ( $(this).closest('.checklist-item').find('.checklist-sub-item').hasClass('open') ) {
               
                $(this).closest('.checklist-item').find('.checklist-sub-item.open').find('.content-wrapper').slideToggle(400);
                $(this).closest('.checklist-item').find('.checklist-sub-item').removeClass('open');
            }
            
        } else {
            $(this).closest('.checklist-item').addClass('open');
        }
         
     });
    
    /*------------------- Close checklist step button -------------------*/
    $(' .checklist-close-step').on('click', function(){
        $(this).parents('.checklist-sub-item-wrapper').hide();
        $(this).parents('.checklist-item').removeClass('open');
    });
    
    
    /*------------------- Open & close sub-checklist items -------------------*/
     $(".checklist-sub-item-title").on("click", function () {

        $(this).next('.content-wrapper').slideToggle(400);
         
        if ($(this).closest('.checklist-sub-item').hasClass('open')) {
            $(this).closest('.checklist-sub-item').removeClass('open');
        } else {
            $(this).closest('.checklist-sub-item').addClass('open');
        }
         
     });
    
    /*------------------- Reset checklist items -------------------*/
    $('#clear-progress').on('click', function(){
        $('.checklist-sub-item').removeClass('open').removeClass('done');
        $('.checklist-item').removeClass('open').removeClass('item-done');
        $('.checklist-sub-item-wrapper').hide();
    });
    
    
    /*------------------- Checkbox functionality -------------------*/
    $('.checklist-item-checkbox').on('click', function(){
        if ($(this).parents('.checklist-sub-item.must-do').hasClass('done')) {
            $(this).parents('.checklist-sub-item.must-do').removeClass('done');
        } else {
            $(this).parents('.checklist-sub-item.must-do').addClass('done');
        }
        
        $(this).parents('.checklist-item').find('.checklist-sub-item.must-do').each(function(){
            
            var item_completion = false;
            if ($(this).hasClass('done')) {
                item_completion = true;
            } else {
                item_completion = false;
                $(this).parents('.checklist-item').removeClass('item-done');
                return false;
            }
            if (item_completion === true) {
                $(this).parents('.checklist-item').addClass('item-done');
            }
            
        });
    });
    
    
    
    
    /*------------------- Email button functionality -------------------*/


    // Get positions for button based on checklist and footer positions.
    if ($('.checklist-wrapper').hasClass('new')) {   
        var wrapper_pos = $('.checklist-wrapper').offset(),
            wrapper_top = wrapper_pos.top,
            wrapper_left = wrapper_pos.left,
            wrapper_width = $('.checklist-wrapper').outerWidth(),
            container_left = wrapper_width + 32 + wrapper_left,
            footer_pos = $('footer').offset(),
            footer_top =footer_pos.top,
            container_height = $('.side-bar-container').outerHeight(),
            container_bottom_pos = footer_top - container_height - 64;
        
         var mq = window.matchMedia( "(min-width: 992px)" );
    }
    

    // CHANGE ON RESIZE reset positioning variables and reposition element

    $( window ).resize(function() {

        if ($('.checklist-wrapper').hasClass('new')) {
            wrapper_pos = $('.checklist-wrapper').offset();
            wrapper_top = wrapper_pos.top;
            wrapper_left = wrapper_pos.left;
            wrapper_width = $('.checklist-wrapper').outerWidth();
            container_left = wrapper_width + 32 + wrapper_left;
            footer_pos = $('footer').offset();
            footer_top =footer_pos.top;
            container_height = $('.side-bar-container').outerHeight();
            container_bottom_pos = footer_top - container_height - 64;
        }

        if(mq.matches) { // Wider than 991px - Position BUTTON

             
            if ($(window).scrollTop() > (wrapper_top)) {
                
                
                if ($(window).scrollTop() < container_bottom_pos) {
                                    
                    $('.side-bar-container').css({
                        'top': '32px',
                        'bottom': 'auto',
                        'left': container_left,
                        'right':'auto',
                        'position': 'fixed',
                     });

                }
                else if ($(window).scrollTop() >= container_bottom_pos){
                        
                    $('.side-bar-container').css({
                        'top': 'auto',
                        'bottom': '0',
                        'left': 'auto',
                        'right':'-280px',
                        'position': 'absolute',
                     });    
                }
                    
            } 
            else if ($(window).scrollTop() <= (wrapper_top)) {

               $('.side-bar-container').css({
                    'right':'-280px',
                    'left':'auto',
                    'top': '32px',
                    'bottom': 'auto',
                    'position':'absolute',
               });

            } 
            
            
        }
        
    }); //End Resize


    // CHANGE ON SCROLL - using matchMedia for media queries
    $(window).scroll(function(){
        
        // Reset button /footer variables at start of scroll
        footer_pos = $('footer').offset();
        footer_top =footer_pos.top;
        container_height = $('.side-bar-container').outerHeight();
        container_bottom_pos = footer_top - container_height - 64;
        
        if(mq.matches) { // Wider than 991px - Position BUTTON

             
            if ($(window).scrollTop() > (wrapper_top)) {
                
                
                if ($(window).scrollTop() < container_bottom_pos) {
                                    
                    $('.side-bar-container').css({
                        'top': '32px',
                        'bottom': 'auto',
                        'left': container_left,
                        'right':'auto',
                        'position': 'fixed',
                     });

                }
                else if ($(window).scrollTop() >= container_bottom_pos){
                        
                    $('.side-bar-container').css({
                        'top': 'auto',
                        'bottom': '0',
                        'left': 'auto',
                        'right':'-280px',
                        'position': 'absolute',
                     });    
                }
                    
            } 
            else if ($(window).scrollTop() <= (wrapper_top)) {

               $('.side-bar-container').css({
                    'right':'-280px',
                    'left':'auto',
                    'top': '32px',
                    'bottom': 'auto',
                    'position':'absolute',
               });

            } 
            
            
        }
        
        // Fix position if scroll was too fast
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
        
            if (mq.matches) {
               
              if ($(window).scrollTop() > (wrapper_top)) {
                    
                    $('#email-btn-wrapper').css({
                        'bottom': '32px',
                        'top': 'auto',
                        'right': '30px',
                        'position': 'fixed'
                    });
                }  else if ($(window).scrollTop() <= (wrapper_top)) {

                     $('#email-btn-wrapper').css({
                        'top': '32px',
                        'bottom': 'auto',
                        'right': '0',
                        'position': 'absolute'
                    });
                }
                
            }
        },  200));
    });

    

    
    /*------------------- Modal functionality -------------------*/
    // Open modals
    $('#email-btn-wrapper').on('click', function(){
        $('.modal-email-form').addClass('open');
    });
    $('#email-btn-wrapper-mobile').on('click', function(){
        $('.modal-email-form').addClass('open');
    });
    $('#email-btn-wrapper-mobile-chat').on('click', function(){
        $('.modal-email-form').addClass('open');
    });
    $('.email-btn-wrapper-2').on('click', function(){
        $('.modal-email-form').addClass('open');
    });
    $('#send-email .combo-button').on('click', function(){
        $('.modal-email-form').removeClass('open');
        $('.modal-success-message').addClass('open');
    });
    
    // Close modals on close btn click
    $('.modal-close').on('click', function(){
        $('.modal').removeClass('open');
    });
    
    // Close modals on click outside modal   
    $('.modal-overlay').on('click', function(){   
        $('.modal').removeClass('open');
        $('#copy-link-btn').removeClass('copied').text('Copy my link');
    });

    // Select link on input click
    $('#progress-link').on('click', function(){
        $(this).focus();
        $(this).select();
    });
    $('#copy-link-btn').on('click', function(){
        $(this).addClass('copied').text('Link copied');
    });
    
}); // END doc ready

