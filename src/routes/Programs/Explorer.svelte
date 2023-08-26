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
            <div id="windowtesting_title" class="title-bar active" style="background: none;border: none;box-shadow: none;">
                <div class="title-bar-controls active">
                    <button aria-label="Minimize" />
                    <button aria-label="Maximize" />
                    <button aria-label="Close" />
                </div>
            </div>
        </div>
    </div>
    <!-- IE9 Main Controls -->
    <div class="win7">
        <div class="aero-input default">
            <input id="startmenu_input" class="icon-format font-xxs font-italic medium-big-w" placeholder="Search programs and files"/>
            <div class="icon magnify-2 transform-flip"></div>
            <div class="icon down-arrow"></div>
            <div class="icon refresh"></div>
            <div class="icon close"></div>
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
