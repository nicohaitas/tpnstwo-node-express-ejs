
// ----------------------------------------------------------------------------
//
// The Scroll Behavior specification has been introduced as an extension of 
// the Window interface to allow for the developer to opt in to native smooth 
// scrolling.
// This polyfill allows the new Mozilla specification to work cross browser
// but also be backward compatible to older browsers includin IE.
//
// ----------------------------------------------------------------------------
window.__forceSmoothScrollPolyfill__ = true;
window.__IntersectionObserverPolyfill__ = true;

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

// Date from JSON
// Convert Article Date/Time from machine readable ISO 8601 format to a 
// human readable format...
// i.e.: from 2017-10-09T13:26:06+02:00 to 9th October 2017
// ------------------------------------------------------------------------
var allContentDateTime = document.querySelectorAll('.article-published-date-time time');
for(var i = 0; i < allContentDateTime.length; i++) {
    var eachContentDateTime = allContentDateTime[i];
    var eachContentDateTimeFromAttribute = eachContentDateTime.getAttribute('datetime');
	var dd = new Date(eachContentDateTimeFromAttribute);
	var curMonth = m_names[dd.getMonth()];
	var curDay = dd.getDate();
	var ddsup = "";
	if (curDay === 1 || curDay === 21 || curDay === 31) {
		ddsup = "st";
	} else if (curDay === 2 || curDay === 22) {
		ddsup = "nd";
	} else if (curDay === 3 || curDay === 23) {
		ddsup = "rd";
	} else {
		ddsup = "th";
    }
    eachContentDateTime.innerHTML = '<span class="current-day">' + curDay + '<SUP>' + ddsup + '</SUP></span> <span class="current-month">' + curMonth + '</span> <span class="current-year">' + dd.getFullYear() + '</span>';
    //console.log(eachContentDateTimeFromAttribute);
}

// Aside Timeago Plugin Settings
// ------------------------------------------------------------------------
var timeagoIns = timeago();
timeagoIns.render(document.querySelectorAll('.newsfeed-editors-choice-by-day-filter time.timeago'));
timeagoIns.render(document.querySelectorAll('#editorschoice-sports time.timeago'));

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

// Setup the left Category Navigation
// ------------------------------------------------------------------------
var disableOneOnlyCategoryFilter = document.getElementsByName('category-one-only-filter');
for ( i = 0; i < disableOneOnlyCategoryFilter.length; i++ ) {
    var disableEachOneOnlyCategoryFilter = disableOneOnlyCategoryFilter[i];
    if ( disableEachOneOnlyCategoryFilter.checked === true ) {
        disableEachOneOnlyCategoryFilter.checked = false;
    }
}
document.querySelector('.category-one-only-reset').style.display = 'none';

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

// Close Pinned Articles Content
// ------------------------------------------------------------------------
function pinnedArticlesClose() {
    var pinnedArticlesClose = document.getElementsByClassName('pinned-articles-content pinned-articles-content-open');
    while ( pinnedArticlesClose.length > 0 ) {
        pinnedArticlesClose[0].classList.remove('pinned-articles-content-open');
    }
}

// Close Pinned Articles Container
// ------------------------------------------------------------------------
function pinnedArticlesContainerClose() {
    var pinnedArticlesContainerClose = document.getElementsByClassName('container-pinned-articles pinned-articles-open');
    while ( pinnedArticlesContainerClose.length > 0 ) {
        pinnedArticlesContainerClose[0].classList.remove('pinned-articles-open');
    }
}

// Close Newspaper Sections
// ------------------------------------------------------------------------
function userNewspaperSectionsClose() {
    var userNewspaperSectionsClose = document.getElementsByClassName('container-sections container-sections-closed');
    while ( userNewspaperSectionsClose.length > 0 ) {
        userNewspaperSectionsClose[0].classList.remove('container-sections-closed');
    }
}

// Close the Subscribe Form
// ------------------------------------------------------------------------
function subscribeFormClose() {
    var subscribeFormClose = document.getElementsByClassName('user-controller-subscribe-form user-controller-subscribe-form-active');
    while ( subscribeFormClose.length > 0 ) {
        subscribeFormClose[0].classList.remove('user-controller-subscribe-form-active');
    }
}

// Close the Add/Remove Section Area
// ------------------------------------------------------------------------
function closeCategoryAddSection() {
    var closeCategoryAddSection = document.getElementsByClassName('add-section add-section-open');
    if ( closeCategoryAddSection.length > 0 ) {
        closeCategoryAddSection[0].classList.remove('add-section-open');
    }
}

// Close the Error Message Container
// ------------------------------------------------------------------------
function containerSectionErrorOpen() {
    var containerSectionErrorOpen = document.getElementsByClassName('container-sections-error active');
    while ( containerSectionErrorOpen.length > 0 ) {
        containerSectionErrorOpen[0].classList.remove('active');
    }
}

// Setup the Pinned Articles before any interaction from the user
// ------------------------------------------------------------------------
function totalPinnedArticlesBefore() {
    var totalPinnedArticlesBefore = document.querySelectorAll('.pinned-articles-content ul li').length;
    // console.log(totalPinnedArticlesBefore);
    document.querySelector('.container-pinned-total').innerHTML = totalPinnedArticlesBefore;
    if ( totalPinnedArticlesBefore != null || totalPinnedArticlesBefore === 0) {
        document.querySelector('.container-pinned-total').style.display = "none";
        document.querySelector('.container-pinned-articles').classList.add('container-no-pinned-articles');
    } else {
        document.querySelector('.container-pinned-total').style.display = "block";
        var removeNoPinnedArticles = document.getElementsByClassName('container-pinned-articles container-no-pinned-articles');
        while ( removeNoPinnedArticles.length > 0 ) {
            removeNoPinnedArticles[0].classList.remove('container-no-pinned-articles');
        }
    }
}
totalPinnedArticlesBefore();

