<script lang="ts">
    import { onMount } from "svelte";
    import { ProgramFilter, ComputerProgram } from "../../programs"
    import { AddAndRemoveRule, ChangeDisplay, ChangeDisplays, RemoveRuleFrom } from "../../helper";

    /* Program Filter */
    var filter: ProgramFilter = new ProgramFilter();

    /* The last program that was clicked */
    var _last: ComputerProgram | undefined = undefined;

    /* The program that was clicked */
    var _current: ComputerProgram | undefined = undefined;

    function Update(target: ComputerProgram) {
        if (_current == null) {
            _current = target;
            _last = target;
        } else {
            _last = _current;
            _current = target;
        }
    }

    /**
     * Toggles whether or not a item is active.
     * @param event
     */
    function ToggleActivity(event: MouseEvent) {
        var rule = "active"; // the rule of the active class.

        //@ts-ignore
        var target: HTMLElement = event.target as HTMLElement;
        var result: ComputerProgram = filter.Find(target.id)!;

        if (_current == result) { return; }

        const UpdateVisualization = () => {
            var x1: HTMLElement;
            var x2: HTMLElement; 
            if (_current != undefined && _last != undefined) {
                x1 = _current.GetFullIdentifier().html();
                x2 = _last.GetFullIdentifier().html();

                AddAndRemoveRule(x1, x2, rule);
                
                if (x1 == x2) {
                    ChangeDisplay(_current.GetTitle().html()!, "block");
                } else {
                    ChangeDisplay(_current.GetTitle().html()!, "block");
                    ChangeDisplay(_last.GetTitle().html()!, "-webkit-box");
                }
            }            
        }

        if (result != null) {
            Update(result);
            UpdateVisualization();
        }
    }
    
    onMount(() => {
        document.addEventListener('click', (e) => {
            if (e.target != null)
            if (!filter.Exist(e.target.id)) {
                if (_current != undefined || _last != undefined) {
                    RemoveRuleFrom([_last?.GetFullIdentifier().html()!, _current?.GetFullIdentifier().html()!], "active");
                    ChangeDisplays([_current?.GetTitle().html(), _last?.GetTitle().html()], "-webkit-box");
                    _current = undefined;
                }
                return;
            }
        });
    })
</script>
<div id="desktop_grid" class="win7-desktop-grid">
    {#each filter.GetPrograms() as program}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={ToggleActivity} role="button" tabindex=0 id="{program.GetFullIdentifier().string()}" class="win7-desktop-grid__program">
            <div id="{program.GetIcon().string()}" class="win7-desktop-grid__program--icon win7-desktop-grid__program--icon--explorer"></div>
            <div id="{program.GetTitle().string()}" class="win7-desktop-grid__program--title">{program.GetName()}</div>
        </div>
    {/each}
</div>