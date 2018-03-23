// The following must be specified on the importing script:
// @require		http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @resource	fontAwesomeCss https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
// @resource	sidebarCss https://raw.githubusercontent.com/stormsye/eures-userscripts/0.3.x/sidebar/sidebar.css
// @grant		GM_addStyle
// @grant		GM_getResourceText

GM_addStyle(GM_getResourceText('sidebarCss'));

createSidebar = function(toggleKey = 120, defaultCollapsed = true) {
    const STATE_OPEN = "expanded";
    const STATE_CLOSED = "collapsed";
	
	let actionEntries = [];

    let sidebarHtml = `
        <div id="fullSidebar" class="${defaultCollapsed ? STATE_CLOSED : STATE_OPEN}">
            <div id="fullSidebarContent"></div>
            <div id="fullSidebarCollapser"></div>
        </div>
        `;

    $(document.body).append(jQuery.parseHTML(sidebarHtml)[1]);

    let fullSidebar = $('#fullSidebar');
    let fullSidebarContent = $('#fullSidebarContent');
    let fullSidebarCollapser = $('#fullSidebarCollapser');

    fullSidebarCollapser.click(() => toggleSidebar());

    $(window).keydown(function (kEvent) {
        if (kEvent.which == toggleKey) {
            toggleSidebar();
        }
    });

    function toggleSidebar() {
        fullSidebar.toggleClass(`${STATE_OPEN} ${STATE_CLOSED}`);
    }
	
	function addActionEntry(actionEntry) {
		actionEntries.push(actionEntry);
		loadActionEntry(actionEntry);
	}
	
	function removeActionEntries() {
		clearSidebarContent();
		actionEntries.length = 0;
	}
	
	function clearSidebarContent() {
		fullSidebarContent.empty();
	}
	
	function reloadActionEntries() {
		clearSidebarContent();
		actionEntries.forEach((actionEntry) => loadActionEntry(actionEntry));
	}
	
	function loadActionEntry(actionEntry) {
		if (!window.location.href.includes(actionEntry.urlContains)) {
			return console.log(`INFO: did not load entry as ${actionEntry.urlContains} is not part of ${window.location.href}`), false;
		}
		let button = `<button class="btn" title="${actionEntry.title}">
                          <i class="fa fa-${actionEntry.icon}" style="color: #fff;"></i>
                      </button>`;
        let buttonElem = $(button).click(actionEntry.action);
        fullSidebarContent.append(buttonElem);
		
	}

    return {
        toggleSidebar: toggleSidebar,
		addActionEntry: addActionEntry,
		removeActionEntries: removeActionEntries,
		reloadActionEntries: reloadActionEntries
    };
};

/*
  each entry has the structure:
  {
	  action		:	function
	  title			:	?string
	  urlContains	:	?string
	  icon			:	?string
  }
*/
createActionEntry = function(action, title, urlContains = '', icon = 'home') {
	return {
		title: title,
        urlContains: urlContains,
        icon: icon,
        action: action
	}
}