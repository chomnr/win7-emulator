<script lang="ts">
    import { onMount } from "svelte";
    import WebPagePortfolio from "./WebPagePortfolio.svelte";
    import { TogglableStartMenu } from "../stores";

    
    onMount(() => {
        /* Window Resize */
        function initialResizeWindow(){
            var ie_window: HTMLElement | null = document.getElementById("ie_window");
            if (ie_window != null) {
                ie_window.style.width = (window.innerWidth - 300) + "px";
                ie_window.style.height = (window.innerHeight - 200) + "px";

                ie_window.style.minWidth = 386 + "px";
                ie_window.style.minHeight = 300 + "px";

                /* Additional */
                var a: HTMLElement | null = document.getElementById("ie9_search_controls");
                var b: HTMLElement | null = document.getElementById("ie9_tabs");
                var c: HTMLElement | null = document.getElementById("ie9_backward_btn");
                var d: HTMLElement | null = document.getElementById("ie9_forward_btn");

                if (window.innerWidth <= 998) {
                    a.style.display = "none"
                    b.style.display = "none"
                    c.style.display = "none"
                    d.style.display = "none"
                }

                if (window.innerHeight <= 998 && window.innerHeight <= 747 ) {
                    a.style.display = "none"
                    b.style.display = "none"
                    c.style.display = "none"
                    d.style.display = "none"
                }
            }
        }

        initialResizeWindow();


        function resizeMobileWindow() {
            var ie_window: HTMLElement | null = document.getElementById("ie_window");
            
            if (ie_window != null) {

            }
        }

        jQuery(function() {
            jQuery("#ie_window").draggable({
                handle: "#ie_window_handle",
                drag: function( event: any, _: any ) {
                    if ($TogglableStartMenu) {
                        // If we drag the window close the start menu if open.
                        TogglableStartMenu.set(false);
                    }
                }
            });
        });
    });
</script>



<div id="ie_window" class="win7-program__explorer">
    <div id="ie_window_handle" class="win7-program__explorer__handle"></div>
    <!-- IE9 Browser Controls -->
    <div class="win7 win7-program__explorer__controls">
        <div class="win7">
            <div
                class="title-bar active"
                style="background: none;border: none;box-shadow: none;"
            >
                <div class="title-bar-controls active">
                    <button aria-label="Minimize" />
                    <button aria-label="Maximize" />
                    <button aria-label="Close" />
                </div>
            </div>
        </div>
    </div>
    <!-- IE9 Main Controls -->
    <div class="win7-program__explorer__group" style="gap:3px;padding-left:5px;position:relative;top:7px;width:fit-content;">
        <!-- Navigator  -->
        <button id="ie9_backward_btn" class="aero-button__circular aero-button__circular--medium aero-button__circular--disabled">
            <i class="aero-button__circular--left-icon"></i>
        </button>
        <button id="ie9_forward_btn" class="aero-button__circular aero-button__circular--small aero-button__circular--disabled ">
            <i class="aero-button__circular--right-icon transform-right"></i>
        </button>
        <!-- Search Box -->
        <div id="ie9_search_controls" class="win7">
            <div class="aero-input disabled">
                <div class="icon favicon-portfolio" />
                <input
                    class="icon-format font-xxs medium-big-w"
                    placeholder="https://zeljko.me/portfolio"
                    disabled
                />
                <div class="icon magnify-2 transform-flip" />
                <div class="icon down-arrow" />
                <div class="icon refresh" />
                <div class="icon close" />
            </div>
        </div>
        <!-- Tab -->
        <div id="ie9_tabs" class="win7-program__explorer__tabgroup">
            <div class="win7-program__explorer__tabgroup__tab active">
                <div id="ie9_tab-portfolio" class="favicon-portfolio" style="width:20px;height:20px;"></div>
                 Zeljko Portfolio site
            </div>
            <!--
            <div id="ie9_tab-resume" class="win7-program__explorer__tabgroup__tab">my cool resume dude.</div>\
            -->
        </div>
    </div>
    <div class="win7-program__explorer__group win7-program__explorer__group--fill" style="padding: 5px;padding-top:0px;" >
        <!-- Webpage -->
        <div class="win7-program__explorer__webpage">
            <WebPagePortfolio></WebPagePortfolio>
        </div>
    </div>
</div>