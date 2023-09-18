// This entire file consists of programs that help create a ComputerProgram;
// This file also maintains all existing programs. The point of this
// class is to be able to adjust a single program and make it reflect through
// every other element where a ComputerProgram might be ex: startmenu, desktop
// and taskbar.

// Computer Categories (used just for the same StartMenu search).
export enum ComputerCategories {
    PROGRAMS = 'Programs',
    FILES = 'Files',
    ALL = 'All', // do not use as a category for a program
}

// Object for ComputerProgram; builder-like pattern that adds
// additional functionality.
class ComputerProgramExtra {
    private documentId: string;

    constructor(documentId: string) {
        this.documentId = documentId;
    }

    html(): HTMLElement {
        return document.getElementById(this.documentId) as HTMLElement;
    }

    string(): string {
        return this.documentId;
    }
}

// ComputerProgram class used to keep track of all the necessary
// details of a program.
export class ComputerProgram {
    [x: string]: any;
    private id: string;
    private name: string;
    private fullIdentifier: string;
    private icon: string;
    private title: string;
    private category: ComputerCategories;
    private window: string;
    private webpage: string;
    private handle: string;
    private controls: string;
    private searchcontrols: string;

    /**
     * Instantiate/Create a ComputerProgram
     *
     * @param id desired id of program
     * @param name desired name of program
     * @param category the category of the program.
     */
    constructor(id: string, name: string, category: ComputerCategories = ComputerCategories.PROGRAMS) {
        this.id = id;
        this.name = name;
        this.fullIdentifier = program_prefix + id;
        this.icon = this.fullIdentifier + icon_suffix;
        this.title = this.fullIdentifier + title_suffix;
        this.category = category;
        this.window = this.fullIdentifier + window_suffix;
        this.webpage = this.fullIdentifier + webpage_suffix;
        this.handle = this.window + handle_suffix;
        this.controls = this.window + controls_suffix;
        this.searchcontrols = this.window + search_controls_suffix;
    }

    /**
     * Returns the Id of the ComputerProgram.
     *
     * @returns {string}
     */
    GetId(): string {
        return this.id;
    }

    /**
     * Returns the name of the program.
     *
     * @returns {string}
     */
    GetName(): string {
        return this.name;
    }

    /**
     * Returns the FullIdentifier which is the ID of the HTMLElement.
     *
     * @returns {ComputerProgramExtra}
     */
    GetFullIdentifier(): ComputerProgramExtra {
        return new ComputerProgramExtra(this.fullIdentifier);
    }

    /**
     * The icon of the program which is a HTMLElement.
     *
     * @returns {ComputerProgramExtra}
     */
    GetIcon(): ComputerProgramExtra {
        return new ComputerProgramExtra(this.icon);
    }

    /**
     * The window of the program.
     *
     * @returns {ComputerProgramExtra}
     */
    GetWindow(): ComputerProgramExtra {
        return new ComputerProgramExtra(this.window);
    }

    /**
     * The window of the program.
     *
     * @returns {ComputerProgramExtra}
     */
    GetHandle(): ComputerProgramExtra {
        return new ComputerProgramExtra(this.handle);
    }

    /**
     * The controls of the program ex: min, max, and close.
     *
     * @returns {ComputerProgramExtra}
     */
    GetControls(): ComputerProgramExtra {
        return new ComputerProgramExtra(this.controls);
    }

    /**
     * The search controls of the webpage (not applications). can return null.
     *
     * @returns {ComputerProgramExtra}
     */
    GetSearchControls(): ComputerProgramExtra {
        return new ComputerProgramExtra(this.searchcontrols);
    }

    /**
     * The webpage of the program.
     *
     * @returns {ComputerProgramExtra}
     */
    GetWebPage(): ComputerProgramExtra {
        return new ComputerProgramExtra(this.webpage);
    }

