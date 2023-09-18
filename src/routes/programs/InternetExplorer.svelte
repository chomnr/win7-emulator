<script lang="ts">
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import WindowBase from '../components/WindowBase.svelte';
    import WebPagePortfolio from '../components/WebPagePortfolio.svelte';

    import '../webpage.css';
    import { onMount } from 'svelte';
    import { LEET } from '../../effects';
    import { TaskManager, type IProgramManager, CommandManager, WebsiteStage } from '../stores';
    import { CommandStatus } from '../../commands';
    //
    // Internet Explorer
    //

    let program: ComputerProgram = ProgramFilter.Find('ie9')!;

    /*
    CommandManager.subscribe((e) => {
        if (e.execution != undefined) {
            let command = e.execution.command;

            if (command.GetCommand() == 'ovrs authenticate') {
                let status: CommandStatus = e.execution.status;
                if (status == CommandStatus.PENDING) {
                    stage = 1;
                    WebsiteStage.set(0);
                }

                if (status == CommandStatus.FAILED) {
                    stage = 2;
                }

                if (status == CommandStatus.FINISHED) {
                    stage = 3;
                }
                console.log(stage);
            }
        }
    });
    */

    //var div_command: HTMLElement | null;
    //var div_command_input: HTMLElement | null;

    //ar leet_is_solved: Boolean = false;

    /*
    let processes: ComputerProgram[];

    TaskManager.subscribe((event: IProgramManager) => {
        processes = event.processes;
    });

    onMount(() => {
        div_command = document.getElementById('div_command');
        //@ts-ignore
        div_command_input = document.getElementById('div_command_input');

        function ChangeCommandInput(input: string) {
            if (div_command_input != null) {
                div_command_input.style.opacity = '0';
                setTimeout(function () {
                    //@ts-ignore
                    div_command_input.innerText = input;

                    //@ts-ignore
                    div_command_input.style.opacity = '1';
                }, 500);
            }
        }

        function ApplyLeetEffect() {
            let leet_title: LEET = new LEET('branding_title', 50, 50); // 50,50 perfect sync with 100,30
            let leet_position: LEET = new LEET('branding_position', 100, 30); //100, 30 perfect sync with 50 /50

            leet_title.ApplyEffect();
            leet_position.ApplyEffect();

            setTimeout(() => {
                leet_is_solved = true;
                setTimeout(() => {
                    ChangeCommandInput('portfolio.exe');
                }, 2600);
            }, 5000);
        }

        function ApplyInitalWhite() {}

        ApplyLeetEffect();
        ApplyInitalWhite();
    });
    */
</script>

<WindowBase {program} isWebSite={true} showTitle={false} openOnVisit={true}>
    <div id={program.GetWebPage().string()} class="win7-program__explorer__webpage">
        <div class="webpage">
            {#if $WebsiteStage == 3}
                <div class="branding">
                    <div class="group column">
                        <div id="branding_title" class="title">ZELJKO VRANJES</div>
                        <div id="branding_position" class="position">FULL STACK ENGINEER</div>
                    </div>
                    <div class="group float-right flex-1">
                        <div style="margin-left: auto;">
                            <!--right side-->
                        </div>
                    </div>
                </div>
                <div class="socials">
                    <i class="icon github animate" />
                    <i class="icon x animate" style="animation-duration: 2s" />
                    <i class="icon ycombinator animate" style="animation-duration: 3s" />
                </div>

                <div class="begin-screen" />
                <div class="body">asddsa</div>
            {/if}

            <div class="group center full-width full-height">
                <!-- Require Command Injection -->

                {#if $WebsiteStage != 3}
                    <div class="command-injection">
                        {#if $WebsiteStage == 0}
                            <div class="command">
                                Unlock the website by running '<span class="emphasis">ovrs authenticate</span>' in the
                                cmd.
                            </div>
                        {/if}

                        {#if $WebsiteStage == 1}
                            <div class="command">Recieving request loading..</div>
                        {/if}

                        {#if $WebsiteStage == 2}
                            <div class="command">something went wrong rerun the command.</div>
                        {/if}
                    </div>
                {/if}
            </div>
            <div style="font-size:0.7rem;" class="text-center code-font">this website is protected by Overseer.NET</div>
        </div>
        <!--
        <div class="webpage">
            <div class="branding">
                <div class="group column">
                    <div id="branding_title" class="title">ZELJKO VRANJES</div>
                    <div id="branding_position" class="position">FULL STACK ENGINEER</div>
                </div>
                <div class="group float-right flex-1">
                    <div style="margin-left: auto;">
                        <div class="code-font" style="display:flex;">
                            <div id="div_command">execute_program</div>
                            (<span style="color: #00FF00;">'</span><span id="div_command_input" style="color: #00FF00;"
                                >bruteforce.exe</span
                            ><span style="color: #00FF00;">'</span>)
                        </div>
                    </div>
                </div>
            </div>
            {#if leet_is_solved}
                <div class="socials">
                    <i class="icon github animate" />
                    <i class="icon x animate" style="animation-duration: 2s" />
                    <i class="icon ycombinator animate" style="animation-duration: 3s" />
                </div>
            {/if}

            <div class="begin-screen" />
            <div class="body">asddsa</div>
        </div>
    </div>
    -->
    </div></WindowBase
>