// Setup the Sections Navigation
// ------------------------------------------------------------------------
document.querySelector('.category-links > li[name="happening-now"]').setAttribute("class", "disabled");

// Sections Navigation, making this section active (using an Intersection 
// Observer ) when in view
// ------------------------------------------------------------------------
var allIndexArticleSections = document.querySelectorAll('.page-wrap-right section');
observer = new IntersectionObserver( function(eachIndexArticleSectionEntries) {
    for (var i = 0; i < eachIndexArticleSectionEntries.length; i++) {
        var eachIndexArticleSectionEntry = eachIndexArticleSectionEntries[i];
        var id = eachIndexArticleSectionEntry.target.getAttribute('id');
        if (eachIndexArticleSectionEntry.intersectionRatio > 0) {
            document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a').classList.add('currently-visible');
            document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details').classList.add('currently-visible');
            document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span').classList.add('currently-visible');
        } else {
            var RemoveCategoryMark = document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a');
            if ( RemoveCategoryMark !== null ) {
                while ( RemoveCategoryMark.classList.contains('currently-visible') ) {
                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a').classList.remove('currently-visible');
                }
            }
            var RemoveCategoryLinkDetails = document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details');
            if ( RemoveCategoryLinkDetails !== null ) {
                while ( RemoveCategoryLinkDetails.classList.contains('currently-visible') ) {
                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details').classList.remove('currently-visible');
                }
            }
            var RemoveCategoryController = document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span');
            if ( RemoveCategoryController !== null ) {
                while ( RemoveCategoryController.classList.contains('currently-visible') ) {
                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span').classList.remove('currently-visible');
                }
            }
        }
        observer.takeRecords(id);
    }
});
for (var i = 0; i < allIndexArticleSections.length; i++) {
    var eachIndexArticleSection = allIndexArticleSections[i];
    observer.observe(eachIndexArticleSection);
}

// Incremental Data Order for page-wrap-right sections
// ------------------------------------------------------------------------
for (var j = 0; j < allIndexArticleSections.length; j++) {
    var indexArticleStoreSectionList = allIndexArticleSections[j];
    indexArticleStoreSectionList.setAttribute("data-order", j + 1);
}

// Continue Incremental Data Order for article-store sections from the 
// page-wrap-right sections
// ------------------------------------------------------------------------
var AllArticleStoreSections = document.querySelectorAll('.article-store section');
for (var k = 0; k < AllArticleStoreSections.length; k++) {
    var eachArticleStoreSection = AllArticleStoreSections[k];
    var indexArticleSectionTotal = document.querySelectorAll('.page-wrap-right section').length;
    eachArticleStoreSection.setAttribute("data-order", indexArticleSectionTotal + k + 1);
}

