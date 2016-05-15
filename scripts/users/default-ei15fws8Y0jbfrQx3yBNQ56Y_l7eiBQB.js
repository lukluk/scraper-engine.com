//mataharimall
// S = string
var s_url = 'http://www.jakartanotebook.com/';
var category="laptop-fan";
exports.scraper = {z
    name: 'jakartanotebook',    
    url: function (index) {
        return s_url+category+'?page='+index;
    },
    setup:function(req){
    	//category='laptop-fan';
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
        return $('.product-list');
    },
    fields: {
        title: function($){			
            return $.find('.product-list__title').text();
        },
        price: function ($) {
			return $.find('.product-list__price').text();
        }
    }
};