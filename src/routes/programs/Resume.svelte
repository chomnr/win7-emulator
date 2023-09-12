<script lang="ts">
    import { ProgramFilter, type ComputerProgram } from '../../programs';
    import WindowBase from '../components/WindowBase.svelte';
    import WebPagePortfolio from '../components/WebPagePortfolio.svelte';

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
        new ResumeTab(1, 'Objective', false),
        new ResumeTab(2, 'Education', true),
        new ResumeTab(3, 'Experience', false),
        new ResumeTab(4, 'Technical Skills', false),
        new ResumeTab(5, 'Projects', false),
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
            <div>
                Results-oriented early career software developer with a versatile software engineering background and
                adept tool integration skills applicable to diverse sectors. Proficient in end-to-end development, from
                solution design to testing and debugging. Skilled in scoping projects, issue resolution, and
                collaborative troubleshooting, with strong communication and teamwork abilities.
            </div>
        </article>
        <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
        <article
            class="resume-article"
            role="tabpanel"
            id="tab-A"
            style="display: {manager.GetTab(2)?.active === true ? 'flex' : 'none'}"
        >
            <div><b>Not Applicable</b></div>
        </article>
        <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
        <article
            class="resume-article"
            role="tabpanel"
            id="tab-B"
            style="display: {manager.GetTab(3)?.active === true ? 'flex' : 'none'}"
        >
            <!-- Spigot Experience -->
            <div class="item">
                <div style="width:100%;">SpigotMC<span style="float:right">2016-2018</span></div>
                <div><b>Freelance Programmer</b> (Java)</div>
                <ul>
                    <li>
                        Developed a wide variety of plugins, spanning from low to mid-level complexity, to cater to a
                        diverse range of Minecraft community servers.
                    </li>
                    <li>Tailored existing plugins to ensure compatibility and meet the needs of the server owners.</li>
                    <li>
                        Independently authored three plugins, which collectively have garnered over 1,000 downloads.
                    </li>
                </ul>
            </div>
        </article>
        <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
        <article
            class="resume-article has-scrollbar"
            role="tabpanel"
            id="tab-C"
            style="display: {manager.GetTab(4)?.active === true ? 'flex' : 'none'}"
        >
            <div class="item">
                <b>
                    My skill with the item is rated on a scale of 1 to 5, where 1 means I've used it once and 5 means
                    I'm a master.
                </b>
                <div>&nbsp;</div>
                <div class="group abnormal">
                    <div class="item">
                        <b style="align-items: center;">Languages</b>
                        <div>C# (4)</div>
                        <div>Java (4)</div>
                        <div>Rust (2)</div>
                        <div>TypeScript (3)</div>
                        <div>JavaScript (3)</div>
                    </div>
                    <div class="item">
                        <b>Frameworks and Libraries</b>
                        <div>Node.js (3)</div>
                        <div>Vue.js (2)</div>
                        <div>SvelteKit (3)</div>
                        <div>React (3)</div>
                        <div>.NET 7 (4)</div>
                        <div>ASP.NET Core (4)</div>
                    </div>

                    <div class="item">
                        <b>Databases</b>
                        <div>PostgresSQL (4)</div>
                        <div>MySQL (4)</div>
                        <div>Microsoft SQL Server (2)</div>
                        <div>MongoDB (3)</div>
                        <div>Firebase (2)</div>
                        <div>Redis (3)</div>
                    </div>

                    <div class="item">
                        <b>Tools</b>
                        <div>Git (4)</div>
                        <div>Postman (4)</div>
                        <div>Docker (1)</div>
                        <div>Putty (4)</div>
                        <div>AWS (Elastic BeanStalk (1), S3, RDS)</div>
                    </div>
                </div>
            </div>
        </article>
        <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
        <article
            class="resume-article"
            role="tabpanel"
            id="tab-D"
            style="display: {manager.GetTab(5)?.active === true ? 'flex' : 'none'};"
        >
            <div class="item">
                <div style="width:100%;">
                    <b>Software Licensing System&nbsp;</b><a href="https://github.com/chomnr/Licensing.NET">source</a
                    ><span style="float:right">Summer 2023</span>
                </div>
                <ul>
                    <li>Engaged in developing a versatile C# software licensing system with ASP.NET Core.</li>
                    <li>Implemented the Event-driven architecture for real-time event processing capabilities.</li>
                    <li>
                        Integrated Microsoft SQL Server and the Entity Framework to seamlessly integrate with the
                        Microsoft Ecosystem and allow ORM.
                    </li>
                    <li>Integrated Stripe for enhanced insights and efficient subscription management.</li>
                    <li>
                        Designed a modular Authority system to ensure data integrity through predefined rules for each
                        individual endpoint.
                    </li>
                </ul>
            </div>
            <div class="item">
                <div style="width:100%;">
                    <b>Linux Security Logger&nbsp;</b><a href="https://github.com/chomnr/BruteExpose">source</a><span
                        style="float:right">Summer 2023</span
                    >
                </div>
                <ul>
                    <li>
                        Engineered a Java and C-based Linux security solution to provide more detailed insights on
                        attackers.
                    </li>
                    <li>
                        Designed and developed a modular analytics system to capture and analyze a wide variety of
                        metrics.
                    </li>
                    <li>Integrated WebSocket support to gain real-time insights on recent attacks.</li>
                    <li>Forked OpenSSH to ensure compatibility with Linux(Ubuntu and Debian).</li>
                    <li>
                        Created an intuitive front end using Vue.js, Javascript and Chart.js to easily access data in a
                        web-based environment
                    </li>
                </ul>
            </div>

            <div class="item">
                <div style="width:100%;">
                    <b>Blogging System&nbsp;</b><a href="https://github.com/chomnr/SimpleBlog">source</a><span
                        style="float:right">Spring 2023</span
                    >
                </div>
                <ul>
                    <li>
                        Developed a functional REST API backend utilizing C#, PostgreSQL, Entity Framework (EF), and
                        ASP.NET Core, to ensure perfect compatibility within the Microsoft ecosystem.
                    </li>
                    <li>
                        Implemented the Vertical Slice architecture to ensure minimal code coupling, enriched external
                        interactions and command and query responsibility segregation.
                    </li>
                    <li>
                        Thoroughly performed unit testing with NUnit to verify regex patterns for usernames, passwords,
                        and emails, yielding a 100% accuracy rate in input validation.
                    </li>
                    <li>
                        Designed and constructed an intuitive and responsive frontend (UI/UX) using Blazor, HTML5, and
                        CSS3.
                    </li>
                    <li>Enriched blog post discovery with comprehensive filtering for user convenience.</li>
                </ul>
            </div>
        </article>
    </section>
</WindowBase>

<style>
    .resume-article {
        flex-direction: column;
        min-height: fit-content;
        max-height: calc(500px - 23px);
        overflow-y: auto;
    }

    .resume-article .item {
        display: flex;
        flex-direction: column;
    }

    .resume-article .item .group {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        margin: 0 auto;
    }
</style>