// Sections Navigation, user customization of the newspaper
// ------------------------------------------------------------------------
// detach current Section, convert to array of objects with key value pairs and add to local storage
var eachIndexArticleCategoryLink = document.querySelectorAll('.category-links > li');
for (var i = 0; i < eachIndexArticleCategoryLink.length; i++) {
    var thisIndexArticleCategoryLink = eachIndexArticleCategoryLink[i];
    if ( thisIndexArticleCategoryLink.hasAttribute('name') ) {
        // Add Incremental Data Order to the add / remove section buttons and continue the numbering to the Additional Categories
        thisIndexArticleCategoryLink.setAttribute("data-order", + i);
        
        // On hover of Category Title replace the scrollTo button with the Go To Button
        if ( thisIndexArticleCategoryLink.querySelectorAll(".category-link-details a") ) {
            var showGoIcon = thisIndexArticleCategoryLink.querySelectorAll(".category-link-details a");
            for(var j = 0; j < showGoIcon.length; j++) {
                showGoIcon[j].onmouseover = function() {
                    var showGoIconMouseOver = this;
                    var showGoIconMouseOverParentsUntilLi = showGoIconMouseOver.parentElement.parentElement;
                    showGoIconMouseOverParentsUntilLi.querySelector('.category-mark a').style.display = 'none';
                    showGoIconMouseOverParentsUntilLi.querySelector('.category-mark .icon-radio-button-disabled').style.display = 'none';
                    showGoIconMouseOverParentsUntilLi.querySelector('.category-mark .icon-go').style.display = 'block';
                };
                showGoIcon[j].onmouseout = function() {
                    var showGoIconMouseLeave = this;
                    var showGoIconMouseLeaveParentsUntilLi = showGoIconMouseLeave.parentElement.parentElement;
                    showGoIconMouseLeaveParentsUntilLi.querySelector('.category-mark a').removeAttribute('style');
                    showGoIconMouseLeaveParentsUntilLi.querySelector('.category-mark .icon-radio-button-disabled').removeAttribute('style');
                    showGoIconMouseLeaveParentsUntilLi.querySelector('.category-mark .icon-go').removeAttribute('style');
                };
            }
        }
    }

    var indexArticleCategoryNamedLinksTotal = document.querySelectorAll('.category-links > li[name]').length;
    var indexArticleAdditionalCategoryLinks = document.querySelectorAll('.additional-sections-container > li');
    for (var j = 0; j < indexArticleAdditionalCategoryLinks.length; j++) {
        var thisIndexArticleAdditionalCategoryLinks = indexArticleAdditionalCategoryLinks[j];
        thisIndexArticleAdditionalCategoryLinks.setAttribute("data-order", indexArticleCategoryNamedLinksTotal + j + 1);
    }

    var categoryCheckbox = document.querySelectorAll("input[type='checkbox'][name='category-filter']");
    for(var j = 0; j < categoryCheckbox.length; j++) {

        categoryCheckbox[j].removeAttribute('disabled');
        categoryCheckbox[j].checked = true;
        if ( categoryCheckbox[j].parentElement.classList.contains('disabled') ) {
            categoryCheckbox[j].setAttribute('disabled', 'true');
        }
        // create local storage container
        var sections = [];
        categoryCheckbox[j].onchange = function() {
            var categoryFilterCheckbox = this;

            var addSectionOpen = document.getElementsByClassName('add-section add-section-open');
            while ( addSectionOpen.length > 0 ) {
                addSectionOpen[0].classList.remove('add-section-open');
            }

            containerSectionErrorOpen();

            // if stored locally and exists
            var siblingRadioButton = categoryFilterCheckbox.parentElement.parentElement.parentElement.parentElement;
            var checkboxId = siblingRadioButton.getAttribute('name');
            function removeEl() {
                var sectionID = checkboxId;
                storedSection = document.getElementById(checkboxId);
                var storedSectionHTML = storedSection.outerHTML;
                var sectionHTML = storedSectionHTML;
                var sectionObject = {};
                sectionObject.categorySlug = sectionID;
                sectionObject.sectionContent = sectionHTML;
                sections.push(sectionObject);
                storedSection.remove();
                // Uncomment the console log below to see the array in the browser console
                //console.log("sections: %s", JSON.stringify(sections));
            }
            if (this.checked) {
                var sectionsContainer = document.querySelector('.page-wrap-right');

                var siblingCategoryMark = siblingRadioButton.getElementsByClassName('category-mark radio-active');
                if ( siblingCategoryMark.length > 0 ) {
                    siblingCategoryMark[0].classList.remove('radio-active');
                }

                var siblingCategoryAddRemoveSection = siblingRadioButton.getElementsByClassName('category-add-remove-section disabled');
                if ( siblingCategoryAddRemoveSection.length > 0 ) {
                    siblingCategoryAddRemoveSection[0].classList.remove('disabled');
                }

                var siblingRadioButtonSecondary = categoryFilterCheckbox.parentElement.parentElement.parentElement.parentElement;
                if ( siblingRadioButtonSecondary.querySelector('input[type="radio"][name="category-one-only-filter"]').hasAttribute('disabled') ) {
                    siblingRadioButtonSecondary.querySelector('input[type="radio"][name="category-one-only-filter"]').removeAttribute('disabled');
                }

                var siblingCategoryAddRemoveSectionSecondary = siblingRadioButton.getElementsByClassName('category-link-details category-filter-active');
                if ( siblingCategoryAddRemoveSectionSecondary.length > 0 ) {
                    siblingCategoryAddRemoveSectionSecondary[0].classList.remove('category-filter-active');
                }

                // check local storage for this and add again
                var thisStoredSectionFound = false;
                for(var i = 0; i < sections.length; i++) {
                    var thisStoredSection = sections[i];
                    if (checkboxId === thisStoredSection.categorySlug) {
                        thisStoredSectionFound = true;
                        var retreiveThisStoredSection = document.querySelector('.page-wrap-right').innerHTML += thisStoredSection.sectionContent;
                        delete thisStoredSection.categorySlug;
                        delete thisStoredSection.sectionContent;
                        break;
                    }
                }
                
                // Place Categories in original order
                var sectionsForSorting = document.querySelectorAll('.page-wrap-right section');
                var sectionsForSortingArray = [];
                for (var j = 0; j < sectionsForSorting.length; ++j) {
                    sectionsForSortingArray.push(sectionsForSorting[j]);
                }
                sectionsForSortingArray.sort(function(a, b) {
                    return +a.getAttribute("data-order") - +b.getAttribute("data-order");
                });
                sectionsForSortingArray.forEach(function(el) {
                    document.querySelector('.page-wrap-right').appendChild(el);
                });
                // re-initialize navigation Intersection Observer
                var allIndexArticleSections = document.querySelectorAll('.page-wrap-right section');
                observer = new IntersectionObserver( function(eachIndexArticleSectionEntries) {
                    for (var i = 0; i < eachIndexArticleSectionEntries.length; i++) {
                        var eachIndexArticleSectionEntry = eachIndexArticleSectionEntries[i];
                        var id = eachIndexArticleSectionEntry.target.getAttribute('id');
                        if (eachIndexArticleSectionEntry.intersectionRatio > 0) {
                            document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a').classList.add('currently-visible');
                            document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details').classList.add('currently-visible');
                            document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span').classList.add('currently-visible');
                        } else {
                            var RemoveCategoryMark = document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a');
                            if ( RemoveCategoryMark !== null ) {
                                while ( RemoveCategoryMark.classList.contains('currently-visible') ) {
                                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a').classList.remove('currently-visible');
                                }
                            }
                            var RemoveCategoryLinkDetails = document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details');
                            if ( RemoveCategoryLinkDetails !== null ) {
                                while ( RemoveCategoryLinkDetails.classList.contains('currently-visible') ) {
                                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details').classList.remove('currently-visible');
                                }
                            }
                            var RemoveCategoryController = document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span');
                            if ( RemoveCategoryController !== null ) {
                                while ( RemoveCategoryController.classList.contains('currently-visible') ) {
                                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span').classList.remove('currently-visible');
                                }
                            }
                        }
                        observer.takeRecords(id);
                    }
                });
                for (var k = 0; k < allIndexArticleSections.length; k++) {
                    var eachIndexArticleSection = allIndexArticleSections[k];
                    observer.observe(eachIndexArticleSection);
                }
            } else {
                removeEl();
                // re-initialize navigation Intersection Observer
                var allIndexArticleSectionsSecondary = document.querySelectorAll('.page-wrap-right section');
                observer = new IntersectionObserver( function(eachIndexArticleSectionEntries) {
                    for (var i = 0; i < eachIndexArticleSectionEntries.length; i++) {
                        var eachIndexArticleSectionEntry = eachIndexArticleSectionEntries[i];
                        var id = eachIndexArticleSectionEntry.target.getAttribute('id');
                        if (eachIndexArticleSectionEntry.intersectionRatio > 0) {
                            document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a').classList.add('currently-visible');
                            document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details').classList.add('currently-visible');
                            document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span').classList.add('currently-visible');
                        } else {
                            var RemoveCategoryMark = document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a');
                            if ( RemoveCategoryMark !== null ) {
                                while ( RemoveCategoryMark.classList.contains('currently-visible') ) {
                                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a').classList.remove('currently-visible');
                                }
                            }
                            var RemoveCategoryLinkDetails = document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details');
                            if ( RemoveCategoryLinkDetails !== null ) {
                                while ( RemoveCategoryLinkDetails.classList.contains('currently-visible') ) {
                                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details').classList.remove('currently-visible');
                                }
                            }
                            var RemoveCategoryController = document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span');
                            if ( RemoveCategoryController !== null ) {
                                while ( RemoveCategoryController.classList.contains('currently-visible') ) {
                                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span').classList.remove('currently-visible');
                                }
                            }
                        }
                        observer.takeRecords(id);
                    }
                });
                for (var l = 0; l < allIndexArticleSectionsSecondary.length; l++) {
                    var eachIndexArticleSectionSecondary = allIndexArticleSectionsSecondary[l];
                    observer.observe(eachIndexArticleSectionSecondary);
                }
                siblingRadioButton.querySelector('.category-mark').classList.add('radio-active');
                siblingRadioButton.querySelector('.category-add-remove-section').classList.add('disabled');
                siblingRadioButton.querySelector('input[type="radio"][name="category-one-only-filter"]').setAttribute('disabled', 'true');
                siblingRadioButton.querySelector('.category-link-details').classList.add('category-filter-active');
            }
        };
    }
    
    var categoryRadioButton = document.querySelectorAll("input[type='radio'][name='category-one-only-filter']");
    for(var k = 0; k < categoryRadioButton.length; k++) {
        var eachCategoryRadioButton = categoryRadioButton[k];
        eachCategoryRadioButton.onchange = function() {
            var thisCategoryRadioButton = this;
            var thisCategoryRadioButtonParentName = thisCategoryRadioButton.parentElement.parentElement.parentElement.parentElement.getAttribute('name');
            var thisCategoryRadioButtonParents = thisCategoryRadioButton.parentElement.parentElement.parentElement.parentElement;
            var disableAddRemoveFilter = document.querySelectorAll('.category-add-remove-section');
            for ( i = 0; i < disableAddRemoveFilter.length; i++ ) {
                var disableEachAddRemoveFilter = disableAddRemoveFilter[i];
                disableEachAddRemoveFilter.classList.add('disabled');
            }

            containerSectionErrorOpen();

            var addSectionOpen = document.getElementsByClassName('add-section add-section-open');
            while ( addSectionOpen.length > 0 ) {
                addSectionOpen[0].classList.remove('add-section-open');
            }
            var disableCategoryFilter = document.getElementsByName('category-filter');
            for ( i = 0; i < disableCategoryFilter.length; i++ ) {
                var disableEachCategoryFilter = disableCategoryFilter[i];
                disableEachCategoryFilter.disabled = true;
            }
            if (this.checked) {
                var hideAllVisibleSections = document.querySelectorAll('.page-wrap-right section');
                for ( i = 0; i < hideAllVisibleSections.length; i++ ) {
                    var hideEachVisibleSections = hideAllVisibleSections[i];
                    hideEachVisibleSections.style.display = 'none';
                }
                var allCategoryMarkRadioActive = document.querySelectorAll('.category-mark');
                for ( i = 0; i < allCategoryMarkRadioActive.length; i++ ) {
                    var eachCategoryMarkRadioActive = allCategoryMarkRadioActive[i];
                    eachCategoryMarkRadioActive.classList.add('radio-active');
                }
                document.querySelector('.page-wrap-right section[id="'+ thisCategoryRadioButtonParentName +'"]').style.display = 'block';
                document.querySelector('.category-one-only-reset').style.display = 'inline-block';
                document.querySelector('.add-section').classList.add('radio-active');
                thisCategoryRadioButtonParents.querySelector('.category-mark').classList.remove('radio-active');
            }
        };
    }
}

