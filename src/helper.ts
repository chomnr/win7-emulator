import type { ComputerProgram } from './programs';

/**
 * Remove a single rule from a HTMLElement classList
 * @param element
 * @param rule
 */
export function RemoveRule(element: HTMLElement, rule: string) {
    element.classList.remove(rule);
}

/**
 * Remove the same rule from multiple HTMLElements.
 * @param elements
 * @param rule
 */
export function RemoveRuleFrom(elements: HTMLElement[], rule: string) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList != undefined && elements[i].classList.contains(rule)) {
            elements[i].classList.remove(rule);
        }
    }
}

/**
 * Change the display of multiple HTMLElements to the same display.
 * @param elements
 * @param display
 */
export function ChangeDisplays(elements: HTMLElement[], display: string) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = display;
    }
}

/**
 * Change the display of a single HTMLElement.
 * @param target
 * @param display
 */
export function ChangeDisplay(target: HTMLElement, display: string) {
    target.style.display = display;
}

/**
 * Update two classes simultaneously with a specific rule.
 * @param target The element you want the rule applied to.
 * @param removal The element you want the rule removed from.
 */
export function AddAndRemoveRule(target: HTMLElement, removal: HTMLElement, rule: string) {
    if (target != removal) {
        target.classList.add(rule);
        removal.classList.remove(rule);
    } else {
        target.classList.add(rule);
    }
}

/**
 * (Minimize the program)
 * @param program
 */
export function ToggleMinimization(program: ComputerProgram) {
    let wind = program.GetWindow().html();
    if (wind.style.display == 'none') {
        wind.style.display = 'flex';
    } else {
        wind.style.display = 'none';
    }
}

export function SequentialSearch(sequential: string, againstList: any[]): any[] {
    let maxIndex = againstList.length;
    let result: any[] = [];
    let seqLength = sequential.length;

    for (let i = 0; i < maxIndex; i++) {
        for (let x = 0; x < seqLength; x++) {
            if (sequential.toLowerCase() != againstList[i].GetName().toLowerCase().substring(0, seqLength)) {
                if (sequential.toLowerCase() != againstList[i].GetId().toLowerCase().substring(0, seqLength)) {
                    result.splice(i, 1);
                    break;
                }
            }
            if (!result.includes(againstList[i])) {
                result.push(againstList[i]);
            }
        }
    }
    return result;
}
