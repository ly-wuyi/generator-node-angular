/**
 * Created by yong.liu on 2015/10/10.
 */

if (typeof jQuery === "undefined") { throw new Error("tcomponent's JavaScript requires jQuery"); }

/* ========================================================================
 * tcomponent: tdropdown
 * desription: map city dropdown
 * ========================================================================
 *
 *
 * ======================================================================== */
+function($){
    "use strict";

    var toggle = "[data-toggle=tdropdown]",
         close = "[data-close=tdropdown]";

    var TDropdown = function(){
        $(element).on("click.tc.tdropdown", this.toggle)
    }

    TDropdown.prototype.toogle = function(e){
        var $this = $(this);
        var $parent  = getParent($this);
        var isActive = $parent.hasClass("open");
        clearMenus();
        if (!isActive) {
            var relatedTarget = { relatedTarget: this };
            $parent.trigger(e = $.Event("shown.tc.tdropdown", relatedTarget));
            if (e.isDefaultPrevented()) return;
            $parent
                .toggleClass("open")
                .trigger("shown.tc.tdropdown", relatedTarget);
            $this.focus()
        }
        return false;
    }

    $.fn.tdropdown = function(){
        return this.each(function(){
            var $this = $(this);
            var data  = $this.data("bs.dropdown");
            if (!data) $this.data("bs.dropdown", (data = new Dropdown(this)));
            if (typeof option == "string") data[option].call($this);
        });
    }

    $.fn.currentCity = function(city){
        city = city || "城市切换";
        $(this).html(city);
    }

    $.fn.initCityDropdownBody = function(cities){
        $(this).html("");
        var cbody = "";
        cities = cities || [];
        $.each(cities, function(k,v){
            cbody += "<li><span>"+ v.pname +"</span>";
            $.each(v.cities,function(i,j){
                cbody += "<a href='javascript:void(0);' data='"+ j.data +"'>"+ j.name +"</a>";
            });
            cbody += "</li>";
        });
        $(this).html(cbody);
    }

    $.extend({closeDropdown: clearMenus});

    function clearMenus(e){
        $(toggle).each(function () {
            var $parent = getParent($(this));
            var relatedTarget = { relatedTarget: this };
            if (!$parent.hasClass("open")) return;
            $parent.trigger(e = $.Event("hide.tc.tdropdown", relatedTarget));
            if (e.isDefaultPrevented()) return;
            $parent.removeClass("open").trigger("hidden.tc.tdropdown", relatedTarget);
        });
    }

    function getParent($this) {
        var selector = $this.attr("data-target");
        if (!selector) {
            selector = $this.attr("href");
            selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "");
        }
        var $parent = selector && $(selector);
        return $parent && $parent.length ? $parent : $this.parent();
    }

    $(document)
        .on("click.tc.tdropdown.data-api", toggle, TDropdown.prototype.toogle)
        .on("click.tc.tdropdown.data-api", close, clearMenus);
}(jQuery);