// Remove a live Category and place into the article store while
// updating the event listener on each move click event
// Important! The parent html element must be an id
document.getElementById("categoryLinks").addEventListener("click",function(e) {
    // e.target was the clicked element
    if (e.target.matches("li")) {
        // Do Nothing
    } else if (e.target && e.target.matches("i.icon-square-subtract")) {
        var addRemoveSectionLi = e.target;
        var addRemoveSectionParentLi = addRemoveSectionLi.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        var addRemoveSectionParentLiName = addRemoveSectionParentLi.getAttribute('name');
        
        containerSectionErrorOpen();

        // Move Navigation Item
        document.querySelector('.additional-sections-container').appendChild(addRemoveSectionParentLi);
        
        var targetContainerSection = document.querySelector('.page-wrap-right section[id="'+ addRemoveSectionParentLiName +'"]');
        document.querySelector('.article-store').appendChild(targetContainerSection);

        // Place Navigation in original order
        var sectionsForSorting = document.querySelectorAll('.additional-sections-container > li');
        var sectionsForSortingArray = [];
        for (var i = 0; i < sectionsForSorting.length; ++i) {
            sectionsForSortingArray.push(sectionsForSorting[i]);
        }
        sectionsForSortingArray.sort(function(a, b) {
            return +a.getAttribute("data-order") - +b.getAttribute("data-order");
        });
        sectionsForSortingArray.forEach(function(el) {
            document.querySelector('.additional-sections-container').appendChild(el);
        });
        
        // re-initialize navigation Intersection Observer
        var allIndexArticleSections = document.querySelectorAll('.page-wrap-right section');
        observer = new IntersectionObserver( function(eachIndexArticleSectionEntries) {
            for (var i = 0; i < eachIndexArticleSectionEntries.length; i++) {
                var eachIndexArticleSectionEntry = eachIndexArticleSectionEntries[i];
                var id = eachIndexArticleSectionEntry.target.getAttribute('id');
                if (eachIndexArticleSectionEntry.intersectionRatio > 0) {
                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a').classList.add('currently-visible');
                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details').classList.add('currently-visible');
                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span').classList.add('currently-visible');
                } else {
                    var RemoveCategoryMark = document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a');
                    if ( RemoveCategoryMark !== null ) {
                        while ( RemoveCategoryMark.classList.contains('currently-visible') ) {
                            document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a').classList.remove('currently-visible');
                        }
                    }
                    var RemoveCategoryLinkDetails = document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details');
                    if ( RemoveCategoryLinkDetails !== null ) {
                        while ( RemoveCategoryLinkDetails.classList.contains('currently-visible') ) {
                            document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details').classList.remove('currently-visible');
                        }
                    }
                    var RemoveCategoryController = document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span');
                    if ( RemoveCategoryController !== null ) {
                        while ( RemoveCategoryController.classList.contains('currently-visible') ) {
                            document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span').classList.remove('currently-visible');
                        }
                    }
                }
                observer.takeRecords(id);
            }
        });
        for (var j = 0; j < allIndexArticleSections.length; j++) {
            var eachIndexArticleSection = allIndexArticleSections[j];
            observer.observe(eachIndexArticleSection);
        }
        
    }
});

