<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        jQuery(function () {
            jQuery("#windowtesting").draggable({
                handle: "#windowtesting_title",
            });
        });
    });
</script>

<div id="windowtesting" class="win7-program__explorer">
    <!-- IE9 Browser Controls -->
    <div class="win7 win7-program__explorer__controls">
        <div class="win7">
            <div
                id="windowtesting_title"
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
    <div class="win7-program__explorer__group" style="gap:3px;padding-left:5px;">
        <!-- Navigator  -->
        <button class="aero-button__circular aero-button__circular--medium aero-button__circular--disabled">
            <i class="aero-button__circular--left-icon"></i>
        </button>
        <button class="aero-button__circular aero-button__circular--small aero-button__circular--disabled ">
            <i class="aero-button__circular--right-icon transform-right"></i>
        </button>
        <!-- Search Box -->
        <div class="win7">
            <div class="aero-input disabled">
                <div class="icon favicon-portfolio" />
                <input
                    id="startmenu_input"
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
        <div class="win7-program__explorer__tabgroup">
            <div class="win7-program__explorer__tabgroup__tab active">
                <div class="favicon-portfolio" style="width:20px;height:20px;"></div>
                 Zeljko Portfolio site
            </div>
            <div class="win7-program__explorer__tabgroup__tab">my cool resume dude.</div>
        </div>
    </div>
</div>

<!--
<div id="windowtesting" class="win7" style="position:absolute;z-index:5;">
<div class="window active" style="max-width: 300px;min-width:800px">X
    <div id="windowtesting_title" class="title-bar">
      <div class="title-bar-text">&nbsp;</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
    <input type="search" placeholder="Search" />
    <div class="window-body has-space">
      <p>There's so much room for activities!</p>
    </div>
  </div>
</div>
-->
