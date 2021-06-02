"use strict";
const footer = document.getElementsByTagName('footer')[0];
const header = document.getElementsByTagName('header')[0];
const gridSections = document.querySelectorAll("section[id$='-section']");
const gridLi = document.querySelectorAll("li[class*='nav-li']");
const borderClip = document.getElementsByClassName('border-clip')[0];
const nav = document.getElementsByTagName('nav')[0];
const slidingBorder = document.getElementById('border-slide');

/***
 * @object Stores reference to the section parent element, and various pieces of information about the state of the view
 */
let _state = {
    parent: document.getElementById('section-wrapper'),
    lastClicked: '0',
    touch: {
        x: 0,
        y: 0
    },
    scrolled: false
}

/***
 * @constant Zero-indexed items mapped to strings that mimic standard counting. Through 9 / "ten". Eleven would be achieved by concat _textEquivalents.9 + _textEquivalents.0 
*/
const _textEquivalents = {
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

const smallScreen = function () {
    if (window.innerHeight <= 850 && window.innerWidth <= 450) {
        if (footer.childElementCount === 0) {
            footer.appendChild(borderClip);
            footer.appendChild(slidingBorder);
            footer.appendChild(nav);
        }
    } else {
        if (header.childElementCount === 0) {
            header.appendChild(borderClip);
            header.appendChild(slidingBorder);
            header.appendChild(nav);
        }
    }
    window.addEventListener('resize', smallScreen, false);
}

smallScreen();

/***
 * @function On click of a nav element or left/right arrow press, update the view and lastFocused. If the target of the click is the li tied to the current view, do nothing.
 */
const updateView = function (evt) {
    const evtType = evt.type;
    const key = evt.type === 'keydown' ? evt.code : '';
    if (!key && typeof this != undefined && this.value.toString() === _state.lastClicked) {
        return;
    }
    evtType === 'click' ? handleViewChangeEvent(this.value) : handleViewChangeEvent(key);
}

/***
 * @function Handles click and keydown events to allow for navigation of the view
 */
const handleViewChangeEvent = function (data) {
    // click value comes in as a number, parse it as a string
    data = typeof data === 'number' ? data.toString() : data;
    if (typeof data === 'string' && data.indexOf('Arrow') > -1) {
        if (_state.lastClicked == '0') {
            if (data === 'ArrowLeft') {
                data = '2';
            } else if (data === 'ArrowRight') {
                data = '1';
            }
        } else if (_state.lastClicked == '2') {
            if (data === 'ArrowLeft') {
                data = '1';
            } else if (data === 'ArrowRight') {
                data = '0';
            }
        } else {
            if (data === 'ArrowLeft') {
                data = '0';
            } else if (data === 'ArrowRight') {
                data = '2';
            }
        }
    }
    switch (data) {
        case '0':
            _state.parent.classList.replace(
                `${_textEquivalents[_state.lastClicked]}-vis`,
                'one-vis'
            );
            gridSections[0].classList.replace('hide', 'visible');
            gridLi[0].classList.remove('desaturate');
            gridLi[0].parentElement.classList.replace('shrink', 'grow');
            gridSections[_state.lastClicked].classList.replace('visible', 'hide');
            gridLi[_state.lastClicked].classList.add('desaturate');
            slidingBorder.classList.replace(`behind-${_textEquivalents[_state.lastClicked]}`, 'behind-one');
            _state.lastClicked = data;
            break;
        case '1':
            _state.parent.classList.replace(
                `${_textEquivalents[_state.lastClicked]}-vis`,
                'two-vis'
            );
            gridSections[1].classList.replace('hide', 'visible');
            gridLi[1].classList.remove('desaturate');
            gridLi[1].parentElement.classList.replace('shrink', 'grow');
            gridSections[_state.lastClicked].classList.replace('visible', 'hide');
            gridLi[_state.lastClicked].classList.add('desaturate');
            slidingBorder.classList.replace(`behind-${_textEquivalents[_state.lastClicked]}`, 'behind-two');
            _state.lastClicked = data;
            break;
        case '2':
            _state.parent.classList.replace(
                `${_textEquivalents[_state.lastClicked]}-vis`,
                'three-vis'
            );
            gridSections[2].classList.replace('hide', 'visible');
            gridLi[2].classList.remove('desaturate');
            gridLi[2].parentElement.classList.replace('shrink', 'grow');
            gridSections[_state.lastClicked].classList.replace('visible', 'hide');
            gridLi[_state.lastClicked].classList.add('desaturate');
            slidingBorder.classList.replace(`behind-${_textEquivalents[_state.lastClicked]}`, 'behind-three');
            _state.lastClicked = data;
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

// need to fix scroll and touch events
// window.addEventListener('scroll', () => {
//     let chosenElement;
//     if(_state.scrolled) {
//         footer.childElementCount > 0 ? (chosenElement = footer, footer.classList.add('scrolled')) : (chosenElement = header, header.classList.add('scrolled'));
//         setTimeout(() => {
//             chosenElement.classList.remove('scrolled');
//             _state.scrolled = false;
//         }, 1000);
//     } else {
//         _state.scrolled = true;
//         return;
//     }
// }, false);

/* 
Issues:
  - Pinch/Zoom is causing "view change"
  - Two finger interaction is causing issues
*/

window.addEventListener('touchstart', (evt) => {
    if(evt.changedTouches.length != 1) {
        return false;
    }
    _state.touch.x = evt.changedTouches[0].clientX;
    _state.touch.y = evt.changedTouches[0].clientY;
}, true);

window.addEventListener('touchend', (evt) => {
    if(evt.changedTouches.length != 1) {
        return false;
    }
    let rise = _state.touch.y - evt.changedTouches[0].clientY;
    let run = _state.touch.x - evt.changedTouches[0].clientX;
    let slope = rise / run;

    if(slope >= 1.5 || slope < -1.5) {
        return;
    }

    if(evt.changedTouches[0].clientX > _state.touch.x) {
        _state['lastClicked'] === '2' ? handleViewChangeEvent('0') : handleViewChangeEvent(parseInt(_state['lastClicked'], 10) + 1)
    } else if(evt.changedTouches[0].clientX < _state.touch.x) {
        _state['lastClicked'] === '0' ? handleViewChangeEvent('2') : handleViewChangeEvent(parseInt(_state['lastClicked'], 10) - 1)
    }
}, true);