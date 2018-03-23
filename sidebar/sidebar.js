// Requires jquery

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