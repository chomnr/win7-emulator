<script lang="ts">
    import type { ComputerProgram } from "../../programs";
    import { ActiveWindows, CurrentWindow } from "../stores";

    export let left = 370;
    export let top = 150;

    export let program: ComputerProgram;

    let moving = false;

    /**
     * Automatically adjust the z-index of the selected
     * window.
     */
    function AdjustPriority() {  
        program.GetWindow().html().style.zIndex = "5";
      
        if ($CurrentWindow != program && $ActiveWindows.length > 1) {
            $CurrentWindow.GetWindow().html().style.zIndex = "4";
        }
        /*
        if ($CurrentWindow == program) {
            $CurrentWindow.GetWindow().html().style.zIndex = "5";
        }*/
    }

    function onMouseDown(e: MouseEvent) {
        // initial
        if ($CurrentWindow == undefined) {
            CurrentWindow.set(program);
        }

        // null check
        if (e.target != null) {
            // get id of mousedown component
            var id = e.target.id;
            console.log(id);
            // check if it is a handle.
            var isHandle = id == program.GetHandle().string();
            // if it is a handle make it move and adjust the priority.
            if (isHandle) {
                moving = true;
                AdjustPriority();
            }
        }
    }

    function onMouseMove(e) {
        if (moving) {
            left += e.movementX;
            top += e.movementY;
        }
    }

    function onMouseUp() {
        moving = false;
        CurrentWindow.set(program);
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section
    on:mousedown={onMouseDown}
    style="left: {left}px; top: {top}px;"
    class="draggable"
>
    <slot />
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
    .draggable {
        user-select: none;
        position: absolute;
    }
</style>
