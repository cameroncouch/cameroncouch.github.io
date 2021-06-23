$(function () {
    var $content = $('#content');
    var data = {
        rss_url: 'https://cameronmcouch-33717.medium.com/feed/'
    };
    $.get('https://api.rss2json.com/v1/api.json', data, function (response) {
        console.log(response.items);
        if (response.status == 'ok') {
            var output = '<h1>' + "Blog" + '</h1>';
            $.each(response.items, function (k, item) {
                let date = new Date(item.pubDate);
                output += '<h2><a href="' + item.link + '" target="_blank" title="Will open in a new tab">' + item.title + '</h2></a>';
                output += '<em><p> Published on ' + date.toDateString() + '</p></em>'
                output += '<p>' + item.description + '</p>';
            });
            $content.html(output);
        }
    });
});