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
        elements[i].classList.remove(rule);
    }
}

/**
 * Change the display of multiple HTMLElements to the same display.
 * @param elements 
 * @param display 
 */
export function ChangeDisplay(elements: HTMLElement[], display: string) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display =  display;
    }
}