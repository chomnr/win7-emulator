<script lang="ts">
    import { onMount } from "svelte";
    import "../webpage.css";
    import { LEET } from "../effects";

    var div_command: HTMLElement | null;
    var div_command_input: HTMLElement | null;

    var leet_is_solved: Boolean = false;
    onMount(() => {
        div_command = document.getElementById("div_command");
        //@ts-ignore
        div_command_input = document.getElementById("div_command_input");

        function ChangeCommandInput(input: string) {
            if (div_command_input != null) {
                div_command_input.style.opacity = "0";
                setTimeout(function () {
                    //@ts-ignore 
                    div_command_input.innerText = input;

                    //@ts-ignore
                    div_command_input.style.opacity = "1";
                }, 500);
            }
        }

        function ApplyLeetEffect() {
            let leet_title: LEET = new LEET("branding_title", 50, 50); // 50,50 perfect sync with 100,30
            let leet_position: LEET = new LEET("branding_position", 100, 30); //100, 30 perfect sync with 50 /50

            leet_title.ApplyEffect();
            leet_position.ApplyEffect();
            
            setTimeout(() => {
                leet_is_solved = true;
                setTimeout(() => { ChangeCommandInput("portfolio.exe"); }, 2600)
            }, 5000);
        }

        function ApplyInitalWhite() {}

        ApplyLeetEffect();
        ApplyInitalWhite();
    });
</script>

<div class="webpage">
    <div class="branding">
        <div class="group column">
            <div id="branding_title" class="title">ZELJKO VRANJES</div>
            <div id="branding_position" class="position">
                FULL STACK ENGINEER
            </div>
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
            <i
                class="icon ycombinator animate"
                style="animation-duration: 3s"
            />
        </div>
    {/if}

    <div class="begin-screen" />
    <!--
    <div class="body">
        asddsa
    </div>
-->
</div>
