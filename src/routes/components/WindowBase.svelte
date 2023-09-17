<script lang="ts">
    import { onMount } from 'svelte';
    import type { ComputerProgram } from '../../programs';
    import { TaskManager, type IProgramManager, CmdContentTracker, IsConnectedToBruteExpose } from '../stores';
    import Draggable from './Draggable.svelte';
    import { browser } from '$app/environment';
    import TaskBar from './TaskBar.svelte';
    import { ToggleMinimization } from '../../helper';

    export let program: ComputerProgram;
    export let showTitle: Boolean = true;
    export let isWebSite = false;

    export let responsive = true;

    // custom title for the program.
    export let title: string | undefined = undefined;

    // whether the program should open when the person
    // initially visits the website.

    // width and height of window
    export let width = 1200;
    export let height = 700;

    const c_width = width;
    const c_height = height;

    // position of window
    let pos_x = 0;
    let pos_y = 0;

    // check if window is maximized or not
    let isMaximized = false;

    // check if window is open or not
    let isWindowOpen = false;

    // check if application should be in
    // responsive mode or not.
    let isInResponsiveMode = false;

    /**
     * Automatically adjust the dimensions of the program when
     * the user visits the website.
     */
    function AutoAdjustDimension() {
        var target: HTMLElement = program.GetWindow().html();

        if (window.innerWidth < 1203 && isWindowOpen && isWebSite) {
            // do adjustments
            isInResponsiveMode = true;
            width = window.innerWidth - 100;
        } else {
            if (target != null) {
                width = c_width;
                height = c_height;

                isInResponsiveMode = false;
            }
        }
    }

    /**
     * This function closes the program's window.
     */
    function CloseWindow() {
        TaskManager.CloseProcess(program);
        TaskManager.SetUsing(undefined);
        if (program.GetId() == 'cmd') {
            CmdContentTracker.set(1);
        }

        if (program.GetId() == 'bruteexpose') {
            $IsConnectedToBruteExpose = false;
        }
    }

    /**
     * This function maximize's the program's window that
     * clicked to maximize.
     */
    function MaximizeWindow() {
        let p_window = program.GetWindow().html();
        if (isWebSite && !isMaximized) {
            p_window.style.top = '0';
            p_window.style.width = '100vw';
            p_window.style.height = '96vh';
            isMaximized = true;
        } else {
            p_window.style.top = '10%';
            p_window.style.width = width + 'px';
            p_window.style.height = height + 'px';
            isMaximized = false;
        }
    }

    function ResetZIndex(processes: ComputerProgram[], exclude: ComputerProgram) {
        var filter_processes = processes.filter((remove) => remove !== exclude);

        for (let i = 0; i < filter_processes.length; i++) {
            filter_processes[i].GetWindow().html().style.zIndex = '4';
        }
    }

    function ResetActiveControls(processes: ComputerProgram[], exclude: ComputerProgram) {
        var filter_processes = processes.filter((remove) => remove !== exclude);

        for (let i = 0; i < filter_processes.length; i++) {
            var html = filter_processes[i].GetControls().html();
            html.classList.remove('active');
        }
    }

    /**
     * Subscribes to 'TaskManager'; this helps keep track
     * of whether the current program window should be open
     * or closed & adjusts the position of the div.
     */
    TaskManager.subscribe((event: IProgramManager) => {
        if (event.using == undefined) {
            if (browser) {
                setTimeout(() => {
                    ResetActiveControls(event.processes, event.using!);
                }, 10);
            }
        }
        if (program == event.using) {
            pos_y = (window.innerHeight / 1.1) * -1;
            if (browser) {
                setTimeout(() => {
                    ResetZIndex(event.processes, event.using!);
                    ResetActiveControls(event.processes, event.using!);
                    if (program.GetWindow().html() != null) {
                        program.GetWindow().html().style.zIndex = '5';
                    }
                }, 10);
            }
        }
        if (event.processes.includes(program) && !isWindowOpen) {
            isWindowOpen = true;
            if (browser) {
                if (responsive) {
                    AutoAdjustDimension();
                }
                setTimeout(() => {
                    if (program == event.using) {
                        program.GetControls().html().classList.add('active');
                    }
                    if (event.last != null && event.last.GetWindow().html() != undefined && event.last != program) {
                        event.last.GetControls().html().classList.remove('active');
                    }
                }, 10);
            }
        }

        if (!event.processes.includes(program) && isWindowOpen) {
            isWindowOpen = false;
            TaskManager.SetLast(program);
            AutoAdjustDimension();
        }
    });

    /**
     * What we want to do when the website gets mounted.
     */
    onMount(() => {
        // Set the dimension of the window when the website
        // gets mounted.
        if (responsive) {
            // Listen to when the client resize their window.
            window.addEventListener('resize', (e) => {
                AutoAdjustDimension();
            });
        }
    });
