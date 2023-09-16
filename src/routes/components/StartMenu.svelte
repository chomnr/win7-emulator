<script lang="ts">
    import { onMount } from 'svelte';
    import { ComputerCategories, ComputerProgram, ProgramFilter, program_prefix } from '../../programs';
    import { SequentialSearch } from '../../helper';
    import { TaskManager } from '../stores';

    // Elements
    let startmenu_input: HTMLElement;

    let startmenu_main_content: HTMLElement;
    let startmenu_side_content: HTMLElement;

    let avatar: HTMLElement;

    let startmenu_all_programs: HTMLElement;

    // Filtration (ComputerPrograms)

    let programs_f = ProgramFilter.GetPrograms();
    let program_f_count: number = 0;
    let program_category: string;

    function FilterOnInput() {
        let input = startmenu_input.value;

        if (input.length == 0) {
            program_f_count = 0;
            programs_f = ProgramFilter.GetPrograms();
            program_category = '';
            return;
        }

        programs_f = SequentialSearch(input, ProgramFilter.GetPrograms());
        program_category = SmartCategorize(programs_f);
        program_f_count = programs_f.length;
    }

    function SmartCategorize(array: ComputerProgram[]): string {
        if (array.length > 1) {
            for (let i = 0; i < array.length; i++) {
                if (array[0].GetCategory() != array[i].GetCategory()) {
                    return ComputerCategories.ALL;
                }
            }
        }
        return array[0].GetCategory();
    }

    onMount(() => {
        function ResizeStartMenuOnInput() {
            startmenu_input.addEventListener('input', (e) => {
                var input_length = startmenu_input.value.length;
                if (input_length > 0) {
                    startmenu_all_programs.style.display = 'none';
                    startmenu_side_content.style.display = 'none';
                    // startmenu_main_content.style.transition = 'width 0.1s';
                    //startmenu_main_content.style.transition = 'opacity 1s';

                    startmenu_main_content.style.width = '100%';

                    setTimeout(() => {
                        //startmenu_all_programs.style.display = 'none';
                        //startmenu_side_content.style.display = 'none';
                        //startmenu_main_content.style.opacity = '1';
                        //startmenu_main_content.style.opacity = '1';
                        // startmenu_main_content.style.opacity = '1';
                        /*startmenu_side_content.style.position = "absolute";*/
                        //startmenu_main_content.style.opacity = "1";
                        //startmenu_main_content.style.width = "100%";
                    }, 150);
                } else {
                    // detransition
                    startmenu_all_programs.style.display = 'flex';
                    startmenu_all_programs.style.width = 'var(--startmenu-content-width)';
                    startmenu_main_content.style.width = 'var(--startmenu-content-width)';
                    startmenu_side_content.style.display = 'flex';

                    startmenu_side_content.style.opacity = '1';
                    startmenu_side_content.style.transition = 'opacity 1s';
                }
            });
        }
        ResizeStartMenuOnInput();
    });
</script>

