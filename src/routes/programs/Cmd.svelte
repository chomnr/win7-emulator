<script lang="ts">
    import { ProgramFilter, type ComputerProgram, ProgramHelper } from "../../programs";
    import WindowBase from "../components/WindowBase.svelte";
    import WebPagePortfolio from "../components/WebPagePortfolio.svelte"
    import { ActiveWindows } from "../stores";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    //
    // BruteExpose
    //

    var program: ComputerProgram = ProgramFilter.Find("cmd")!;

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
            return commands.some(x => x.GetCommand() == command);
        }
        
        /**
         * Finds a command if found returns ConsoleCommand
         * @param command the command you want to find.
         */
        static Find(command: string): ConsoleCommand | undefined {
            return commands.find(x => x.GetCommand().toLowerCase() == command.toLowerCase())
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
            return "'" + command + "' is not recognized as an internal or external command, operable program or batch file."
        }
    }

    var commands: ConsoleCommand[] = [
        new ConsoleCommand("ping", "pong")
    ]

    ActiveWindows.subscribe((current) => {
        if (current.includes(program)) {
            // do stuff here.
            if (browser) {
                setTimeout(() => {
                    /// here we are...
                }, 10);
            }
        }
    })
</script>

<WindowBase program={program} isWebSite={false} showTitle={true} title="C:\Windows\system32\cmd.exe" openOnVisit={false} width={700} height={800}>
    <div class="program_cmd">
        <div>Microsoft Windows [Version 6.1.7601]</div>
        <div>Copyright (c) 2009 Microsoft Corporation. All rights reserved.</div>
        <div>&nbsp;</div>

        <div class="program_cmd__input__box">
            C:\Users\zeljko><input id="command_input" class="program_cmd__input"/>
        </div>
        <div id="command_results"></div>
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
        height: 400px;
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