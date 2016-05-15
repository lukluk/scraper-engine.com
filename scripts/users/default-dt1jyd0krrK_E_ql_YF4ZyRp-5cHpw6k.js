//mataharimall
// S = string
var s_url = 'http://www.mataharimall.com/';
var category="";
exports.scraper = {
    name: 'mataharimall',    
    url: function (index) {
        return s_url+category+'?per_page=25&page='+index;
    },
    setup:function(req){
    	category='gopro';
    	//category=req.query.category
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
        return $('.itembox');
    },
    fields: {
        title: function($){			
            return $.find('.item-name').text();
        },
        price: function ($) {
			return $.find('.web-price').text();
        }
    }
};