</script>

{#if isWindowOpen}
    <Draggable left={pos_x} top={pos_y} {program}>
        {#if isWebSite}
            <div
                id={program.GetWindow().string()}
                class="win7-program__explorer"
                style="width: {width}px;height: {height}px;"
            >
                <div id={program.GetHandle().string()} class="win7 win7-program__explorer__handle" />

                <div class="win7 win7-program__explorer__controls">
                    <div
                        id={program.GetControls().string()}
                        class="title-bar"
                        style="background: none;border: none;box-shadow: none;"
                    >
                        <div class="title-bar-controls">
                            <button on:click={() => ToggleMinimization(program)} aria-label="Minimize" />
                            <button on:click={MaximizeWindow} aria-label="Maximize" />
                            <button on:click={CloseWindow} aria-label="Close" />
                        </div>
                    </div>

                    {#if showTitle}
                        <div style="display:flex;gap:5px;;flex: 1;align-items:center;margin-left: 3px;">
                            {#if title === undefined}
                                <div style="width: 17px;height:17px;" class={program.GetIcon().string()} />
                                <div class="title-bar-text" style="font-size: 0.7rem;opacity:0.5;">
                                    {program.GetName()}
                                </div>
                            {:else}
                                <div style="width: 17px;height:17px;" class={program.GetIcon().string()} />
                                <div class="title-bar-text" style="font-size: 0.7rem;opacity:0.5;">
                                    {title}
                                </div>
                            {/if}
                        </div>
                    {/if}
                </div>

                {#if !isInResponsiveMode}
                    <div
                        class="win7-program__explorer__group"
                        style="gap:3px;padding-left:5px;position:relative;top:7px;width:fit-content;"
                    >
                        <button
                            id="ie9_backward_btn"
                            class="aero-button__circular aero-button__circular--medium aero-button__circular--disabled"
                        >
                            <i class="aero-button__circular--left-icon" />
                        </button>
                        <button
                            id="ie9_forward_btn"
                            class="aero-button__circular aero-button__circular--small aero-button__circular--disabled"
                        >
                            <i class="aero-button__circular--right-icon transform-right" />
                        </button>

                        <div id={program.GetSearchControls().string()} class="win7">
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
                    </div>
                {/if}

                <div class="win7-program__explorer__group win7-program__explorer__group--fill">
                    <slot />
                </div>
            </div>
        {:else}
            <div
                id={program.GetWindow().string()}
                class="win7 win7-program__application"
                style="width:{width}px;height: {height}px"
            >
                <div class="window">
                    <div
                        id={program.GetHandle().string()}
                        class="win7 win7-program__explorer__handle"
                        style="height:28px;"
                    />

                    <div id={program.GetControls().string()} class="title-bar">
                        {#if showTitle}
                            {#if title == undefined}
                                <div class="title-bar-text" style="display:flex; gap: 3px;align-items:center;">
                                    <div style="width: 17px;height:17px;" class={program.GetIcon().string()} />
                                    {program.GetName()}
                                </div>
                            {:else}
                                <div class="title-bar-text" style="display:flex; gap: 3px;align-items:center;">
                                    <div style="width: 17px;height:17px;" class={program.GetIcon().string()} />
                                    {title}
                                </div>
                            {/if}
                        {:else}
                            <div class="title-bar-text" style="display:flex; gap: 3px;align-items:center;" />
                        {/if}

                        <div class="title-bar-controls">
                            <button on:click={() => ToggleMinimization(program)} aria-label="Minimize" />
                            <button on:click={MaximizeWindow} aria-label="Maximize" />
                            <button on:click={CloseWindow} aria-label="Close" />
                        </div>
                    </div>
                    <div class="window-body" style="height: {height}px;">
                        <slot />
                    </div>
                </div>
            </div>
        {/if}
    </Draggable>
{/if}
