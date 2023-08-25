<script lang="ts">
    import { onMount } from "svelte";

    /* The programs you want to be active */
    var whitelist: string[] = [
        "program_ie9",
        "program_test" ]

    /* What you suffix your titles/headers */
    var title_suffix = "-title"
    var icon_suffix = "-icon"

    /* The last program */
    var _last: HTMLElement | null = null;

    /* The program that was clicked */
    var _current: HTMLElement | null = null;

    function findTitle(programId: string): HTMLElement | null {
         //self explanatory
        if (programId.endsWith(title_suffix)) {
            return document.getElementById(programId)
        }

        // self explanatory
        if (whitelist.includes(programId)) {
            return document.getElementById(programId + title_suffix)
        }

        // If the programId equals to the icon variant of programId_(icon_suffix)
        // then return programId_(title_suffix).
        if (programId.endsWith(icon_suffix)) {
            var regex = new RegExp(icon_suffix, "g")
            return document.getElementById(programId.replace(regex, title_suffix))
        }
        // nothing found so return null
        return null;
    }

    function findRoot(programId: string) : HTMLElement | null {
        var m_programid = programId;

        if (programId.endsWith(title_suffix)) {
            var regex = new RegExp(title_suffix, "g")
            m_programid = m_programid.replace(regex, "");
        }

        if (programId.endsWith(icon_suffix)) {
            var regex = new RegExp(icon_suffix, "g")
            m_programid = m_programid.replace(regex, "");
        }

        if (whitelist.includes(m_programid)) {
            return document.getElementById(m_programid);
        }
        return null;
    }

    function Update(target: HTMLElement) {
        if (_current == null) {
            _current = target;
            _last = target;
        } else {
            _last = _current;
            _current = target;
        }
    }

    function ChangeToActive(current: HTMLElement | null, last: HTMLElement | null) {
        var rootC = findRoot(current?.id);
        var rootL = findRoot(last?.id);
            
        if (rootC == rootL) {
            if (!rootC?.classList.contains("active")) {
                rootC?.classList.add("active");
                current.style.display = "block";
            }
            return;
        } else {
            rootC?.classList.add("active");
            rootL?.classList.remove("active");
            current.style.display = "block";
            last.style.display = "-webkit-box";

        }
    }

    // Reset all programs to default;
    function reset() {
        if (_current != null) {
            var rootC = findRoot(_current?.id);
            var rootL = findRoot(_last?.id);
            rootC?.classList.remove("active");
            rootL?.classList.remove("active");
            _current.style.display = "-webkit-box";
            _last.style.display = "-webkit-box";
            _current = null;
        }
    }

    onMount(() => {
        document.addEventListener("click", (e) => {
            if (e.target != null) {
                var result: HTMLElement | null = findTitle(e.target.id);
                if (result != null) {
                    Update(result);
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
    <div id="program_ie9" class="win7-desktop-grid__program" style="z-index: 2;">
        <div id="program_ie9-icon" class="win7-desktop-grid__program--icon win7-desktop-grid__program--icon--explorer"></div>
        <div id="program_ie9-title" class="win7-desktop-grid__program--title">Internet<br>Explorer</div>
    </div>
    <div id="program_test" class="win7-desktop-grid__program" style="z-index: 1;">
        <div id="program_test-icon" class="win7-desktop-grid__program--icon win7-desktop-grid__program--icon--test"></div>
        <div id="program_test-title" class="win7-desktop-grid__program--title">Recycle  adsasdadsdasadsas</div>
    </div>
</div>