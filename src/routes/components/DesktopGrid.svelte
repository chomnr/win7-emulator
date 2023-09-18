<!--   
    This file manage's ONLY the desktop environment. It is simply an
    intermediator between the process and program.
-->
<script lang="ts">
    import { onMount } from 'svelte';
    import { ProgramFilter, ComputerProgram, icon_suffix, title_suffix } from '../../programs';
    import { AddAndRemoveRule, ChangeDisplay, ChangeDisplays, RemoveRuleFrom } from '../../helper';
    import { TaskManager } from '../stores';

    interface DesktopClickTracker {
        current: ComputerProgram | undefined;
        last: ComputerProgram | undefined;
    }

    const tracker: DesktopClickTracker = {
        current: undefined,
        last: undefined,
    };

    /**
     * Update the current and last click dynamically.
     * @param target the program you want to update
     */
    function Update(target: ComputerProgram) {
        if (tracker.current == null) {
            tracker.current = target;
            tracker.last = target;
        } else {
            tracker.last = tracker.current;
            tracker.current = target;
        }
    }

    /**
     * Toggles whether or not a item is active.
     * @param event
     */
    function ToggleActivity(event: MouseEvent) {
        var rule = 'active'; // the rule of the active class.

        //@ts-ignore
        var target: HTMLElement = event.target as HTMLElement;
        var result: ComputerProgram = ProgramFilter.Find(target.id)!;

        if (tracker.current == result) {
            return;
        }

        const UpdateVisualization = () => {
            let a: HTMLElement;
            let b: HTMLElement;

            let c: HTMLElement;
            let d: HTMLElement;

            if (tracker.current != undefined && tracker.last != undefined) {
                a = tracker.current.GetFullIdentifier().html();
                b = tracker.last.GetFullIdentifier().html();

                c = tracker.current.GetTitle().html()!;
                d = tracker.last.GetTitle().html()!;

                AddAndRemoveRule(a, b, rule);

                if (a == b) {
                    ChangeDisplay(c, 'block');
                } else {
                    ChangeDisplay(c, 'block');
                    ChangeDisplay(d, '-webkit-box');
                }
            }
        };

        if (result != null) {
            Update(result);
            UpdateVisualization();
        }
    }

    /**
     * Detects whenever the selected item is not a ComputerProgram.
     *
     * Method:
     * Checks if the clicked element contains a icon or title if
     * it does that mean it's not opening a program because
     * those two suffixes are unique to a desktop program
     */
    function InvalidClickDetection(me: MouseEvent) {
        if (me.target != null) {
            let id: string = me.target.id;
            if (id == 'desktop_grid' && $TaskManager.using != undefined) {
                TaskManager.SetUsing(undefined);
            }
            // check if it contains either a icon_suffix or title_suffix
            let x1: Boolean = ProgramFilter.IsTypeOf(icon_suffix, id)!;
            let x2: Boolean = ProgramFilter.IsTypeOf(title_suffix, id)!;
            if (!x1 && !x2 && tracker.current != undefined) {
                let b1 = tracker.current?.GetFullIdentifier().html()!;
                let b2 = tracker.last?.GetFullIdentifier().html()!;

                let c1 = tracker.current?.GetTitle().html()!;
                let c2 = tracker.last?.GetTitle().html()!;

                RemoveRuleFrom([b1, b2], 'active');
                ChangeDisplays([c1, c2], '-webkit-box');

                tracker.current = undefined;
            }
        }
    }

    function AddProcess(event: MouseEvent) {
        var target = event.target;
        if (target != null) {
            let program = ProgramFilter.Find(target.id);
            TaskManager.AddProcess(program!);
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={InvalidClickDetection} id="desktop_grid" class="win7-desktop-grid">
    {#each ProgramFilter.GetPrograms() as program}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            on:dblclick={AddProcess}
            on:click={ToggleActivity}
            role="button"
            tabindex="0"
            id={program.GetFullIdentifier().string()}
            class="win7-desktop-grid__program"
        >
            <div
                id={program.GetIcon().string()}
                class="win7-desktop-grid__program--icon win7-desktop-grid__program--icon--explorer {program
                    .GetIcon()
                    .string()}"
            />
            <div id={program.GetTitle().string()} class="win7-desktop-grid__program--title">{program.GetName()}</div>
        </div>
    {/each}
</div>
