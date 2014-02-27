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
var timeoutId = 0;

ready = function(){
    post_body = $("#post_body");
    renderedhtml =  $("#renderedhtml");
    $("#clickable").on("click", function () {
        sendMarkdown();
    });
    post_body.keypress(function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(getTags, 200);
    })
};

var sendMarkdown;
sendMarkdown = function() {
    if (!post_body.hasClass("flipOutY")) {
        data = { text: post_body.val()};
        $.ajax({
            url: "/posts/getkramdown",
            type: "post",
            dataType: "text",
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
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, renderedhtml[0]], toggleVisibility);
}

var toggleVisibility;
toggleVisibility = function() {
    if (post_body.hasClass("flipOutY")) {
        post_body.removeClass("flipOutY");
        renderedhtml.removeClass("flipInY");
        post_body.addClass("flipInY");
        renderedhtml.addClass("flipOutY");
    }
    else {
        post_body.removeClass("flipInY");
        renderedhtml.removeClass("flipOutY");
        post_body.addClass("animated flipOutY");
        renderedhtml.addClass("animated flipInY");
    }
}

var getTags;
getTags = function() {
    data = { text: post_body.val()};
    $.ajax({
        url:"/posts/gettags",
        type: "post",
        dataType: "html",
        data: data
    }).done(function(html){
        suggestTags(html);
    });
}

var suggestTags;
suggestTags = function(html) {
    $("#tags").html(html);
}

$(document).ready(ready);
$(document).on('page:load', ready);
