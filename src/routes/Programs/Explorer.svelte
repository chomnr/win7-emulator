<script lang="ts">
    import { onMount } from "svelte";


    onMount(() => {

        jQuery(function() {
            jQuery("#windowtesting").draggable({
                handle: "#windowtesting_title"
            });
        });
    });
</script>


<div class="win7-program__explorer">
    dssdas
</div>

<!--
<div id="windowtesting" class="win7" style="position:absolute;z-index:5;">
<div class="window active" style="max-width: 300px;min-width:800px">
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
