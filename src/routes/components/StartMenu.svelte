<script lang="ts">
    import { onMount } from 'svelte';
    import { ProgramFilter } from '../../programs';

    onMount(() => {
        var startmenu_input: HTMLElement = document.getElementById('startmenu_input');
        var startmenu_main_content: HTMLElement = document.getElementById('startmenu_main_content');
        var startmenu_side_content: HTMLElement = document.getElementById('startmenu_side_content');
        var avatar: HTMLElement = document.getElementById('avatar_builder');
        var startmenu_all_programs: HTMLElement = document.getElementById('all_programs');

        function ResizeStartMenuOnInput() {
            startmenu_input.addEventListener('input', (e) => {
                var input_length = startmenu_input.value.length;
                if (input_length > 0) {
                    startmenu_all_programs.style.display = 'none';
                    startmenu_side_content.style.display = 'none';

                    /*startmenu_main_content.style.opacity = "0.4"
                startmenu_side_content.style.opacity = "0"*/

                    startmenu_main_content.style.width = '100%';
                    setTimeout(() => {
                        /*startmenu_side_content.style.position = "absolute";*/
                        //*startmenu_main_content.style.opacity = "1";*/
                        //startmenu_main_content.style.opacity = "1";
                        //startmenu_main_content.style.width = "100%";
                    }, 200);
                } else {
                    // detransition
                    startmenu_all_programs.style.display = 'flex';
                    startmenu_all_programs.style.width = 'var(--startmenu-content-width)';
                    startmenu_main_content.style.width = 'var(--startmenu-content-width)';
                    startmenu_side_content.style.display = 'flex';
                }
            });
        }

        ResizeStartMenuOnInput();
    });
</script>

<div id="win7_startmenu" class="win7-startmenu win7--aero win7-startmenu--aero--additives">
    <div id="startmenu_main_content" class="win7-startmenu__content win7-startmenu__content--with-design">
        <div
            class="win7-startmenu__group win7-startmenu__group--default-design justify-left win7-startmenu__group--column y-inherit"
        >
            <!-- Startmenu items here. -->
            {#each ProgramFilter.GetPrograms() as program}
                <div class="win7-startmenu__group__item">
                    <div class="win7-startmenu__group__item--icon {program.GetIcon().string()}" />
                    {program.GetName()}
                </div>
            {/each}
        </div>

        <div
            id="all_programs"
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
                    id="startmenu_input"
                    class="icon-format font-xxs font-italic xsmall"
                    placeholder="Search programs and files"
                    disabled
                />
                <div class="icon magnify-2 transform-flip" />
            </div>
        </div>
    </div>
    <div id="startmenu_side_content" class="win7-startmenu__content win7-startmenu__group--column">
        <div id="avatar_builder" class="win7-avatar-builder" style="top:-50px;left:-7px;">
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
