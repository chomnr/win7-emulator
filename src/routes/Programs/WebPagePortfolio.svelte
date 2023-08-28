<script lang="ts">
    import { onMount } from 'svelte';
    import '../webpage.css';

    /* LEET HACKER RANDOMIZATION EFFECT */
    
    class LEET {

            target: HTMLElement | null;
            max_loop: number; // amount of times to loop before decryption

            target_array: string[] | null;

            constructor(target: string, max_loop: number = 50) {
                this.target = document.getElementById(target);
                this.max_loop = max_loop;

                this.target_array = this.LoadTargetArray();
            }
            
            public ApplyEffect() {
                if (this.target?.textContent != null) {                    
                    if (this.target_array != null) {
                        var hacker_array = [...this.target_array];
                        let loop_cnt = 0;
                        let solved_index = 0;
                        setInterval(() => {
                            loop_cnt++;

                            if (loop_cnt < this.max_loop) {
                                for (const [id, _] of hacker_array.entries()) {
                                    hacker_array[id] = this.GetRandomLetter();
                                    this.UpdateLetter(hacker_array)
                                }
                            } else {
                                hacker_array[solved_index] = this.target_array[solved_index]
                                this.UpdateLetter(hacker_array);
                                solved_index++;
                            }
                        }, 50)

                         /* Randomizer */
                            /*
                            for (const [id, _] of hacker_array.entries()) {
                                if (loop_cnt > this.max_loop) {
                                    break;
                                }
                                hacker_array[id] = this.GetRandomLetter();
                                this.UpdateLetter(hacker_array)
                            }

                            if (loop_cnt > this.max_loop) {
                                this.UpdateLetter(hacker_array);
                            }*/
                        /*
                        let loop_cnt = 0;
                        let solver_cnt = 0;
                        let random = setInterval(() => {
                            loop_cnt++;
                            for (const [id, _] of hacker_array.entries()) {
                                if (loop_cnt > this.max_loop) {
                                    break;
                                }
                                hacker_array[id] = this.GetRandomLetter();
                                this.UpdateLetter(hacker_array)
                            }

                            if (loop_cnt > this.max_loop) {
                                console.log(this.target_array);
                                this.UpdateLetter(hacker_array);
                                solver_cnt++;
                                if (this.AreArraysIdentical(this.target_array, hacker_array)) {
                                    clearInterval(random)
                                }
                            }

                        }, 1000)
                        */
                    }
                }
            }

            public UpdateLetter(hacker_array: string[]) {
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
        
    onMount(() => {
        /* LEET HACKER TEXT EFFECT */
        var leet = new LEET("branding_title");
        leet.ApplyEffect();

        var leet2 = new LEET("branding_position");
        leet2.ApplyEffect();
        /*
        setInterval(() => {
            leet.ApplyEffect();
            leet2.ApplyEffect();
        }, 20)
        */

    })
</script>


<div class="webpage">
    <div class="branding">
        <div id="branding_title" class="title">ZELJKO</div>
        <div id="branding_position" class="position">FULL STACK ENGINEER</div>
    </div>
    <!--
    <div class="navigation">
        <div class="link">
            <div class="name lightbulb"></div>
            <div class="title">ABOUT ME</div>
        </div>
        <div class="link">
            <div class="name lightbulb"></div>
            <div class="title">TESTING THIS SHIT</div>
        </div>
        <div class="link">
            <div class="name lightbulb"></div>
            <div class="title">tiny boi</div>
        </div>
    </div>
-->
    <!--
    <div class="navigation">
        <div class="branding">
            <div class="brand">ŽELJKO VRANJES</div>
            <div class="position">
                <div class="sub-position">SOFTWARE ENGINEER</div>
                <div class="sub-position">FRONTEND DEVELOPER</div>
                <div class="sub-position">BACKEND DEVELOPER</div>
            </div>
        </div>
    </div>
-->
</div>