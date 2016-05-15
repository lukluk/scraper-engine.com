var s_url = 'http://www.houzz.com/photos/outdoor/p/';
// S = string
exports.scraper = {
    name: 'houzz',
    useTor:true,
    url: function (index) {
        return s_url+(index-1)*8;
    },
    next:function($,currentIndex){
        if(currentIndex>=1){
            return false
        }else{
            return true
        }
    },
    rows: function ($) {
        return $('div.whiteCard');
    },
    fields: {
        title: function($){
			var user = $.find('span.hz-username.hzHouzzer.hzHCUserName').text();
			var title = $.find('a.photo-title').text();
            if(!title) return "";
            return title.concat(" by ",user);
        },
        thumb_url: function ($) {
			var thumb = $.find('img.hide-context.space.reloadable').attr('src');
            return thumb;
        },
        url: function ($){
            var lnk = $.find('a.photo-title').attr('href');
            return lnk;
        }
    }
};