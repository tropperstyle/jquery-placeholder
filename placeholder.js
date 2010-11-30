/*!
 * jQuery Placeholder
 * https://github.com/tropperstyle/jquery-placeholder
 *
 * Copyright, Jonathan Tropper.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * MIT-LICENSE.txt
 * GPL-LICENSE.txt
 */
 
(function($) {
    $.widget('ui.placeholder', {
        _create: function() {
            if ($.ui.placeholder.browserSupport) { return false; }
            
            var base = this;
            
            this.placeholder = $('<label/>', {
                text: this.element.attr('placeholder'),
                'class': 'placeholder',
                css: {
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    cursor: 'text',
                    display: 'block',
                    position: 'absolute',
                    color: '#999',
                    lineHeight: this.element.css('line-height'),
                    fontFamily: this.element.css('font-family'),
                    fontSize: this.element.css('font-size'),
                    fontWeight: this.element.css('font-weight')
                }
            });
                        
            this.wrapper = $('<span/>', {
                'class': 'ui-placeholder',
                css: {
                    'position': 'relative',
                    'display': this.element.css('display') == 'block' ? 'block' : 'inline-block',
                    'float': this.element.css('float'),
                    'height': this.element.outerHeight(),
                    'marginTop': this.element.css('margin-top'),
                    'marginRight': this.element.css('margin-right'),
                    'marginBottom': this.element.css('margin-bottom'),
                    'marginLeft': this.element.css('margin-left')
                }
            });
            this.wrapper.insertBefore(this.element);
            
            this.element.add(this.placeholder).appendTo(this.wrapper);
            this.element.css('margin', 0);
            
            this.placeholder.bind('click', function(e) {
                base.element.trigger('focus');
            });
            
            this.element.bind('focus', function() {
                base.placeholder.hide();
            });
            
            this.element.bind('blur', function() {
                if (this.value.match(/^\s*$/)) {
                    base.element.val('');
                    base.placeholder.show();
                }
            });
            
            this.placeholder.hide();
            this.element.trigger('blur');
        },
        _init: function() {
            if ($.ui.placeholder.browserSupport) { return false; }
            
            var topOffset = parseInt(this.element.css('border-top-width'), 10);
            this.placeholder.css({
                width: this.element.width(),
                top: ($.browser.msie ? topOffset : 0) + topOffset,
                left: this.element.css('border-left-width'),
                paddingTop: this.element.css('padding-top'),
                paddingRight: this.element.css('padding-right'),
                paddingBottom: this.element.css('padding-bottom'),
                paddingLeft: this.element.css('padding-left')
            });
        },
        destroy: function() {
            $.Widget.prototype.destroy.apply(this, arguments);
        }
    });

    $.extend($.ui.placeholder, {
        browserSupport: (function() {
            var i = document.createElement('input');
            return ('placeholder' in i);
        })()
    });
})(jQuery);