// ------------------------------------------------------------------------
document.querySelector('.add-section-mark').onclick = function() {
    var thisOpenAddSectionButton = this.parentElement;

    containerSectionErrorOpen();

    thisOpenAddSectionButton.classList.toggle('add-section-open');
};

// Remove Article from Article Store and place into page-wrap-right while
// updating the event listener on each move click event
// Important! The parent html element must be an id
document.getElementById("additionalSectionsContainer").addEventListener("click",function(e) {
    if (e.target.matches("i.icon-square-subtract")) {
        // Do Nothing
    } else if (e.target && e.target.matches("li")) {
        var thisAddSectionCategory = e.target;

        // Move Navigation Item
        document.querySelector('.category-links').appendChild(thisAddSectionCategory);

        // Place Navigation in original order
        var sectionsForSorting = document.querySelectorAll('.category-links > li');
        var sectionsForSortingArray = [];
        for (var i = 0; i < sectionsForSorting.length; ++i) {
            sectionsForSortingArray.push(sectionsForSorting[i]);
        }
        sectionsForSortingArray.sort(function(a, b) {
            return +a.getAttribute("data-order") - +b.getAttribute("data-order");
        });
        sectionsForSortingArray.forEach(function(el) {
            document.querySelector('.category-links').appendChild(el);
        });

        var moveAddSectionToEnd = document.querySelector('.add-section');
        var moveAddSectionParent = document.querySelector('.category-links');
        moveAddSectionParent.appendChild(moveAddSectionToEnd);

        // Move Stored Article Item
        var moveStoredSectionName = thisAddSectionCategory.getAttribute('name');
        var targetForStoredSection = document.querySelector('.article-store section[id="'+ moveStoredSectionName +'"]');
        document.querySelector('.page-wrap-right').appendChild(targetForStoredSection);

        // Place Article Sections in original order
        var sectionsForSortingSecondary = document.querySelectorAll('.page-wrap-right section');
        var sectionsForSortingArraySecondary = [];
        for (var j = 0; j < sectionsForSortingSecondary.length; ++j) {
            sectionsForSortingArraySecondary.push(sectionsForSortingSecondary[j]);
        }
        sectionsForSortingArraySecondary.sort(function(a, b) {
            return +a.getAttribute("data-order") - +b.getAttribute("data-order");
        });
        sectionsForSortingArraySecondary.forEach(function(el) {
            document.querySelector('.page-wrap-right').appendChild(el);
        });

        moveAddSectionParent.appendChild(moveAddSectionToEnd);

        // re-initialize navigation Intersection Observer
        var allIndexArticleSections = document.querySelectorAll('.page-wrap-right section');
        observer = new IntersectionObserver( function(eachIndexArticleSectionEntries) {
            for (var i = 0; i < eachIndexArticleSectionEntries.length; i++) {
                var eachIndexArticleSectionEntry = eachIndexArticleSectionEntries[i];
                var id = eachIndexArticleSectionEntry.target.getAttribute('id');
                if (eachIndexArticleSectionEntry.intersectionRatio > 0) {
                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a').classList.add('currently-visible');
                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details').classList.add('currently-visible');
                    document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span').classList.add('currently-visible');
                } else {
                    var RemoveCategoryMark = document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a');
                    if ( RemoveCategoryMark !== null ) {
                        while ( RemoveCategoryMark.classList.contains('currently-visible') ) {
                            document.querySelector('.category-links > li[name="'+ id +'"] > .category-mark a').classList.remove('currently-visible');
                        }
                    }
                    var RemoveCategoryLinkDetails = document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details');
                    if ( RemoveCategoryLinkDetails !== null ) {
                        while ( RemoveCategoryLinkDetails.classList.contains('currently-visible') ) {
                            document.querySelector('.category-links > li[name="'+ id +'"] > .category-link-details').classList.remove('currently-visible');
                        }
                    }
                    var RemoveCategoryController = document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span');
                    if ( RemoveCategoryController !== null ) {
                        while ( RemoveCategoryController.classList.contains('currently-visible') ) {
                            document.querySelector('.category-links > li[name="'+ id +'"] > .category-controllers > .category-one-only span').classList.remove('currently-visible');
                        }
                    }
                }
                observer.takeRecords(id);
            }
        });
        for (var k = 0; k < allIndexArticleSections.length; k++) {
            var eachIndexArticleSection = allIndexArticleSections[k];
            observer.observe(eachIndexArticleSection);
        }
    }
});

