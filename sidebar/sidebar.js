// The following must be specified on the importing script:
// @require		http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @resource	fontAwesomeCss https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
// @resource	sidebarCss https://raw.githubusercontent.com/stormsye/eures-userscripts/0.2.x/sidebar/sidebar.css
// @grant		GM_addStyle
// @grant		GM_getResourceText

GM_addStyle(GM_getResourceText(sidebarCss));

createSidebar = function(toggleKey = 120, defaultCollapsed = true) {
    const STATE_OPEN = "expanded";
    const STATE_CLOSED = "collapsed";

    let sidebarHtml = `
        <div id="fullSidebar" class="${defaultCollapsed ? STATE_CLOSED : STATE_OPEN}">
            <div id="fullSidebarContent"></div>
            <div id="fullSidebarCollapser"></div>
        </div>
        `;

    $("body").append(sidebarHtml);

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

    return {
        toggleSidebar: toggleSidebar
    };
};