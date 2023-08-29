

/*  Custom L33T Hacker decryption effect
    target = (who you want to apply the effect to)
    max_loops = (the amount of times to loop until you solve)
    delay = (delay between loops)

    note: it does not preserve nested <div><div> tags </div></div>
*/
export class LEET {
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
    
    // works well just needs to be less nested.
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
                            return;
                        }
                        hacker_array[solved_index] = this.target_array[solved_index]
                        this.UpdateLetter(hacker_array);
                        solved_index++;
                    }
                }, this.delay)
            }
        }
    }

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
