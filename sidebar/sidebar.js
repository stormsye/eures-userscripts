// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        GM_addStyle

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

GM_addStyle(`
    #fullSidebar {
        position:                 fixed;
        left:                     0;
        top:                      50%;
        z-index:                  5000;
        opacity:                  0.9;
        display:                  inline-block;
    }

    #fullSidebar.collapsed {
        transform:                translate(-80px, -50%);
        transition:               transform 1s;
    }

    #fullSidebar.expanded {
        transform:                translate(0px, -50%);
        transition:               transform 1s;
    }

    #fullSidebarContent {
        display:                  inline-block;
        vertical-align:           middle;
        width:                    80px;
        min-height:               300px;
        max-height:               600px;
        background:               black;
        opacity:                  0.85;
        float:                    left;
        padding:                  3px;
    }

    #fullSidebarCollapser {
        display:                  inline-block;
        vertical-align:           middle;
        width:                    10px;
        border-top:               60px solid transparent;
        border-left:              15px solid black;
        border-bottom:            60px solid transparent;
        opacity:                  0.9;
        cursor:                   pointer;
    }
`);