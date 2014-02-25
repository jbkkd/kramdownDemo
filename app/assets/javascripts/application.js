// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
var ready;
var post_body;
var renderedhtml;

ready = function(){
    post_body = $("#post_body");
    renderedhtml =  $("#renderedhtml");
    $("#clickable").on("click", function () {
        sendMarkdown();
    });
};

var sendMarkdown;
sendMarkdown = function() {
    if (post_body.css("display") != "none") {
        data = { text: $("#post_body").val()};
        $.ajax({
            url: "getkramdown",
            type: "post",
            dataType: "html",
            data: data
        }).done(function(html){
            changemarkdown(html);
        }).fail(function(e){
            alert(e);
        });
    }
    else {
        toggleVisibility();
    }
}

var changemarkdown;
changemarkdown = function(html) {
    renderedhtml.html(html);
    toggleVisibility();
}

var toggleVisibility;
toggleVisibility = function() {
    if (post_body.hasClass("fadeOutLeft")) {
        post_body.removeClass("fadeOutLeft");
        renderedhtml.removeClass("fadeInRight");
        post_body.addClass("fadeInRight");
        renderedhtml.addClass("fadeOutLeft");
    }
    else {
        post_body.removeClass("fadeInRight");
        renderedhtml.removeClass("fadeOutLeft");
        post_body.addClass("animated fadeOutLeft");
        renderedhtml.addClass("animated fadeInRight");
    }
}

$(document).ready(ready);
$(document).on('page:load', ready);
