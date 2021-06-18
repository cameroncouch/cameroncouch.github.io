$(function () {
    var $content = $('#content');
    var data = {
        rss_url: 'https://cameronmcouch-33717.medium.com/feed/'
    };
    $.get('https://api.rss2json.com/v1/api.json', data, function (response) {
        if (response.status == 'ok') {
            var output = '<h1>' + "Blog" + '</h1>';
            $.each(response.items, function (k, item) {
                output += '<h2><a href="' + item.link + '" >' + item.title + '</h2></a>';
                output += '<p>' + item.description + '</p>';
            });
            $content.html(output);
        }
    });
});