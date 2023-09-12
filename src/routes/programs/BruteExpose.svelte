<script lang="ts">
    import { browser } from '$app/environment';
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import WindowBase from '../components/WindowBase.svelte';
    import { IsConnectedToBruteExpose } from '../stores';

    //
    // BruteExpose
    //

    let program: ComputerProgram = ProgramFilter.Find('bruteexpose')!;

    // helper function to parse data.
    function parse(data: any): JSON {
        let json;
        try {
            json = JSON.parse(JSON.parse(data));
        } catch (error) {
            json = JSON.parse(data);
        }
        return json;
    }

    if (browser) {
        let socket: WebSocket;

        IsConnectedToBruteExpose.subscribe((e) => {
            if (e == false) {
                if (socket == undefined) {
                    socket = new WebSocket('wss://be-feed.zeljko.me:8443/');
                }

                socket.onopen = function () {
                    IsConnectedToBruteExpose.set(true);
                };

                socket.onerror = function () {
                    IsConnectedToBruteExpose.set(false);
                };

                socket.onclose = function () {
                    IsConnectedToBruteExpose.set(false);
                };

                socket.onmessage = function (e) {
                    let data = parse(e.data);
                    let credentials = data['mergeA'];

                    if (credentials.length == undefined) {
                        var div: HTMLElement | null = document.getElementById('bruteexpose_data');

                        if (div != null)
                            div.innerHTML +=
                                "<div> [ <span style='color: red'>FAILED</span> ]<span> Origin: " +
                                credentials.hostname +
                                ' </span></div>';
                    }
                };
            }
        });
    }
</script>

<WindowBase {program} isWebSite={false} showTitle={true} width={800} height={400}>
    <div id={program.GetWebPage().string()} class="program_bruteexpose">
        <div id="cmd_manager">
            <br />
            <div>&nbsp;&nbsp;&nbsp;BruteExpose</div>
            <div>
                &nbsp;&nbsp;&nbsp;Github: <a href="https://github.com/chomnr/BruteExpose"
                    >https://github.com/chomnr/BruteExpose</a
                >
            </div>
            <div>
                &nbsp;&nbsp;&nbsp;Full Preview: <a href="https://projects.zeljko.me/bruteexpose/"
                    >https://projects.zeljko.me/bruteexpose/</a
                >
            </div>
            <br />
            {#if $IsConnectedToBruteExpose}
                <div>&nbsp;&nbsp;&nbsp;WEBSOCKET: <a style="color: limegreen;">CONNECTED</a></div>
            {:else}
                <div>&nbsp;&nbsp;&nbsp;WEBSOCKET: <a style="color: red;">FAILED</a></div>
            {/if}
            <br />
            <div id="bruteexpose_data" />
        </div>
    </div></WindowBase
>

<style>
    :root {
        --win7-cmd-background: black;
        --win7-cmd-color: lightgray;

        --win7-cmd-font-family: monospace;
        --win7-cmd-font-size: 0.9rem;
    }

    .program_bruteexpose {
        display: flex;
        flex-direction: column;
        font-family: var(--win7-cmd-font-family);
        background: var(--win7-cmd-background);
        color: var(--win7-cmd-color);
        font-size: var(--win7-cmd-font-size);
        user-select: text;
        height: inherit;
        overflow-y: auto;
        padding-left: 5px;
        padding-right: 5px;
    }

    .program_bruteexpose *::selection {
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
