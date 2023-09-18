<script lang="ts">
    import { browser } from '$app/environment';
    import type { ComputerProgram } from '../../programs';
    import { TaskManager, TogglableStartMenu } from '../stores';

    export let left = 0;
    export let top = 0;

    export let program: ComputerProgram;

    let moving = false;
    let initial = true;

    function onMouseDown(e: MouseEvent) {
        if (e.target != null) {
            var id = e.target.id;
            var isHandle = id == program.GetHandle().string();
            program.GetControls().html().classList.add('active');
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
            initial = false;
        }
    }

    function onMouseUp(e: MouseEvent) {
        moving = false;
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
        position: relative;
    }
</style>
