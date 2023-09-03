<script lang="ts">
    import { onMount } from "svelte";
    import type { ComputerProgram } from "../../programs";
    import { ProgramHelper } from "../../programs";
    import { ActiveWindows } from "../stores";

    export let program: ComputerProgram;
    export let showTitle: Boolean = true;
    export let isWebSite = false;

    // whether the program should open when the person
    // initially visits the website.
    export let openOnVisit = false;

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
        if (window.innerWidth < 1203 && isWindowOpen) {
            target.style.width = "95%";
            isInResponsiveMode = true;
        } else {
            isInResponsiveMode = false;
            if (target != null) {
                target.style.width = width.toString() + "px";
                target.style.margin = "auto";
            }
        }
    }

    /**
     * This function closes the program's window.
     */
    function CloseWindow() {
        ProgramHelper.CloseWindow(program);
    }

    /**
     * This function maximize's the program's window that
     * clicked to maximize.
     */
    function MaximizeWindow() {
        let p_window = program.GetWindow().html();
        if (isWebSite && !isMaximized) {
            p_window.style.width = "100vw";
            p_window.style.height = "96vh";
            p_window.style.top = "0";
            p_window.style.left = "0";
            isMaximized = true;
        } else {
            p_window.style.width = width + "px";
            p_window.style.height = height + "px";
            p_window.style.top = "10%";
            isMaximized = false;
        }
    }

    /**
     * Subscribes to 'ActiveWindows'; this helps keep track
     * of whether the current program window should be open
     * or closed.
     */
    ActiveWindows.subscribe((current) => {
        if (current.includes(program)) {
            isWindowOpen = true;
        } else {
            isWindowOpen = false;
        }
        if (openOnVisit) {
            isWindowOpen = true;
            openOnVisit = false;
            ProgramHelper.OpenWindow(program);
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
        window.addEventListener("resize", (e) => {
            AutoAdjustDimensionOnVisit();
        });
    });
</script>

{#if isWindowOpen}
    {#if isWebSite}
        <div id={program.GetWindow().string()} class="win7-program__explorer">
            <div
                id={program.GetWindow().string() + "-handle"}
                class="win7 win7-program__explorer__handle"
            />

            <div class="win7 win7-program__explorer__controls">
                <div
                    class="title-bar active"
                    style="background: none;border: none;box-shadow: none;"
                >
                    <div class="title-bar-controls">
                        <button aria-label="Minimize" />
                        <button
                            on:click={MaximizeWindow}
                            aria-label="Maximize"
                        />
                        <button on:click={CloseWindow} aria-label="Close" />
                    </div>
                </div>

                {#if showTitle}
                    <div
                        style="display:flex;gap:5px;;flex: 1;align-items:center;margin-left: 3px;"
                    >
                        <div
                            style="width: 17px;height:17px;"
                            class={program.GetIcon().string()}
                        />
                        <div
                            class="title-bar-text"
                            style="font-size: 0.7rem;opacity:0.5;"
                        >
                            {program.GetName()}
                        </div>
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
                        <i
                            class="aero-button__circular--right-icon transform-right"
                        />
                    </button>

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
                </div>
            {/if}

            <div
                class="win7-program__explorer__group win7-program__explorer__group--fill">
                <div id="{program.GetWebPage().string()}" class="win7-program__explorer__webpage">
                    <slot />
                </div>
            </div>
        </div>
    {:else}
        <div
            id={program.GetWindow().string()}
            class="win7 win7-program__application"
        >
            <div class="window active">
                <div class="title-bar active">
                    <div class="title-bar-text">{program.GetName()}</div>
                    <div class="title-bar-controls">
                        <button aria-label="Minimize" />
                        <button
                            on:click={MaximizeWindow}
                            aria-label="Maximize"
                        />
                        <button on:click={CloseWindow} aria-label="Close" />
                    </div>
                </div>
                <div class="window-body has-space">
                    <slot />
                </div>
            </div>
        </div>
    {/if}
{/if}
