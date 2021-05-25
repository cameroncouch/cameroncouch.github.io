"use strict";
const footer = document.getElementsByTagName('footer')[0];
const header = document.getElementsByTagName('header')[0];

const smallScreen = function () {
    if (window.innerHeight <= 850 && window.innerWidth <= 375) {
        if (footer.childElementCount === 0) {
            footer.appendChild(document.getElementsByTagName('nav')[0]);
        }
    } else {
        if (header.childElementCount === 0) {
            header.appendChild(document.getElementsByTagName('nav')[0]);
        }
    }
    window.addEventListener('resize', smallScreen, false);
}

smallScreen();

/***
 * @object Stores reference to the section parent element, and the last clicked navElement
 */
let sectionWrapper = {
    parent: document.getElementById('section-wrapper'),
    lastClicked: 0
}

/***
 * @constant Zero-indexed items mapped to strings that mimic standard counting. Through 9 / "ten". Eleven would be achieved by concat textEquivalents.9 + textEquivalents.0 
*/
const textEquivalents = {
    0: "one",
    1: "two",
    2: "three",
    3: "four",
    4: "five",
    5: "six",
    6: "seven",
    7: "eight",
    8: "nine",
    9: "ten"
}

// get all section and li elements with these attributes. We will access these in updateView.
const gridSections = document.querySelectorAll("section[id$='-section']");
const gridLi = document.querySelectorAll("li[class*='nav-li']");

/***
 * @function On click of a nav element or left/right arrow press, update the view and lastFocused. If the target of the click is the li tied to the current view, do nothing.
 */
const updateView = function (evt) {
    const evtType = evt.type;
    const key = evt.type === 'keydown' ? evt.code : '';
    if (!key && typeof this != undefined && this.value === sectionWrapper.lastClicked) {
        return;
    }
    evtType === 'click' ? handleViewChangeEvent(this.value) : handleViewChangeEvent(key);
}

/***
 * @funtction Handles click and keydown events to allow for navigation of the view
 */
const handleViewChangeEvent = function (data) {
    // click value comes in as a number, parse it as a string
    data = typeof data === 'number' ? data.toString() : data;
    if(typeof data === 'string' && data.indexOf('Arrow') > -1) {
        if(sectionWrapper.lastClicked == '0') {
            if(data === 'ArrowLeft') {
                data = '2';
            } else if(data === 'ArrowRight') {
                data = '1';
            }
        } else if(sectionWrapper.lastClicked == '2') {
            if(data === 'ArrowLeft') {
                data = '1';
            } else if(data === 'ArrowRight') {
                data = '0';
            }
        } else {
            if(data === 'ArrowLeft') {
                data = '0';
            } else if(data === 'ArrowRight') {
                data = '2';
            }
        }
    }
    switch (data) {
        case '0':
            sectionWrapper.parent.classList.replace(
                'one-vis',
                `${textEquivalents[sectionWrapper.lastClicked]}-vis`
            );
            gridSections[0].classList.replace('hide', 'visible');
            gridLi[0].classList.remove('desaturate');
            gridSections[sectionWrapper.lastClicked].classList.replace('visible', 'hide');
            gridLi[sectionWrapper.lastClicked].classList.add('desaturate');
            sectionWrapper.lastClicked = data;
            break;
        case '1':
            sectionWrapper.parent.classList.replace(
                'two-vis',
                `${textEquivalents[sectionWrapper.lastClicked]}-vis`
            );
            gridSections[1].classList.replace('hide', 'visible');
            gridLi[1].classList.remove('desaturate');
            gridSections[sectionWrapper.lastClicked].classList.replace('visible', 'hide');
            gridLi[sectionWrapper.lastClicked].classList.add('desaturate');
            sectionWrapper.lastClicked = data;
            break;
        case '2':
            sectionWrapper.parent.classList.replace(
                'three-vis',
                `${textEquivalents[sectionWrapper.lastClicked]}-vis`
            );
            gridSections[2].classList.replace('hide', 'visible');
            gridLi[2].classList.remove('desaturate');
            gridSections[sectionWrapper.lastClicked].classList.replace('visible', 'hide');
            gridLi[sectionWrapper.lastClicked].classList.add('desaturate');
            sectionWrapper.lastClicked = data;
            break;
    }
}
// attach event listeners to the nav
gridLi.forEach(item => { item.addEventListener('click', updateView, false); });
gridLi.forEach(item => { item.addEventListener('touchstart', updateView, false); });
// listening for arrow left and right to allow for navigation of the nav elements
window.addEventListener(
    // property keyCode deprecated due to cross-browser inconsistency -- using code here instead
    // keypress does not fire on arrowkeys - listening for keydown.
    'keydown',
    (e) => { (e.code === 'ArrowLeft' || e.code === 'ArrowRight') ? updateView(e) : false },
    false
);
