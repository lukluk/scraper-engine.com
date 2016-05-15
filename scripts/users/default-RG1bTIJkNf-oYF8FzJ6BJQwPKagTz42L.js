//mataharimall
// S = string
var s_url = 'http://usccb.org/bible/readings/';
var category="";
exports.scraper = {
    name: 'usccb',    
    url: function (index) {
        return s_url;
    },
    setup:function(req){
    	//category='';
    	category=req.query.category
    },
    next:function($,currentIndex){
    	//dilimit max 2 pages
        if(currentIndex>=2){
            return false
        }else{
            return true
        }
    },
    rows: function ($) {
        return $('.bibleReadingsWrapper');
    },
    fields: {
        title: function($){			
            return $.find('h4').text();
        },
        price: function ($) {
			return $.find('.poetry').text();
        }
    }
};