<div id="win7_startmenu" class="win7-startmenu win7--aero win7-startmenu--aero--additives">
    <div
        bind:this={startmenu_main_content}
        id="startmenu_main_content"
        class="win7-startmenu__content win7-startmenu__content--with-design"
    >
        <div
            class="win7-startmenu__group win7-startmenu__group--default-design justify-left win7-startmenu__group--column y-inherit"
        >
            <div class="display:flex;flex-direction:column;">
                {#if program_f_count != 0}
                    <div style="display: flex;align-items:center;gap: 12px;padding-top: 13px;">
                        <span>&nbsp;{program_category}&nbsp;({program_f_count})</span>
                        <div class="win7-startmenu__group--divider" style="width: 100%;" />
                    </div>
                    <div style="padding-top: 6px;">
                        {#each programs_f as program}
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            {#if program.GetId() == 'cmd'}
                                <!--SMALL DETAIL-->
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div
                                    class="win7-startmenu__group__item"
                                    style="display: flex;font-size:0.8rem;gap:2px;padding-top: 2px;padding: 2px;padding-left:15px;"
                                    on:click={() => TaskManager.AddProcess(program)}
                                >
                                    <div
                                        class="win7-startmenu__group__item--icon x-xxsmall {program.GetIcon().string()}"
                                    />
                                    <div>{program.GetId()}</div>
                                </div>
                            {:else}
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div
                                    class="win7-startmenu__group__item"
                                    style="display: flex;font-size:0.8rem;gap:2px;padding-left:12;padding-top: 2px;padding-left:15px;"
                                    on:click={() => TaskManager.AddProcess(program)}
                                >
                                    <div
                                        class="win7-startmenu__group__item--icon x-xxsmall {program.GetIcon().string()}"
                                    />
                                    <div>{program.GetName()}</div>
                                </div>
                            {/if}
                        {/each}
                    </div>
                {:else}
                    {#each programs_f as program}
                        {#if program.GetId() == 'ie9'}
                            <div class="win7-startmenu__group__item">
                                <div class="win7-startmenu__group__item--icon {program.GetIcon().string()}" />
                                &nbsp;&nbsp;{program.GetName()}
                            </div>
                        {/if}
                    {/each}
                {/if}
            </div>
            <!-- Startmenu items here. 
            {#each programs_f as program}
                <div class="win7-startmenu__group__item">
                    <div class="win7-startmenu__group__item--icon {program.GetIcon().string()}" />
                    &nbsp;&nbsp;{program.GetName()}
                </div>
            {/each}
            -->
        </div>

        <div
            bind:this={startmenu_all_programs}
            class="win7-startmenu__group win7-startmenu__group--default-design align-center justify-left x-semi-large y-small font-small"
            style="border-radius: 0;"
        >
            ⏵&nbsp;&nbsp;&nbsp; All Program
        </div>

        <div
            class="win7-startmenu__group win7-startmenu__group--default-design justify-left win7-startmenu__group--light-blue y-medium"
            style="border-radius: 0 0 8px 8px;"
        >
            <div class="aero-input default" style="margin: 5px;">
                <input
                    bind:this={startmenu_input}
                    on:input={FilterOnInput}
                    id="startmenu_input"
                    class="icon-format font-xxs font-italic xsmall"
                    placeholder="Search programs and files"
                />
                <div class="icon magnify-2 transform-flip" />
            </div>
        </div>
    </div>
    <div
        bind:this={startmenu_side_content}
        id="startmenu_side_content"
        class="win7-startmenu__content win7-startmenu__group--column"
    >
        <div bind:this={avatar} class="win7-avatar-builder" style="top:-50px;left:-7px;">
            <img class="win7-avatar" src="https://d2hqjspxd4b0fs.cloudfront.net/win7/profile/avatar.png" alt="avatar" />
            <img class="win7-frame" src="https://d2hqjspxd4b0fs.cloudfront.net/win7/profile/frame.png" alt="frame" />
        </div>
        <div
            class="win7-startmenu__group win7-startmenu__group--column justify-left x-fit y-fit font-small"
            style="margin:5px;height: 700px;position:relative;top:0px;"
        >
            <div class="aero-button">
                <button>Zeljko</button>
            </div>
            <div class="aero-button">
                <button>Documents</button>
            </div>
            <div class="aero-button">
                <button>Pictures</button>
            </div>
            <div class="aero-button">
                <button>Music</button>
            </div>
            <div class="win7-startmenu__group--divider" />
            <div class="aero-button">
                <button>Games</button>
            </div>
            <div class="aero-button">
                <button>Computer</button>
            </div>
            <div class="win7-startmenu__group--divider" />
            <div class="aero-button">
                <button>Control Panel</button>
            </div>
            <div class="aero-button">
                <button>Device and Printers</button>
            </div>
            <div class="aero-button">
                <button>Default Programs</button>
            </div>
            <div class="aero-button">
                <button>Help and Support</button>
            </div>
            <!--
            <div class="aero-button" style="position:relative;top: 25px;width:fit-content;">
                <button class="shutdown">NOPE</button>
            </div>-->
        </div>
    </div>
</div>
