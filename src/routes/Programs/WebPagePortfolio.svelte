<script lang="ts">
    import { onMount } from 'svelte';
    import '../webpage.css';
    import {CurrentDate} from "../stores"

    /* LEET HACKER RANDOMIZATION EFFECT */
    
    class LEET {
            private target: HTMLElement | null;
            private max_loop: number; // amount of times to loop before decryption
            private delay: number;
            private target_array: string[] | null;

            constructor(target: string, max_loop: number = 50, delay: number = 10) {
                this.target = document.getElementById(target);
                this.max_loop = max_loop;
                this.delay = delay;
                this.target_array = this.LoadTargetArray();
            }
            
            public ApplyEffect() {
                if (this.target?.textContent != null) {                    
                    if (this.target_array != null) {
                        var hacker_array = [...this.target_array];
                        let loop_cnt = 0;
                        let solved_index = 0;
                        let matrix = setInterval(() => {
                            loop_cnt++;
                            if (loop_cnt < this.max_loop) {
                                for (const [id, _] of hacker_array.entries()) {
                                    hacker_array[id] = this.GetRandomLetter();
                                    this.UpdateLetter(hacker_array)
                                }
                            } else {
                                if (this.arraysEqual(this.target_array, hacker_array)) {
                                    clearInterval(matrix);
                                }
                                hacker_array[solved_index] = this.target_array[solved_index]
                                this.UpdateLetter(hacker_array);
                                solved_index++;
                            }
                        }, this.delay)
                    }
                }
            }

            /* https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript */
            private arraysEqual(a1: string[], a2: string[]) {
                return JSON.stringify(a1)==JSON.stringify(a2);
            }

            private UpdateLetter(hacker_array: string[]) {
                if (this.target != null) {
                    this.target.innerText = hacker_array.join('')
                }
            }

            private GetRandomLetter(): string {
                return String.fromCharCode(65+Math.floor(Math.random() * 26))
            }

            private LoadTargetArray(): string[] | null {
                if (this.target != null && this.target.textContent != null) {
                    let content = this.target.textContent;
                    if (content.length > 0) {
                        var array: string[] = [...content];
                        return array;
                    } 
                    return null;
                }
                return null;
            }
        }

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
        <div id="branding_title" class="title">ZELJKO</div>
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