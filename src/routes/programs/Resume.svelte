<script lang="ts">
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import WindowBase from '../components/WindowBase.svelte';
    import WebPagePortfolio from '../components/WebPagePortfolio.svelte';
    import { ActiveWindows, TaskManager } from '../stores';

    //
    // BruteExpose
    //

    var program: ComputerProgram = ProgramFilter.Find('resume')!;

    class ResumeTab {
        id: number;
        name: string;
        active: boolean;

        constructor(id: number, name: string, active: boolean) {
            this.id = id;
            this.name = name;
            this.active = active;
        }
    }

    class ResumeTabManager {
        public Tabs: ResumeTab[];

        constructor(tabs: ResumeTab[]) {
            this.Tabs = tabs;
        }

        Activate(tabId: number) {
            this.Tabs = this.Tabs.map((tab) => {
                if (tab.id == tabId) {
                    tab.active = true;
                } else {
                    tab.active = false;
                }
                return { ...tab };
            });
        }

        GetTab(tabId: number): ResumeTab | undefined {
            return this.Tabs.find((x) => x.id == tabId);
        }

        GetTabs(): ResumeTab[] {
            return this.Tabs;
        }
    }

    var manager = new ResumeTabManager([
        new ResumeTab(1, 'Education', true),
        new ResumeTab(2, 'Experience', false),
        new ResumeTab(3, 'Technical Skills', false),
        new ResumeTab(4, 'Projects', false),
    ]);
</script>

<WindowBase {program} isWebSite={false} showTitle={true} width={700} height={500}>
    <section class="tabs">
        <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
        <menu role="tablist" aria-label="Tabs Template">
            {#each manager.GetTabs() as tab}
                {#if tab.active == true}
                    <button role="tab" aria-controls="tab-{tab.id}" aria-selected="true">{tab.name}</button>
                {:else}
                    <button
                        on:click={() => {
                            manager.Activate(tab.id);
                            manager.Tabs = manager.Tabs;
                        }}
                        role="tab"
                        aria-controls="tab-{tab.id}"
                        aria-selected="false">{tab.name}</button
                    >
                {/if}
            {/each}
        </menu>
        <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
        <article
            class="resume-article"
            role="tabpanel"
            id="tab-A"
            style="display: {manager.GetTab(1)?.active === true ? 'flex' : 'none'}"
        >
            <div><b>Not applicable</b></div>
        </article>
        <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
        <article
            class="resume-article"
            role="tabpanel"
            id="tab-B"
            style="display: {manager.GetTab(2)?.active === true ? 'flex' : 'none'}"
        >
            <!-- Spigot Experience -->
            <div class="item">
                <div style="width:100%;">SpigotMC<span style="float:right">2016-2018</span></div>
                <div><b>Freelance Programmer</b> (Java)</div>
                <ul>
                    <li>
                        Developed a wide variety of plugins, spanning from low to mid-level complexity, to cater to a
                        diverse range of community servers.
                    </li>
                    <li>Tailored existing plugins to ensure compatibility and meet the needs of the server owners.</li>
                    <li>
                        Independently authored three plugins, which collectively have garnered over 1,000 downloads.
                    </li>
                </ul>
            </div>
        </article>
        <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
        <article role="tabpanel" id="tab-C" style="display: {manager.GetTab(3)?.active === true ? 'flex' : 'none'}">
            Tab C is active
        </article>
        <article role="tabpanel" id="tab-D" style="display: {manager.GetTab(4)?.active === true ? 'flex' : 'none'}">
            Tab D is inactive
        </article>
    </section>
</WindowBase>

<!--

    <menu role="tablist" aria-label="Tabs Template">
            {#each manager.GetTabs() as tab}
                <button role="tab" aria-controls="tab-{tab.id}" aria-selected="true">{tab.name}</button>
            {/each}
        </menu>
-->

<style>
    .resume-article {
        flex-direction: column;
        align-items: left;
    }

    .resume-article .item {
        display: flex;
        flex-direction: column;
        align-items: left;
    }
</style>
