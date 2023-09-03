<script lang="ts">
    import { onMount } from "svelte";
    import type { ComputerProgram } from "../../programs";
    import { ProgramFilter, ProgramHelper } from "../../programs";
    import { ActiveWindows } from "../stores";
    import DesktopGrid from "./DesktopGrid.svelte";

    //todo resize it according to screen
    // it provides the basic functionality, minimize, maximize and close <windowbase> <windowbase program="InternetExplorer", isWebsite=true, showtitle = false></windowbase>
    export let program: ComputerProgram;
    export let showTitle: Boolean = true;
    export let isWebSite = false;

    export let openOnVisit = false;

    export let width = 1200;
    export let height = 700;

    var isMaximized = false;
    var isWindowOpen = false;

    function CloseWindow() {
        ProgramHelper.CloseWindow(program);
    }

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

    // Open and Close Subscriber
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
                        <div class="title-bar-text" style="font-size: 0.7rem;opacity:0.5;">
                            {program.GetName()}
                        </div>
                    </div>
                {/if}
            </div>

            {#if isWebSite}
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

            {#if isWebSite}
                <div
                    class="win7-program__explorer__group win7-program__explorer__group--fill"
                    style="padding: 5px;padding-top:0px;"
                >
                    <div class="win7-program__explorer__webpage">
                        <slot />
                    </div>
                </div>
            {:else}
                <div
                    class="win7-program__explorer__group win7-program__explorer__group--fill"
                    style="padding: 5px;padding-top:0px;"
                >
                    <slot />
                </div>
            {/if}
        </div>
    {:else}
        <div id={program.GetWindow().string()} class="win7 win7-program__application">
            <div class="window active">
                <div class="title-bar active">
                  <div class="title-bar-text">{program.GetName()}</div>
                  <div class="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button on:click={MaximizeWindow} aria-label="Maximize"></button>
                    <button on:click={CloseWindow} aria-label="Close"></button>
                  </div>
                </div>
                <div class="window-body has-space">
                  <slot/>
                </div>
              </div>
        </div>
    {/if}
{/if}
