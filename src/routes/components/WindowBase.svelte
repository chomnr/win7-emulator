<script lang="ts">
    import { onMount } from 'svelte';
    import type { ComputerProgram } from '../../programs';
    import { TaskManager, type IProgramManager } from '../stores';
    import Draggable from './Draggable.svelte';
    import { browser } from '$app/environment';
    import TaskBar from './TaskBar.svelte';

    export let program: ComputerProgram;
    export let showTitle: Boolean = true;
    export let isWebSite = false;

    // custom title for the program.
    export let title: string | undefined = undefined;

    // whether the program should open when the person
    // initially visits the website.

    // width and height of window
    export let width = 1200;
    export let height = 700;

    // check if window is maximized or not
    var isMaximized = false;

    // check if window is open or not
    var isWindowOpen = false;

    // check if application should be in
    // responsive mode or not.
    var isInResponsiveMode = false;

    /**
     * Automatically adjust the dimensions of the program when
     * the user visits the website.
     */
    function AutoAdjustDimensionOnVisit() {
        var target: HTMLElement = program.GetWindow().html();
        if (window.innerWidth < 1203 && isWindowOpen && isWebSite) {
            // do adjustments
            isInResponsiveMode = true;
        } else {
            if (target != null) {
                // target.style.width = width.toString() + "px";
                //target.style.height = height.toString() + "px";

                //target.style.margin = "auto";

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
    }

    /**
     * This function maximize's the program's window that
     * clicked to maximize.
     */
    function MaximizeWindow() {
        let p_window = program.GetWindow().html();
        if (isWebSite && !isMaximized) {
            p_window.style.position = 'absolute';
            p_window.style.top = '0';
            p_window.style.width = '100vw';
            p_window.style.height = '95vh';
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
        }
    });

    /**
     * What we want to do when the website gets mounted.
     */
    onMount(() => {
        // Set the dimension of the window when the website
        // gets mounted.
        AutoAdjustDimensionOnVisit();
        // Listen to when the client resize their window.
        window.addEventListener('resize', (e) => {
            AutoAdjustDimensionOnVisit();
        });
    });
</script>

<Draggable {program}>
    {#if isWindowOpen}
        {#if isWebSite}
            <div id={program.GetWindow().string()} class="win7-program__explorer">
                <div id={program.GetHandle().string()} class="win7 win7-program__explorer__handle" />

                <div class="win7 win7-program__explorer__controls">
                    <div
                        id={program.GetControls().string()}
                        class="title-bar"
                        style="background: none;border: none;box-shadow: none;"
                    >
                        <div class="title-bar-controls">
                            <button aria-label="Minimize" />
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
                            <button aria-label="Minimize" />
                            <button on:click={MaximizeWindow} aria-label="Maximize" />
                            <button on:click={CloseWindow} aria-label="Close" />
                        </div>
                    </div>
                    <div class="window-body" style="height: {height}px;overflow-y: auto;">
                        <slot />
                    </div>
                </div>
            </div>
        {/if}
    {/if}
</Draggable>