// Reset the one only category, filter to show all the visible categories
// ------------------------------------------------------------------------
document.querySelector('.category-one-only-reset').onclick = function() {

    containerSectionErrorOpen();

    var addSectionOpen = document.getElementsByClassName('add-section add-section-open');
    while ( addSectionOpen.length > 0 ) {
        addSectionOpen[0].classList.remove('add-section-open');
    }
    var resetAddSection = document.getElementsByClassName('add-section radio-active');
    while ( resetAddSection.length > 0 ) {
        resetAddSection[0].classList.remove('radio-active');
    }
    document.querySelector('.category-one-only-reset').style.display = 'none';
    var hideAllVisibleSections = document.querySelectorAll('.page-wrap-right section');
    for ( i = 0; i < hideAllVisibleSections.length; i++ ) {
        var hideEachVisibleSections = hideAllVisibleSections[i];
        hideEachVisibleSections.removeAttribute('style');
    }
    var disableCategoryFilter = document.getElementsByName('category-filter');
    for ( i = 0; i < disableCategoryFilter.length; i++ ) {
        var disableEachCategoryFilter = disableCategoryFilter[i];
        disableEachCategoryFilter.disabled = false;
    }
    var disableOneOnlyCategoryFilter = document.getElementsByName('category-one-only-filter');
    for ( i = 0; i < disableOneOnlyCategoryFilter.length; i++ ) {
        var disableEachOneOnlyCategoryFilter = disableOneOnlyCategoryFilter[i];
        disableEachOneOnlyCategoryFilter.checked = false;
    }
    var resetAddRemoveSection = document.getElementsByClassName('category-add-remove-section disabled');
    while ( resetAddRemoveSection.length > 0 ) {
        resetAddRemoveSection[0].classList.remove('disabled');
    }
    var resetCategoryMark = document.getElementsByClassName('category-mark radio-active');
    while ( resetCategoryMark.length > 0 ) {
        resetCategoryMark[0].classList.remove('radio-active');
    }
    var resetCategoryMarkAnchor = document.querySelectorAll('.category-mark .currently-visible');
    for ( i = 0; i < resetCategoryMarkAnchor.length; i++ ) {
        var resetEachCategoryMarkAnchor = resetCategoryMarkAnchor[i];
        resetEachCategoryMarkAnchor.classList.remove('currently-visible');
    }
    var resetCategoryLinkDetails = document.getElementsByClassName('category-link-details currently-visible');
    while ( resetCategoryLinkDetails.length > 0 ) {
        resetCategoryLinkDetails[0].classList.remove('currently-visible');
    }
    var resetCategoryOneOnlyMark = document.getElementsByClassName('category-one-only-mark currently-visible');
    while ( resetCategoryOneOnlyMark.length > 0 ) {
        resetCategoryOneOnlyMark[0].classList.remove('currently-visible');
    }
    window.scrollTo(0, 0);
};

