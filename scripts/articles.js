$(function () {
    var $content = $('#content');
    var data = {
        rss_url: 'https://cameronmcouch-33717.medium.com/feed/'
    };
    $.get('https://api.rss2json.com/v1/api.json', data, function (response) {
        if (response.status == 'ok') {
            var output = '<h1>' + "Blog" + '</h1>';
            $.each(response.items, function (k, item) {
                let date = new Date(item.pubDate);
                output += '<article><h2>' + item.title + '</h2>';
                output += '<img id="avatar" src="' + response.feed.image + '">'+'<em><span> Published on ' + date.toDateString() + '</span></em>'
                output += '<p>' + item.description + '</p>';
                //add a show more/less button 
                if(k != response.items.length -1) {
                    output += '</article><hr>';
                }
            });
            $content.html(output);
        } else {
            var output = '<h1>' + 'Error fetching blog posts' + '</h1>'
        }
    });
});