    /**
     * A misleading name but it returns the Title element that contains the this.name.
     *
     * @returns {string}
     */
    GetTitle(): ComputerProgramExtra {
        return new ComputerProgramExtra(this.title);
    }

    /**
     * Returns the category of the ComputerProgram.
     *
     * @returns {ComputerCategories}
     */
    GetCategory(): ComputerCategories {
        return this.category;
    }
}

// Helper class to help identify ComputerProgram objects.
class ProgramFilterHelper {
    /**
     * A helper function that helps turn a class of a ComputerProgram
     * into FullIdentifier.
     *
     * @param input the class you want to convert to a FullIdentifier
     * @returns
     */
    static ConvertToFullIdentifier(input: string): string {
        if (input.includes(title_suffix)) {
            input = input.replace(title_suffix, '');
        }

        if (input.includes(icon_suffix)) {
            input = input.replace(icon_suffix, '');
        }

        if (input.includes(window_suffix)) {
            input = input.replace(window_suffix, '');
        }

        if (input.includes(webpage_suffix)) {
            input = input.replace(webpage_suffix, '');
        }

        if (input.includes(handle_suffix)) {
            input = input.replace(handle_suffix, '');
        }

        if (input.includes(controls_suffix)) {
            input = input.replace(controls_suffix, '');
        }

        if (input.includes(search_controls_suffix)) {
            input = input.replace(search_controls_suffix, '');
        }

        if (!input.includes(program_prefix)) {
            input = program_prefix + input;
        }
        return input;
    }
}

// Helper class to help filter out programs.
export class ProgramFilter {
    /**
     * Check whether or not the ComputerProgram exists through the fullidentifier.
     *
     * @param fullIdentifier the class you want to look for
     * @returns true or false whether not the program exists or not.
     */
    static Exist(fullIdentifier: string): Boolean {
        fullIdentifier = ProgramFilterHelper.ConvertToFullIdentifier(fullIdentifier);
        return programs.some((x) => x.GetFullIdentifier().string() == fullIdentifier);
    }

    /**
     * checks if the given element has the appropriate suffix.
     * @param toSearch the type of
     * @param identifier
     */
    static IsTypeOf(suffix: string, identifier: string): Boolean {
        return identifier.includes(suffix);
    }

    /**
     * Finds the desired program and if it exists it returns a ComputerProgram
     * if not returns undefined.
     *
     * @param someIdentifier A identifer that can represent the class.
     * @returns {ComputerProgram}
     */
    static Find(someIdentifier: string): ComputerProgram | undefined {
        someIdentifier = ProgramFilterHelper.ConvertToFullIdentifier(someIdentifier);
        return programs.find((x) => x.GetFullIdentifier().string().toLowerCase() == someIdentifier.toLowerCase());
    }

    /**
     * Finds the desired program and if it exists it returns a ComputerProgram
     * if not returns undefined.
     *
     * @param id The id of the program.
     * @returns
     */
    static FindById(id: string): ComputerProgram | undefined {
        return programs.find((x) => x.GetId().toLowerCase() == id.toLowerCase());
    }

    /**
     * Returns all the ComputerPrograms that currently exist.
     *
     * @returns {ComputerProgram[]}
     */
    static GetPrograms(): ComputerProgram[] {
        return programs;
    }
}

/* Program Prefix */
export const program_prefix = 'program_';

/* Desktop */
export const title_suffix = '-title';
export const icon_suffix = '-icon';
export const window_suffix = '-window';
export const webpage_suffix = '-webpage';
export const handle_suffix = '-handle';
export const controls_suffix = '-controls';
export const search_controls_suffix = '-search_controls';

// all the programs.
const programs: ComputerProgram[] = [
    new ComputerProgram('ie9', 'Internet Explorer'),
    new ComputerProgram('cmd', 'Command Prompt'),
    new ComputerProgram('resume', 'Resume'),
    new ComputerProgram('hangman', 'Hangman'),
    new ComputerProgram('bruteexpose', 'Brute Expose'),
];
