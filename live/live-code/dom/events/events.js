const log = (text) => {
  document.querySelector('#log').textContent += text.join(' ');
};
(panel.addEventListener('click', () => log('panel caputre')),
  { capture: true });

//<ul id="list">
//<li data-id="1"><button>Edit</button></li>
// <li data-id="2"><button>Edit</button></li>
//</ul>
