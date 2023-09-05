<script lang="ts">
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import { ActiveWindows, CurrentWindow, TaskManager, TogglableStartMenu } from '../stores';

    export let left = 370;
    export let top = 150;

    export let program: ComputerProgram;

    let moving = false;

    /**
     * Automatically adjust the z-index of the selected
     * window.
     */
    function AdjustPriority() {
        // if the startmenu is open close it.
        if ($TogglableStartMenu) {
            TogglableStartMenu.set(false);
        }

        //program.GetWindow().html().style.zIndex = '10';
    }

    function onMouseDown(e: MouseEvent) {
        // initial
        if ($CurrentWindow == undefined) {
            //CurrentWindow.set(program);
        }

        // null check
        if (e.target != null) {
            // get id of mousedown component
            var id = e.target.id;
            // check if it is a handle.
            var isHandle = id == program.GetHandle().string();
            // ensures that only one window has an active class.
            //if ($CurrentWindow != program) {
            //  $CurrentWindow.GetControls().html().classList.remove("active");
            //}

            program.GetControls().html().classList.add('active');
            // if it is a handle make it move and adjust the priority.
            TaskManager.SetUsing(program);
            if (isHandle) {
                moving = true;
                return;
            }
        }
    }

    function onMouseMove(e) {
        if (moving) {
            left += e.movementX;
            top += e.movementY;
        }
    }

    function onMouseUp(e: MouseEvent) {
        moving = false;
        if (e.target != null) {
            var targetProgram: ComputerProgram | undefined = ProgramFilter.Find(e.target.id);
            //CurrentWindow.set(targetProgram);
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section on:mousedown={onMouseDown} style="left: {left}px; top: {top}px;" class="draggable">
    <slot />
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
    .draggable {
        user-select: none;
        position: absolute;
    }
</style>
