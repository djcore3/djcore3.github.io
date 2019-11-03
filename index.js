/*
## on ready
## popup
## animate
*/


/* ## on ready */

$(document).ready(() => {
	/*
 	## popup events
 	## card event
	*/

	/* ## popup events */
	$('.popup-window_close-button').click(() => {
		closePopup();
	})
	$('.popup-container').click((event) => {
		if (event.target == event.currentTarget)
			closePopup();
	})

	/* ## card event */
	$('#device-option_mobile').click(() => {
		openPopup(
			$('#device-select-popup-template')[0], 
			null, 
			{
				name: $(event.currentTarget).find('.device-option_name').text(), 
				description: $(event.currentTarget).find('.device-option_description').text(), 
				price: $(event.currentTarget).find('.device-option_price').text(), 
				'svg-icon-class': 'device-option_mobile-icon'
			}
		)
	})

	$('#device-option_laptop').click(() => {
		openPopup(
			$('#device-select-popup-template')[0], 
			'confirmation', 
			{
				name: $(event.currentTarget).find('.device-option_name').text(), 
				description: $(event.currentTarget).find('.device-option_description').text(), 
				price: $(event.currentTarget).find('.device-option_price').text(), 
				'svg-icon-class': 'device-option_laptop-icon'
			}
		)
	})

	$('#device-option_tv').click(() => {
		openPopup(
			$('#device-select-popup-template')[0], 
			'confirmation', 
			{
				name: $(event.currentTarget).find('.device-option_name').text(), 
				description: $(event.currentTarget).find('.device-option_description').text(), 
				price: $(event.currentTarget).find('.device-option_price').text(), 
				'svg-icon-class': 'device-option_tv-icon'
			}
		)
	})
})

/* ## popup */

window.popupGlobalState = {
	animationInProcess: false
}

/* templateid = element from custom html templates to use to copy */ 
/* title = ttile of the popup. may be null */
/* inline text = object of inline texts. every key corresponds to {{key}} in template  */
function openPopup(template, title, inlineText) {

	if (popupGlobalState.animationInProcess) {
		console.warn('cant start popup animation right now!');
		return;
	}

	popupGlobalState.animationInProcess = true;

	let popupwindow = $('.popup-window .popup-template-slot');

	if (!template) {
		throw 'no such template :('
	}

	$(template).find('.popup-window_title').text(title || '');

	/* inlining html into the slot */ 
	let html = $(template)
		.html()
		.replace(/\{\{.*?\}\}/g, (x, y, z) => 
			{
				//debugger;
				if (!inlineText) {
					throw 'no inline text for template was specified :(';
				}
				let text = x.substring(2, x.length-2);
				return inlineText[text] 
					? inlineText[text]
					: '';
			})

	popupwindow.html(html);

	/* animation */

	let promise = Promise.resolve()
		.then(() => animateAddClass($('.popup-container'), 'show', 1))
		.then(() => animate($('.popup-window'), {
			'margin-top': '50px',
			'opacity': '0'
		}, 1))
		.then(() => animate($('.popup-container'), {
			display: 'block'
		}, 50))
		.then(() => animate($('.popup-container'), {
			'background-color': 'rgba(0,0,0,0.4)'
		}, 100))
		.then(() => animate($('.popup-window'), {
			'margin-top': '0',
			'opacity': '1'
		}, 500))
		.then(() => popupGlobalState.animationInProcess = false)
}

/* templateid = element from custom html templates to use to copy */ 
/* title = ttile of the popup. may be null */
/* inline text = object of inline texts. every key corresponds to {{key}} in template  */
function closePopup() {

	if (popupGlobalState.animationInProcess) {
		console.warn('cant start popup animation right now!');
		return;
	}

	popupGlobalState.animationInProcess = true;

	/* animation */

	let promise = Promise.resolve()
		.then(() => animateAddClass($('.popup-container'), 'show', 1))
		.then(() => animate($('.popup-container'), {
			'background-color': 'rgba(0,0,0,0.0)'
		}, 100))
		.then(() => animate($('.popup-window'), {
			'margin-top': '100px',
			'opacity': '0'
		}, 500))
		.then(() => animate($('.popup-container'), {
			display: 'none'
		}, 50))
		.then(() => popupGlobalState.animationInProcess = false)
}

/* ## animate */

function animate(element, css, time) {
	return new Promise((resolve, reject) => {
		try {
			element.css(css);
			if (time > 4) {
				setTimeout(() => resolve(), time)		
			}
			else {
				resolve();
			}
		}
		catch(err) {
			reject(err);
		}
	})
}

function animateAddClass(element, className, time) {
	return new Promise((resolve, reject) => {
		try {
			element.addClass(className);
			if (time > 4) {
				setTimeout(() => resolve(), time)		
			}
			else {
				resolve();
			}
		}
		catch(err) {
			reject(err);
		}
	})
}

function animateRemoveClass(element, className, time) {
	return new Promise((resolve, reject) => {
		try {
			element.removeClass(className);
			if (time > 4) {
				setTimeout(() => resolve(), time)		
			}
			else {
				resolve();
			}
		}
		catch(err) {
			reject(err);
		}
	})
}