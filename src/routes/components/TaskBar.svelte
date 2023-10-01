<script lang="ts">
    import { onMount } from 'svelte';
    import { TogglableStartMenu, CurrentTime, CurrentDate, TaskManager, type IProgramManager } from '../stores';
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import { ToggleMinimization } from '../../helper';

    import pressedIcon from '$lib/images/windows/orb-pressed.png';
    import defaultIcon from '$lib/images/windows/orb-default.png';

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
    let cmd = ProgramFilter.FindById('cmd');

    let network: HTMLElement;

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
        setInterval(() => {
            let random = Math.random();
            let random_network = Math.floor(Math.random() * (5 - 1 + 1) + 1);

            if (network != null) {
                let array = Array.from(network.classList);

                if (random < 0.4) {
                    network.classList.remove(array[3]);
                    network.classList.add('win7-taskbar__program--connection-' + random_network);
                }
            }
        }, 4000);
        setupClickListeners();
    });
</script>

<div class="win7-taskbar win7--aero win7-taskbar--aero--additives">
    <div class="win7-taskbar__content win7-taskbar__content--use-flex">
        <div class="win7-taskbar__group win7-taskbar__group--use-remaining-space taskbar__group--horizontal-padding">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            {#if $TogglableStartMenu}
                <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
                <img
                    alt="buttonpressed"
                    role="button"
                    tabindex="0"
                    on:click={toggleStartMenu}
                    id="button_startmenu"
                    class="win7-taskbar__program win7-taskbar__program--startmenu"
                    src={pressedIcon}
                    style="margin-right: 7px;"
                />
            {:else}
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
                <img
                    alt="buttondefault"
                    role="button"
                    tabindex="0"
                    on:click={toggleStartMenu}
                    id="button_startmenu"
                    class="win7-taskbar__program win7-taskbar__program--startmenu"
                    style="margin-right: 7px;"
                    src={defaultIcon}
                />
            {/if}

            {#if !processes.includes(ie9)}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="win7-taskbar__program--additional-item" on:click={() => TaskManager.AddProcess(ie9)}>
                    <div role="button" tabindex="0" style="width: 32px;height:32px;" class={ie9?.GetIcon().string()} />
                </div>
            {:else}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="win7-taskbar__program--additional-item active" on:click={() => ToggleMinimization(ie9)}>
                    <div role="button" tabindex="0" style="width: 32px;height:32px;" class={ie9?.GetIcon().string()} />
                </div>
            {/if}

            {#if !processes.includes(cmd)}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="win7-taskbar__program--additional-item" on:click={() => TaskManager.AddProcess(cmd)}>
                    <div role="button" tabindex="0" style="width: 32px;height:32px;" class={cmd?.GetIcon().string()} />
                </div>
            {:else}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="win7-taskbar__program--additional-item active" on:click={() => ToggleMinimization(cmd)}>
                    <div role="button" tabindex="0" style="width: 32px;height:32px;" class={cmd?.GetIcon().string()} />
                </div>
            {/if}

            {#each processes as program}
                {#if program.GetId() != 'ie9' && program.GetId() != 'cmd'}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div
                        class="win7-taskbar__program--additional-item active"
                        on:click={() => ToggleMinimization(program)}
                    >
                        <div
                            role="button"
                            tabindex="0"
                            style="width: 32px;height:32px;"
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
                bind:this={network}
                class="win7-taskbar__program win7-taskbar__program--with-border win7-taskbar__program--hover win7-taskbar__program--connection-3"
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
