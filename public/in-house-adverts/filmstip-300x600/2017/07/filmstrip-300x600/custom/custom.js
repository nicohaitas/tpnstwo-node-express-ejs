/* 
 Admotion Copyright ? 2001-2015 Template v1.0.1
*/

function setButtonHandlers(){
	var eventClick = AdmBase.getInteractionEvent("end");

	$('.adButton').on(eventClick ,function (evt) {
		admFilmstripSection.doClick();
		return false;
	});
	
	$(".previous-item").on(eventClick ,function ( evt ) {
        admFilmstripSection.previous('ADM_PrevPanelButton');
		return false;
	});
	
	$(".next-item").on(eventClick ,function (evt) {
        admFilmstripSection.next('ADM_NextPanelButton');
		return false;
	});
	}

$(document).on('adm_initializeAd', function(){
	setButtonHandlers();
});


