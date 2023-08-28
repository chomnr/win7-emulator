<script lang="ts">
    import { onMount } from 'svelte';
    import '../webpage.css';
    import {CurrentDate} from "../stores"
    import { LEET } from "../effects"

    var leet_title: LEET;
    var leet_position: LEET;
    var leet_is_solved: Boolean = false;
    onMount(() => {

        /* LEET HACKER TEXT EFFECT */
        leet_title = new LEET("branding_title", 50, 50); // 50,50 perfect sync with 100,30
        leet_title.ApplyEffect();

        leet_position = new LEET("branding_position", 100, 30); //100, 30 perfect sync with 50 /50
        leet_position.ApplyEffect();

        setTimeout(() => {
           leet_is_solved = true;
        }, 3000);
    })
</script>


<div class="webpage">
    <div class="branding">
        <div id="branding_title" class="title">ZELJKO VRANJES</div>
        <div id="branding_position" class="position">FULL STACK ENGINEER</div>
    </div>
    {#if leet_is_solved}
    <div class="socials">
        <i class="icon github animate"></i>
        <i class="icon x animate" style="animation-duration: 2s"></i>
        <i class="icon ycombinator animate" style="animation-duration: 3s"></i>
    </div>
    {/if}
</div>