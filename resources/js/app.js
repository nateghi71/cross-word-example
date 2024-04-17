import './bootstrap';

import jQuery from 'jquery'
window.$ = jQuery

import 'bootstrap'

/*
Title: Cozeit More plugin by Yasir Atabani
Documentation: na
Author: Yasir O. Atabani
Website: http://www.cozeit.com
Twitter: @yatabani

MIT License, https://github.com/cozeit/czMore/blob/master/LICENSE.md
*/
(function ($, undefined) {
    // "use strict";

    $.fn.czMore = function (options) {

        //Set defauls for the control
        var defaults = {
            max: 50,
            min: 0,
            onLoad: null,
            onAdd: null,
            onDelete: null,
            styleOverride: false,
            countFieldPrefix: '_czMore_txtCount',
        };
        //Update unset options with defaults if needed
        var options = $.extend(defaults, options);
        $(this).bind("onAdd", function (event, data) {
            options.onAdd.call(event, data);
        });
        $(this).bind("onLoad", function (event, data) {
            options.onLoad.call(event, data);
        });
        $(this).bind("onDelete", function (event, data) {
            options.onDelete.call(event, data);
        });

        //Executing functionality on all selected elements
        return this.each(function () {
            var obj = $(this);
            var i = recordsetCount();
            var divPlus = '<div id="btnPlus" class="btnPlus"/>';
            var count = '<input id="' + this.id + options.countFieldPrefix + '" name="' + this.id + options.countFieldPrefix + '" type="hidden" value="0" size="5" />';

            obj.before(count);
            var recordset = obj.children("#first");
            obj.after(divPlus);
            var set = recordset.children(".recordset").children().first();
            var btnPlus = obj.siblings("#btnPlus");

            if(!options.styleOverride) {
                btnPlus.append('<i class="mdi mdi-plus"></i>');
                btnPlus.css({
                    'float': 'right',
                    'color': 'green',
                    // 'border': '0px',
                    // 'background-image': 'url("../../img/add.png")',
                    // 'background-position': 'center center',
                    // 'background-repeat': 'no-repeat',
                    'height': '25px',
                    'width': '25px',
                    'cursor': 'pointer',
                });
            }

            if (recordset.length) {
                obj.siblings("#btnPlus").click(function () {
                    if (isMaxRecordset()){
                        return false;
                    }
                    var i = recordsetCount();
                    var item = recordset.clone().html();
                    i++;
                    item = item.replace(/\[([0-9]\d{0})\]/g, "[" + i + "]");
                    item = item.replace(/\_([0-9]\d{0})\_/g, "_" + i + "_");
                    //$(element).html(item);
                    //item = $(item).children().first();
                    //item = $(item).parent();

                    obj.append(item);
                    loadMinus(obj.children().last());
                    minusClick(obj.children().last());
                    if (options.onAdd != null) {
                        obj.trigger("onAdd", i);
                    }

                    obj.siblings("input[name$='" + options.countFieldPrefix + "']").val(i);
                    return false;
                });
                recordset.remove();
                for (var j = 0; j <= i; j++) {
                    loadMinus(obj.children()[j]);
                    minusClick(obj.children()[j]);
                    if (options.onAdd != null) {
                        obj.trigger("onAdd", j);
                    }
                }

                if (options.onLoad != null) {
                    obj.trigger("onLoad", i);
                }
                //obj.bind("onAdd", function (event, data) {
                //If you had passed anything in your trigger function, you can grab it using the second parameter in the callback function.
                //});
            }

            function resetNumbering() {
                $(obj).children(".recordset").each(function (index, element) {
                    $(element).find('input:text, input:password, input:file, select, textarea').each(function(){
                        var old_name = this.name;
                        var new_name = old_name.replace(/\_([0-9]\d{0})\_/g, "_" + (index + 1) + "_");
                        this.id = this.name = new_name;
                        //alert(this.name);
                    });
                    index++
                    minusClick(element);
                });
            }

            function loadMinus(recordset) {
                var divMinus = '<div id="btnMinus" class="btnMinus" />';
                $(recordset).children().first().before(divMinus);
                var btnMinus = $(recordset).children("#btnMinus");
                if(!options.styleOverride) {
                    btnMinus.append('<i class="mdi mdi-minus"></i>');
                    btnMinus.css({
                        'float': 'right',
                        // 'border': '0px',
                        'color': 'red',
                        // 'background-image': 'url("../../img/remove.png")',
                        // 'background-position': 'center center',
                        // 'background-repeat': 'no-repeat',
                        'height': '25px',
                        'width': '25px',
                        'cursor': 'pointer',
                    });
                }
            }

            function minusClick(recordset) {
                $(recordset).children("#btnMinus").click(function () {
                    var i = recordsetCount();
                    var id = $(recordset).attr("data-id")
                    $(recordset).remove();
                    resetNumbering();
                    obj.siblings("input[name$='" + options.countFieldPrefix + "']").val(obj.children(".recordset").length);
                    i--;
                    if (options.onDelete != null) {
                        if (id != null)
                            obj.trigger("onDelete", id);
                    }
                });
            }

            function recordsetCount(){
                return obj.children(".recordset").length;
            }

            function isMaxRecordset(){
                return recordsetCount() >= options.max;
            }
        });
    };
})(jQuery);

