<script lang="ts">
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import WindowBase from '../components/WindowBase.svelte';
    import WebPagePortfolio from '../components/WebPagePortfolio.svelte';
    import { ActiveWindows } from '../stores';
    import { afterUpdate, onMount } from 'svelte';
    import { browser } from '$app/environment';

    //
    // BruteExpose
    //

    var program: ComputerProgram = ProgramFilter.Find('cmd')!;

    class ConsoleCommand {
        command: string;
        result: string;

        constructor(command: string, result: string) {
            this.command = command;
            this.result = result;
        }

        /**
         * Return the name of the command.
         *
         * @returns {string}
         */
        GetCommand(): string {
            return this.command;
        }

        /**
         * Return the result of the command.
         *
         * @returns {string}
         */
        GetResult(): string {
            return this.result;
        }
    }

    class ConsoleCommandFilter {
        /**
         * Check if a command exists or not.
         * @param command the desired command to check for
         */
        static Exist(command: string): Boolean {
            return commands.some((x) => x.GetCommand() == command);
        }

        /**
         * Finds a command if found returns ConsoleCommand
         * @param command the command you want to find.
         */
        static Find(command: string): ConsoleCommand | undefined {
            return commands.find((x) => x.GetCommand().toLowerCase() == command.toLowerCase());
        }
    }

    class ConsoleCommandHelper {
        /**
         * Run a command and return its result.
         * @param command the command you want to run
         */
        static RunCommand(command: string): string {
            if (ConsoleCommandFilter.Exist(command)) {
                return ConsoleCommandFilter.Find(command)?.GetResult()!;
            }
            return (
                "'" +
                command +
                "' is not recognized as an internal or external command, operable program or batch file."
            );
        }
    }

    var commands: ConsoleCommand[] = [
        new ConsoleCommand('ping', '<br>pong'),
        new ConsoleCommand(
            'help',
            'Basic set of commands to help you get to know me.<br>' +
                'ABOUT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Displays some basic information about me.<br>' +
                'ABOUT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Displays some basic information about me.<br>' +
                'ABOUT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Displays some basic information about me.<br>' +
                'ABOUT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Displays some basic information about me.<br>' +
                'ABOUT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Displays some basic information about me.<br>' +
                'ABOUT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Displays some basic information about me.<br>' +
                'ABOUT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Displays some basic information about me.<br>',
        ),
    ];

    // CMD Content Tracker
    var content_tracker = 1;

    /**
     * Manage the enter of command
     * @param event
     */
    function OnCommandEnter(event: KeyboardEvent) {
        var desiredKey = 'Enter';
        var cmd_input = document.getElementById('cmd_input_' + (content_tracker - 1));
        var cmd_results = document.getElementById('cmd_results_' + (content_tracker - 1));

        if (event.key == desiredKey) {
            cmd_input.disabled = true;
            content_tracker += 1;
            var result = ConsoleCommandHelper.RunCommand(cmd_input.value);
            cmd_results.innerHTML += result;
            /*
            if (ConsoleCommandFilter.Exist(cmd_input.value)) {
                console.log(cmd_input);
            }
            */
        }
        /*
        var cmd_input = document.getElementById('cmd_input');

        if (event.key == desiredKey) {
            if (ConsoleCommandFilter.Exist(cmd_input.value)) {
                //var a = cmd_manager?.cloneNode(true);
                //console.log(cmd_results);
                //CreateTerminalInput();
                CreateTerminalInput(cmd_manager);
                content_tracker += 1;
                cmd_input.innerHTML = 'help';
            }
        }
        */
    }

    function CreateTerminalInput(appendTo: HTMLElement | null) {
        var input_box = document.getElementById('cmd_input_box');
        var inputt = document.getElementById('cmd_input');

        input_box?.append(inputt as Node);
        /*
        var parent = document.createElement('div');
        parent.innerText = 'C:\\Users\\zeljko>';
        parent.className = 'program_cmd__input__box';

        var input = document.createElement('input');
        input.id = curr_input_id.toString();
        input.maxLength = 64;
        input.className = 'program_cmd__input';

        if (appendTo != null) appendTo.appendChild(parent);
        parent.appendChild(input);
        */
    }
    /*
    function ResetTerminal() {
        var parent = document.getElementById('cmd_manager');
        var input_box = document.getElementById('cmd_input_box');
        var cmd_result = document.getElementById('cmd_results');

        var a = input_box?.cloneNode(true);
        var b = cmd_result?.cloneNode(true);

        console.log(a);
        console.log(b);
        if (input_box != undefined && cmd_result != undefined && a != undefined && b != undefined) {
            curr_input_id++;
            curr_result_id++;

            input_box.id = curr_input_id.toString();
            cmd_result.id = curr_result_id.toString();
            //input_box.remove();
            //cmd_result.remove();

            //console.log(a);
            parent?.appendChild(a);
            parent?.appendChild(b);
            console.log('BOOM!');
        }
    }
    */
</script>

<WindowBase {program} isWebSite={false} showTitle={true} title="C:\Windows\system32\cmd.exe" width={900} height={400}>
    <div id={program.GetWebPage().string()} class="program_cmd">
        <div>Microsoft Windows [Version 6.1.7601]</div>
        <div>Copyright (c) 2009 Microsoft Corporation. All rights reserved.</div>
        <div>&nbsp;</div>

        <div id="cmd_manager">
            {#each { length: content_tracker } as _, i}
                <div id="cmd_input_box" class="program_cmd__input__box">
                    C:\Users\zeljko><input
                        on:keydown={OnCommandEnter}
                        maxlength="64"
                        id="cmd_input_{i}"
                        class="program_cmd__input"
                    />
                </div>
                <div id="cmd_results_{i}" />
            {/each}
        </div>
    </div>
</WindowBase>

<style>
    :root {
        --win7-cmd-background: black;
        --win7-cmd-color: lightgray;

        --win7-cmd-font-family: monospace;
        --win7-cmd-font-size: 0.9rem;
    }

    .program_cmd {
        display: flex;
        flex-direction: column;
        font-family: var(--win7-cmd-font-family);
        background: var(--win7-cmd-background);
        color: var(--win7-cmd-color);
        font-size: var(--win7-cmd-font-size);
        user-select: text;
        height: inherit;
        padding-left: 5px;
    }

    .program_cmd *::selection {
        background: rgba(211, 211, 211, 0.5);
    }

    .program_cmd__input__box {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .program_cmd__input {
        background: transparent;
        position: relative;
        right: 7px;
        border: none;
        outline: none;
        width: 78%;
        color: var(---win7-cmd-color);
    }

    .program_cmd__input::selection {
        background: rgba(211, 211, 211, 0.5);
    }
</style>