// Sections Navigation, on click scroll to a section
// ------------------------------------------------------------------------
var allCategoryMarks = document.querySelectorAll('.category-mark');
for (var i = 0; i < allCategoryMarks.length; i++) {
    allCategoryMarks[i].onclick = function(e) {
        e.preventDefault();
        
        closeCategoryAddSection();

        var thisCategoryMark = this;
        var thisCategoryMarksName = thisCategoryMark.getAttribute('name');
        var element = document.getElementById(thisCategoryMarksName);
        element.scrollIntoView({
            block: "start",
            behavior: "smooth"
        });
    };
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
};

// Auto close the Main Navigation Area
// ------------------------------------------------------------------------
function traverseChildren(elem) {
    var children = [];
    var q = [];
    q.push(elem);
    while (q.length>0)
    {
        var element = q.pop();
        children.push(element);
        pushAll(element.children);
    }
    function pushAll(elemArray){
        for(var i=0;i<elemArray.length;i++)
        {
            q.push(elemArray[i]);
        }
        
    }
    return children;
}
function makeMouseOutFn(elem) {
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
            var mainNavSubcategoryItemFirstActive = document.querySelectorAll('.mainnav-sections-middle section[name='+ mainNavSectionId +'] .mainnav-sections-subcategory li');
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
    };
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
            var mainNavSubcategoryItemFirstCurrent = document.querySelectorAll('.mainnav-sections-subcategory-item[name='+ mainNavSubCategorySectionId +']');
            for (l = 0; l < mainNavSubcategoryItemFirstCurrent.length; l++) {
                mainNavSubcategoryItemFirstCurrent[0].classList.add('mainnav-sections-subcategory-item-active');
            }
        }
        var mainNavSubcategoryItemManageActiveItem = document.getElementsByClassName('mainnav-sections-subcategory-related-articles mainnav-sections-subcategory-related-articles-active');
        while(mainNavSubcategoryItemManageActiveItem.length > 0){
            mainNavSubcategoryItemManageActiveItem[0].classList.remove('mainnav-sections-subcategory-related-articles-active');
        }
        if(mainNavSubcategoryItemManageActiveItem.length === 0){
            var mainNavSubcategoryArticleFirstCurrent = document.querySelectorAll('.mainnav-sections-subcategory-related-articles[name='+ mainNavSubCategorySectionId +']');
            for (m = 0; m < mainNavSubcategoryArticleFirstCurrent.length; m++) {
                mainNavSubcategoryArticleFirstCurrent[0].classList.add('mainnav-sections-subcategory-related-articles-active');
            }
        }
    };
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
};

// Create a permahover event to overide the default CSS:hover behaviour 
// which removes the form hover event when a user hovers on a form element 
// which makes use of the HTML5 form validation popups and/or HTML5 input 
// assistance etc. and select menu open dropdown
// ------------------------------------------------------------------------
document.querySelector('.page-wrap-left').onmouseover = function() {
    var searchButtonParent = this;
    searchFormAutoClose();
    searchButtonParent.classList.add('permahover');
};

document.querySelector('.page-wrap-left').onmouseleave = function(e) {
    // Perma Hover Event Controller
    var counterForPermaHoverEvent = 0;
    if(e.relatedTarget === null) {
        return;
    }
    counterForPermaHoverEvent ++;

    totalPinnedArticlesBefore();

    var searchButtonParentLeave = this;
    searchButtonParentLeave.classList.remove('permahover');

    containerSectionErrorOpen();
    closeCategoryAddSection();
    pinnedArticlesContainerClose();
    userNewspaperSectionsClose();
    pinnedArticlesClose();
    userControllerClose();
    subscribeFormClose();
    leftNavMarketingClose();
    document.querySelector('.user-logged-out-button-info-close').style.display = 'none';
    document.querySelector('.user-logged-out-button-info-back').style.display = 'none';
    document.querySelector('.user-logged-out-button-info-open').style.display = 'block';
};

// User Logged Out Click Event
// ------------------------------------------------------------------------
document.querySelector('.user-logged-out').onclick = function() {

    totalPinnedArticlesBefore();
    
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
        userNewspaperSectionsClose();
        document.querySelector('.user-logged-out-button-info-close').style.display = 'none';
        document.querySelector('.user-logged-out-button-info-back').style.display = 'none';
        document.querySelector('.user-logged-out-button-info-open').style.display = 'block';
    } else {
        subscribeFormClose();
        pinnedArticlesContainerClose();
        pinnedArticlesClose();
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
};

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
};

// Yahoo Weather API
// ------------------------------------------------------------------------
reallySimpleWeather.weather({
    location: 'Athens, GR',
    woeid: '',
    unit: 'c',
    success: function(weather) {
        html = '<div class="weather-temp"><i class="weather-' + weather.code + '"></i><span class="weather-temp-number textb">' + weather.temp + '&deg;' + weather.units.temp + '</span></div>';
        html += '<div class="weather-details"><h4>' + weather.city + ', ' + weather.region + '</h4><p class="weather-details-current">' + weather.currently + '</p></div>';
        document.getElementById('weather').innerHTML = html;
    },
    error: function(error) {
        document.getElementById('weather').innerHTML = '<p>'+error+'</p>';
    }
});

