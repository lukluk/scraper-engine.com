var urle = 'http://www.houzz.com/photos/8131110/Fire-Pit-traditional-patio-providence';
// S = string
exports.scraper = {
    name: 'singlehouzz',
    useTor:true,
    url: function () {
        return urle;
    },
    setup:function(req){
        urle=req.query.urle
    },
    rows: function ($) {
        return $('html');
    },
    fields: {
        title:function($){
            return $.find('title').text()
        },
        gambar: function ($) {
			var img = $.find('img.viewImage.hide-context').attr('src');
            return img;
        },
		desc: function ($) {
			var de = $.find('div.spaceDetails div').text();
			if(!de) return "";
            return de.trim();
        },
		source: function ($) {
			var dd = $.find('dd.value').text();
			surl=URL.parse(dd).hostname;
			if(!surl) return "";
            return surl.trim();
        },
		tags: function ($) {
			tag=$.find('div.related-searches-links a').text();
			//txt=tag.split(/(?=[A-Z])/).join("|");
			txt=tag.replace(/([a-z])([A-Z])/g, '$1|$2')
            return txt;
        },
		questions: function ($,$$) {
            var comments=[]
			$.find('div#questionsContainer .feedItem').each(function(index,element){
                var o={}
                o.user=$$(element).find('.hz-username').text()
                o.question=$$(element).find('.feed-question-body').text()
                o.comments=[]
                $$(element).find('.commentsContainer .comment').each(function(i,ele){
                    var comm={}
                    
                    comm.user=$$(ele).find('.commentBody .hz-username').text()
                    comm.answer=$$(ele).find('.commentBody .commentBodyText').text()
                    o.comments.push(comm)
                })

                comments.push(o)
            });
			
			return comments;
			//return kmn;
        },
        houzzersComments: function ($,$$) {
            var comments=[]
            $.find('div.rGDiv').each(function(index,element){
                var o={}
                o.user=$$(element).find('.hz-username').text()
                o.comment=$$(element).find('.buzz-comment-text').text()
                comments.push(o)
            });
            
            return comments;
            //return kmn;
        }
    }
};