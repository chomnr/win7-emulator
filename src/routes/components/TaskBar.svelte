<script lang="ts">
    import { onMount } from 'svelte';
    import { TogglableStartMenu, CurrentTime, CurrentDate, TaskManager, type IProgramManager } from '../stores';
    import { ProgramFilter, type ComputerProgram } from '../../programs';

    let whitelist: string[] = [
        'win7-startmenu__content',
        'win7-startmenu__group',
        'win7-avatar',
        'win7-frame',
        'win7-startmenu__group--divider',
        'magnify',
    ];

    let processes: ComputerProgram[];

    let ie9 = ProgramFilter.FindById('ie9');

    function toggleStartMenu() {
        if ($TogglableStartMenu == false) {
            TogglableStartMenu.set(true);
        } else {
            TogglableStartMenu.set(false);
        }
    }

    function checkForOutsideClick(e: any) {
        const clickedOnWhitelist = whitelist.some(
            (item) => e.target.className.includes(item) || e.target?.id === 'startmenu_input',
        );

        if (clickedOnWhitelist) {
            return;
        }

        if (e.target.id === 'button_startmenu') {
            return;
        }

        if ($TogglableStartMenu) {
            TogglableStartMenu.set(false);
        }
    }

    function setupClickListeners() {
        document.addEventListener('click', checkForOutsideClick);
    }

    TaskManager.subscribe((event: IProgramManager) => {
        processes = event.processes;
    });

    onMount(() => {
        setupClickListeners();
    });
</script>

<div class="win7-taskbar win7--aero win7-taskbar--aero--additives">
    <div class="win7-taskbar__content win7-taskbar__content--use-flex">
        <div class="win7-taskbar__group win7-taskbar__group--use-remaining-space taskbar__group--horizontal-padding">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            {#if $TogglableStartMenu}
                <div class="win7-taskbar__program--test">
                    <div
                        role="button"
                        tabindex="0"
                        on:click={toggleStartMenu}
                        id="button_startmenu"
                        class="win7-taskbar__program win7-taskbar__program--startmenu--glow"
                        style="margin-right: 10px;"
                    />
                </div>
            {:else}
                <div class="win7-taskbar__program--test">
                    <div
                        role="button"
                        tabindex="0"
                        on:click={toggleStartMenu}
                        id="button_startmenu"
                        class="win7-taskbar__program win7-taskbar__program--startmenu"
                        style="margin-right: 10px;"
                    />
                </div>
            {/if}

            <div class="win7-taskbar__program--test">
                <div
                    role="button"
                    tabindex="0"
                    id="button_startmenu"
                    style="width: 30px;height:30px;"
                    class={ie9?.GetIcon().string()}
                />
            </div>

            {#each processes as program}
                {#if program.GetId() != 'ie9'}
                    <div class="win7-taskbar__program--test">
                        <div
                            role="button"
                            tabindex="0"
                            id="button_startmenu"
                            style="width: 30px;height:30px;"
                            class={program.GetIcon().string()}
                        />
                    </div>
                {/if}
            {/each}
        </div>
        <div
            class="win7-taskbar__group win7-taskbar__group--far-right win7-taskbar__group--small-gap win7-taskbar__group--align-programs taskbar__group--horizontal-padding"
        >
            <div class="win7-taskbar__program win7-taskbar__program--list-programs font-xs" />
            <div
                class="win7-taskbar__program win7-taskbar__program--with-border win7-taskbar__program--hover win7-taskbar__program--battery"
            />
            <div
                class="win7-taskbar__program win7-taskbar__program--with-border win7-taskbar__program--hover win7-taskbar__program--connection"
            />
            <div
                class="win7-taskbar__program win7-taskbar__program--with-border win7-taskbar__program--hover win7-taskbar__program--network-audio-3"
            />
            <div
                class="win7-taskbar__program win7-taskbar__program--time win7-taskbar__program--fit-content win7-taskbar__program--time--left-padding font-segou_ui font-xs white"
            >
                <div>{$CurrentTime}</div>
                <div>{$CurrentDate}</div>
            </div>
        </div>
    </div>
</div>