//sidebar
(function($) {
    'use strict';
    $(function() {
        $('[data-toggle="offcanvas"]').on("click", function() {
            $('.sidebar-offcanvas').toggleClass('active')
        });
        var body = $('body');
        var contentWrapper = $('.content-wrapper');
        var scroller = $('.container-scroller');
        var footer = $('.footer');
        var sidebar = $('.sidebar');

        //Add active class to nav-link based on url dynamically
        //Active class can be hard coded directly in html file also as required

        function addActiveClass(element) {
            if(current === "allTables"){
                if (element.attr('href').indexOf('allTables') !== -1)
                {
                    element.parents('.nav-item').last().addClass('active');
                }
            }
            else if(current === "solvers"){
                if (element.attr('href').indexOf('solvers') !== -1)
                {
                    element.parents('.nav-item').last().addClass('active');
                }
            }
            else if(current === "create"){
                if (element.attr('href').indexOf('create') !== -1)
                {
                    element.parents('.nav-item').last().addClass('active');
                }
            }
            else if(current === "tables"){
                if (element.attr('href').indexOf('tables') !== -1 && element.attr('href').indexOf('create') === -1)
                {
                    element.parents('.nav-item').last().addClass('active');
                }
            }
        }

        var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
        // console.log(current)
        $('.nav li a', sidebar).each(function() {
            var $this = $(this);
            addActiveClass($this);
        })

        $('.horizontal-menu .nav li a').each(function() {
            var $this = $(this);
            addActiveClass($this);
        })

        //Close other submenu in sidebar on opening any

        sidebar.on('show.bs.collapse', '.collapse', function() {
            sidebar.find('.collapse.show').collapse('hide');
        });


        //Change sidebar and content-wrapper height
        applyStyles();

        function applyStyles() {
            //Applying perfect scrollbar
            if (!body.hasClass("rtl")) {
                if ($('.settings-panel .tab-content .tab-pane.scroll-wrapper').length) {
                    const settingsPanelScroll = new PerfectScrollbar('.settings-panel .tab-content .tab-pane.scroll-wrapper');
                }
                if ($('.chats').length) {
                    const chatsScroll = new PerfectScrollbar('.chats');
                }
                if (body.hasClass("sidebar-fixed")) {
                    var fixedSidebarScroll = new PerfectScrollbar('#sidebar .nav');
                }
            }
        }

        $('[data-toggle="minimize"]').on("click", function() {
            if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
                body.toggleClass('sidebar-hidden');
            } else {
                body.toggleClass('sidebar-icon-only');
            }
        });

        //checkbox and radios
        $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');

        //fullscreen
        $("#fullscreen-button").on("click", function toggleFullScreen() {
            if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
                if (document.documentElement.requestFullScreen) {
                    document.documentElement.requestFullScreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullScreen) {
                    document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        })
    });
})(jQuery);



