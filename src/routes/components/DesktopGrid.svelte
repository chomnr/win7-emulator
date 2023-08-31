<script lang="ts">
    import { onMount } from "svelte";
    import { ProgramFilter, ComputerProgram } from "../../programs"
    import { ChangeDisplay, RemoveRuleFrom } from "../../helper";

    /* Program Filter */
    var filter: ProgramFilter = new ProgramFilter();

    /* The last program */
    var _last: HTMLElement | null = null;

    /* The program that was clicked */
    var _current: HTMLElement | null = null;

    function update(target: HTMLElement) {
        if (_current == null) {
            _current = target;
            _last = target;
        } else {
            _last = _current;
            _current = target;
        }
    }

    function ChangeToActive(current: HTMLElement | null, last: HTMLElement | null) {
        var rootC = filter.Find(current?.id!)?.GetFullIdentifier().html();
        var rootL = filter.Find(last?.id!)?.GetFullIdentifier().html();
            
        if (rootC == rootL) {
            if (!rootC?.classList.contains("active")) {
                if (current != null ) {
                    rootC?.classList.add("active");
                    current.style.display = "block";
                }
            }
            return;
        } else {
            rootC?.classList.add("active");
            rootL?.classList.remove("active");
            if (current != null && last != null ) {
                current.style.display = "block";
                last.style.display = "-webkit-box";
            }
        }
    }

    // Reset all programs to default
    function reset() {
        if (_current != null) {
            var rootC = filter.Find(_current?.id)?.GetFullIdentifier().html();
            if (_current != null && _last != null) {
                var rootL = filter.Find(_last?.id)?.GetFullIdentifier().html();
            }
            RemoveRuleFrom([rootC!, rootL!], "active");
            ChangeDisplay([_current!, _last!], "-webkit-box");
            _current = null;
        }
    }

    onMount(() => {
        document.addEventListener("click", (e) => {
            if (e.target != null) {
                var result: HTMLElement | undefined = filter.Find(e.target.id)?.GetTitle().html();
                console.log(result);
                if (result != null) {
                    update(result);
                    ChangeToActive(_current, _last);
                    return;
                } else {
                    reset();
                }
            }
        })
	});
</script>
<div id="desktop_grid" class="win7-desktop-grid">
    {#each filter.GetPrograms() as program}
        <div id="{program.GetFullIdentifier().string()}" class="win7-desktop-grid__program">
            <div id="{program.GetIcon().string()}" class="win7-desktop-grid__program--icon win7-desktop-grid__program--icon--explorer"></div>
            <div id="{program.GetTitle().string()}" class="win7-desktop-grid__program--title">{program.GetName()}</div>
        </div>
    {/each}
    <!--
    <div id="program_ie9" class="win7-desktop-grid__program">
        <div id="program_ie9-icon" class="win7-desktop-grid__program--icon win7-desktop-grid__program--icon--explorer"></div>
        <div id="program_ie9-title" class="win7-desktop-grid__program--title">Internet<br>Explorer</div>
    </div>
    
    <div id="program_test" class="win7-desktop-grid__program" style="z-index: 1;">
        <div id="program_test-icon" class="win7-desktop-grid__program--icon win7-desktop-grid__program--icon--test"></div>
        <div id="program_test-title" class="win7-desktop-grid__program--title">Recycle  adsasdadsdasadsas</div>
    </div>-->

</div>