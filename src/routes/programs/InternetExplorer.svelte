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

    let width = 1200;
    let height = 700;

    let program: ComputerProgram = ProgramFilter.Find('ie9')!;
    onMount(() => {});
</script>

<WindowBase {program} isWebSite={true} showTitle={false} openOnVisit={true} {width} {height}>
    <div
        id={program.GetWebPage().string()}
        class="webpage"
        style={$WebsiteStage != 3 ? 'height:100%;' : 'height:fit-content;'}
    >
        <div class="group center full-width full-height">
            {#if $WebsiteStage != 3}
                <div class="command-injection">
                    {#if $WebsiteStage == 0}
                        <div class="command">
                            Unlock the website by running '<span class="emphasis">ovrs authenticate</span>' in the cmd.
                        </div>
                    {/if}

                    {#if $WebsiteStage == 1}
                        <div class="command">Processing...</div>
                    {/if}

                    {#if $WebsiteStage == 2}
                        <div class="command">something went wrong rerun the command.</div>
                    {/if}
                </div>
            {/if}
        </div>

        {#if $WebsiteStage == 3}
            <div class="branding">
                <div class="group column">
                    <div id="branding_title" class="title">ZELJKO VRANJES</div>
                    <div id="branding_position" class="position">FULL STACK ENGINEER</div>
                    <div class="socials">
                        <a href="https://github.com/chomnr"><i class="icon github animate" /></a>
                        <a href="https://twitter.com/resilientchomnr"
                            ><i class="icon x animate" style="animation-duration: 2s" /></a
                        >
                        <a href="https://news.ycombinator.com/user?id=chomnr"
                            ><i class="icon ycombinator animate" style="animation-duration: 3s" /></a
                        >
                    </div>
                </div>
                <div class="group float-right flex-1">
                    <div style="margin-left: auto;display:flex; gap: 5px;">
                        <div class="command-injection" style="width: fit-content;">
                            <div class="command">injectx about</div>
                        </div>
                        <div class="command-injection" style="width: fit-content;">
                            <div class="command">secured</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="group" style="gap: 0px;">
                <div style="font-size: 3rem;padding-top:5px;padding-bottom:0px;">
                    <b>Hi, I am <span class="code-font">Zeljko Vranjes</span></b>
                </div>
                <p style="font-size: 0.9rem;">
                    I'm a software engineer with a extensive experience in the backend and frontend. I LOVE challenges.
                    I hope you enjoy my portfolio it was a real pain to build. The emulator was in built TypeScript and
                    SvelteKit. The interactable models were integrated with THREE.js
                </p>
                <div>
                    <b id="about-me-title">ABOUT ME</b>
                </div>
                <p id="about-me-content" style="font-size: 0.9rem;">
                    I began my programming journey at, around 13 years old starting with Python. However I soon
                    transitioned to Java because it was the language used for creating Minecraft plugins. During that
                    time I developed plugins ranging from player management tools to minigames. Around the age of 17 I
                    shifted my focus away from Minecraft plugin development. Started working on web development projects
                    such, as integrations(ex: OAuth2), data retrieval(fetching), and CRUD apps. Here are a few of my
                    most recent projects: <a href="https://github.com/chomnr/BruteExpose" style="color:limegreen;"
                        >BruteExpose</a
                    >,
                    <a href="https://github.com/chomnr/SimpleBlog" style="color:limegreen;">SimpleBlog</a>
                    and
                    <a href="https://github.com/chomnr/SimpleCredentialManager" style="color:limegreen;"
                        >SimpleCredentialManager</a
                    >. Around this time, I found my love for backend development and ultimately started catering my
                    skills even more towards it. (this site is an exception).
                </p>
                <div><b id="about-me-title">HOBBIES</b></div>
                <p style="font-size: 0.9rem;">
                    When I'm not programming, I often engage in weightlifting and occasionally video games.
                    Additionally, I love to watch UFC and boxing usually only the main events and sometimes the
                    undercard. Some of my <b>favorite boxers are</b>: Terence Crawford, Shakur Stevenson, Dmitrii Bivol
                    and Vasyl Lomachenko; And my <b>favorite UFC fighters are</b>: George St. Pierre, Petr Yan, Khabib
                    Nurmagomedov, Jiří Procházka and Stipe Miocic.
                </p>
                <div><b id="about-me-title">RESUME</b></div>
                <p style="font-size: 0.9rem;">
                    Because this website is public, I will only provide the redacted version of my resume, which will be <a
                        style="color:lightblue"
                        href="https://docs.google.com/document/d/e/2PACX-1vT5vOA97SS11A4OZQb0mnI_n5o9EQWYZAvC7IuSd-yDiOSMTVB6F3m8Y0nN1myqzJyGDwjPHU7OGv2Z/pub"
                        >right here</a
                    >. My location and Linkedin will be redacted. You can easily find me on Linkedin if you're
                    interested in seeking out my location. Also, if you want the non-redacted version, you can email me
                    at
                    <a style="color:lightblue" href="mailto:zeljkovranjes@outlook.com">zeljkovranjes@outlook.com</a>.
                </p>
                <div><b id="about-me-title">ENDGAME</b></div>
                <p style="font-size: 0.9rem;">
                    Due to the increase in societal isolation because of technology reliance and soon to be AI reliance
                    my goal is to create an app that revolutizes the way people interact with eachother; I can't go too
                    much into this but I assure you this will benefit humanity and ensure that humans have a prosperious
                    future for generations to come.
                </p>
                <br />
            </div>
        {/if}
    </div></WindowBase
>
