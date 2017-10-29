
// ----------------------------------------------------------------------------
//
//	When the application is moved to a LIVE environment please go to  the 
//	following Github repo to deploy this project on your server if you feel 
//	that you will exceed either one or both of the following...
//
//	* You're allowed up to 15,000 queries per hour by default. Once this limit 
//	  is reached, all of your requests will result in HTTP 403, forbidden, 
//	  until your quota is cleared.
//
//	* The freegeoip web server is a free and open source project so if the 
//	  public service limit above is a problem for you, download it and run 
//	  your own instance. 
//	
//	Deployment Documentation... https://github.com/fiorix/freegeoip
//
// ----------------------------------------------------------------------------
function handleResponse(response) {
    'use strict';
    document.getElementById('ip').innerHTML = "IP: " + response.ip;
    document.getElementById('country_code').innerHTML = response.country_code;

    var country = response.country_code;
    var europe = ['AL', 'AD', 'AT', 'BY', 'BE', 'BA', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FO', 'FI', 'FR', 'DE', 'GI', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MK', 'MT', 'MD', 'MC', 'NL', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES', 'SE', 'CH', 'UA', 'VA', 'RS', 'IM', 'RS', 'ME'];
	var asia = ['AF', 'BD', 'BT', 'IO', 'BN', 'KH', 'CN', 'TP', 'GU', 'HK', 'IN', 'ID', 'JP', 'KZ', 'KP', 'KR', 'KG', 'LA', 'MO', 'MY', 'MV', 'MN', 'MM', 'NR', 'NP', 'MP', 'PK', 'PW', 'PH', 'SG', 'LK', 'TJ', 'TW', 'TH', 'TM', 'SU', 'UZ', 'VN'];
    var inEU = europe.indexOf(country) !== -1;
    var inAsia = asia.indexOf(country) !== -1;

    if (country === 'US' || country === 'CA') {
		document.getElementById(country).style.display = "block";
	} else if (inEU) {
        document.getElementById('Europe').style.display = "block";
	} else if (inAsia) {
        document.getElementById('Asia').style.display = "block";
	} else {
        document.getElementById('World').style.display = "block";
	}
}
var script = document.createElement('script');
script.src = "http://freegeoip.net/json/?callback=handleResponse";
document.body.insertBefore(script, document.body.firstChild);

// Todays Date
// ------------------------------------------------------------------------
var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth();
var curr_year = d.getFullYear();
var sup = "";
if ( curr_date === 1 || curr_date === 21 || curr_date === 31 ) {
    sup = "st";
} else if ( curr_date === 2 || curr_date === 22 ) {
    sup = "nd";
} else if ( curr_date === 3 || curr_date === 23 ) {
    sup = "rd";
} else {
    sup = "th";
}
if ( document.querySelector('.newspaper-category') ) {
    document.querySelector('.newspaper-category .content-extra-info-date').innerHTML = curr_date + "<SUP>" + sup + "</SUP> " + m_names[curr_month] + " " + curr_year;
}
document.querySelector('.current-year').innerHTML = curr_year;

// Auto-Reveal Sticky Header Navigation
// ------------------------------------------------------------------------
var lastScrollTop = 0;
window.addEventListener("scroll", function(){  
    var getScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (getScrollPosition <= 150) {
        document.getElementsByTagName("header")[0].classList.add("nav-pagetop");
    } else {
        document.getElementsByTagName("header")[0].classList.remove("nav-pagetop");
    }
    if ( getScrollPosition > lastScrollTop ) {
        document.getElementsByTagName("header")[0].setAttribute("class", "nav-down");
    } else {
        document.getElementsByTagName("header")[0].classList.remove('nav-down');
        document.getElementsByTagName("header")[0].classList.add('nav-up');
    }
    var getScrollPositionSearchVisibility = document.getElementsByClassName('container-search searchform-active');
    while ( getScrollPositionSearchVisibility.length > 0 ) {
        getScrollPositionSearchVisibility[0].classList.remove('searchform-active');
    }
    lastScrollTop = getScrollPosition;
}, false);

// Setup the Main Navigation Area
// ------------------------------------------------------------------------
document.querySelector('.mainnav-sections-middle section:first-child').classList.add('mainnav-sections-subcategory-active');
var mainNavSections = document.querySelectorAll('.mainnav-sections-middle section');
for(var i = 0; i < mainNavSections.length; i++) {
    var mainNavSectionsAllRelated = mainNavSections[i].querySelectorAll('.mainnav-sections-subcategory-related-articles');
    if ( mainNavSectionsAllRelated.length > 0 ) {
        for(var j = 0; j < mainNavSectionsAllRelated.length; j++) {
            var mainNavSectionsFirstRelated = mainNavSectionsAllRelated[j];
            while (j++ < 1) {
                mainNavSectionsFirstRelated.classList.add("mainnav-sections-subcategory-related-articles-active");
            }
        }
    }
}
document.querySelector(".primaryCategories li:first-child").classList.add('mainnav-sections-category-active');
document.querySelector(".primaryCategories li:first-child a").innerHTML='<span class="textb">TPNS</span><span class="texti">two</span> Home<span class="hover-go"><i class="icon icon-go"></i></span>';
document.querySelector(".primaryCategories li:first-child a").href = '/';

// Header Search Form auto-close
// ------------------------------------------------------------------------
function searchFormAutoClose() {
    var searchFormAutoClose = document.getElementsByClassName('container-search searchform-active');
    while (searchFormAutoClose.length > 0) {
        searchFormAutoClose[0].classList.remove('searchform-active');
    }
}

// Close Left Navigation Marketing Area
// ------------------------------------------------------------------------
function leftNavMarketingClose() {
    var leftNavMarketingClose = document.getElementsByClassName('page-wrap-left page-wrap-left-marketing');
    while ( leftNavMarketingClose.length > 0 ) {
        leftNavMarketingClose[0].classList.remove('page-wrap-left-marketing');
    }
}

// Close Left Navigation Login Form
// ------------------------------------------------------------------------
function userControllerClose() {
    var userControllerClose = document.getElementsByClassName('user-controller-login-form user-controller-login-form-active');
    while ( userControllerClose.length > 0 ) {
        userControllerClose[0].classList.remove('user-controller-login-form-active');
    }
}

// Close Left Navigation Container Sections
// ------------------------------------------------------------------------
function containerSectionsClosed() {
    document.querySelector('.container-sections').classList.add('container-sections-closed');
}







// Manually Open and Close the Main Navigation Area
// ------------------------------------------------------------------------
document.querySelector('.mainnav-button a').onclick = function() {
    var myButton = this.parentElement;
    var className = myButton.className;
    if ( ~className.indexOf('mainnav-button-active') ) {
        myButton.classList.remove("mainnav-button-active");
        myButton.nextElementSibling.classList.remove("mainnav-sections-active");
    } else {
        searchFormAutoClose();
        myButton.classList.add("mainnav-button-active");
        myButton.nextElementSibling.classList.add("mainnav-sections-active");
    }
}

// Testing 123

// Auto close the Main Navigation Area
// ------------------------------------------------------------------------
function traverseChildren(elem){
    var children = [];
    var q = [];
    q.push(elem);
    while (q.length>0)
    {
        var elem = q.pop();
        children.push(elem);
        pushAll(elem.children);
    }
    function pushAll(elemArray){
        for(var i=0;i<elemArray.length;i++)
        {
            q.push(elemArray[i]);
        }
        
    }
    return children;
}
function makeMouseOutFn(elem){
    var list = traverseChildren(elem);
    return function onMouseOut(event) {
        var e = event.toElement || event.relatedTarget;
        if (!!~list.indexOf(e)) {
            return;
        }
        document.querySelector('.mainnav-button').classList.remove('mainnav-button-active');
        document.querySelector('.mainnav-sections').classList.remove('mainnav-sections-active');
    };
}

//using closure to cache all child elements
var parent = document.querySelector('.mainnav-sections');
parent.addEventListener('mouseout',makeMouseOutFn(parent),true);

// On hover of the Categories show the Sub-categories
// ------------------------------------------------------------------------
var allMainNavItems = document.querySelectorAll('.mainnav-sections-left ul > li');
for ( var i = 0, mainNavItem = allMainNavItems.length; i < mainNavItem; i++ ) {
    allMainNavItems[i].onmouseover = function() {
        var mainNavItemActive = this;
        var mainNavSectionId = mainNavItemActive.getAttribute('name');
        var mainNavItemManageActive = document.getElementsByClassName('mainnav-sections-category-nav mainnav-sections-category-active');
        while(mainNavItemManageActive.length > 0){
            mainNavItemManageActive[0].classList.remove('mainnav-sections-category-active');
        }
        if(mainNavItemManageActive.length === 0){
            mainNavItemActive.classList.add('mainnav-sections-category-active');
        }
        var mainNavSectionItemManageActive = document.getElementsByClassName('mainnav-sections-subcategory-container mainnav-sections-subcategory-active');
        while(mainNavSectionItemManageActive.length > 0){
            mainNavSectionItemManageActive[0].classList.remove('mainnav-sections-subcategory-active');
        }
        if(mainNavSectionItemManageActive.length === 0){
            document.querySelector('.mainnav-sections-middle section[name='+ mainNavSectionId +']').classList.add('mainnav-sections-subcategory-active');
        }
        var mainNavSubcategoryItemManageActive = document.getElementsByClassName('mainnav-sections-subcategory-item mainnav-sections-subcategory-item-active');
        while(mainNavSubcategoryItemManageActive.length > 0){
            mainNavSubcategoryItemManageActive[0].classList.remove('mainnav-sections-subcategory-item-active');
        }
        if(mainNavSubcategoryItemManageActive.length === 0){
            var mainNavSubcategoryItemFirstActive = document.querySelectorAll('.mainnav-sections-middle section[name='+ mainNavSectionId +'] .mainnav-sections-subcategory li')
            for (j = 0; j < mainNavSubcategoryItemFirstActive.length; j++) {
                mainNavSubcategoryItemFirstActive[0].classList.add('mainnav-sections-subcategory-item-active');
            }
        }
        var mainNavSections = document.querySelectorAll('.mainnav-sections-middle section');
        for(var k = 0; k < mainNavSections.length; k++) {
            var mainNavSectionsAllRelated = mainNavSections[k].querySelectorAll('.mainnav-sections-subcategory-related-articles');
            if ( mainNavSectionsAllRelated.length > 0 ) {
                for(var l = 0; l < mainNavSectionsAllRelated.length; l++) {
                    var mainNavSectionsFirstRelated = mainNavSectionsAllRelated[l];
                    if (mainNavSectionsFirstRelated.classList.contains("mainnav-sections-subcategory-related-articles-active")) {
                        mainNavSectionsFirstRelated.classList.remove("mainnav-sections-subcategory-related-articles-active");
                    }
                    while (l++ < 1) {
                        mainNavSectionsFirstRelated.classList.add("mainnav-sections-subcategory-related-articles-active");
                    }
                }
            }
        }
    }
}

// On hover of each Sub-category show its contents
// ------------------------------------------------------------------------
var allMainNavSubCategoryItems = document.querySelectorAll('.mainnav-sections-subcategory-container ul > li');
for ( var k = 0, mainNavSubCategoryItem = allMainNavSubCategoryItems.length; k < mainNavSubCategoryItem; k++ ) {
    allMainNavSubCategoryItems[k].onmouseover = function() {
        var mainNavSubCategoryItemActive = this;
        var mainNavSubCategorySectionId = mainNavSubCategoryItemActive.getAttribute('name');
        var mainNavSubcategoryItemManageCurrent = document.getElementsByClassName('mainnav-sections-subcategory-item mainnav-sections-subcategory-item-active');
        while(mainNavSubcategoryItemManageCurrent.length > 0){
            mainNavSubcategoryItemManageCurrent[0].classList.remove('mainnav-sections-subcategory-item-active');
        }
        if(mainNavSubcategoryItemManageCurrent.length === 0){
            var mainNavSubcategoryItemFirstCurrent = document.querySelectorAll('.mainnav-sections-subcategory-item[name='+ mainNavSubCategorySectionId +']')
            for (l = 0; l < mainNavSubcategoryItemFirstCurrent.length; l++) {
                mainNavSubcategoryItemFirstCurrent[0].classList.add('mainnav-sections-subcategory-item-active');
            }
        }
        var mainNavSubcategoryItemManageActiveItem = document.getElementsByClassName('mainnav-sections-subcategory-related-articles mainnav-sections-subcategory-related-articles-active');
        while(mainNavSubcategoryItemManageActiveItem.length > 0){
            mainNavSubcategoryItemManageActiveItem[0].classList.remove('mainnav-sections-subcategory-related-articles-active');
        }
        if(mainNavSubcategoryItemManageActiveItem.length === 0){
            var mainNavSubcategoryArticleFirstCurrent = document.querySelectorAll('.mainnav-sections-subcategory-related-articles[name='+ mainNavSubCategorySectionId +']')
            for (m = 0; m < mainNavSubcategoryArticleFirstCurrent.length; m++) {
                mainNavSubcategoryArticleFirstCurrent[0].classList.add('mainnav-sections-subcategory-related-articles-active');
            }
        }
    }
}

// Manually Open and Close the Search Area
// ------------------------------------------------------------------------
document.querySelector('.container-search a').onclick = function() {
    var searchButtonParent = this.parentElement;
    if ( searchButtonParent.classList.contains('searchform-active') ) {
        searchButtonParent.classList.remove('searchform-active');
    } else {
        var mainNavAutoClose = document.getElementsByClassName('mainnav-button mainnav-button-active');
        while(mainNavAutoClose.length > 0){
            mainNavAutoClose[0].classList.remove('mainnav-button-active');
        }
        var mainNavSectionsAutoClose = document.getElementsByClassName('mainnav-sections mainnav-sections-active');
        while(mainNavSectionsAutoClose.length > 0){
            mainNavSectionsAutoClose[0].classList.remove('mainnav-sections-active');
        }
        searchButtonParent.classList.add('searchform-active');
        document.querySelector('.searchform-textbox').focus();
    }
}

// Create a permahover event to overide the default CSS:hover behaviour 
// which removes the form hover event when a user hovers on a form element 
// which makes use of the HTML5 form validation popups and/or HTML5 input 
// assistance etc. and select menu open dropdown
// ------------------------------------------------------------------------
document.querySelector('.page-wrap-left').onmouseover = function() {
    var searchButtonParent = this;
    searchFormAutoClose();
    searchButtonParent.classList.add('permahover');
}

// User Logged Out Click Event
// ------------------------------------------------------------------------
document.querySelector('.user-logged-out').onclick = function() {
    var totalPinnedArticlesBefore = document.querySelectorAll('.pinned-articles-content ul li').length;
    if ( totalPinnedArticlesBefore === 0 ) {
        document.querySelector('.container-pinned-total').style.display = 'none';
        document.querySelector('.container-pinned-articles').classList.add('container-no-pinned-articles');
    } else {
        document.querySelector('.container-pinned-total').style.display = 'block';
        document.querySelector('.container-pinned-articles').classList.remove('container-no-pinned-articles');
    }
    if ( document.querySelector('.user-controller-login-form').classList.contains('user-controller-login-form-active') ) {
        var leftNavSectionErrorClose = document.getElementsByClassName('container-sections-error active');
        while ( leftNavSectionErrorClose.length > 0 ) {
            leftNavSectionErrorClose[0].classList.remove('active');
        }
        var leftNavAddSectionClose = document.getElementsByClassName('add-section add-section-open');
        while ( leftNavAddSectionClose.length > 0 ) {
            leftNavAddSectionClose[0].classList.remove('user-controller-login-form-active');
        }
        userControllerClose();
        leftNavMarketingClose();
        var userNewspaperSectionsClose = document.getElementsByClassName('container-sections container-sections-closed');
        while ( userNewspaperSectionsClose.length > 0 ) {
            userNewspaperSectionsClose[0].classList.remove('container-sections-closed');
        }
        document.querySelector('.user-logged-out-button-info-close').style.display = 'none';
        document.querySelector('.user-logged-out-button-info-back').style.display = 'none';
        document.querySelector('.user-logged-out-button-info-open').style.display = 'block';
    } else {
        var subscribeFormClose = document.getElementsByClassName('user-controller-subscribe-form user-controller-subscribe-form-active');
        while ( subscribeFormClose.length > 0 ) {
            subscribeFormClose[0].classList.remove('user-controller-subscribe-form-active');
        }
        var pinnedArticlesContainerClose = document.getElementsByClassName('container-pinned-articles pinned-articles-open');
        while ( pinnedArticlesContainerClose.length > 0 ) {
            pinnedArticlesContainerClose[0].classList.remove('pinned-articles-open');
        }
        var pinnedArticlesClose = document.getElementsByClassName('pinned-articles-content pinned-articles-content-open');
        while ( pinnedArticlesClose.length > 0 ) {
            pinnedArticlesClose[0].classList.remove('pinned-articles-content-open');
        }
        document.querySelector('.user-logged-out-button-info-close').style.display = 'block';
        document.querySelector('.user-logged-out-button-info-back').style.display = 'none';
        document.querySelector('.user-logged-out-button-info-open').style.display = 'none';
        document.querySelector('.user-controller-login-form').classList.add('user-controller-login-form-active');
        var leftNavInnerHeight = document.querySelector('.page-wrap-left').clientHeight;
        if ( document.querySelector('.user-controller-login-form').classList.contains('user-controller-login-form-active') ) {
            document.querySelector('.user-controller-login-form-active').style.height = (leftNavInnerHeight - 170) + "px";
        }
        document.querySelector('.page-wrap-left').classList.add('page-wrap-left-marketing');
        containerSectionsClosed();
    }
}

// Subscribe button
// ------------------------------------------------------------------------
document.querySelector('.user-controller-login-form .user-controller-form-input-button-subscribe').onclick = function() {
    leftNavMarketingClose();
    userControllerClose();
    document.querySelector('.user-logged-out-button-info-close').style.display = 'none';
    document.querySelector('.user-logged-out-button-info-back').style.display = 'block';
    containerSectionsClosed();
    document.querySelector('.user-controller-subscribe-form').classList.add('user-controller-subscribe-form-active');
    var leftNavInnerHeight = document.querySelector('.page-wrap-left').clientHeight;
    if ( document.querySelector('.user-controller-subscribe-form').classList.contains('user-controller-subscribe-form-active') ) {
        document.querySelector('.user-controller-subscribe-form-active').style.height = (leftNavInnerHeight - 170) + "px";
    }
}

/*

*/