// Index Page - Happening Now Lead Story Related Article Area Setup
// ------------------------------------------------------------------------
var leadArticleTitle = document.querySelector('.content-area-lead-story article .article-category-main-container .article-category-container a > h1');
var leadArticleTitleHeight = leadArticleTitle.offsetHeight;
document.querySelector('.content-area-lead-story article .article-category-main-container .article-controller-container').style.top = leadArticleTitleHeight + "px";
var leadArticleContainer = document.querySelector('.content-area-lead-story article .article-category-main-container');
var leadArticleContainerHeight = leadArticleContainer.offsetHeight;
document.querySelector('.content-area-lead-story article .article-category-related-container').style.height = (leadArticleContainerHeight - leadArticleTitleHeight) + "px";
document.querySelector('.content-area-lead-story article .article-category-related-container').style.marginTop = leadArticleTitleHeight + "px";

// Setup the Global Video and Audio Player
// ------------------------------------------------------------------------
// Extend the Player by adding a Download Button to the controls
var controls = ["<div class='plyr__controls'>",
"<button type='button' data-plyr='play'>",
    "<svg><use xlink:href='#plyr-play'></use></svg>",
    "<span class='plyr__sr-only'>Play</span>",
"</button>",
"<button type='button' data-plyr='pause'>",
    "<svg><use xlink:href='#plyr-pause'></use></svg>",
    "<span class='plyr__sr-only'>Pause</span>",
"</button>",
"<span class='plyr__progress'>",
    "<label for='seek{id}' class='plyr__sr-only'>Seek</label>",
    "<input id='seek{id}' class='plyr__progress--seek' type='range' min='0' max='100' step='0.1' value='0' data-plyr='seek'>",
    "<progress class='plyr__progress--played' max='100' value='0' role='presentation'></progress>",
    "<progress class='plyr__progress--buffer' max='100' value='0'>",
        "<span>0</span>% buffered",
    "</progress>",
    "<span class='plyr__tooltip'>00:00</span>",
"</span>",
"<span class='plyr__time'>",
    "<span class='plyr__sr-only'>Current time</span>",
    "<span class='plyr__time--current'>00:00</span>",
"</span>",
"<button type='button' data-plyr='mute'>",
    "<svg class='icon--muted'><use xlink:href='#plyr-muted'></use></svg>",
    "<svg><use xlink:href='#plyr-volume'></use></svg>",
    "<span class='plyr__sr-only'>Toggle Mute</span>",
"</button>",
"<span class='plyr__volume'>",
    "<label for='volume{id}' class='plyr__sr-only'>Volume</label>",
    "<input id='volume{id}' class='plyr__volume--input' type='range' min='0' max='10' value='5' data-plyr='volume'>",
    "<progress class='plyr__volume--display' max='10' value='0' role='presentation'></progress>",
"</span>",
"<button type='button' data-plyr='captions'>",
    "<svg class='icon--captions-on'><use xlink:href='#plyr-captions-on'></use></svg>",
    "<svg><use xlink:href='#plyr-captions-off'></use></svg>",
    "<span class='plyr__sr-only'>Toggle Captions</span>",
"</button>",
"<button type='button' data-plyr='fullscreen'>",
    "<svg class='icon--exit-fullscreen'><use xlink:href='#plyr-exit-fullscreen'></use></svg>",
    "<svg><use xlink:href='#plyr-enter-fullscreen'></use></svg>",
    "<span class='plyr__sr-only'>Toggle Fullscreen</span>",
"</button>",
"<div class='audio-download'>",
    "<a href='' download>",
        "<i class='icon icon-cloud-download'></i>",
    "</a>",
"</div>",
"</div>"].join("");
plyr.setup({
    html: controls
});
var allAudioPlayersDownloadBtns = document.querySelectorAll('.audio-download a');
for ( var i = 0, eachAudioPlayersDownloadBtn = allAudioPlayersDownloadBtns.length; i < eachAudioPlayersDownloadBtn; i++ ) {
    var thisAudioPlayersDownloadBtn = allAudioPlayersDownloadBtns[i];
    var thisParentAudioPlayer = thisAudioPlayersDownloadBtn.parentElement.parentElement.parentElement;
    var thisParentAudioPlayerSource = thisParentAudioPlayer.querySelector('source').getAttribute('src');
    thisAudioPlayersDownloadBtn.setAttribute('href', thisParentAudioPlayerSource);
}

// Happening Now Aside Editors Choice Height Controller
// ------------------------------------------------------------------------
var indexTrendingContainerHeight = document.querySelector('.lead-story-left-column').offsetHeight;
var indexAsideOpinionContainerHeight = document.querySelector('.content-area-opinion').offsetHeight;
var indexAsidePromoAreaContainerHeight = document.querySelector('.aside-promo-area-two-column').offsetHeight;
var indexAsideNewsFeedTitleContainerHeight = document.querySelector('.content-area-news-feed-title').clientHeight;
var indexAsideNewsFeedFeedbackLinkHeight = document.querySelector('.newsfeed-editors-choice-feedback-link').clientHeight;
// After adding the Ad's remember to remove it's height from the Editor's Choice Area here
//
//var indexAsideInHouseAdHeight = document.querySelector('.in-house-ad-area').clientHeight;
//
document.querySelector('.content-area-news-feed-inner-container').style.height = ((indexTrendingContainerHeight) - (indexAsideOpinionContainerHeight) - (indexAsidePromoAreaContainerHeight) - (indexAsideNewsFeedTitleContainerHeight) - (indexAsideNewsFeedFeedbackLinkHeight) - 85) + "px";
