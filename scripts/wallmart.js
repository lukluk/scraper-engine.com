 require('string');
exports.scraper = {
    name: 'OLX',
    url: function (index) {
        return "http://www.walmart.com/browse/toys/action-figures/4171_4172_133130?page="+index+"&cat_id=4171_4172_133130"
    },
    next:function($,currentindex){
        if(currentindex>=1){
            return false
        }else{
            return true
        }
    },
    rows: function ($) {
        return $('.tile-grid-unit-wrapper');
    },
    fields: {
        title: function ($) {
            return S($.find('.tile-heading').text()).trim().s;
        },
        price: function ($) {
            return S($.find('.tile-price').text().replace('$','')).trim().s;
        },
        image: function ($) {
            return $.find('.product-image').attr('src');
        },
        urlproduct: function ($) {
            return $.find('.js-product-title').attr('href');
        }


    }

}
